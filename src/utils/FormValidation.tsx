export const validateRequired = (value: string, label: string) => {
    if (!value) {
      return `${label} is required`;
    }
    return '';
  };
  
  export const validateName = (value: string, label: string) => {
    if (!value) {
      return label + ' is required';
    }
    if (value.length < 5) {
      return label + ' must be at least 5 characters';
    }
    return '';
  };
  
  export const validateEmail = (value: string) => {
    if (!value) {
      return 'Email is required';
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
      return 'Invalid email address';
    }
    return '';
  };
  
  export const validatePassword = (value: string) => {
    if (!value) {
      return 'Password is required';
    }
    if (value.length < 8) {
      return 'Password must be at least 8 characters';
    }
    return '';
  };
  
  export const validateConfirmPassword = (password: string, confirmPassword: string) => {
    if (!confirmPassword) {
      return 'Confirm Password is required';
    }
    if (password !== confirmPassword) {
      return 'Passwords do not match';
    }
    return '';
  };