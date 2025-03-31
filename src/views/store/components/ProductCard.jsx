import React from 'react';
import { 
  Card, 
  CardMedia, 
  CardContent, 
  CardActions, 
  Typography, 
  Box, 
  IconButton, 
  Rating, 
  Chip,
  Tooltip
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { alpha } from '@mui/material/styles';
import { formatPrice } from '@db/models/Product';
import { isDark } from "@jeff-aporta/theme-manager";

// Get color values from global identity
const { 
  military_green, 
  dark_military_green,
  light_military_green,
  khaki,
  tactical_brown,
  olive_green,
  camo_green,
  dark_green
} = global.identity.colors;

const ProductCard = ({ product }) => {
  const { name, price, stock, image, category, variations, active, featured, id } = product;
  
  // Generate random rating for demo purposes
  const rating = Math.floor(Math.random() * 5) + 1;
  
  // Military theme colors
  const cardBgColor = isDark() ? alpha('#2e3d1d', 0.8) : alpha('#f5f5f5', 0.9);
  const categoryColor = getCategoryColor(category);
  const textColor = isDark() ? light_military_green.hex() : dark_military_green.hex();
  const priceColor = isDark() ? khaki.hex() : military_green.hex();
  
  // Format category name for display
  const categoryName = formatCategoryName(category);
  
  // Get the total number of variations
  const totalVariations = (variations.colors?.length || 0) + 
                         (variations.sizes?.length || 0) + 
                         (variations.materials?.length || 0);
  
  // Check if the image data is valid and use picsum as fallback
  const getImageSrc = () => {
    if (image && image.data) {
      try {
        return image.data.thumb.url;
      } catch (e) {
        console.warn("Invalid image data, using fallback");
      }
    }
    // Fallback to picsum.photos with consistent seed based on product ID
    return `https://picsum.photos/seed/product${id || Math.floor(Math.random() * 1000)}/400/300`;
  };
  
  return (
    <Card 
      elevation={3}
      sx={{ 
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        bgcolor: cardBgColor,
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: 6
        },
        borderRadius: 2,
        position: 'relative'
      }}
    >
      {featured && (
        <Chip 
          label="Destacado" 
          size="small"
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            bgcolor: tactical_brown.hex(),
            color: 'white',
            fontWeight: 'bold',
            zIndex: 1
          }}
        />
      )}
      
      <CardMedia
        component="img"
        height="160"
        image={getImageSrc()}
        alt={name}
        sx={{ objectFit: 'contain', p: 1, bgcolor: 'rgba(0,0,0,0.03)' }}
      />
      
      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Chip 
          label={categoryName} 
          size="small" 
          sx={{ 
            mb: 1, 
            bgcolor: categoryColor,
            color: 'white',
            fontSize: '0.7rem',
          }} 
        />
        
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            fontWeight: 'bold', 
            fontSize: '1rem',
            color: textColor,
            height: '2.5rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
          }}
        >
          {name}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, mb: 1 }}>
          <Rating value={rating} readOnly size="small" />
          <Typography variant="body2" sx={{ ml: 0.5, color: 'text.secondary' }}>
            ({Math.floor(Math.random() * 100) + 1})
          </Typography>
        </Box>
        
        {totalVariations > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1, mb: 1 }}>
            {variations.colors && variations.colors.length > 0 && (
              <Tooltip title="Colores disponibles">
                <Chip 
                  size="small" 
                  label={`${variations.colors.length} colores`} 
                  sx={{ 
                    bgcolor: alpha(military_green.hex(), 0.1),
                    fontSize: '0.7rem',
                  }} 
                />
              </Tooltip>
            )}
            
            {variations.sizes && variations.sizes.length > 0 && (
              <Tooltip title="Tallas disponibles">
                <Chip 
                  size="small" 
                  label={`${variations.sizes.length} tallas`} 
                  sx={{ 
                    bgcolor: alpha(military_green.hex(), 0.1),
                    fontSize: '0.7rem',
                  }} 
                />
              </Tooltip>
            )}
          </Box>
        )}
      </CardContent>
      
      <CardActions sx={{ justifyContent: 'space-between', px: 2, py: 1 }}>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            fontWeight: 'bold',
            color: priceColor
          }}
        >
          {formatPrice(price)}
        </Typography>
        
        <Box>
          <IconButton 
            size="small" 
            sx={{ 
              color: 'rgba(211, 47, 47, 0.7)',
              '&:hover': {
                color: 'rgb(211, 47, 47)',
              }
            }}
          >
            <FavoriteIcon fontSize="small" />
          </IconButton>
          
          <IconButton 
            size="small"
            sx={{ 
              ml: 1,
              bgcolor: military_green.hex(),
              color: 'white',
              '&:hover': {
                bgcolor: dark_military_green.hex(),
              }
            }}
          >
            <ShoppingCartIcon fontSize="small" />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
};

// Helper function to format category name
const formatCategoryName = (category) => {
  switch (category) {
    case 'tactical': return 'Equipamiento Táctico';
    case 'uniform': return 'Uniformes';
    case 'accessories': return 'Accesorios';
    case 'protection': return 'Protección';
    case 'camping': return 'Camping';
    default: return category;
  }
};

// Helper function to get category color
const getCategoryColor = (category) => {
  const { 
    military_green, 
    tactical_brown, 
    olive_green, 
    dark_green, 
    camo_green 
  } = global.identity.colors;

  switch (category) {
    case 'tactical': return military_green.hex();
    case 'uniform': return tactical_brown.hex();
    case 'accessories': return olive_green.hex();
    case 'protection': return dark_green.hex();
    case 'camping': return camo_green.hex();
    default: return military_green.hex();
  }
};

export default ProductCard;
