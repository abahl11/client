import React from 'react';
import { getRelativeTime } from '../utils/formatDate';
import UserAvatar from './UserAvatar';

const MessageList = ({ messages, currentUser }) => {
  if (!messages || messages.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500">
        No messages yet. Start a conversation!
      </div>
    );
  }
  
  // Group messages by date
  const groupedMessages = messages.reduce((groups, message) => {
    const date = new Date(message.createdAt).toLocaleDateString();
    
    if (!groups[date]) {
      groups[date] = [];
    }
    
    groups[date].push(message);
    return groups;
  }, {});
  
  return (
    <div className="space-y-6">
      {Object.entries(groupedMessages).map(([date, dateMessages]) => (
        <div key={date}>
          <div className="flex justify-center mb-4">
            <span className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
              {date === new Date().toLocaleDateString() ? 'Today' : date}
            </span>
          </div>
          
          <div className="space-y-4">
            {dateMessages.map((message) => {
              const isCurrentUser = message.sender._id === currentUser._id;
              
              return (
                <div 
                  key={message._id} 
                  className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex max-w-xs md:max-w-md ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}>
                    <UserAvatar 
                      user={isCurrentUser ? currentUser : message.sender} 
                      size="sm" 
                      className={`${isCurrentUser ? 'ml-2' : 'mr-2'} self-end`} 
                    />
                    
                    <div>
                      <div 
                        className={`px-4 py-2 rounded-lg ${
                          isCurrentUser 
                            ? 'bg-blue-600 text-white rounded-tr-none' 
                            : 'bg-gray-200 text-gray-800 rounded-tl-none'
                        }`}
                      >
                        {message.content}
                      </div>
                      
                      <div 
                        className={`text-xs text-gray-500 mt-1 ${
                          isCurrentUser ? 'text-right' : 'text-left'
                        }`}
                      >
                        {getRelativeTime(message.createdAt)}
                        {isCurrentUser && (
                          <span className="ml-2">
                            {message.read ? (
                              <i className="fas fa-check-double"></i>
                            ) : (
                              <i className="fas fa-check"></i>
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
