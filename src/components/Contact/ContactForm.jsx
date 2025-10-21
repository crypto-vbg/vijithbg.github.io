import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * ContactForm Component
 * Form with validation for name, email, and message fields
 */
const ContactForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validate individual field
  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) {
          return 'Name is required';
        }
        return '';
      
      case 'email':
        if (!value.trim()) {
          return 'Email is required';
        }
        if (!emailRegex.test(value)) {
          return 'Please enter a valid email address';
        }
        return '';
      
      case 'message':
        if (!value.trim()) {
          return 'Message is required';
        }
        if (value.length > 500) {
          return 'Message must be 500 characters or less';
        }
        return '';
      
      default:
        return '';
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Enforce character limit for message
    if (name === 'message' && value.length > 500) {
      return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  // Handle input blur
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  // Validate all fields
  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      name: true,
      email: true,
      message: true
    });

    // Validate all fields
    const newErrors = validateForm();
    setErrors(newErrors);

    // Check if form is valid
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate form submission (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTouched({});
      setErrors({});
      
      // Trigger shooting star animation
      if (onSuccess) {
        onSuccess();
      }

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = Object.keys(validateForm()).length === 0;

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="relative backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-4 xs:p-6 md:p-8 shadow-2xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      {/* Name Field */}
      <div className="mb-6">
        <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full px-4 py-3 bg-black/30 border rounded-lg text-white placeholder-white/40 
            transition-all duration-200 outline-none
            ${errors.name && touched.name 
              ? 'border-red-500 focus:border-red-400 focus:shadow-[0_0_15px_rgba(239,68,68,0.5)]' 
              : 'border-white/20 focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.5)]'
            }`}
          placeholder="Enter your name"
        />
        <AnimatePresence>
          {errors.name && touched.name && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-red-400 text-sm mt-2"
            >
              {errors.name}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Email Field */}
      <div className="mb-6">
        <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full px-4 py-3 bg-black/30 border rounded-lg text-white placeholder-white/40 
            transition-all duration-200 outline-none
            ${errors.email && touched.email 
              ? 'border-red-500 focus:border-red-400 focus:shadow-[0_0_15px_rgba(239,68,68,0.5)]' 
              : 'border-white/20 focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.5)]'
            }`}
          placeholder="Enter your email"
        />
        <AnimatePresence>
          {errors.email && touched.email && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-red-400 text-sm mt-2"
            >
              {errors.email}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Message Field */}
      <div className="mb-6">
        <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">
          Message
          <span className="text-white/50 text-xs ml-2">
            ({formData.message.length}/500)
          </span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          rows="5"
          className={`w-full px-4 py-3 bg-black/30 border rounded-lg text-white placeholder-white/40 
            transition-all duration-200 outline-none resize-none
            ${errors.message && touched.message 
              ? 'border-red-500 focus:border-red-400 focus:shadow-[0_0_15px_rgba(239,68,68,0.5)]' 
              : 'border-white/20 focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.5)]'
            }`}
          placeholder="Enter your message"
        />
        <AnimatePresence>
          {errors.message && touched.message && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-red-400 text-sm mt-2"
            >
              {errors.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting || !isFormValid}
        className={`w-full py-3 xs:py-4 px-4 xs:px-6 rounded-lg font-semibold text-base xs:text-lg
          transition-all duration-200 relative overflow-hidden
          ${isSubmitting || !isFormValid
            ? 'bg-white/10 text-white/40 cursor-not-allowed'
            : 'bg-gradient-to-r from-cyan-500 to-violet-500 text-white hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] hover:scale-105'
          }`}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Transmitting...
          </span>
        ) : (
          'Send Transmission'
        )}
      </button>

      {/* Status Messages */}
      <AnimatePresence>
        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-4 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-center"
          >
            ✓ Transmission successful! Message received.
          </motion.div>
        )}
        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-center"
          >
            ✗ Transmission failed. Please try again.
          </motion.div>
        )}
      </AnimatePresence>
    </motion.form>
  );
};

export default ContactForm;
