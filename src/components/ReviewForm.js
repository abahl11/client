// // client/src/components/ReviewForm.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useAuth } from '../contexts/AuthContext';

// const ReviewForm = ({ journey, reviewedUser, onReviewSubmitted }) => {
//   const [rating, setRating] = useState(5);
//   const [comment, setComment] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const { user } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!comment.trim()) {
//       setError('Please enter a comment');
//       return;
//     }
    
//     try {
//       setLoading(true);
//       setError('');
      
//       const response = await axios.post('/api/reviews', {
//         reviewedUser: reviewedUser._id,
//         journey: journey._id,
//         rating,
//         comment
//       });
      
//       setLoading(false);
//       setRating(5);
//       setComment('');
      
//       if (onReviewSubmitted) {
//         onReviewSubmitted(response.data);
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to submit review');
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-md p-4 mb-6">
//       <h3 className="text-lg font-semibold mb-4">Leave a Review for {reviewedUser.fullName || reviewedUser.username}</h3>
      
//       {error && (
//         <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">
//           {error}
//         </div>
//       )}
      
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block text-gray-700 mb-2">Rating</label>
//           <div className="flex items-center">
//             {[1, 2, 3, 4, 5].map((star) => (
//               <button
//                 key={star}
//                 type="button"
//                 onClick={() => setRating(star)}
//                 className="text-2xl focus:outline-none"
//               >
//                 {star <= rating ? '★' : '☆'}
//               </button>
//             ))}
//             <span className="ml-2 text-gray-600">{rating}/5</span>
//           </div>
//         </div>
        
//         <div className="mb-4">
//           <label htmlFor="comment" className="block text-gray-700 mb-2">Comment</label>
//           <textarea
//             id="comment"
//             value={comment}
//             onChange={(e) => setComment(e.target.value)}
//             rows="4"
//             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Share your experience traveling with this person..."
//             required
//           ></textarea>
//         </div>
        
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300 disabled:bg-blue-400"
//           disabled={loading}
//         >
//           {loading ? 'Submitting...' : 'Submit Review'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ReviewForm;



// client/src/components/ReviewForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const ReviewForm = ({ journey, reviewedUser, onReviewSubmitted }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!comment.trim()) {
      setError('Please enter a comment');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      const response = await axios.post('/api/reviews', {
        reviewedUser: reviewedUser._id,
        journey: journey._id,
        rating,
        comment
      });
      
      setLoading(false);
      setRating(5);
      setComment('');
      
      if (onReviewSubmitted) {
        onReviewSubmitted(response.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit review');
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h3 className="text-lg font-semibold mb-4">Leave a Review for {reviewedUser.fullName || reviewedUser.username}</h3>
      
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Rating</label>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="text-2xl focus:outline-none"
              >
                {star <= rating ? '★' : '☆'}
              </button>
            ))}
            <span className="ml-2 text-gray-600">{rating}/5</span>
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="comment" className="block text-gray-700 mb-2">Comment</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows="4"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Share your experience traveling with this person..."
            required
          ></textarea>
        </div>
        
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300 disabled:bg-blue-400"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
