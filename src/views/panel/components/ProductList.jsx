import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Chip,
  Tooltip,
  IconButton,
  Avatar
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { DynTable } from '@components/GUI/dynamic-table';
import { formatPrice } from '@db/models/Product';
import { isDark } from "@jeff-aporta/theme-manager";
import { PaperP } from '@components/containers';

const ProductList = ({ 
  products, 
  onAddNew, 
  onEdit, 
  onDelete, 
  isLoading
}) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Update filtered products when products change or search term changes
  React.useEffect(() => {
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      setFilteredProducts(
        products.filter(product => 
          product.name.toLowerCase().includes(term) ||
          product.description.toLowerCase().includes(term) ||
          product.category.toLowerCase().includes(term)
        )
      );
    } else {
      setFilteredProducts(products);
    }
  }, [products, searchTerm]);

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (productToDelete) {
      onDelete(productToDelete.id);
    }
    setDeleteDialogOpen(false);
    setProductToDelete(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setProductToDelete(null);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const themeColor = isDark() ? "var(--light-military-green)" : "var(--military-green)";

  // Define columns for the data grid
  const columns = [
    {
      field: 'image',
      headerName: 'Imagen',
      width: 100,
      renderCell: (params) => {
        const hasImage = params.row.image && params.row.image.data;
        return (
          <Avatar
            src={hasImage ? params.row.image.data.thumb.url : ''}
            variant="rounded"
            sx={{ width: 56, height: 56 }}
          >
            {!hasImage && params.row.name.charAt(0)}
          </Avatar>
        );
      },
      sortable: false
    },
    {
      field: 'name',
      headerName: 'Nombre',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'price',
      headerName: 'Precio',
      width: 120,
      valueFormatter: (params) => {
        if (params === undefined || params === null || isNaN(params)) {
          return formatPrice(0);
        }
        return formatPrice(Number(params));
      }
    },
    {
      field: 'stock',
      headerName: 'Stock',
      width: 100
    },
    {
      field: 'category',
      headerName: 'Categoría',
      width: 150,
      valueFormatter: (params) => {
        const category = params.value;
        switch (category) {
          case 'tactical': return 'Equipamiento Táctico';
          case 'uniform': return 'Uniformes';
          case 'accessories': return 'Accesorios';
          case 'protection': return 'Protección';
          case 'camping': return 'Camping';
          default: return category;
        }
      }
    },
    {
      field: 'variations',
      headerName: 'Variaciones',
      width: 200,
      renderCell: (params) => {
        const variations = params.row.variations;
        return (
          <Box>
            {variations.colors.length > 0 && (
              <Tooltip title={`Colores: ${variations.colors.join(', ')}`}>
                <Chip 
                  size="small" 
                  label={`${variations.colors.length} colores`} 
                  sx={{ mr: 0.5, mb: 0.5 }} 
                />
              </Tooltip>
            )}
            {variations.sizes.length > 0 && (
              <Tooltip title={`Tallas: ${variations.sizes.join(', ')}`}>
                <Chip 
                  size="small" 
                  label={`${variations.sizes.length} tallas`} 
                  sx={{ mr: 0.5, mb: 0.5 }} 
                />
              </Tooltip>
            )}
          </Box>
        );
      },
      sortable: false
    },
    {
      field: 'active',
      headerName: 'Estado',
      width: 120,
      renderCell: (params) => (
        params.value ? 
          <Chip icon={<CheckCircleIcon />} label="Activo" color="ok" size="small" /> : 
          <Chip icon={<CancelIcon />} label="Inactivo" color="error" size="small" />
      )
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 120,
      renderCell: (params) => (
        <Box>
          <Tooltip title="Editar">
            <IconButton 
              onClick={() => onEdit(params.row)}
              size="small"
              sx={{ color: themeColor }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar">
            <IconButton 
              onClick={() => handleDeleteClick(params.row)}
              size="small"
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
      sortable: false
    }
  ];

  return (
    <PaperP>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" component="h1" color={themeColor}>
          Productos
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onAddNew}
          sx={{ 
            backgroundColor: themeColor,
            "&:hover": {
              backgroundColor: isDark() ? "var(--pale-military-green)" : "var(--light-military-green)"
            }
          }}
        >
          Nuevo Producto
        </Button>
      </Box>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box sx={{  width: '100%' }}>
        <DynTable
          rows={filteredProducts}
          columns={columns}
          paginationModel={{ pageSize: 10 }}
          pageSizeOptions={[5, 10, 25, 50]}
          rowHeight={80}
          loading={isLoading}
          getRowId={(row) => row.id}
        />
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
      >
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar el producto "{productToDelete?.name}"? Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </PaperP>
  );
};

export default ProductList;
