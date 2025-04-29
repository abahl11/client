// client/src/components/ExpenseList.js
import React from 'react';
import UserAvatar from './UserAvatar';

const ExpenseList = ({ expenses, onSettleExpense, currentUserId }) => {
  if (!expenses || expenses.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <p className="text-gray-600">No expenses yet.</p>
      </div>
    );
  }
  
  // Group expenses by category
  const groupedExpenses = expenses.reduce((groups, expense) => {
    const category = expense.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(expense);
    return groups;
  }, {});
  
  // Category icons and colors
  const categoryConfig = {
    transportation: { icon: '🚗', color: 'bg-blue-100 text-blue-800' },
    accommodation: { icon: '🏨', color: 'bg-purple-100 text-purple-800' },
    food: { icon: '🍽️', color: 'bg-green-100 text-green-800' },
    activities: { icon: '🎭', color: 'bg-yellow-100 text-yellow-800' },
    other: { icon: '📦', color: 'bg-gray-100 text-gray-800' }
  };
  
  // Format currency
  const formatCurrency = (amount, currency) => {
    const symbols = {
      INR: '₹',
      USD: '$',
      EUR: '€',
      GBP: '£'
    };
    
    return `${symbols[currency] || ''}${parseFloat(amount).toFixed(2)}`;
  };
  
  // Check if current user has paid
  const hasUserPaid = (expense) => {
    if (expense.paidBy._id === currentUserId) return true;
    
    const participant = expense.participants.find(p => p.user._id === currentUserId);
    return participant && participant.paid;
  };
  
  return (
    <div className="space-y-6">
      {Object.entries(groupedExpenses).map(([category, categoryExpenses]) => (
        <div key={category} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className={`px-4 py-3 ${categoryConfig[category]?.color || 'bg-gray-100'} flex items-center`}>
            <span className="text-xl mr-2">{categoryConfig[category]?.icon || '📦'}</span>
            <h3 className="font-semibold capitalize">{category}</h3>
          </div>
          
          <div className="divide-y">
            {categoryExpenses.map(expense => (
              <div key={expense._id} className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold">{expense.description}</h4>
                    <div className="text-sm text-gray-600">
                      {new Date(expense.date).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg">
                      {formatCurrency(expense.amount, expense.currency)}
                    </div>
                    <div className="text-sm text-gray-600">
                      {expense.splitType === 'equal' ? 'Split equally' : 
                       expense.splitType === 'exact' ? 'Split by amount' : 'Split by percentage'}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center mt-3">
                  <div className="flex items-center">
                    <UserAvatar user={expense.paidBy} size="xs" className="mr-2" />
                    <span className="text-sm">
                      Paid by <span className="font-medium">{expense.paidBy.fullName || expense.paidBy.username}</span>
                    </span>
                  </div>
                  
                  <div className="ml-auto">
                    {expense.status === 'settled' ? (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        Settled
                      </span>
                    ) : hasUserPaid(expense) ? (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        Paid
                      </span>
                    ) : (
                      <button
                        onClick={() => onSettleExpense(expense._id)}
                        className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full hover:bg-blue-700"
                      >
                        Settle Up
                      </button>
                    )}
                  </div>
                </div>
                
                {expense.notes && (
                  <div className="mt-2 text-sm text-gray-600 italic">
                    {expense.notes}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
