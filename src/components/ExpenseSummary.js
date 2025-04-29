// client/src/components/ExpenseSummary.js
import React from 'react';
import UserAvatar from './UserAvatar';

const ExpenseSummary = ({ summary, currentUserId }) => {
  if (!summary) {
    return <div>Loading summary...</div>;
  }
  
  const { totalExpenses, balances, settlements } = summary;
  
  // Format currency
  const formatCurrency = (amount) => {
    return `₹${parseFloat(amount).toFixed(2)}`;
  };
  
  // Get current user's balance
  const currentUserBalance = balances.find(b => b.user._id === currentUserId);
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-blue-600 text-white p-4">
        <h2 className="text-xl font-semibold">Expense Summary</h2>
        <div className="text-2xl font-bold mt-2">{formatCurrency(totalExpenses)}</div>
        <div className="text-sm text-blue-200">Total expenses</div>
      </div>
      
      {currentUserBalance && (
        <div className="p-4 border-b">
          <h3 className="font-semibold mb-2">Your Balance</h3>
          <div className="flex items-center">
            <UserAvatar user={currentUserBalance.user} size="sm" className="mr-3" />
            <div>
              <div className="font-medium">{currentUserBalance.user.fullName || currentUserBalance.user.username}</div>
              <div className={`${currentUserBalance.netBalance >= 0 ? 'text-green-600' : 'text-red-600'} font-semibold`}>
                {currentUserBalance.netBalance >= 0 
                  ? `You are owed ${formatCurrency(currentUserBalance.netBalance)}`
                  : `You owe ${formatCurrency(Math.abs(currentUserBalance.netBalance))}`}
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="p-4">
        <h3 className="font-semibold mb-3">All Balances</h3>
        <div className="space-y-3">
          {balances.map(balance => (
            <div key={balance.user._id} className="flex items-center justify-between">
              <div className="flex items-center">
                <UserAvatar user={balance.user} size="xs" className="mr-2" />
                <span>{balance.user.fullName || balance.user.username}</span>
              </div>
              <div className={`font-medium ${balance.netBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(balance.netBalance)}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {settlements.length > 0 && (
        <div className="p-4 border-t">
          <h3 className="font-semibold mb-3">Settlement Plan</h3>
          <div className="space-y-3">
            {settlements.map((settlement, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <UserAvatar user={settlement.from} size="xs" className="mr-2" />
                  <span>{settlement.from.fullName || settlement.from.username}</span>
                  <span className="mx-2">→</span>
                  <UserAvatar user={settlement.to} size="xs" className="mr-2" />
                  <span>{settlement.to.fullName || settlement.to.username}</span>
                </div>
                <div className="font-medium">
                  {formatCurrency(settlement.amount)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseSummary;
