// client/src/components/ExpenseForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const ExpenseForm = ({ journey, onExpenseAdded, onCancel }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    currency: 'INR',
    category: 'transportation',
    splitType: 'equal',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Generate participants from journey
  const getParticipants = () => {
    const participants = [];
    
    // Add creator
    participants.push({
      user: journey.creator._id,
      share: 0,
      paid: journey.creator._id === user._id
    });
    
    // Add accepted companions
    journey.companions.forEach(companion => {
      if (companion.status === 'accepted') {
        participants.push({
          user: companion.user._id,
          share: 0,
          paid: companion.user._id === user._id
        });
      }
    });
    
    return participants;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.description || !formData.amount) {
      setError('Description and amount are required');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      const participants = getParticipants();
      
      // Calculate shares based on split type
      if (formData.splitType === 'equal') {
        const share = parseFloat(formData.amount) / participants.length;
        participants.forEach(p => {
          p.share = share;
        });
      }
      
      const response = await axios.post('/api/expenses', {
        journey: journey._id,
        description: formData.description,
        amount: parseFloat(formData.amount),
        currency: formData.currency,
        category: formData.category,
        date: formData.date,
        splitType: formData.splitType,
        participants,
        notes: formData.notes
      });
      
      setLoading(false);
      
      if (onExpenseAdded) {
        onExpenseAdded(response.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add expense');
      setLoading(false);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Add New Expense</h2>
      
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="description" className="block text-gray-700 mb-1">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Cab fare to airport"
              required
            />
          </div>
          
          <div>
            <label htmlFor="amount" className="block text-gray-700 mb-1">Amount</label>
            <div className="flex">
              <select
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="INR">₹</option>
                <option value="USD">$</option>
                <option value="EUR">€</option>
                <option value="GBP">£</option>
              </select>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="flex-1 px-4 py-2 border border-l-0 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
                step="0.01"
                min="0"
                required
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="category" className="block text-gray-700 mb-1">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="transportation">Transportation</option>
              <option value="accommodation">Accommodation</option>
              <option value="food">Food & Drinks</option>
              <option value="activities">Activities</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="date" className="block text-gray-700 mb-1">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="splitType" className="block text-gray-700 mb-1">Split Type</label>
            <select
              id="splitType"
              name="splitType"
              value={formData.splitType}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="equal">Split Equally</option>
              <option value="exact">Exact Amounts</option>
              <option value="percentage">Percentage</option>
            </select>
          </div>
          
          <div className="md:col-span-2">
            <label htmlFor="notes" className="block text-gray-700 mb-1">Notes (Optional)</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="2"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Any additional details..."
            ></textarea>
          </div>
        </div>
        
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border rounded-md hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 disabled:bg-blue-400"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Expense'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
