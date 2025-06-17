import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Checkbox = ({ 
  checked = false, 
  onChange, 
  disabled = false,
  className = '',
  ...props 
}) => {
  const filterProps = ({ ...rest }) => rest;
  const cleanProps = filterProps(props);

  return (
    <motion.label 
      className={`inline-flex items-center cursor-pointer ${disabled ? 'cursor-not-allowed opacity-50' : ''} ${className}`}
      whileTap={!disabled ? { scale: 0.95 } : {}}
    >
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="sr-only"
          {...cleanProps}
        />
        <motion.div
          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
            checked 
              ? 'bg-primary border-primary' 
              : 'bg-white border-gray-300 hover:border-primary'
          }`}
          animate={checked ? { scale: [1, 1.1, 1] } : { scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          {checked && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.15 }}
            >
              <ApperIcon name="Check" className="w-3 h-3 text-white" />
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.label>
  );
};

export default Checkbox;