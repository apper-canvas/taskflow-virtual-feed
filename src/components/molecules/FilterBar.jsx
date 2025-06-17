import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';

const FilterBar = ({ 
  activeFilter, 
  onFilterChange, 
  categories = [],
  taskCounts = {},
  className = '' 
}) => {
  const filters = [
    { id: 'all', label: 'All Tasks', icon: 'List' },
    { id: 'today', label: 'Today', icon: 'Calendar' },
    { id: 'overdue', label: 'Overdue', icon: 'AlertCircle' },
    { id: 'completed', label: 'Completed', icon: 'CheckCircle' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className={`bg-white rounded-xl shadow-sm border border-gray-200 p-4 ${className}`}
    >
      <div className="flex flex-col space-y-4">
        <div>
          <h3 className="font-heading font-semibold text-gray-900 mb-3">Filters</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {filters.map(filter => (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? 'primary' : 'ghost'}
                size="small"
                icon={filter.icon}
                onClick={() => onFilterChange(filter.id)}
                className="justify-start"
              >
                <span className="flex-1 text-left">{filter.label}</span>
                {taskCounts[filter.id] > 0 && (
                  <Badge variant="default" size="small">
                    {taskCounts[filter.id]}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </div>
        
        {categories.length > 0 && (
          <div>
            <h3 className="font-heading font-semibold text-gray-900 mb-3">Categories</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {categories.map(category => (
                <Button
                  key={category.Id}
                  variant={activeFilter === `category-${category.Id}` ? 'primary' : 'ghost'}
                  size="small"
                  icon={category.icon}
                  onClick={() => onFilterChange(`category-${category.Id}`)}
                  className="justify-start"
                  style={activeFilter === `category-${category.Id}` ? {} : {
                    color: category.color,
                    backgroundColor: `${category.color}10`
                  }}
                >
                  <span className="flex-1 text-left">{category.name}</span>
                  {category.taskCount > 0 && (
                    <Badge variant="default" size="small">
                      {category.taskCount}
                    </Badge>
                  )}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default FilterBar;