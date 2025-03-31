import React from 'react';
import { Grid, Box, Typography, Pagination, CircularProgress } from '@mui/material';
import ProductCard from './ProductCard';
import { useState } from 'react';
import { isDark } from "@jeff-aporta/theme-manager";

const ProductGrid = ({ products, loading }) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;
  
  const handlePageChange = (event, value) => {
    setPage(value);
    // Scroll to top of product grid
    window.scrollTo({
      top: document.getElementById('product-grid-top').offsetTop - 100,
      behavior: 'smooth'
    });
  };
  
  // Calculate pagination
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const displayedProducts = products.slice(startIndex, startIndex + itemsPerPage);
  
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
        <CircularProgress color="success" />
      </Box>
    );
  }
  
  if (products.length === 0) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="300px"
        sx={{
          bgcolor: isDark() ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.05)',
          borderRadius: 2,
          p: 4
        }}
      >
        <Typography variant="h6" color="text.secondary" textAlign="center">
          No se encontraron productos que coincidan con tu búsqueda.
        </Typography>
      </Box>
    );
  }
  
  return (
    <Box id="product-grid-top">
      <Box 
        display="flex" 
        justifyContent="space-between" 
        alignItems="center" 
        mb={3}
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          pb: 2
        }}
      >
        <Typography 
          variant="h5" 
          component="h2"
          color={isDark() ? "bright_military_green" : "military_green"}
          fontWeight="bold"
        >
          Catálogo de Productos
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Mostrando {Math.min(products.length, startIndex + 1)}-{Math.min(products.length, startIndex + itemsPerPage)} de {products.length} productos
        </Typography>
      </Box>
      
      <Grid container spacing={3}>
        {displayedProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
      
      {totalPages > 1 && (
        <Box 
          display="flex" 
          justifyContent="center" 
          mt={4} 
          mb={2}
        >
          <Pagination 
            count={totalPages} 
            page={page} 
            onChange={handlePageChange} 
            color="military_green"
            size="large"
            showFirstButton 
            showLastButton
          />
        </Box>
      )}
    </Box>
  );
};

export default ProductGrid;
