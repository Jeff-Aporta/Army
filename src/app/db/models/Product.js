/**
 * Product model for the Army store
 */

/**
 * Generate a default product object
 * @returns {Object} A default product object
 */
const defaultProduct = () => ({
  id: '',
  name: '',
  description: '',
  price: 0,
  stock: 0,
  category: 'tactical',
  variations: {
    colors: [],
    sizes: [],
    materials: []
  },
  image: {
    data: null  // Will store the imgbb response data
  },
  active: true,
  featured: false
});

/**
 * Product categories
 */
const CATEGORIES = [
  { value: 'tactical', label: 'Equipamiento Táctico' },
  { value: 'uniform', label: 'Uniformes' },
  { value: 'accessories', label: 'Accesorios' },
  { value: 'protection', label: 'Protección' },
  { value: 'camping', label: 'Camping' }
];

/**
 * Common product sizes
 */
const SIZES = [
  'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL',
  '36', '38', '40', '42', '44', '46', '48'
];

/**
 * Common product colors with their hex codes
 */
const COLORS = [
  { name: 'Negro', value: '#000000' },
  { name: 'Verde Militar', value: '#4b5320' },
  { name: 'Camo', value: '#53593f' },
  { name: 'Khaki', value: '#bfb878' },
  { name: 'Marrón Táctico', value: '#594d3c' },
  { name: 'Tan', value: '#d2b48c' },
  { name: 'Gris', value: '#808080' },
  { name: 'Azul Marino', value: '#000080' }
];

/**
 * Common materials for military products
 */
const MATERIALS = [
  'Nylon', 'Poliéster', 'Algodón', 'Cordura', 'Ripstop', 
  'Cuero', 'Kevlar', 'Metal', 'Plástico', 'Gore-Tex'
];

/**
 * Format product price for display
 * @param {number} price - The product price
 * @returns {string} - Formatted price string
 */
const formatPrice = (price) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  }).format(price);
};

/**
 * Validate a product object
 * @param {Object} product - The product to validate
 * @returns {Object} - Validation results with errors if any
 */
const validateProduct = (product) => {
  const errors = {};
  
  if (!product.name) errors.name = 'El nombre es obligatorio';
  if (product.price <= 0) errors.price = 'El precio debe ser mayor que cero';
  if (product.stock < 0) errors.stock = 'El stock no puede ser negativo';
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export {
  defaultProduct,
  CATEGORIES,
  SIZES,
  COLORS,
  MATERIALS,
  formatPrice,
  validateProduct
};
