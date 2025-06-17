import preferencesData from '../mockData/userPreferences.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let preferences = { ...preferencesData };

const userPreferencesService = {
  async get() {
    await delay(150);
    return { ...preferences };
  },

  async update(updateData) {
    await delay(200);
    preferences = {
      ...preferences,
      ...updateData
    };
    return { ...preferences };
  },

  async reset() {
    await delay(150);
    preferences = { ...preferencesData };
    return { ...preferences };
  }
};

export default userPreferencesService;