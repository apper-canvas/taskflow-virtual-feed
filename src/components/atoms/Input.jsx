import { forwardRef } from 'react';
import ApperIcon from '@/components/ApperIcon';

const Input = forwardRef(({ 
  label, 
  error, 
  icon, 
  iconPosition = 'left',
  className = '', 
  type = 'text',
  ...props 
}, ref) => {
  const hasIcon = !!icon;
  const hasError = !!error;
  
  const inputClasses = `
    w-full px-4 py-3 rounded-lg border transition-all duration-200 font-medium
    ${hasError 
      ? 'border-error focus:border-error focus:ring-error' 
      : 'border-gray-300 focus:border-primary focus:ring-primary'
    }
    focus:ring-2 focus:ring-opacity-20 focus:outline-none
    ${hasIcon && iconPosition === 'left' ? 'pl-11' : ''}
    ${hasIcon && iconPosition === 'right' ? 'pr-11' : ''}
    ${className}
  `.trim();

  const filterProps = ({ label, error, icon, iconPosition, ...rest }) => rest;
  const cleanProps = filterProps(props);

  return (
    <div className="relative">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      
      <div className="relative">
        {hasIcon && iconPosition === 'left' && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <ApperIcon name={icon} className="w-5 h-5 text-gray-400" />
          </div>
        )}
        
        <input
          ref={ref}
          type={type}
          className={inputClasses}
          {...cleanProps}
        />
        
        {hasIcon && iconPosition === 'right' && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <ApperIcon name={icon} className="w-5 h-5 text-gray-400" />
          </div>
        )}
      </div>
      
      {hasError && (
        <p className="mt-1 text-sm text-error">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;