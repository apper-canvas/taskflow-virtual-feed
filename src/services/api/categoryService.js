import categoryData from '../mockData/category.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let categories = [...categoryData];

const categoryService = {
  async getAll() {
    await delay(200);
    return [...categories];
  },

  async getById(id) {
    await delay(150);
    const category = categories.find(cat => cat.Id === parseInt(id, 10));
    if (!category) {
      throw new Error('Category not found');
    }
    return { ...category };
  },

  async create(categoryData) {
    await delay(250);
    const newCategory = {
      Id: Math.max(...categories.map(c => c.Id), 0) + 1,
      name: categoryData.name,
      color: categoryData.color,
      icon: categoryData.icon,
      taskCount: 0
    };
    categories.push(newCategory);
    return { ...newCategory };
  },

  async update(id, updateData) {
    await delay(200);
    const index = categories.findIndex(cat => cat.Id === parseInt(id, 10));
    if (index === -1) {
      throw new Error('Category not found');
    }
    
    const updatedCategory = {
      ...categories[index],
      ...updateData,
      Id: categories[index].Id // Preserve original Id
    };
    
    categories[index] = updatedCategory;
    return { ...updatedCategory };
  },

  async delete(id) {
    await delay(200);
    const index = categories.findIndex(cat => cat.Id === parseInt(id, 10));
    if (index === -1) {
      throw new Error('Category not found');
    }
    categories.splice(index, 1);
    return { success: true };
  },

  async updateTaskCount(categoryId, count) {
    await delay(100);
    const index = categories.findIndex(cat => cat.Id === parseInt(categoryId, 10));
    if (index !== -1) {
      categories[index].taskCount = count;
      return { ...categories[index] };
    }
    return null;
  }
};

export default categoryService;