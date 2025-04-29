// // client/src/pages/JourneyDetailsPage.js
// import React, { useState, useEffect } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { useAuth } from '../contexts/AuthContext';
// import JourneyMap from '../components/JourneyMap';
// import messageService from '../services/messageService';
// import ReviewForm from '../components/ReviewForm';
// import ReviewList from '../components/ReviewList';
// import UserAvatar from '../components/UserAvatar';
// import ExpenseForm from '../components/ExpenseForm';
// import ExpenseList from '../components/ExpenseList';
// import ExpenseSummary from '../components/ExpenseSummary';

// const JourneyDetailsPage = () => {
//   const { id } = useParams();
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const [journey, setJourney] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [message, setMessage] = useState('');
//   const [sendingMessage, setSendingMessage] = useState(false);
//   const [joiningJourney, setJoiningJourney] = useState(false);
//   const [joinSuccess, setJoinSuccess] = useState(false);
//   const [joinError, setJoinError] = useState(null);
//   const [successMessage, setSuccessMessage] = useState("");
//   const [journeyReviews, setJourneyReviews] = useState([]);
// const [showReviewForm, setShowReviewForm] = useState(false);
// const [selectedUser, setSelectedUser] = useState(null);
// const [completingJourney, setCompletingJourney] = useState(false);
// const [showExpenseForm, setShowExpenseForm] = useState(false);
// const [expenses, setExpenses] = useState([]);
// const [expenseSummary, setExpenseSummary] = useState(null);
// const [loadingExpenses, setLoadingExpenses] = useState(true);

// useEffect(() => {
//     const fetchJourneyReviews = async () => {
//       if (journey?._id) {
//         try {
//           const response = await axios.get(`/api/reviews/journey/${journey._id}`);
//           setJourneyReviews(response.data);
//         } catch (err) {
//           console.error('Error fetching journey reviews:', err);
//         }
//       }
//     };
    
//     fetchJourneyReviews();
//   }, [journey]);
  
//   const handleCompleteJourney = async () => {
//     try {
//       setCompletingJourney(true);
//       await axios.put(`/api/journeys/${journey._id}/complete`);
//       // Refresh journey data
//       const { data } = await axios.get(`/api/journeys/${journey._id}`);
//       setJourney(data);
//       setCompletingJourney(false);
//     } catch (err) {
//       console.error('Error completing journey:', err);
//       setCompletingJourney(false);
//     }
//   };
  
//   const handleReviewUser = (user) => {
//     setSelectedUser(user);
//     setShowReviewForm(true);
//   };
  
//   const handleReviewSubmitted = (newReview) => {
//     setJourneyReviews([...journeyReviews, newReview]);
//     setShowReviewForm(false);
//     setSelectedUser(null);
//   };


//   useEffect(() => {
//     const fetchJourney = async () => {
//       try {
//         const { data } = await axios.get(`/api/journeys/${id}`);
//         setJourney(data);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to load journey details');
//         setLoading(false);
//       }
//     };
    
//     fetchJourney();
//   }, [id]);
  
//   const handleJoinJourney = async () => {
//     try {
//       setJoiningJourney(true);
//       setJoinError(null);
      
//       await axios.post(`/api/journeys/${id}/join`);
      
//       // Refetch journey to update UI
//       const { data } = await axios.get(`/api/journeys/${id}`);
//       setJourney(data);
      
//       setJoinSuccess(true);
//       setJoiningJourney(false);
      
//       // Reset success message after 3 seconds
//       setTimeout(() => {
//         setJoinSuccess(false);
//       }, 3000);
//     } catch (err) {
//       setJoinError(err.response?.data?.message || 'Failed to join journey');
//       setJoiningJourney(false);
//     }
//   };


  
  
// //   const handleSendMessage = async (e) => {
// //     e.preventDefault();
    
// //     if (!message.trim()) return;
    
// //     try {
// //       setSendingMessage(true);
      
// //       await axios.post('/api/messages', {
// //         recipient: journey.creator._id,
// //         content: message,
// //         journey: journey._id
// //       });
      
// //       setMessage('');
// //       setSendingMessage(false);
// //     } catch (err) {
// //       console.error('Failed to send message', err);
// //       setSendingMessage(false);
// //     }
// //   };

// // In JourneyDetailsPage.js
// // Update the handleSendMessage function:

// const handleSendMessage = async (e) => {
//     e.preventDefault();
    
//     if (!message.trim()) return;
    
//     try {
//       setSendingMessage(true);
      
//       await messageService.sendMessage({
//         recipient: journey.creator._id,
//         content: message,
//         journey: journey._id
//       });
      
//       setMessage('');
//       setSendingMessage(false);
      
//       // Show success notification
//       setSuccessMessage('Message sent successfully!');
//       setTimeout(() => setSuccessMessage(''), 3000);
//     } catch (err) {
//       console.error('Failed to send message:', err);
//       setError('Failed to send message. Please try again.');
//       setSendingMessage(false);
//     }
//   };

  
//   const handleDeleteJourney = async () => {
//     if (!window.confirm('Are you sure you want to delete this journey?')) {
//       return;
//     }
    
//     try {
//       await axios.delete(`/api/journeys/${id}`);
//       navigate('/dashboard');
//     } catch (err) {
//       setError('Failed to delete journey');
//     }
//   };
  
//   const handleRespondToRequest = async (userId, status) => {
//     try {
//       await axios.put(`/api/journeys/${id}/companions/${userId}`, { status });
      
//       // Refetch journey to update UI
//       const { data } = await axios.get(`/api/journeys/${id}`);
//       setJourney(data);
//     } catch (err) {
//       console.error('Failed to respond to request', err);
//     }
//   };
  
//   if (loading) {
//     return (
//       <div className="container mx-auto px-6 py-8">
//         <div className="text-center">
//           <p>Loading journey details...</p>
//         </div>
//       </div>
//     );
//   }
  
//   if (error) {
//     return (
//       <div className="container mx-auto px-6 py-8">
//         <div className="bg-red-100 text-red-700 p-4 rounded-md">
//           {error}
//         </div>
//         <div className="mt-4">
//           <Link to="/journeys" className="text-blue-600 hover:underline">
//             Back to Journeys
//           </Link>
//         </div>
//       </div>
//     );
//   }
  
//   const isCreator = user && journey.creator._id === user._id;
//   const isCompanion = user && journey.companions.some(
//     companion => companion.user._id === user._id
//   );
//   const companionStatus = user && journey.companions.find(
//     companion => companion.user._id === user._id
//   )?.status;
  
//   return (
//     <div className="container mx-auto px-6 py-8">
//       <div className="mb-6">
//         <Link to="/journeys" className="text-blue-600 hover:underline">
//           &larr; Back to Journeys
//         </Link>
//       </div>
      
//       <div className="bg-white rounded-lg shadow-md overflow-hidden">
//         <div className="h-48 bg-blue-600 flex items-center justify-center text-white">
//           <div className="text-center">
//             <h1 className="text-3xl font-bold mb-2">{journey.origin} to {journey.destination}</h1>
//             <p className="text-xl">
//               {new Date(journey.departureDate).toLocaleDateString()}
//               {journey.returnDate && ` - ${new Date(journey.returnDate).toLocaleDateString()}`}
//             </p>
//           </div>
//         </div>
        
//         <div className="p-6">
//           <div className="flex justify-between items-center mb-6">
//             <div className="flex items-center">
//               <img 
//                 src={journey.creator.profilePicture || 'https://via.placeholder.com/50'} 
//                 alt={journey.creator.username} 
//                 className="w-12 h-12 rounded-full mr-4"
//               />
//               <div>
//                 <p className="font-medium">Created by {journey.creator.fullName}</p>
//                 <p className="text-sm text-gray-600">{journey.creator.university}</p>
//               </div>
//             </div>
            
//             <span className={`px-3 py-1 rounded-full ${
//               journey.status === 'open' ? 'bg-green-100 text-green-800' :
//               journey.status === 'full' ? 'bg-blue-100 text-blue-800' :
//               journey.status === 'completed' ? 'bg-gray-100 text-gray-800' :
//               'bg-red-100 text-red-800'
//             }`}>
//               {journey.status.charAt(0).toUpperCase() + journey.status.slice(1)}
//             </span>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
//             <div>
//               <h2 className="text-xl font-semibold mb-4">Journey Details</h2>
              
//               <div className="space-y-3">
//                 <div className="flex">
//                   <span className="font-medium w-32">Origin:</span>
//                   <span>{journey.origin}</span>
//                 </div>
                
//                 <div className="flex">
//                   <span className="font-medium w-32">Destination:</span>
//                   <span>{journey.destination}</span>
//                 </div>
                
//                 <div className="flex">
//                   <span className="font-medium w-32">Departure:</span>
//                   <span>{new Date(journey.departureDate).toLocaleDateString()}</span>
//                 </div>
                
//                 {journey.returnDate && (
//                   <div className="flex">
//                     <span className="font-medium w-32">Return:</span>
//                     <span>{new Date(journey.returnDate).toLocaleDateString()}</span>
//                   </div>
//                 )}
                
//                 <div className="flex">
//                   <span className="font-medium w-32">Transport:</span>
//                   <span>{journey.transportMode.charAt(0).toUpperCase() + journey.transportMode.slice(1)}</span>
//                 </div>
                
//                 {journey.estimatedCost && (
//                   <div className="flex">
//                     <span className="font-medium w-32">Est. Cost:</span>
//                     <span>₹{journey.estimatedCost}</span>
//                   </div>
//                 )}
                
//                 <div className="flex">
//                   <span className="font-medium w-32">Max Companions:</span>
//                   <span>{journey.maxCompanions}</span>
//                 </div>
//               </div>
              
//               {journey.description && (
//                 <div className="mt-4">
//                   <h3 className="font-medium mb-2">Description:</h3>
//                   <p className="text-gray-700">{journey.description}</p>
//                 </div>
//               )}
//               {isCreator && journey.status === 'open' && new Date(journey.departureDate) < new Date() && (
//       <button
//         onClick={handleCompleteJourney}
//         className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300 disabled:bg-green-400 mt-4"
//         disabled={completingJourney}
//       >
//         {completingJourney ? 'Marking as Completed...' : 'Mark Journey as Completed'}
//       </button>
//     )}

//     {journey.status === 'completed' && (
//       <div className="mt-8">
//         <h2 className="text-xl font-semibold mb-4">Journey Reviews</h2>
        
//         {/* Show review form if user is part of the journey */}
//         {user && (isCreator || isCompanion) && !showReviewForm && (
//           <div className="mb-4">
//             <button
//               onClick={() => setShowReviewForm(true)}
//               className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
//             >
//               Write a Review
//             </button>
//           </div>
//         )}
        
//         {showReviewForm && selectedUser && (
//           <ReviewForm 
//             journey={journey} 
//             reviewedUser={selectedUser} 
//             onReviewSubmitted={handleReviewSubmitted}
//           />
//         )}
        
//         {!showReviewForm && user && (isCreator || isCompanion) && (
//           <div className="bg-white rounded-lg shadow-md p-4 mb-6">
//             <h3 className="text-lg font-semibold mb-4">Who would you like to review?</h3>
//             <div className="space-y-3">
//               {isCreator && journey.companions.map(companion => (
//                 companion.status === 'accepted' && (
//                   <div key={companion.user._id} className="flex items-center justify-between">
//                     <div className="flex items-center">
//                       <UserAvatar user={companion.user} size="sm" className="mr-3" />
//                       <span>{companion.user.fullName || companion.user.username}</span>
//                     </div>
//                     <button
//                       onClick={() => handleReviewUser(companion.user)}
//                       className="text-blue-600 hover:text-blue-800"
//                     >
//                       Review
//                     </button>
//                   </div>
//                 )
//               ))}
              
//               {isCompanion && (
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center">
//                     <UserAvatar user={journey.creator} size="sm" className="mr-3" />
//                     <span>{journey.creator.fullName || journey.creator.username}</span>
//                   </div>
//                   <button
//                     onClick={() => handleReviewUser(journey.creator)}
//                     className="text-blue-600 hover:text-blue-800"
//                   >
//                     Review
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
        
//         <ReviewList reviews={journeyReviews} title="Journey Reviews" />
//       </div>
//     )}
    
//             </div>
//             {/* {journey.originCoords && journey.destinationCoords && (
//                 <div className="mt-8">
//                   <h2 className="text-xl font-semibold mb-4">Journey Map</h2>
//                   <JourneyMap 
//                     originCoords={journey.originCoords} 
//                     destinationCoords={journey.destinationCoords} 
//                   />
//                 </div>
//               )} */}





// {journey.originCoords && journey.destinationCoords && (
//   <div className="mt-8">
//     <h2 className="text-xl font-semibold mb-4">Journey Map</h2>
//     <JourneyMap journey={journey} />
//   </div>
// )}


//             <div>
//               <h2 className="text-xl font-semibold mb-4">Travel Companions</h2>
              
//               <div className="space-y-4">
//                 <div className="flex items-center p-3 bg-blue-50 rounded-md">
//                   <img 
//                     src={journey.creator.profilePicture || 'https://via.placeholder.com/40'} 
//                     alt={journey.creator.username} 
//                     className="w-10 h-10 rounded-full mr-3"
//                   />
//                   <div>
//                     <p className="font-medium">{journey.creator.fullName}</p>
//                     <p className="text-sm text-gray-600">{journey.creator.university}</p>
//                   </div>
//                   <span className="ml-auto px-2 py-1 bg-blue-200 text-blue-800 text-xs rounded-full">
//                     Creator
//                   </span>
//                 </div>
                
//                 {journey.companions.length > 0 ? (
//                   journey.companions.map(companion => (
//                     <div key={companion.user._id} className="flex items-center p-3 bg-gray-50 rounded-md">
//                       <img 
//                         src={companion.user.profilePicture || 'https://via.placeholder.com/40'} 
//                         alt={companion.user.username} 
//                         className="w-10 h-10 rounded-full mr-3"
//                       />
//                       <div>
//                         <p className="font-medium">{companion.user.fullName}</p>
//                         <p className="text-sm text-gray-600">{companion.user.university}</p>
//                       </div>
//                       <span className={`ml-auto px-2 py-1 text-xs rounded-full ${
//                         companion.status === 'accepted' ? 'bg-green-100 text-green-800' :
//                         companion.status === 'rejected' ? 'bg-red-100 text-red-800' :
//                         'bg-yellow-100 text-yellow-800'
//                       }`}>
//                         {companion.status.charAt(0).toUpperCase() + companion.status.slice(1)}
//                       </span>
                      
//                       {isCreator && companion.status === 'pending' && (
//                         <div className="ml-2 flex space-x-1">
//                           <button 
//                             onClick={() => handleRespondToRequest(companion.user._id, 'accepted')}
//                             className="p-1 bg-green-500 text-white rounded-md hover:bg-green-600"
//                             title="Accept"
//                           >
//                             <i className="fas fa-check text-xs"></i>
//                           </button>
//                           <button 
//                             onClick={() => handleRespondToRequest(companion.user._id, 'rejected')}
//                             className="p-1 bg-red-500 text-white rounded-md hover:bg-red-600"
//                             title="Reject"
//                           >
//                             <i className="fas fa-times text-xs"></i>
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   ))
//                 ) : (
//                   <p className="text-gray-600">No companions yet</p>
//                 )}
//               </div>
//             </div>
//           </div>
          
//           {user && !isCreator && !isCompanion && journey.status === 'open' && (
//             <div className="mb-8">
//               {joinSuccess ? (
//                 <div className="bg-green-100 text-green-700 p-4 rounded-md">
//                   Request sent successfully! The journey creator will review your request.
//                 </div>
//               ) : (
//                 <div>
//                   {joinError && (
//                     <div className="bg-red-100 text-red-700 p-4 rounded-md mb-4">
//                       {joinError}
//                     </div>
//                   )}
                  
//                   <button
//                     onClick={handleJoinJourney}
//                     className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300 disabled:bg-blue-400 w-full"
//                     disabled={joiningJourney}
//                   >
//                     {joiningJourney ? 'Sending Request...' : 'Request to Join Journey'}
//                   </button>
//                 </div>
//               )}
//             </div>
//           )}
          
//           {user && isCompanion && companionStatus === 'pending' && (
//             <div className="mb-8 bg-yellow-50 p-4 rounded-md">
//               <p className="text-yellow-700">
//                 Your request to join this journey is pending approval from the creator.
//               </p>
//             </div>
//           )}
          
//           {user && isCompanion && companionStatus === 'accepted' && (
//             <div className="mb-8 bg-green-50 p-4 rounded-md">
//               <p className="text-green-700">
//                 You are confirmed as a companion for this journey!
//               </p>
//             </div>
//           )}
          
//           {user && isCompanion && companionStatus === 'rejected' && (
//             <div className="mb-8 bg-red-50 p-4 rounded-md">
//               <p className="text-red-700">
//                 Your request to join this journey was declined.
//               </p>
//             </div>
//           )}
          
//           {/* {user && !isCreator && (
//             <div className="mb-8">
//               <h2 className="text-xl font-semibold mb-4">Contact Journey Creator</h2>
              
//               <form onSubmit={handleSendMessage}>
//                 <div className="mb-4">
//                   <textarea
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                     placeholder="Type your message here..."
//                     rows="4"
//                     className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     required
//                   ></textarea>
//                 </div>
                
//                 <button
//                   type="submit"
//                   className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300 disabled:bg-blue-400"
//                   disabled={sendingMessage}
//                 >
//                   {sendingMessage ? 'Sending...' : 'Send Message'}
//                 </button>
//               </form>
//             </div>
//           )} */}



// {user && !isCreator && (
//   <div className="mb-8">
//     <h2 className="text-xl font-semibold mb-4">Contact Journey Creator</h2>
    
//     <form onSubmit={handleSendMessage}>
//       <div className="mb-4">
//         <textarea
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Type your message here..."
//           rows="4"
//           className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           required
//         ></textarea>
//       </div>
      
//       <button
//         type="submit"
//         className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300 disabled:bg-blue-400"
//         disabled={sendingMessage}
//       >
//         {sendingMessage ? 'Sending...' : 'Send Message'}
//       </button>
//     </form>
//   </div>
// )}

          
//           {isCreator && (
//             <div className="border-t pt-6 mt-6 flex justify-between">
//               <Link 
//                 to={`/journeys/${id}/edit`}
//                 className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300"
//               >
//                 Edit Journey
//               </Link>
              
//               <button
//                 onClick={handleDeleteJourney}
//                 className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition duration-300"
//               >
//                 Delete Journey
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
      
//     </div>

    
//   );
// };

// export default JourneyDetailsPage;




import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import UserAvatar from '../components/UserAvatar';
import JourneyMap from '../components/JourneyMap';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import ExpenseSummary from '../components/ExpenseSummary';

const JourneyDetailsPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [journey, setJourney] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [joining, setJoining] = useState(false);
  const [responding, setResponding] = useState(false);
  const [message, setMessage] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);
  const [messageError, setMessageError] = useState('');
  const [messageSuccess, setMessageSuccess] = useState('');
  const [completingJourney, setCompletingJourney] = useState(false);
  
  // Review state
  const [journeyReviews, setJourneyReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  
  // Expense state
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [expenseSummary, setExpenseSummary] = useState(null);
  const [loadingExpenses, setLoadingExpenses] = useState(true);

  useEffect(() => {
    const fetchJourney = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/journeys/${id}`);
        setJourney(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching journey:', err);
        setError('Failed to load journey details');
        setLoading(false);
      }
    };

    fetchJourney();
  }, [id]);
  
  useEffect(() => {
    const fetchJourneyReviews = async () => {
      if (journey?._id) {
        try {
          const response = await axios.get(`/api/reviews/journey/${journey._id}`);
          setJourneyReviews(response.data);
        } catch (err) {
          console.error('Error fetching journey reviews:', err);
        }
      }
    };
    
    fetchJourneyReviews();
  }, [journey]);
  
  useEffect(() => {
    const fetchExpenses = async () => {
      if (journey?._id) {
        try {
          setLoadingExpenses(true);
          const [expensesRes, summaryRes] = await Promise.all([
            axios.get(`/api/expenses/journey/${journey._id}`),
            axios.get(`/api/expenses/journey/${journey._id}/summary`)
          ]);
          
          setExpenses(expensesRes.data);
          setExpenseSummary(summaryRes.data);
          setLoadingExpenses(false);
        } catch (err) {
          console.error('Error fetching expenses:', err);
          setLoadingExpenses(false);
        }
      }
    };
    
    fetchExpenses();
  }, [journey]);

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading journey details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="bg-red-100 text-red-700 p-4 rounded-md">
          <p>{error}</p>
          <Link to="/journeys" className="text-blue-600 hover:underline mt-2 inline-block">
            &larr; Back to Journeys
          </Link>
        </div>
      </div>
    );
  }

  if (!journey) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="bg-yellow-100 text-yellow-700 p-4 rounded-md">
          <p>Journey not found</p>
          <Link to="/journeys" className="text-blue-600 hover:underline mt-2 inline-block">
            &larr; Back to Journeys
          </Link>
        </div>
      </div>
    );
  }

  const { 
    origin, 
    destination, 
    departureDate, 
    returnDate, 
    transportMode, 
    estimatedCost, 
    maxCompanions, 
    description, 
    status, 
    creator, 
    companions 
  } = journey;

  const isCreator = user && creator._id === user._id;
  const isCompanion = user && companions.some(c => c.user._id === user._id);
  const isPending = user && companions.some(c => c.user._id === user._id && c.status === 'pending');
  const isAccepted = user && companions.some(c => c.user._id === user._id && c.status === 'accepted');
  const isRejected = user && companions.some(c => c.user._id === user._id && c.status === 'rejected');
  const canJoin = user && !isCreator && !isCompanion && status === 'open';
  const formattedDepartureDate = new Date(departureDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const formattedReturnDate = returnDate ? new Date(returnDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : null;

  const handleJoinJourney = async () => {
    try {
      setJoining(true);
      await axios.post(`/api/journeys/${id}/join`);
      const { data } = await axios.get(`/api/journeys/${id}`);
      setJourney(data);
      setJoining(false);
    } catch (err) {
      console.error('Failed to join journey:', err);
      setError(err.response?.data?.message || 'Failed to join journey');
      setJoining(false);
    }
  };

  const handleRespondToRequest = async (userId, status) => {
    try {
      setResponding(true);
      await axios.put(`/api/journeys/${id}/companions/${userId}`, { status });
      const { data } = await axios.get(`/api/journeys/${id}`);
      setJourney(data);
      setResponding(false);
    } catch (err) {
      console.error('Failed to respond to request:', err);
      setError(err.response?.data?.message || 'Failed to respond to request');
      setResponding(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!message.trim()) {
      setMessageError('Please enter a message');
      return;
    }
    
    try {
      setSendingMessage(true);
      setMessageError('');
      
      // Make sure journey.creator._id is available
      if (!journey || !journey.creator || !journey.creator._id) {
        throw new Error('Journey creator information is missing');
      }
      
      await axios.post('/api/messages', {
        recipient: journey.creator._id,
        content: message,
        journey: journey._id
      });
      
      setMessage('');
      setMessageSuccess('Message sent successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setMessageSuccess('');
      }, 3000);
    } catch (err) {
      console.error('Failed to send message:', err);
      setMessageError(err.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setSendingMessage(false);
    }
  };
  
  const handleCompleteJourney = async () => {
    try {
      setCompletingJourney(true);
      await axios.put(`/api/journeys/${journey._id}/complete`);
      // Refresh journey data
      const { data } = await axios.get(`/api/journeys/${journey._id}`);
      setJourney(data);
      setCompletingJourney(false);
    } catch (err) {
      console.error('Error completing journey:', err);
      setCompletingJourney(false);
    }
  };
  
  const handleReviewUser = (user) => {
    setSelectedUser(user);
    setShowReviewForm(true);
  };
  
  const handleReviewSubmitted = (newReview) => {
    setJourneyReviews([...journeyReviews, newReview]);
    setShowReviewForm(false);
    setSelectedUser(null);
  };
  
  const handleAddExpense = (newExpense) => {
    setExpenses([newExpense, ...expenses]);
    setShowExpenseForm(false);
    
    // Refresh summary
    axios.get(`/api/expenses/journey/${journey._id}/summary`)
      .then(res => setExpenseSummary(res.data))
      .catch(err => console.error('Error refreshing summary:', err));
  };
  
  const handleSettleExpense = async (expenseId) => {
    try {
      const response = await axios.put(`/api/expenses/${expenseId}/settle`);
      
      // Update the expense in the list
      setExpenses(expenses.map(exp => 
        exp._id === expenseId ? response.data : exp
      ));
      
      // Refresh summary
      const summaryRes = await axios.get(`/api/expenses/journey/${journey._id}/summary`);
      setExpenseSummary(summaryRes.data);
    } catch (err) {
      console.error('Error settling expense:', err);
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-6">
        <Link to="/journeys" className="text-blue-600 hover:underline">
          &larr; Back to Journeys
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="relative">
          <div className="h-48 bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
            <h1 className="text-3xl font-bold text-white">{origin} to {destination}</h1>
          </div>
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              status === 'open' ? 'bg-green-100 text-green-800' :
              status === 'full' ? 'bg-yellow-100 text-yellow-800' :
              status === 'completed' ? 'bg-blue-100 text-blue-800' :
              'bg-red-100 text-red-800'
            }`}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-center mb-6">
            <UserAvatar user={creator} size="lg" className="mr-4" />
            <div>
              <h2 className="text-xl font-semibold">{creator.fullName || creator.username}</h2>
              <p className="text-gray-600">Journey Creator</p>
              {creator.university && (
                <p className="text-gray-600">{creator.university}</p>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Journey Details</h2>
              
              <div className="space-y-3">
                <div>
                  <span className="font-medium">Origin:</span> {origin}
                </div>
                <div>
                  <span className="font-medium">Destination:</span> {destination}
                </div>
                <div>
                  <span className="font-medium">Departure Date:</span> {formattedDepartureDate}
                </div>
                {returnDate && (
                  <div>
                    <span className="font-medium">Return Date:</span> {formattedReturnDate}
                  </div>
                )}
                <div>
                  <span className="font-medium">Transport Mode:</span> {transportMode.charAt(0).toUpperCase() + transportMode.slice(1)}
                </div>
                {estimatedCost && (
                  <div>
                    <span className="font-medium">Estimated Cost:</span> ₹{estimatedCost}
                  </div>
                )}
                <div>
                  <span className="font-medium">Companions:</span> {companions.filter(c => c.status === 'accepted').length}/{maxCompanions}
                </div>
              </div>
              
              {description && (
                <div className="mt-4">
                  <h3 className="font-medium mb-2">Description:</h3>
                  <p className="text-gray-700">{description}</p>
                </div>
              )}
              
              {isCreator && journey.status === 'open' && new Date(journey.departureDate) < new Date() && (
                <button
                  onClick={handleCompleteJourney}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300 disabled:bg-green-400 mt-4"
                  disabled={completingJourney}
                >
                  {completingJourney ? 'Marking as Completed...' : 'Mark Journey as Completed'}
                </button>
              )}
              
              {journey.originCoords && journey.destinationCoords && (
                <div className="mt-8">
                  <h2 className="text-xl font-semibold mb-4">Journey Map</h2>
                  <JourneyMap journey={journey} />
                </div>
              )}
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Travel Companions</h2>
              
              {companions.length === 0 ? (
                <p className="text-gray-600">No companions yet. Be the first to join!</p>
              ) : (
                <div className="space-y-4">
                  {companions.map((companion) => (
                    <div key={companion.user._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <div className="flex items-center">
                        <UserAvatar user={companion.user} size="md" className="mr-3" />
                        <div>
                          <h3 className="font-medium">{companion.user.fullName || companion.user.username}</h3>
                          {companion.user.university && (
                            <p className="text-sm text-gray-600">{companion.user.university}</p>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        {isCreator && companion.status === 'pending' ? (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleRespondToRequest(companion.user._id, 'accepted')}
                              className="bg-green-600 text-white px-3 py-1 rounded-md text-sm hover:bg-green-700 transition duration-300 disabled:bg-green-400"
                              disabled={responding}
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => handleRespondToRequest(companion.user._id, 'rejected')}
                              className="bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700 transition duration-300 disabled:bg-red-400"
                              disabled={responding}
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            companion.status === 'accepted' ? 'bg-green-100 text-green-800' :
                            companion.status === 'rejected' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {companion.status.charAt(0).toUpperCase() + companion.status.slice(1)}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {canJoin && (
                <button
                  onClick={handleJoinJourney}
                  className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-md w-full hover:bg-blue-700 transition duration-300 disabled:bg-blue-400"
                  disabled={joining}
                >
                  {joining ? 'Joining...' : 'Join Journey'}
                </button>
              )}
              
              {isPending && (
                <div className="mt-6 bg-yellow-100 text-yellow-800 p-4 rounded-md">
                  Your request to join this journey is pending approval.
                </div>
              )}
              
              {isRejected && (
                <div className="mt-6 bg-red-100 text-red-800 p-4 rounded-md">
                  Your request to join this journey was declined.
                </div>
              )}
              
              {user && !isCreator && (
                <div className="mt-8">
                  <h2 className="text-xl font-semibold mb-4">Contact Journey Creator</h2>
                  
                  {messageSuccess && (
                    <div className="bg-green-100 text-green-700 p-3 rounded-md mb-4">
                      {messageSuccess}
                    </div>
                  )}
                  
                  {messageError && (
                    <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">
                      {messageError}
                    </div>
                  )}
                  
                  <form onSubmit={handleSendMessage}>
                    <div className="mb-4">
                      <textarea
                        value={message}
                        onChange={(e) => {
                          setMessage(e.target.value);
                          setMessageError(''); // Clear error when user types
                        }}
                        placeholder="Type your message here..."
                        rows="4"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      ></textarea>
                    </div>
                    
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300 disabled:bg-blue-400"
                      disabled={sendingMessage}
                    >
                      {sendingMessage ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
          
          {/* Expense Splitting Section */}
          {(isCreator || isAccepted) && (
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Expenses</h2>
                <button
                  onClick={() => setShowExpenseForm(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                >
                  Add Expense
                </button>
              </div>
              
              {showExpenseForm && (
                <div className="mb-6">
                  <ExpenseForm 
                    journey={journey}
                    onExpenseAdded={handleAddExpense}
                    onCancel={() => setShowExpenseForm(false)}
                  />
                </div>
              )}
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  {loadingExpenses ? (
                    <div className="bg-white rounded-lg shadow-md p-4">
                      <p>Loading expenses...</p>
                    </div>
                  ) : expenses.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-md p-4">
                      <p>No expenses have been added yet.</p>
                    </div>
                  ) : (
                    <ExpenseList 
                      expenses={expenses} 
                      onSettleExpense={handleSettleExpense}
                      currentUserId={user?._id}
                    />
                  )}
                </div>
                
                <div>
                  {!loadingExpenses && expenseSummary && (
                    <ExpenseSummary 
                      summary={expenseSummary}
                      currentUserId={user?._id}
                    />
                  )}
                </div>
              </div>
            </div>
          )}
          
          {/* Reviews Section */}
          {journey.status === 'completed' && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Journey Reviews</h2>
              
              {/* Show review form if user is part of the journey */}
              {user && (isCreator || isCompanion) && !showReviewForm && (
                <div className="mb-4">
                  <button
                    onClick={() => setShowReviewForm(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                  >
                    Write a Review
                  </button>
                </div>
              )}
              
              {showReviewForm && selectedUser && (
                <ReviewForm 
                  journey={journey} 
                  reviewedUser={selectedUser} 
                  onReviewSubmitted={handleReviewSubmitted}
                />
              )}
              
              {!showReviewForm && user && (isCreator || isCompanion) && (
                <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                  <h3 className="text-lg font-semibold mb-4">Who would you like to review?</h3>
                  <div className="space-y-3">
                    {isCreator && companions.map(companion => (
                      companion.status === 'accepted' && (
                        <div key={companion.user._id} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <UserAvatar user={companion.user} size="sm" className="mr-3" />
                            <span>{companion.user.fullName || companion.user.username}</span>
                          </div>
                          <button
                            onClick={() => handleReviewUser(companion.user)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            Review
                          </button>
                        </div>
                      )
                    ))}
                    
                    {isCompanion && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <UserAvatar user={journey.creator} size="sm" className="mr-3" />
                          <span>{journey.creator.fullName || journey.creator.username}</span>
                        </div>
                        <button
                          onClick={() => handleReviewUser(journey.creator)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Review
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              <ReviewList reviews={journeyReviews} title="Journey Reviews" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JourneyDetailsPage;
