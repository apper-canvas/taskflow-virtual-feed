import { motion } from 'framer-motion';
import { format, isToday, isPast } from 'date-fns';
import ApperIcon from '@/components/ApperIcon';
import Badge from '@/components/atoms/Badge';
import Checkbox from '@/components/atoms/Checkbox';
import Button from '@/components/atoms/Button';

const TaskCard = ({ 
  task, 
  category,
  onToggleComplete,
  onEdit,
  onDelete,
  className = '' 
}) => {
  const isOverdue = task.dueDate && isPast(new Date(task.dueDate)) && !task.completed;
  const isDueToday = task.dueDate && isToday(new Date(task.dueDate));

  const handleToggleComplete = () => {
    onToggleComplete(task.Id);
  };

  const formatDueDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    if (isToday(date)) return 'Today';
    return format(date, 'MMM d');
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: task.completed ? 0.6 : 1, 
        y: 0,
        scale: task.completed ? 0.98 : 1
      }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}
      className={`bg-white rounded-xl p-4 shadow-sm border border-gray-100 group transition-all duration-200 ${className}`}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 mt-1">
          <Checkbox
            checked={task.completed}
            onChange={handleToggleComplete}
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 className={`font-heading font-semibold text-gray-900 task-strikethrough ${
                task.completed ? 'completed text-gray-500' : ''
              }`}>
                {task.title}
              </h3>
              
              {task.description && (
                <p className={`mt-1 text-sm text-gray-600 break-words ${
                  task.completed ? 'text-gray-400' : ''
                }`}>
                  {task.description}
                </p>
              )}
              
              <div className="flex items-center space-x-2 mt-3">
                <Badge variant={task.priority} size="small">
                  {task.priority}
                </Badge>
                
                {category && (
                  <Badge 
                    variant="default" 
                    size="small"
                    icon={category.icon}
                    className="text-gray-600"
                    style={{
                      backgroundColor: `${category.color}20`,
                      color: category.color
                    }}
                  >
                    {category.name}
                  </Badge>
                )}
                
                {task.dueDate && (
                  <div className={`flex items-center text-xs px-2 py-1 rounded-full ${
                    isOverdue 
                      ? 'bg-error/10 text-error' 
                      : isDueToday 
                        ? 'bg-warning/10 text-warning'
                        : 'bg-gray-100 text-gray-600'
                  }`}>
                    <ApperIcon name="Calendar" className="w-3 h-3 mr-1" />
                    {formatDueDate(task.dueDate)}
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="small"
                icon="Edit2"
                onClick={() => onEdit(task)}
                className="p-2 h-8 w-8 text-gray-400 hover:text-gray-600"
              />
              <Button
                variant="ghost"
                size="small"
                icon="Trash2"
                onClick={() => onDelete(task.Id)}
                className="p-2 h-8 w-8 text-gray-400 hover:text-error"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;