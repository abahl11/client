/**
 * Format date to local date string
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date
 */
export const formatDate = (date) => {
    if (!date) return '';
    
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  /**
   * Format date to short date string (MM/DD/YYYY)
   * @param {Date|string} date - Date to format
   * @returns {string} Formatted date
   */
  export const formatShortDate = (date) => {
    if (!date) return '';
    
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };
  
  /**
   * Format date to ISO string for input fields
   * @param {Date|string} date - Date to format
   * @returns {string} Formatted date
   */
  export const formatDateForInput = (date) => {
    if (!date) return '';
    
    const dateObj = new Date(date);
    return dateObj.toISOString().split('T')[0];
  };
  
  /**
   * Get relative time (e.g., "2 days ago")
   * @param {Date|string} date - Date to format
   * @returns {string} Relative time
   */
  export const getRelativeTime = (date) => {
    if (!date) return '';
    
    const dateObj = new Date(date);
    const now = new Date();
    const diffTime = Math.abs(now - dateObj);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      
      if (diffHours === 0) {
        const diffMinutes = Math.floor(diffTime / (1000 * 60));
        return diffMinutes === 0 ? 'Just now' : `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
      }
      
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    }
    
    if (diffDays < 7) {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    }
    
    if (diffDays < 30) {
      const diffWeeks = Math.floor(diffDays / 7);
      return `${diffWeeks} week${diffWeeks !== 1 ? 's' : ''} ago`;
    }
    
    const diffMonths = Math.floor(diffDays / 30);
    return `${diffMonths} month${diffMonths !== 1 ? 's' : ''} ago`;
  };
  