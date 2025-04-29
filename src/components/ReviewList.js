// client/src/components/ReviewList.js
import React from 'react';
import UserAvatar from './UserAvatar';

const ReviewList = ({ reviews, title = "Reviews" }) => {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">No reviews yet.</p>
      </div>
    );
  }

  // Calculate average rating
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="flex items-center">
          <span className="text-2xl text-yellow-500 mr-1">★</span>
          <span className="font-semibold">{averageRating.toFixed(1)}</span>
          <span className="text-gray-600 ml-1">({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})</span>
        </div>
      </div>
      
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review._id} className="border-b pb-4 last:border-b-0">
            <div className="flex items-start">
              <UserAvatar user={review.reviewer} size="sm" className="mr-3" />
              <div className="flex-1">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-semibold">{review.reviewer.fullName || review.reviewer.username}</h4>
                    <div className="flex items-center text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>{i < review.rating ? '★' : '☆'}</span>
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="mt-2 text-gray-700">{review.comment}</p>
                {review.journey && (
                  <div className="mt-2 text-sm text-gray-600">
                    Journey: {review.journey.origin} to {review.journey.destination}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
