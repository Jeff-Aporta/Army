import React from 'react';
import { 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon,
  ListItemButton,
  Divider,
  Paper,
  Radio
} from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import BackpackIcon from '@mui/icons-material/Backpack';
import SecurityIcon from '@mui/icons-material/Security';
import OutdoorGrillIcon from '@mui/icons-material/OutdoorGrill';
import StarIcon from '@mui/icons-material/Star';
import { isDark } from "@jeff-aporta/theme-manager";
import { alpha } from '@mui/material/styles';

// Get color values from global identity
const { 
  military_green, 
  dark_military_green,
  bright_military_green
} = global.identity.colors;

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  // Get category icon and formatted name
  const getCategoryInfo = (category) => {
    switch (category) {
      case 'tactical':
        return { 
          icon: <CategoryIcon />, 
          label: 'Equipamiento Táctico',
          description: 'Chalecos, portaequipo y accesorios tácticos'
        };
      case 'uniform':
        return { 
          icon: <CheckroomIcon />, 
          label: 'Uniformes',
          description: 'Uniformes militares, camuflaje y ropa táctica'
        };
      case 'accessories':
        return { 
          icon: <BackpackIcon />, 
          label: 'Accesorios',
          description: 'Mochilas, bolsas y complementos tácticos'
        };
      case 'protection':
        return { 
          icon: <SecurityIcon />, 
          label: 'Protección',
          description: 'Cascos, chalecos antibalas y protección personal'
        };
      case 'camping':
        return { 
          icon: <OutdoorGrillIcon />, 
          label: 'Camping',
          description: 'Equipamiento para supervivencia y camping'
        };
      default:
        return { 
          icon: <CategoryIcon />, 
          label: category.charAt(0).toUpperCase() + category.slice(1),
          description: 'Productos militares y tácticos'
        };
    }
  };

  // Theme colors
  const headingColor = isDark() ? bright_military_green.hex() : military_green.hex();
  const selectedBgColor = isDark() 
    ? alpha(military_green.hex(), 0.2) 
    : alpha(military_green.hex(), 0.1);

  return (
    <Paper 
      elevation={2} 
      sx={{ 
        p: 2, 
        bgcolor: isDark() ? alpha('#2e3d1d', 0.8) : alpha('#f5f5f5', 0.9),
        borderRadius: 2
      }}
    >
      <Typography 
        variant="h6" 
        color={headingColor}
        fontWeight="bold"
        sx={{ mb: 2 }}
      >
        Categorías
      </Typography>
      
      <List component="nav" sx={{ width: '100%' }}>
        <ListItem disablePadding>
          <ListItemButton
            selected={selectedCategory === 'all'}
            onClick={() => onCategoryChange('all')}
            sx={{ 
              borderRadius: 1,
              mb: 1,
              '&.Mui-selected': {
                bgcolor: selectedBgColor,
                '&:hover': {
                  bgcolor: selectedBgColor,
                }
              }
            }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              <StarIcon color={selectedCategory === 'all' ? "success" : "action"} />
            </ListItemIcon>
            <ListItemText 
              primary="Todos los Productos" 
              secondary={`Ver todo el catálogo`}
            />
            <Radio 
              checked={selectedCategory === 'all'} 
              color="success"
              size="small"
            />
          </ListItemButton>
        </ListItem>
        
        <Divider sx={{ my: 1.5 }} />
        
        {categories.map((category) => {
          const { icon, label, description } = getCategoryInfo(category);
          
          return (
            <ListItem disablePadding key={category}>
              <ListItemButton
                selected={selectedCategory === category}
                onClick={() => onCategoryChange(category)}
                sx={{ 
                  borderRadius: 1,
                  mb: 1,
                  '&.Mui-selected': {
                    bgcolor: selectedBgColor,
                    '&:hover': {
                      bgcolor: selectedBgColor,
                    }
                  }
                }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  {React.cloneElement(icon, { 
                    color: selectedCategory === category ? "success" : "action" 
                  })}
                </ListItemIcon>
                <ListItemText 
                  primary={label} 
                  secondary={description}
                />
                <Radio 
                  checked={selectedCategory === category} 
                  color="success"
                  size="small"
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
};

export default CategoryFilter;
