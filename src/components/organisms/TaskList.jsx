import { motion, AnimatePresence } from 'framer-motion';
import TaskCard from '@/components/molecules/TaskCard';
import SkeletonLoader from '@/components/molecules/SkeletonLoader';
import EmptyState from '@/components/molecules/EmptyState';
import ErrorState from '@/components/molecules/ErrorState';

const TaskList = ({ 
  tasks = [], 
  categories = [],
  loading = false,
  error = null,
  onToggleComplete,
  onEdit,
  onDelete,
  onRetry,
  emptyTitle,
  emptyDescription,
  className = '' 
}) => {
  const getCategoryById = (categoryId) => {
    return categories.find(cat => cat.Id === parseInt(categoryId, 10));
  };

  if (loading) {
    return <SkeletonLoader count={5} className={className} />;
  }

  if (error) {
    return (
      <ErrorState 
        message={error}
        onRetry={onRetry}
        className={className}
      />
    );
  }

  if (tasks.length === 0) {
    return (
      <EmptyState 
        title={emptyTitle}
        description={emptyDescription}
        className={className}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`space-y-4 ${className}`}
    >
      <AnimatePresence mode="popLayout">
        {tasks.map((task, index) => (
          <motion.div
            key={task.Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ delay: index * 0.05 }}
          >
            <TaskCard
              task={task}
              category={getCategoryById(task.categoryId)}
              onToggleComplete={onToggleComplete}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default TaskList;