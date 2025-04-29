/**
 * Email validation regex
 */
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} Is valid email
 */
export const isValidEmail = (email) => {
  return EMAIL_REGEX.test(email);
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {Object} Validation result with isValid and message
 */
export const validatePassword = (password) => {
  if (!password || password.length < 6) {
    return {
      isValid: false,
      message: 'Password must be at least 6 characters long'
    };
  }
  
  // Check for at least one number
  if (!/\d/.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one number'
    };
  }
  
  return {
    isValid: true,
    message: ''
  };
};

/**
 * Validate that passwords match
 * @param {string} password - Password
 * @param {string} confirmPassword - Confirm password
 * @returns {boolean} Do passwords match
 */
export const doPasswordsMatch = (password, confirmPassword) => {
  return password === confirmPassword;
};

/**
 * Validate phone number format
 * @param {string} phone - Phone number to validate
 * @returns {boolean} Is valid phone number
 */
export const isValidPhone = (phone) => {
  // Basic phone validation (adjust as needed for your requirements)
  const phoneRegex = /^\+?[0-9]{10,15}$/;
  return phoneRegex.test(phone.replace(/\s+/g, ''));
};

/**
 * Create validation schema for forms
 * @param {Object} fields - Fields to validate
 * @returns {Object} Validation schema
 */
export const createValidationSchema = (fields) => {
  const schema = {};
  
  if (fields.username) {
    schema.username = {
      required: 'Username is required',
      minLength: { value: 3, message: 'Username must be at least 3 characters long' }
    };
  }
  
  if (fields.email) {
    schema.email = {
      required: 'Email is required',
      pattern: { value: EMAIL_REGEX, message: 'Please enter a valid email address' }
    };
  }
  
  if (fields.password) {
    schema.password = {
      required: 'Password is required',
      minLength: { value: 6, message: 'Password must be at least 6 characters long' },
      custom: {
        isValid: (value) => /\d/.test(value),
        message: 'Password must contain at least one number'
      }
    };
  }
  
  if (fields.confirmPassword) {
    schema.confirmPassword = {
      required: 'Please confirm your password',
      custom: {
        isValid: (value, formData) => value === formData.password,
        message: 'Passwords do not match'
      }
    };
  }
  
  return schema;
};
