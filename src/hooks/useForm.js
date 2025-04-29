import { useState } from 'react';

const useForm = (initialState = {}, onSubmit = () => {}) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  // Validate form fields
  const validate = (validationSchema = {}) => {
    const newErrors = {};
    let isValid = true;
    
    Object.keys(validationSchema).forEach(field => {
      const value = formData[field] || '';
      const validation = validationSchema[field];
      
      // Required field validation
      if (validation.required && !value.trim()) {
        newErrors[field] = validation.required;
        isValid = false;
      }
      
      // Min length validation
      if (value && validation.minLength && value.length < validation.minLength.value) {
        newErrors[field] = validation.minLength.message;
        isValid = false;
      }
      
      // Pattern validation (e.g., email format)
      if (value && validation.pattern && !validation.pattern.value.test(value)) {
        newErrors[field] = validation.pattern.message;
        isValid = false;
      }
      
      // Custom validation
      if (value && validation.custom && !validation.custom.isValid(value, formData)) {
        newErrors[field] = validation.custom.message;
        isValid = false;
      }
    });
    
    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e, validationSchema = {}) => {
    e.preventDefault();
    
    // Validate form if validation schema is provided
    if (Object.keys(validationSchema).length > 0) {
      const isValid = validate(validationSchema);
      if (!isValid) return;
    }
    
    setLoading(true);
    
    try {
      await onSubmit(formData);
    } catch (error) {
      // Handle submission errors
      if (error.response && error.response.data) {
        // API validation errors
        if (error.response.data.errors) {
          setErrors(error.response.data.errors);
        } else if (error.response.data.message) {
          setErrors({ form: error.response.data.message });
        }
      } else {
        setErrors({ form: 'An unexpected error occurred. Please try again.' });
      }
    } finally {
      setLoading(false);
    }
  };

  // Reset form to initial state
  const resetForm = () => {
    setFormData(initialState);
    setErrors({});
  };

  return {
    formData,
    errors,
    loading,
    handleChange,
    handleSubmit,
    resetForm,
    setFormData,
    setErrors
  };
};

export default useForm;
