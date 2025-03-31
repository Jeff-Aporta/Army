import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, Divider, useMediaQuery, CircularProgress } from '@mui/material';
import { ThemeSwitcher, themeSwitch_listener } from "@templates";
import { DivM } from "@containers";
import { getThemeLuminance, getThemeName, isDark } from "@jeff-aporta/theme-manager";

import { 
  getAllProducts, 
  getFeaturedProducts, 
  searchProducts 
} from '@db/services/productService';

import { 
  ProductGrid, 
  CategoryFilter, 
  FeaturedProducts, 
  PromoBanner 
} from './components';

const StoreView = () => {
  // States
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [_, themeListener] = useState(getThemeName()+getThemeLuminance());
  
  const isMobile = useMediaQuery('(max-width:600px)');

  // Load products and categories
  useEffect(() => {
    loadProducts();
    
    // Theme change listener
    themeSwitch_listener.push((theme_name, theme_luminance) => {
      themeListener(theme_name+theme_luminance);
    });
  }, []);

  // Filter products when category or search term changes
  useEffect(() => {
    filterProducts();
  }, [selectedCategory, searchTerm, products]);

  // Functions
  const loadProducts = () => {
    setLoading(true);
    try {
      // Get all products
      const allProducts = getAllProducts();
      setProducts(allProducts);
      
      // Get featured products
      const featured = getFeaturedProducts(6);
      setFeaturedProducts(featured);
      
      // Extract unique categories
      const uniqueCategories = [...new Set(allProducts.map(p => p.category))];
      setCategories(uniqueCategories);
      
      setLoading(false);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle search input change
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Handle category filter change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Filter products based on category and search term
  const filterProducts = () => {
    let filtered = [...products];
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // Filter by search term
    if (searchTerm.trim() !== '') {
      filtered = searchProducts(filtered, searchTerm);
    }
    
    setFilteredProducts(filtered);
  };

  return (
    <ThemeSwitcher
      bgtype="webp"
      h_init="10px"
      h_fin="100px"
    >
      <DivM m_max={20} className="d-flex-col min-h-80vh">
        <PromoBanner />
        
        <Container maxWidth="xl" sx={{ mt: 4, mb: 6 }}>
          {/* Featured Products Section */}
          <Box mb={6}>
          <Typography 
            variant="h4" 
            component="h1" 
            fontWeight="bold"
            textAlign="center"
            color={isDark() ? "bright_military_green" : "military_green"}
            gutterBottom
          >
            Productos Tácticos y Militares
          </Typography>
          <Divider sx={{ mb: 3 }} />
          </Box>
          
          <Box my={4}>
            <Typography 
              variant="h5" 
              component="h2" 
              fontWeight="bold"
              color={isDark() ? "bright_military_green" : "military_green"}
              gutterBottom
            >
              Productos Destacados
            </Typography>
            <FeaturedProducts 
              products={featuredProducts} 
              loading={loading} 
            />
          </Box>
          
          <Divider sx={{ mb: 4 }} />
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <CategoryFilter 
              categories={categories} 
              selectedCategory={selectedCategory} 
              onCategoryChange={handleCategoryChange} 
            />
          </Grid>
          
          <Grid item xs={12} md={9}>
              {loading ? (
                <Box display="flex" justifyContent="center" p={5}>
                  <CircularProgress color="military_green" />
                </Box>
              ) : filteredProducts.length === 0 ? (
                <Typography variant="h6" color="text.secondary" textAlign="center" p={5}>
                  No se encontraron productos que coincidan con tu búsqueda.
                </Typography>
              ) : (
                <ProductGrid products={filteredProducts} />
              )}
          </Grid>
        </Grid>
      </Container>
      </DivM>
    </ThemeSwitcher>
  );
};

export default StoreView;
