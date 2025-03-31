import "./head-main.css";

import {
  Button,
  Link,
  Paper,
  Typography,
  Tooltip,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Badge,
  Menu,
  InputBase,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Divider,
  useMediaQuery
} from "@mui/material";

import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import CategoryIcon from '@mui/icons-material/Category';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ContactsIcon from '@mui/icons-material/Contacts';

import { ImageLocal } from "@recurrent";
import fluidCSS from "@jeff-aporta/fluidcss";
import { LuminanceThemeSwitch } from "@components/templates/menu/switch";

import {
  isDark,
  controlComponents,
  getThemeName,
  href,
} from "@jeff-aporta/theme-manager";
import { useState } from "react";

const hideIcon = 500;
const wbrk = 600;

// Get color values from global identity
const { 
  military_green, 
  dark_military_green, 
  light_military_green,
  khaki,
  white,
  black
} = global.identity.colors;

// Styled components for search
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: isDark() ? alpha(white.hex(), 0.15) : alpha(military_green.hex(), 0.1),
  '&:hover': {
    backgroundColor: isDark() ? alpha(white.hex(), 0.25) : alpha(military_green.hex(), 0.2),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: isDark() ? 'inherit' : military_green.hex(),
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

//-------------------------------------

export default HeadMain;

//------------ definitions ------------

function HeadMain({ updateTheme = () => 0 }) {
  const { pathname } = window.location;
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:900px)');
  const themeName = getThemeName();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    // Handle search functionality if needed
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleLoginClick = () => {
    handleMenuClose();
    window.location.href = href("/login");
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const menuId = 'primary-search-account-menu';
  const isMenuOpen = Boolean(anchorEl);

  // Navigation links
  const navLinks = [
    { text: 'Inicio', icon: <HomeIcon />, href: href('/') },
    { text: 'Tienda', icon: <CategoryIcon />, href: href('/store') },
    { text: 'Sobre Nosotros', icon: <InfoIcon />, href: href('/about') },
    { text: 'Contacto', icon: <ContactsIcon />, href: href('/contact') },
  ];

  // Get text colors based on theme
  const getTextColor = () => {
    if (isDark()) {
      return white.hex();
    } else {
      if (themeName == "main") {
        return military_green.hex();
      }
      return black.hex();
    }
  };

  const getSubTextColor = () => {
    if (isDark()) {
      if (themeName == "main") {
        return khaki.hex();
      }
    } else {
      if (themeName == "main") {
        return military_green.hex();
      }
    }
    return themeName;
  };

  // Drawer for mobile navigation
  const drawer = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Army
        </Typography>
        <Typography variant="subtitle2">
          Productos tácticos y militares
        </Typography>
      </Box>
      <Divider />
      <List>
        {navLinks.map((link) => (
          <ListItem disablePadding key={link.text}>
            <ListItemButton
              component="a"
              href={href(link.href)}
            >
              <ListItemIcon>
                {link.icon}
              </ListItemIcon>
              <ListItemText primary={link.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  // Profile menu
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      PaperProps={{
        style: { marginTop: '40px' }
      }}
    >
      <MenuItem onClick={handleLoginClick}>Iniciar Sesión</MenuItem>
      <MenuItem onClick={handleMenuClose}>Mi Perfil</MenuItem>
      <MenuItem onClick={handleMenuClose}>Mis Pedidos</MenuItem>
      <MenuItem onClick={handleMenuClose}>Cerrar Sesión</MenuItem>
    </Menu>
  );

  return (
    <div
      className={fluidCSS()
        .lerpX([400, 1000], { padding: [5, 15] })
        .end("menu-top")}
      style={{
        background: [`rgba(${white.red()}, ${white.green()}, ${white.blue()}, 0.25)`, `rgba(${black.red()}, ${black.green()}, ${black.blue()}, 0.25)`][+isDark()],
      }}
    >
      <div className="d-space-between-center w-100">
        {/* Left side - Logo and title */}
        <div className="d-flex align-items-center">
          {isMobile && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          )}
          <BotonInicio />
        </div>
        
        {/* Center - Navigation for desktop */}
        {!isMobile && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {navLinks.map((link) => (
              <Button 
                key={link.text}
                color="inherit"
                href={href(link.href)}
                sx={{ 
                  mx: 1,
                  color: getTextColor(),
                  '&:hover': {
                    bgcolor: alpha(getTextColor(), 0.1),
                  }
                }}
              >
                {link.text}
              </Button>
            ))}
          </Box>
        )}
        
        {/* Right side - Search, Cart, Profile and Theme Toggle */}
        <div className="d-flex align-items-center">
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Buscar productos…"
              inputProps={{ 'aria-label': 'search' }}
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Search>
          
          <IconButton
            size="large"
            aria-label="show items in cart"
            color="inherit"
            sx={{ color: getTextColor() }}
          >
            <Badge badgeContent={4} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
            sx={{ color: getTextColor() }}
          >
            <AccountCircleIcon />
          </IconButton>
          
          <Tooltip title={"Cambiar a tema " + (isDark() ? "claro" : "oscuro")}>
            <Box sx={{ 
              ml: 1, 
              display: 'flex', 
              alignItems: 'center',
              height: '100%',
              mt: '7px'
            }}>
              <LuminanceThemeSwitch
                checked={isDark()}
                onChange={() => updateTheme(isDark() ? "light" : "dark")}
              />
            </Box>
          </Tooltip>
        </div>
      </div>
      
      {/* Mobile drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        {drawer}
      </Drawer>
      
      {/* Profile menu */}
      {renderMenu}
    </div>
  );
}

function BotonInicio() {
  const themeName = getThemeName();
  return (
    <Link
      color="inherit"
      underline="none"
      href={href("/")}
      className="d-center bright-hover-1-5 gap-15px c-pointer"
    >
      <ImageLocal
        src="img/logo-main.svg"
        width="40"
        className={fluidCSS()
          .lerpX([450, 1000], { width: [30, 50] })
          .end()}
      />
      <div
        className={fluidCSS()
          .lerpX([400, 1000], { fontSize: [15, 20] })
          .end("d-flex-col")}
      >
        <Typography
          color={(()=> {
            if (isDark()) {
              return white.hex();
            }else{
              if (themeName == "main") {
                return military_green.hex();
              }
              return black.hex();
            }
          })()}
          className={fluidCSS()
            .lerpX([400, 1000], { fontSize: [18, 30] })
            .end("poppins")}
        >
          Army
        </Typography>
        <Typography
          style={{
            fontFamily: "lemonmilk-rg",
            fontSize: "45%",
          }}
          color={(()=> {
            if (isDark()) {
              if (themeName == "main") {
                return khaki.hex();
              }
            }else{
              if (themeName == "main") {
                return military_green.hex();
              }
            }
            return themeName;
          })()}
        >
          Productos tácticos y militares
        </Typography>
      </div>
    </Link>
  );
}
