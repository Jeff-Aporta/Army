/**
 * Product Service
 * Handles product CRUD operations using localStorage
 */
import { 
  COLLECTIONS, 
  getAll, 
  getById, 
  create, 
  update, 
  remove,
  query 
} from '../localStorage';
import { validateProduct } from '../models/Product';

/**
 * Get all products
 * @returns {Array} Array of product objects
 */
const getAllProducts = () => {
  return getAll(COLLECTIONS.PRODUCTS);
};

/**
 * Get product by ID
 * @param {string} id Product ID
 * @returns {Object|null} Product object or null if not found
 */
const getProductById = (id) => {
  return getById(COLLECTIONS.PRODUCTS, id);
};

/**
 * Create a new product
 * @param {Object} product Product data
 * @returns {Object} Created product with ID
 * @throws {Error} Validation error
 */
const createProduct = (product) => {
  const validation = validateProduct(product);
  if (!validation.isValid) {
    throw new Error(validation.errors.join(', '));
  }
  
  return create(COLLECTIONS.PRODUCTS, product);
};

/**
 * Update an existing product
 * @param {string} id Product ID
 * @param {Object} updates Product updates
 * @returns {Object|null} Updated product or null if not found
 * @throws {Error} Validation error
 */
const updateProduct = (id, updates) => {
  // Get the existing product to validate the complete object
  const existingProduct = getProductById(id);
  if (!existingProduct) {
    return null;
  }

  const updatedProduct = { ...existingProduct, ...updates };
  const validation = validateProduct(updatedProduct);
  if (!validation.isValid) {
    throw new Error(JSON.stringify(validation.errors));
  }

  return update(COLLECTIONS.PRODUCTS, id, updates);
};

/**
 * Delete a product
 * @param {string} id Product ID
 * @returns {boolean} Success status
 */
const deleteProduct = (id) => {
  return remove(COLLECTIONS.PRODUCTS, id);
};

/**
 * Search products by various criteria
 * @param {Object} criteria Search criteria
 * @returns {Array} Matching products
 */
const searchProducts = (criteria = {}) => {
  // For simple filtering using exact matches
  if (Object.keys(criteria).length > 0) {
    return query(COLLECTIONS.PRODUCTS, criteria);
  }
  
  // For more complex filtering
  let products = getAllProducts();
  
  // Filter by search text across multiple fields
  if (criteria.searchText) {
    const searchText = criteria.searchText.toLowerCase();
    products = products.filter(product => 
      product.name.toLowerCase().includes(searchText) ||
      product.description.toLowerCase().includes(searchText)
    );
  }
  
  // Filter by price range
  if (criteria.minPrice !== undefined) {
    products = products.filter(product => product.price >= criteria.minPrice);
  }
  if (criteria.maxPrice !== undefined) {
    products = products.filter(product => product.price <= criteria.maxPrice);
  }
  
  // Filter by stock availability
  if (criteria.inStock) {
    products = products.filter(product => product.stock > 0);
  }
  
  return products;
};

/**
 * Get featured products
 * @param {number} limit Maximum number of products to return
 * @returns {Array} Featured products
 */
const getFeaturedProducts = (limit = 6) => {
  const products = query(COLLECTIONS.PRODUCTS, { featured: true });
  return products.slice(0, limit);
};

export {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  getFeaturedProducts
};
