/**
 * LocalStorage database module
 * This simulates database operations until a PostgreSQL connection is implemented
 */

// Collection names
const COLLECTIONS = {
  PRODUCTS: 'army_products'
};

/**
 * Initialize collections if they don't exist
 */
const initializeCollections = () => {
  if (!localStorage.getItem(COLLECTIONS.PRODUCTS)) {
    localStorage.setItem(COLLECTIONS.PRODUCTS, JSON.stringify([]));
  }
};

/**
 * Get all items from a collection
 * @param {string} collection - The collection name
 * @returns {Array} - The collection items
 */
const getAll = (collection) => {
  initializeCollections();
  try {
    return JSON.parse(localStorage.getItem(collection)) || [];
  } catch (error) {
    console.error(`Error getting items from ${collection}:`, error);
    return [];
  }
};

/**
 * Get item by ID from a collection
 * @param {string} collection - The collection name
 * @param {string} id - The item ID
 * @returns {Object|null} - The found item or null
 */
const getById = (collection, id) => {
  const items = getAll(collection);
  return items.find(item => item.id === id) || null;
};

/**
 * Create a new item in a collection
 * @param {string} collection - The collection name
 * @param {Object} item - The item to create
 * @returns {Object} - The created item with ID and timestamps
 */
const create = (collection, item) => {
  const items = getAll(collection);
  
  // Generate a truly unique ID based on timestamp and random string
  const newItem = {
    ...item,
    id: Date.now().toString() + '-' + Math.random().toString(36).substr(2, 9),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  items.push(newItem);
  localStorage.setItem(collection, JSON.stringify(items));
  
  return newItem;
};

/**
 * Update an existing item in a collection
 * @param {string} collection - The collection name
 * @param {string} id - The item ID
 * @param {Object} updates - The updates to apply
 * @returns {Object|null} - The updated item or null if not found
 */
const update = (collection, id, updates) => {
  const items = getAll(collection);
  const index = items.findIndex(item => item.id === id);
  
  if (index === -1) return null;
  
  const updatedItem = {
    ...items[index],
    ...updates,
    id, // Ensure ID doesn't change
    updatedAt: new Date().toISOString()
  };
  
  items[index] = updatedItem;
  localStorage.setItem(collection, JSON.stringify(items));
  
  return updatedItem;
};

/**
 * Delete an item from a collection
 * @param {string} collection - The collection name
 * @param {string} id - The item ID to delete
 * @returns {boolean} - Success status
 */
const remove = (collection, id) => {
  const items = getAll(collection);
  const filteredItems = items.filter(item => item.id !== id);
  
  if (filteredItems.length === items.length) return false;
  
  localStorage.setItem(collection, JSON.stringify(filteredItems));
  return true;
};

/**
 * Query items with filters
 * @param {string} collection - The collection name
 * @param {Object} filters - The filters to apply
 * @returns {Array} - The filtered items
 */
const query = (collection, filters = {}) => {
  const items = getAll(collection);
  
  if (Object.keys(filters).length === 0) return items;
  
  return items.filter(item => {
    for (const [key, value] of Object.entries(filters)) {
      if (item[key] !== value) return false;
    }
    return true;
  });
};

// Export the module
export {
  COLLECTIONS,
  getAll,
  getById,
  create,
  update,
  remove,
  query,
  initializeCollections
};
