import React from 'react';
import { Box, Typography, Button, Paper, Grid } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { isDark } from "@jeff-aporta/theme-manager";
import { alpha } from '@mui/material/styles';

// Get color values from global identity
const { 
  military_green, 
  dark_military_green,
  khaki,
  tactical_brown
} = global.identity.colors;

const PromoBanner = () => {
  // Random selection of promo image from 1 to 3
  const promoIndex = Math.floor(Math.random() * 3) + 1;
  
  // Background images from picsum.photos
  const bgImage = isDark()
    ? `url('https://picsum.photos/seed/armydark${promoIndex}/1200/400')`
    : `url('https://picsum.photos/seed/army${promoIndex}/1200/400')`;

  // Theme colors
  const buttonColor = isDark() ? khaki.hex() : dark_military_green.hex();
  const buttonTextColor = isDark() ? dark_military_green.hex() : 'white';
  const textOverlayColor = isDark() 
    ? alpha('#000', 0.7) 
    : alpha('#fff', 0.85);
  
  return (
    <Paper 
      elevation={3}
      sx={{ 
        position: 'relative',
        overflow: 'hidden',
        height: { xs: 300, md: 400 },
        borderRadius: 2,
        mb: 4,
        backgroundImage: bgImage,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Overlay gradient */}
      <Box 
        sx={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: isDark()
            ? 'linear-gradient(90deg, rgba(23,33,10,0.8) 0%, rgba(23,33,10,0.4) 100%)'
            : 'linear-gradient(90deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.6) 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          p: { xs: 3, md: 6 }
        }}
      >
        <Grid container>
          <Grid item xs={12} md={7}>
            <Box 
              sx={{ 
                p: 3, 
                borderRadius: 2,
                bgcolor: textOverlayColor,
                backdropFilter: 'blur(5px)'
              }}
            >
              <Box 
                sx={{ 
                  display: 'inline-flex',
                  alignItems: 'center',
                  bgcolor: tactical_brown.hex(),
                  color: 'white',
                  borderRadius: 4,
                  px: 1,
                  py: 0.5,
                  mb: 2
                }}
              >
                <LocalOfferIcon fontSize="small" sx={{ mr: 0.5 }} />
                <Typography variant="caption" fontWeight="bold">
                  OFERTA ESPECIAL
                </Typography>
              </Box>
              
              <Typography 
                variant="h4" 
                component="h2" 
                fontWeight="bold"
                color={military_green.hex()}
                gutterBottom
              >
                Equipamiento Táctico Premium
              </Typography>
              
              <Typography 
                variant="body1" 
                color="text.secondary"
                paragraph
                sx={{ mb: 3 }}
              >
                Descubre nuestra nueva colección de equipamiento táctico con un 15% de descuento. 
                Diseñado para profesionales que exigen lo mejor en calidad y rendimiento.
              </Typography>
              
              <Button 
                variant="contained" 
                endIcon={<ArrowForwardIcon />}
                sx={{ 
                  bgcolor: buttonColor,
                  color: buttonTextColor,
                  fontWeight: 'bold',
                  '&:hover': {
                    bgcolor: dark_military_green.hex(),
                    color: 'white'
                  },
                  boxShadow: 2
                }}
              >
                Ver Ofertas
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default PromoBanner;
