import React, { useState, useEffect } from 'react';
import { ThemeSwitcher, themeSwitch_listener } from "@templates";
import { DivM } from "@containers";
import { getThemeLuminance, getThemeName, href, isDark } from "@jeff-aporta/theme-manager";

import { Box, Button, Paper, Snackbar, Alert, Tabs, Tab, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StorefrontIcon from '@mui/icons-material/Storefront';
import InventoryIcon from '@mui/icons-material/Inventory';
import RefreshIcon from '@mui/icons-material/Refresh';
import CancelIcon from '@mui/icons-material/Cancel';

import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import { 
  getAllProducts, 
  getProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} from '@db/services/productService';
import { defaultProduct } from '@db/models/Product';
import { seedDatabase } from '@db/seedData';

export default Index;

function Index() {
  // States
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState('list'); // 'list', 'add', 'edit'
  const [currentProduct, setCurrentProduct] = useState(null);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  const [activeTab, setActiveTab] = useState(0);
  const [_, themeListener] = useState(getThemeName()+getThemeLuminance());

  // Load products on component mount
  useEffect(() => {
    loadProducts();
    themeSwitch_listener.push((theme_name, theme_luminance) => {
      themeListener(theme_name+theme_luminance);
    });
  }, []);

  // Functions
  const loadProducts = () => {
    setLoading(true);
    setTimeout(() => {
      try {
        // Database is now initialized in templates.jsx
        // Just get all products here
        const loadedProducts = getAllProducts();
        setProducts(loadedProducts);
      } catch (error) {
        console.error("Error loading products:", error);
        showNotification("Error al cargar productos", "error");
      } finally {
        setLoading(false);
      }
    }, 200); // Reduced loading delay since init is done elsewhere
  };

  const handleAddProduct = () => {
    setCurrentProduct(defaultProduct());
    setCurrentView('add');
  };

  const handleEditProduct = (product) => {
    setCurrentProduct(product);
    setCurrentView('edit');
  };

  const handleDeleteProduct = (productId) => {
    try {
      const success = deleteProduct(productId);
      if (success) {
        loadProducts();
        showNotification("Producto eliminado con éxito", "success");
      } else {
        showNotification("No se pudo eliminar el producto", "error");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      showNotification("Error al eliminar el producto", "error");
    }
  };

  const handleSaveProduct = async (product) => {
    try {
      if (currentView === 'add') {
        await createProduct(product);
        showNotification("Producto creado con éxito", "success");
      } else {
        await updateProduct(product.id, product);
        showNotification("Producto actualizado con éxito", "success");
      }
      loadProducts();
      setCurrentView('list');
    } catch (error) {
      console.error("Error saving product:", error);
      throw error; // Rethrow to be handled by the form
    }
  };

  const handleCancelEdit = () => {
    setCurrentView('list');
    setCurrentProduct(null);
  };

  const showNotification = (message, severity = 'success') => {
    setNotification({
      open: true,
      message,
      severity
    });
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const resetDatabase = () => {
    try {
      localStorage.removeItem('army_products');
      showNotification('Base de datos reiniciada. Recargando productos...', 'info');
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error('Error resetting database:', error);
      showNotification('Error al reiniciar la base de datos', 'error');
    }
  };

  // Render current view based on state
  const renderCurrentView = () => {
    switch (currentView) {
      case 'add':
        return (
          <ProductForm 
            onSave={handleSaveProduct} 
            onCancel={handleCancelEdit} 
          />
        );
      case 'edit':
        return (
          <ProductForm 
            initialProduct={currentProduct} 
            onSave={handleSaveProduct} 
            onCancel={handleCancelEdit} 
          />
        );
      case 'list':
      default:
        return (
          <ProductList 
            products={products} 
            onAddNew={handleAddProduct} 
            onEdit={handleEditProduct} 
            onDelete={handleDeleteProduct} 
            isLoading={loading}
          />
        );
    }
  };

  return (
    <ThemeSwitcher
      urlShader="shaders/27.glsl"
      bgtype="webp"
      h_init="10px"
      h_fin="100px"
    >
      <DivM m_max={20} className="d-flex-col min-h-80vh">
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Button 
            variant="outlined" 
            startIcon={currentView === 'list' ? <ArrowBackIcon /> : <CancelIcon />}
            onClick={() => {
              if (currentView === 'list') {
                // Navigate to home page if in list view
                window.location.href = href("/");
              } else {
                // Return to product list if in edit/add view
                setCurrentView('list');
                setCurrentProduct(null);
              }
            }}
            color={isDark() ? "bright_military_green":"military_green"}
          >
            {currentView === 'list' ? 'Volver al Inicio' : 'Cancelar Acción'}
          </Button>
          <Typography variant="h5" component="h1" color={isDark() ? "bright_military_green":"military_green"} sx={{ fontWeight: 'bold' }}>
            Panel de Administración
          </Typography>
          <Button 
            variant="outlined" 
            color="secondary" 
            startIcon={<RefreshIcon />} 
            onClick={resetDatabase}
            sx={{ borderColor: "var(--military-green)", color: "var(--military-green)" }}
          >
            Reiniciar DB
          </Button>
        </Box>

        <Paper elevation={3} sx={{ mb: 3 }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange}
            sx={{ 
              borderBottom: 1, 
              borderColor: 'divider',
              '& .MuiTab-root.Mui-selected': {
                color: isDark() ? "var(--bright-military-green)" : "var(--military-green)"
              },
              '& .MuiTabs-indicator': {
                backgroundColor: isDark() ? "var(--bright-military-green)" : "var(--military-green)"
              }
            }}
          >
            <Tab 
              icon={<InventoryIcon />} 
              label="Gestión de Productos" 
              iconPosition="start"
            />
            <Tab 
              icon={<StorefrontIcon />} 
              label="Vista de Tienda" 
              iconPosition="start"
              disabled
            />
          </Tabs>
        </Paper>

        {renderCurrentView()}

        <Snackbar 
          open={notification.open} 
          autoHideDuration={6000} 
          onClose={handleCloseNotification}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert 
            onClose={handleCloseNotification} 
            severity={notification.severity} 
            sx={{ width: '100%' }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      </DivM>
    </ThemeSwitcher>
  );
}
