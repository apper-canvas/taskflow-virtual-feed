import { useState } from 'react';
import { motion } from 'framer-motion';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';

const SearchBar = ({ 
  onSearch, 
  placeholder = "Search tasks...", 
  className = '' 
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      className={`relative ${className}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        icon="Search"
        iconPosition="left"
        className="pr-20"
      />
      
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="small"
            icon="X"
            onClick={handleClear}
            className="p-1 h-8 w-8"
          />
        )}
      </div>
    </motion.form>
  );
};

export default SearchBar;