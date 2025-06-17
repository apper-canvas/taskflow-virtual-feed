import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { isToday, isPast } from 'date-fns';
import { taskService, categoryService } from '@/services';
import QuickAddTask from '@/components/molecules/QuickAddTask';
import SearchBar from '@/components/molecules/SearchBar';
import FilterBar from '@/components/molecules/FilterBar';
import TaskList from '@/components/organisms/TaskList';
import ProgressDashboard from '@/components/organisms/ProgressDashboard';
import ApperIcon from '@/components/ApperIcon';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [tasksData, categoriesData] = await Promise.all([
        taskService.getAll(),
        categoryService.getAll()
      ]);
      
      setTasks(tasksData);
      setCategories(categoriesData);
    } catch (err) {
      setError(err.message || 'Failed to load data');
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (taskData) => {
    try {
      const newTask = await taskService.create(taskData);
      setTasks(prev => [newTask, ...prev]);
      return newTask;
    } catch (err) {
      throw new Error('Failed to create task');
    }
  };

  const handleToggleComplete = async (taskId) => {
    try {
      const updatedTask = await taskService.toggleComplete(taskId);
      setTasks(prev => prev.map(task => 
        task.Id === taskId ? updatedTask : task
      ));
      
      if (updatedTask.completed) {
        toast.success('Task completed! 🎉');
      } else {
        toast.info('Task marked as incomplete');
      }
    } catch (err) {
      toast.error('Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskService.delete(taskId);
        setTasks(prev => prev.filter(task => task.Id !== taskId));
        toast.success('Task deleted successfully');
      } catch (err) {
        toast.error('Failed to delete task');
      }
    }
  };

  const handleEditTask = (task) => {
    // For now, just show a message - editing could be implemented with a modal
    toast.info('Task editing feature coming soon!');
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      loadData();
      return;
    }
    
    try {
      const searchResults = await taskService.search(query);
      setTasks(searchResults);
    } catch (err) {
      toast.error('Search failed');
    }
  };

  // Filter tasks based on active filter
  const filteredTasks = useMemo(() => {
    let filtered = [...tasks];
    
    // Apply search filter first
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query)
      );
    }
    
    // Apply active filter
    switch (activeFilter) {
      case 'today':
        filtered = filtered.filter(task => 
          task.dueDate && isToday(new Date(task.dueDate))
        );
        break;
      case 'overdue':
        filtered = filtered.filter(task => 
          task.dueDate && isPast(new Date(task.dueDate)) && !task.completed
        );
        break;
      case 'completed':
        filtered = filtered.filter(task => task.completed);
        break;
      default:
        if (activeFilter.startsWith('category-')) {
          const categoryId = activeFilter.replace('category-', '');
          filtered = filtered.filter(task => task.categoryId === categoryId);
        }
        break;
    }
    
    return filtered;
  }, [tasks, activeFilter, searchQuery]);

  // Calculate task counts for filters
  const taskCounts = useMemo(() => {
    const today = new Date();
    return {
      all: tasks.length,
      today: tasks.filter(task => 
        task.dueDate && isToday(new Date(task.dueDate))
      ).length,
      overdue: tasks.filter(task => 
        task.dueDate && isPast(new Date(task.dueDate)) && !task.completed
      ).length,
      completed: tasks.filter(task => task.completed).length
    };
  }, [tasks]);

  const getEmptyStateText = () => {
    switch (activeFilter) {
      case 'today':
        return {
          title: "No tasks due today",
          description: "You're all caught up for today! Great job staying on top of your tasks."
        };
      case 'overdue':
        return {
          title: "No overdue tasks",
          description: "Excellent! You're staying on top of your deadlines."
        };
      case 'completed':
        return {
          title: "No completed tasks yet",
          description: "Complete some tasks to see them here."
        };
      default:
        return {
          title: "No tasks found",
          description: searchQuery ? "Try adjusting your search terms." : "Get started by creating your first task!"
        };
    }
  };

  const emptyState = getEmptyStateText();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <ApperIcon name="CheckSquare" className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-heading font-bold text-2xl text-gray-900">
                  TaskFlow
                </h1>
                <p className="text-sm text-gray-600">
                  Organize your day with clarity
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <SearchBar 
                onSearch={handleSearch}
                className="w-80"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Filters */}
          <div className="lg:col-span-1">
            <FilterBar
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              categories={categories}
              taskCounts={taskCounts}
            />
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Progress Dashboard */}
            <ProgressDashboard tasks={tasks} />
            
            {/* Quick Add Task */}
            <QuickAddTask 
              onAdd={handleAddTask}
              categories={categories}
            />
            
            {/* Task List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading font-semibold text-xl text-gray-900">
                  {activeFilter === 'all' ? 'All Tasks' : 
                   activeFilter === 'today' ? 'Due Today' :
                   activeFilter === 'overdue' ? 'Overdue Tasks' :
                   activeFilter === 'completed' ? 'Completed Tasks' :
                   activeFilter.startsWith('category-') ? 
                     categories.find(cat => cat.Id === parseInt(activeFilter.replace('category-', ''), 10))?.name || 'Category Tasks' :
                   'Tasks'}
                </h2>
                
                {filteredTasks.length > 0 && (
                  <span className="text-sm text-gray-500">
                    {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''}
                  </span>
                )}
              </div>
              
              <TaskList
                tasks={filteredTasks}
                categories={categories}
                loading={loading}
                error={error}
                onToggleComplete={handleToggleComplete}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                onRetry={loadData}
                emptyTitle={emptyState.title}
                emptyDescription={emptyState.description}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;