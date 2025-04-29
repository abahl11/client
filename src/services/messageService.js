// import axios from 'axios';

// const API_URL = '/api/messages';

// // Send a message
// const sendMessage = async (messageData) => {
//   const response = await axios.post(API_URL, messageData);
//   return response.data;
// };

// // Get messages between users
// const getMessagesByUser = async (userId) => {
//   const response = await axios.get(`${API_URL}/${userId}`);
//   return response.data;
// };

// // Mark message as read
// const markMessageAsRead = async (messageId) => {
//   const response = await axios.put(`${API_URL}/${messageId}/read`);
//   return response.data;
// };

// const messageService = {
//   sendMessage,
//   getMessagesByUser,
//   markMessageAsRead
// };

// export default messageService;



// client/src/services/messageService.js
import axios from 'axios';

const API_URL = '/api/messages';

// Send a message
const sendMessage = async (messageData) => {
  try {
    const response = await axios.post(API_URL, messageData);
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

// Get messages between users
const getMessagesByUser = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting messages:', error);
    throw error;
  }
};

// Mark message as read
const markMessageAsRead = async (messageId) => {
  try {
    const response = await axios.put(`${API_URL}/${messageId}/read`);
    return response.data;
  } catch (error) {
    console.error('Error marking message as read:', error);
    throw error;
  }
};

const messageService = {
  sendMessage,
  getMessagesByUser,
  markMessageAsRead
};

export default messageService;
