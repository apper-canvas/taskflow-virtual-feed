import taskData from '../mockData/task.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let tasks = [...taskData];

const taskService = {
  async getAll() {
    await delay(300);
    return [...tasks];
  },

  async getById(id) {
    await delay(200);
    const task = tasks.find(task => task.Id === parseInt(id, 10));
    if (!task) {
      throw new Error('Task not found');
    }
    return { ...task };
  },

  async getByCategory(categoryId) {
    await delay(250);
    return tasks.filter(task => task.categoryId === categoryId).map(task => ({ ...task }));
  },

  async getTodayTasks() {
    await delay(250);
    const today = new Date().toISOString().split('T')[0];
    return tasks.filter(task => task.dueDate === today).map(task => ({ ...task }));
  },

  async getOverdueTasks() {
    await delay(250);
    const today = new Date().toISOString().split('T')[0];
    return tasks.filter(task => task.dueDate && task.dueDate < today && !task.completed).map(task => ({ ...task }));
  },

  async create(taskData) {
    await delay(300);
    const newTask = {
      Id: Math.max(...tasks.map(t => t.Id), 0) + 1,
      title: taskData.title,
      description: taskData.description || '',
      priority: taskData.priority || 'medium',
      categoryId: taskData.categoryId,
      dueDate: taskData.dueDate || null,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    tasks.push(newTask);
    return { ...newTask };
  },

  async update(id, updateData) {
    await delay(250);
    const index = tasks.findIndex(task => task.Id === parseInt(id, 10));
    if (index === -1) {
      throw new Error('Task not found');
    }
    
    const updatedTask = {
      ...tasks[index],
      ...updateData,
      Id: tasks[index].Id, // Preserve original Id
      updatedAt: new Date().toISOString()
    };
    
    tasks[index] = updatedTask;
    return { ...updatedTask };
  },

  async delete(id) {
    await delay(200);
    const index = tasks.findIndex(task => task.Id === parseInt(id, 10));
    if (index === -1) {
      throw new Error('Task not found');
    }
    tasks.splice(index, 1);
    return { success: true };
  },

  async toggleComplete(id) {
    await delay(200);
    const index = tasks.findIndex(task => task.Id === parseInt(id, 10));
    if (index === -1) {
      throw new Error('Task not found');
    }
    
    tasks[index] = {
      ...tasks[index],
      completed: !tasks[index].completed,
      updatedAt: new Date().toISOString()
    };
    
    return { ...tasks[index] };
  },

  async search(query) {
    await delay(300);
    const searchTerm = query.toLowerCase();
    return tasks.filter(task => 
      task.title.toLowerCase().includes(searchTerm) ||
      task.description.toLowerCase().includes(searchTerm)
    ).map(task => ({ ...task }));
  }
};

export default taskService;