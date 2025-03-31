import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  OutlinedInput,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  CardMedia,
  Alert,
  IconButton,
  InputAdornment
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { CATEGORIES, COLORS, SIZES, MATERIALS, defaultProduct } from '@db/models/Product';
import { isDark } from "@jeff-aporta/theme-manager";

const ProductForm = ({ initialProduct = null, onSave, onCancel }) => {
  const [product, setProduct] = useState(initialProduct || defaultProduct());
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Set up the form with initial data if provided
  useEffect(() => {
    if (initialProduct) {
      setProduct(initialProduct);
      if (initialProduct.image && initialProduct.image.data) {
        setImagePreview(initialProduct.image.data.display_url);
      }
    }
  }, [initialProduct]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
    
    // Clear error for this field if any
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: parseFloat(value) || 0 });
    
    // Clear error for this field if any
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setProduct({ ...product, [name]: checked });
  };

  const handleVariationChange = (field, values) => {
    setProduct({
      ...product,
      variations: {
        ...product.variations,
        [field]: values
      }
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Usually you would upload the file to a server here
    // For this example, we'll simulate receiving an imgbb response
    
    // Create a FileReader to get a preview
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
      
      // Create a mock imgbb response for local development
      const mockImgbbResponse = {
        data: {
          id: "mock" + Date.now(),
          title: file.name,
          url_viewer: "#",
          url: reader.result,
          display_url: reader.result,
          width: 800,
          height: 600,
          size: file.size,
          time: Math.floor(Date.now() / 1000),
          expiration: "0",
          image: {
            filename: file.name,
            name: file.name.split('.')[0],
            mime: file.type,
            extension: file.name.split('.').pop(),
            url: reader.result,
          },
          thumb: {
            filename: file.name,
            name: file.name.split('.')[0],
            mime: file.type,
            extension: file.name.split('.').pop(),
            url: reader.result,
          },
          medium: {
            filename: file.name,
            name: file.name.split('.')[0],
            mime: file.type,
            extension: file.name.split('.').pop(),
            url: reader.result,
          },
        },
        success: true,
        status: 200
      };

      setProduct({
        ...product,
        image: {
          data: mockImgbbResponse.data
        }
      });
    };
    reader.readAsDataURL(file);
  };

  const resetImage = () => {
    setImagePreview(null);
    setProduct({
      ...product,
      image: {
        data: null
      }
    });
  };

  const validateForm = () => {
    const validationErrors = {};

    if (!product.name) validationErrors.name = 'El nombre es obligatorio';
    if (!product.description) validationErrors.description = 'La descripción es obligatoria';
    if (product.price <= 0) validationErrors.price = 'El precio debe ser mayor que cero';
    if (product.stock < 0) validationErrors.stock = 'El stock no puede ser negativo';

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // In a real app, you would upload the image here first
      // and then save the product with the image URL
      await onSave(product);
    } catch (error) {
      console.error('Error saving product:', error);
      setErrors({ 
        submit: typeof error === 'string' ? error : 'Error al guardar el producto. Inténtalo de nuevo.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const themeColor = isDark() ? "var(--military-green)" : "var(--light-military-green)";
  const themeColorText = isDark() ? "var(--light-military-green)" : "var(--dark-military-green)";

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h5" gutterBottom color={themeColorText}>
        {initialProduct ? 'Editar Producto' : 'Nuevo Producto'}
      </Typography>
      
      {errors.submit && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errors.submit}
        </Alert>
      )}
      
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Basic Information */}
          <Grid item xs={12} md={8}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2, color: themeColorText }}>
              Información Básica
            </Typography>
            
            <TextField
              fullWidth
              label="Nombre del Producto"
              name="name"
              value={product.name}
              onChange={handleInputChange}
              error={!!errors.name}
              helperText={errors.name}
              margin="normal"
              color="light_military_green"
              required
            />
            
            <TextField
              fullWidth
              label="Descripción"
              name="description"
              value={product.description}
              onChange={handleInputChange}
              error={!!errors.description}
              helperText={errors.description}
              margin="normal"
              color="light_military_green"
              multiline
              rows={4}
              required
            />
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Precio"
                  name="price"
                  type="number"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                  value={product.price}
                  onChange={handleNumberChange}
                  error={!!errors.price}
                  helperText={errors.price}
                  margin="normal"
                  color="light_military_green"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Stock"
                  name="stock"
                  type="number"
                  value={product.stock}
                  onChange={handleNumberChange}
                  error={!!errors.stock}
                  helperText={errors.stock}
                  margin="normal"
                  color="light_military_green"
                  required
                />
              </Grid>
            </Grid>
            
            <FormControl fullWidth margin="normal" color="light_military_green">
              <InputLabel id="category-label">Categoría</InputLabel>
              <Select
                labelId="category-label"
                name="category"
                value={product.category}
                onChange={handleInputChange}
                label="Categoría"
              >
                {CATEGORIES.map((category, index) => (
                  <MenuItem key={`category-item-${category.value}-${index}`} value={category.value}>
                    {category.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <Box sx={{ mt: 2 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={product.active}
                    onChange={handleCheckboxChange}
                    name="active"
                    color="light_military_green"
                  />
                }
                label="Producto Activo"
              />
              
              <FormControlLabel
                control={
                  <Checkbox
                    checked={product.featured}
                    onChange={handleCheckboxChange}
                    name="featured"
                    color="light_military_green"
                  />
                }
                label="Producto Destacado"
              />
            </Box>
          </Grid>
          
          {/* Product Image */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2, color: themeColorText }}>
              Imagen del Producto
            </Typography>
            
            <Box 
              sx={{ 
                border: '1px dashed grey', 
                borderRadius: 1, 
                p: 1, 
                mb: 2,
                minHeight: 200,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {imagePreview ? (
                <>
                  <CardMedia
                    component="img"
                    image={imagePreview}
                    alt={product.name}
                    sx={{ maxHeight: 250, objectFit: 'contain', mb: 1 }}
                  />
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={resetImage}
                    size="small"
                  >
                    Eliminar Imagen
                  </Button>
                </>
              ) : (
                <>
                  <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="product-image-upload"
                    type="file"
                    onChange={handleImageChange}
                  />
                  <label htmlFor="product-image-upload">
                    <Button
                      variant="contained"
                      component="span"
                      startIcon={<AddPhotoAlternateIcon />}
                      sx={{ 
                        backgroundColor: themeColor,
                        "&:hover": {
                          backgroundColor: isDark() ? "var(--pale-military-green)" : "var(--light-military-green)"
                        }
                      }}
                    >
                      Subir Imagen
                    </Button>
                  </label>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                    Recomendado: 800x600px
                  </Typography>
                </>
              )}
            </Box>
          </Grid>
          
          {/* Variations */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2, color: themeColorText }}>
              Variaciones del Producto
            </Typography>
            
            <Grid container spacing={3}>
              {/* Colors */}
              <Grid item xs={12} md={4}>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="colors-label">Colores Disponibles</InputLabel>
                  <Select
                    labelId="colors-label"
                    multiple
                    value={product.variations.colors}
                    onChange={(e) => handleVariationChange('colors', e.target.value)}
                    input={<OutlinedInput label="Colores Disponibles" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value, index) => {
                          const color = COLORS.find(c => c.name === value);
                          return (
                            <Chip 
                              key={`color-chip-${value}-${index}`}
                              label={value} 
                              sx={{ 
                                backgroundColor: color ? color.value : undefined,
                                color: color && color.value === '#000000' ? 'white' : 'inherit'
                              }}
                            />
                          );
                        })}
                      </Box>
                    )}
                  >
                    {COLORS.map((color, colorIndex) => (
                      <MenuItem key={`color-item-${color.name}-${colorIndex}`} value={color.name}>
                        <Box 
                          component="span" 
                          sx={{ 
                            display: 'inline-block', 
                            width: 16, 
                            height: 16, 
                            mr: 1, 
                            backgroundColor: color.value,
                            border: '1px solid #ddd',
                            borderRadius: '2px'
                          }} 
                        />
                        {color.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              {/* Sizes */}
              <Grid item xs={12} md={4}>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="sizes-label">Tallas Disponibles</InputLabel>
                  <Select
                    labelId="sizes-label"
                    multiple
                    value={product.variations.sizes}
                    onChange={(e) => handleVariationChange('sizes', e.target.value)}
                    input={<OutlinedInput label="Tallas Disponibles" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value, index) => (
                          <Chip key={`size-chip-${value}-${index}`} label={value} />
                        ))}
                      </Box>
                    )}
                  >
                    {SIZES.map((size, sizeIndex) => (
                      <MenuItem key={`size-item-${size}-${sizeIndex}`} value={size}>
                        {size}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              {/* Materials */}
              <Grid item xs={12} md={4}>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="materials-label">Materiales</InputLabel>
                  <Select
                    labelId="materials-label"
                    multiple
                    value={product.variations.materials}
                    onChange={(e) => handleVariationChange('materials', e.target.value)}
                    input={<OutlinedInput label="Materiales" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value, index) => (
                          <Chip key={`material-chip-${value}-${index}`} label={value} />
                        ))}
                      </Box>
                    )}
                  >
                    {MATERIALS.map((material, materialIndex) => (
                      <MenuItem key={`material-item-${material}-${materialIndex}`} value={material}>
                        {material}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          
          {/* Form Actions */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
              <Button
                variant="outlined"
                color="error"
                startIcon={<CancelIcon />}
                onClick={onCancel}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="contained"
                startIcon={<SaveIcon />}
                disabled={isSubmitting}
                sx={{ 
                  backgroundColor: themeColor,
                  "&:hover": {
                    backgroundColor: "var(--military-green)"
                  }
                }}
              >
                {isSubmitting ? 'Guardando...' : 'Guardar Producto'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default ProductForm;
