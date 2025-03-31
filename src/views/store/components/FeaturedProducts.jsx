import React, { useState } from 'react';
import { Box, Grid, Typography, Skeleton, Button, useMediaQuery, IconButton } from '@mui/material';
import ProductCard from './ProductCard';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { Color, isDark } from "@jeff-aporta/theme-manager";
import { alpha } from '@mui/material/styles';

// Get color values from global identity
const { 
  military_green, 
  dark_military_green, 
  light_military_green,
  bright_military_green,
  khaki
} = global.identity.colors;

const FeaturedProducts = ({ products, loading }) => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:960px)');
  const [currentSlide, setCurrentSlide] = useState(0);

  // Create loadings skeletons
  const loadingSkeletons = Array.from(new Array(6)).map((_, index) => (
    <Grid item key={`skeleton-${index}`} xs={12} sm={6} md={4}>
      <Skeleton 
        variant="rectangular" 
        width="100%" 
        height={300} 
        sx={{ 
          borderRadius: 2,
          bgcolor: isDark() ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'
        }} 
      />
    </Grid>
  ));

  // Group products for slides
  const groupProducts = () => {
    if (!products || products.length === 0) return [];
    
    const groups = [];
    const itemsPerSlide = isMobile ? 1 : isTablet ? 2 : 3;
    
    for (let i = 0; i < products.length; i += itemsPerSlide) {
      groups.push(products.slice(i, i + itemsPerSlide));
    }
    
    return groups;
  };

  const productGroups = groupProducts();
  const totalSlides = productGroups.length;
  
  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Create View All Products Button component to reuse
  const ViewAllProductsButton = () => {
    const buttonColor = isDark() ? light_military_green.hex() : military_green.hex();;
    const buttonHoverBorderColor = isDark() ? light_military_green.hex() : bright_military_green.hex();
    
    return (
      <Button 
        variant="outlined" 
        endIcon={<NavigateNextIcon />}
        color="bright_military_green"
        sx={{
          borderColor: buttonColor,
          color: buttonColor,
          '&:hover': {
            borderColor: buttonHoverBorderColor,
            bgcolor: alpha(military_green.hex(), 0.1)
          }
        }}
      >
        Ver todos los productos
      </Button>
    );
  };

  // Display layout changes based on screen size
  if ((isMobile || isTablet) && productGroups.length > 0) {
    return (
      <Box sx={{ position: 'relative' }}>
        {loading ? (
          <Grid container spacing={3}>
            {loadingSkeletons.slice(0, isMobile ? 1 : 2)}
          </Grid>
        ) : (
          <>
            <Box sx={{ position: 'relative', overflow: 'hidden' }}>
              <IconButton
                onClick={handlePrev}
                sx={{
                  position: 'absolute',
                  left: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 2,
                  bgcolor: isDark() ? military_green.hex() : light_military_green.hex(),
                  color: isDark() ? khaki.hex() : 'white',
                  '&:hover': {
                    bgcolor: isDark() ? dark_military_green.hex() : military_green.hex(),
                  }
                }}
              >
                <NavigateBeforeIcon />
              </IconButton>
              
              <Grid container spacing={3}>
                {productGroups[currentSlide].map(product => (
                  <Grid item key={product.id} xs={12} sm={6} md={4} sx={{ width: '100%' }}>
                    <ProductCard product={product} />
                  </Grid>
                ))}
              </Grid>
              
              <IconButton
                onClick={handleNext}
                sx={{
                  position: 'absolute',
                  right: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 2,
                  bgcolor: isDark() ? military_green.hex() : light_military_green.hex(),
                  color: isDark() ? khaki.hex() : 'white',
                  '&:hover': {
                    bgcolor: isDark() ? dark_military_green.hex() : military_green.hex(),
                  }
                }}
              >
                <NavigateNextIcon />
              </IconButton>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              {productGroups.map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    mx: 0.5,
                    cursor: 'pointer',
                    bgcolor: currentSlide === index ? military_green.hex() : 'rgba(0,0,0,0.2)',
                  }}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </Box>
            
            <Box 
              display="flex" 
              justifyContent="center" 
              mt={3}
            >
              <ViewAllProductsButton />
            </Box>
          </>
        )}
      </Box>
    );
  }
  
  // Desktop layout
  return (
    <Box>
      {loading ? (
        <Grid container spacing={3}>
          {loadingSkeletons}
        </Grid>
      ) : (
        <>
          <Grid container spacing={3}>
            {products.slice(0, 6).map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
          
          <Box 
            display="flex" 
            justifyContent="center" 
            mt={3}
          >
            <ViewAllProductsButton />
          </Box>
        </>
      )}
    </Box>
  );
};

export default FeaturedProducts;
