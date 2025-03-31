import React from 'react';
import { Container, Typography, Box, Grid, Paper, Divider, Button, useMediaQuery, Link } from '@mui/material';
import { ThemeSwitcher } from "@templates";
import { DivM } from "@containers";
import { isDark } from "@jeff-aporta/theme-manager";
import { ImageLocal } from "@recurrent";

// Military themed icons
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import SecurityIcon from '@mui/icons-material/Security';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

// Icons for company details
import InfoIcon from '@mui/icons-material/Info';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkIcon from '@mui/icons-material/Link';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

// Get color values from global identity
const { 
  military_green, 
  dark_military_green, 
  light_military_green,
  tactical_brown,
  khaki,
  white,
  black
} = global.identity.colors;

// Function to get link color based on theme
const getLinkColor = () => isDark() ? 'bright_military_green' : 'primary.main';

// Reusable icon circle component
const IconCircle = ({ icon }) => (
  <Box sx={{ 
    width: 40, 
    height: 40, 
    borderRadius: '50%', 
    bgcolor: isDark() ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    mr: 2
  }}>
    {React.cloneElement(icon, { color: isDark() ? "white" : "primary" })}
  </Box>
);

// Reusable contact item component with optional link
const ContactItem = ({ icon, content, isLink = false, href = '' }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
    <IconCircle icon={icon} />
    {isLink ? (
      <Link
        href={href}
        target="_blank" 
        rel="noopener"
        color={getLinkColor()}
        sx={{ textDecoration: 'none' }}
      >
        {content}
      </Link>
    ) : (
      <Typography color={isDark() ? white.hex() : black.hex()}>
        {content}
      </Typography>
    )}
  </Box>
);

const AboutView = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  
  // Core values of the military-themed company
  const coreValues = [
    {
      title: "Calidad Superior",
      description: "Todos nuestros productos tácticos y militares cumplen con los más altos estándares de calidad y durabilidad para soportar las condiciones más extremas.",
      icon: <MilitaryTechIcon fontSize="large" sx={{ color: military_green.hex() }} />
    },
    {
      title: "Experiencia Táctica",
      description: "Con años de experiencia en el sector militar, entendemos las necesidades específicas de nuestros clientes y ofrecemos productos que superan las expectativas.",
      icon: <SecurityIcon fontSize="large" sx={{ color: military_green.hex() }} />
    },
    {
      title: "Compromiso",
      description: "Nos comprometemos a proveer equipamiento táctico confiable, duradero y funcional para profesionales y entusiastas del mundo militar.",
      icon: <VerifiedUserIcon fontSize="large" sx={{ color: military_green.hex() }} />
    },
    {
      title: "Distribución Nacional",
      description: "Contamos con una amplia red de distribución que garantiza entregas rápidas y seguras a todo el país.",
      icon: <LocalShippingIcon fontSize="large" sx={{ color: military_green.hex() }} />
    }
  ];
  
  return (
    <ThemeSwitcher
      bgtype="webp"
      h_init="10px"
      h_fin="100px"
    >
      <DivM m_max={20} className="d-flex-col min-h-80vh">
        <Container maxWidth="lg" sx={{ py: 8 }}>
          {/* Hero Section */}
          <Box mb={8} textAlign="center">
            <Typography 
              variant="h3" 
              component="h1" 
              fontWeight="bold"
              color={isDark() ? white.hex() : military_green.hex()}
              gutterBottom
            >
              Sobre Army
            </Typography>
            <Typography 
              variant="h5" 
              color={isDark() ? khaki.hex() : dark_military_green.hex()}
              sx={{ mb: 4 }}
            >
              Equipamiento táctico de alta calidad con años de experiencia
            </Typography>
            <Divider sx={{ mb: 4 }} />
          </Box>
          
          {/* About Company Section */}
          <Grid container spacing={6} alignItems="center" mb={8}>
            <Grid item xs={12} md={6}>
              <Box 
                component="img"
                src="https://picsum.photos/seed/armyteam/800/600"
                alt="Equipo Army"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 2,
                  boxShadow: 3
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography 
                variant="h4" 
                component="h2" 
                fontWeight="bold"
                color={isDark() ? white.hex() : military_green.hex()}
                gutterBottom
              >
                Nuestra Historia
              </Typography>
              <Typography 
                variant="body1" 
                paragraph
                color={isDark() ? white.hex() : black.hex()}
              >
                Army nació como una pequeña tienda especializada en equipamiento táctico militar hace más de 15 años. 
                Fundada por ex-militares con amplia experiencia en el campo, nos hemos convertido en líderes del mercado 
                gracias a nuestro profundo conocimiento del sector y nuestro compromiso inquebrantable con la calidad.
              </Typography>
              <Typography 
                variant="body1" 
                paragraph
                color={isDark() ? white.hex() : black.hex()}
              >
                Desde nuestros inicios, nos hemos dedicado a desarrollar y seleccionar productos tácticos y militares 
                que cumplan con los más altos estándares de durabilidad, funcionalidad y rendimiento. Entendemos que 
                nuestros clientes confían en nuestros productos en situaciones críticas.
              </Typography>
              <Typography 
                variant="body1"
                color={isDark() ? white.hex() : black.hex()}
              >
                Hoy, Army es reconocida por ofrecer equipamiento táctico y militar de primera clase, atendiendo las necesidades
                específicas de profesionales de la seguridad, entusiastas del aire libre y coleccionistas de todo el país.
              </Typography>
            </Grid>
          </Grid>
          
          {/* Core Values Section */}
          <Box mb={8}>
            <Typography 
              variant="h4" 
              component="h2" 
              fontWeight="bold"
              color={isDark() ? white.hex() : military_green.hex()}
              textAlign="center"
              gutterBottom
              sx={{ mb: 4 }}
            >
              Nuestros Valores
            </Typography>
            <Grid container spacing={3}>
              {coreValues.map((value, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Paper 
                    elevation={3} 
                    sx={{ 
                      p: 3, 
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      bgcolor: isDark() ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.9)',
                      borderTop: `3px solid ${military_green.hex()}`,
                    }}
                  >
                    <Box mb={2}>
                      {value.icon}
                    </Box>
                    <Typography 
                      variant="h6" 
                      component="h3" 
                      fontWeight="bold"
                      color={isDark() ? khaki.hex() : military_green.hex()}
                      gutterBottom
                    >
                      {value.title}
                    </Typography>
                    <Typography 
                      variant="body2"
                      color={isDark() ? white.hex() : black.hex()}
                    >
                      {value.description}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
          
          {/* Mission & Vision Section */}
          <Box 
            sx={{ 
              p: 4, 
              borderRadius: 2,
              bgcolor: isDark() ? 'rgba(0,0,0,0.5)' : light_military_green.hex() + '20',
              mb: 8
            }}
          >
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography 
                  variant="h5" 
                  component="h3" 
                  fontWeight="bold"
                  color={isDark() ? white.hex() : military_green.hex()}
                  gutterBottom
                >
                  Nuestra Misión
                </Typography>
                <Typography 
                  variant="body1"
                  color={isDark() ? white.hex() : black.hex()}
                >
                  Proveer equipamiento táctico y militar de la más alta calidad, diseñado para 
                  resistir las condiciones más extremas, satisfaciendo las necesidades específicas 
                  de nuestros clientes con productos confiables, funcionales y duraderos.
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography 
                  variant="h5" 
                  component="h3" 
                  fontWeight="bold"
                  color={isDark() ? white.hex() : military_green.hex()}
                  gutterBottom
                >
                  Nuestra Visión
                </Typography>
                <Typography 
                  variant="body1"
                  color={isDark() ? white.hex() : black.hex()}
                >
                  Ser reconocidos como el proveedor líder de equipamiento táctico y militar en el mercado nacional, 
                  estableciendo estándares de calidad y servicio que superen consistentemente las expectativas de 
                  nuestros clientes.
                </Typography>
              </Grid>
            </Grid>
          </Box>
          
          {/* Contact CTA Section */}
          <Box 
            sx={{ 
              textAlign: 'center',
              p: 4,
              borderRadius: 2,
              bgcolor: isDark() ? 'rgba(75,83,32,0.3)' : 'rgba(255,255,255,0.8)',
              mb: 4
            }}
          >
            <Typography 
              variant="h5" 
              fontWeight="bold"
              color={isDark() ? white.hex() : military_green.hex()}
              gutterBottom
            >
              ¿Listo para equiparte con lo mejor?
            </Typography>
            <Typography 
              variant="body1"
              color={isDark() ? white.hex() : black.hex()}
              sx={{ mb: 3 }}
            >
              Visita nuestra tienda o contáctanos para conocer nuestra amplia gama de productos tácticos y militares.
            </Typography>
            <Button 
              variant="contained" 
              size="large"
              href="/contact"
              sx={{ 
                bgcolor: military_green.hex(),
                color: white.hex(),
                '&:hover': {
                  bgcolor: dark_military_green.hex()
                }
              }}
            >
              Contáctanos
            </Button>
          </Box>
          
          {/* Company Details Section */}
          <Box 
            sx={{ 
              p: 4, 
              borderRadius: 2,
              bgcolor: isDark() ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.9)',
              mb: 4
            }}
          >
            <Typography 
              variant="h5" 
              component="h3" 
              fontWeight="bold"
              color={isDark() ? white.hex() : military_green.hex()}
              gutterBottom
            >
              Detalles
            </Typography>
            
            <Typography 
              variant="body1" 
              paragraph
              color={isDark() ? white.hex() : black.hex()}
              sx={{ mb: 3 }}
            >
              Somos Army, una compañía que llega con los mejores productos tácticos y militares gracias a años de experiencia en el mercado. 
              Invertimos en desarrollar una conexión personal con todos y cada uno de nuestros clientes.
            </Typography>
            
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <ContactItem 
                  icon={<LocationOnIcon />}
                  content="calle 4 # 1-16, Buga, Colombia"
                  isLink={true}
                  href="https://www.google.com/maps/search/?api=1&query=calle+4+%231-16+Buga+Colombia"
                />
                
                <ContactItem 
                  icon={<WhatsAppIcon />}
                  content="317 2853385"
                  isLink={true}
                  href="https://api.whatsapp.com/send?phone=573172853385&text=Hola%20Army%20Store%2C%20estoy%20interesado%20en%20sus%20productos."
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <ContactItem 
                  icon={<EmailIcon />}
                  content="army.storebuga@gmail.com"
                />
                
                <ContactItem 
                  icon={<InstagramIcon />}
                  content="armystore.buga"
                  isLink={true}
                  href="https://instagram.com/armystore.buga"
                />
                
                <ContactItem 
                  icon={<LinkIcon />}
                  content="bit.ly/EnviarMensajeArmyStore"
                  isLink={true}
                  href="https://bit.ly/EnviarMensajeArmyStore"
                />
              </Grid>
            </Grid>
            
            <Box sx={{ mt: 0 }}>
              <ContactItem 
                icon={<AccessTimeIcon />}
                content="Horarios de atención"
              />
              
              <Box sx={{ display: 'flex', flexDirection: 'column', ml: 7, mt: 0 }}>
                <Typography variant="body2" color={isDark() ? white.hex() : black.hex()}>
                  Lunes a Viernes: 9:00 AM - 6:00 PM
                </Typography>
                <Typography variant="body2" color={isDark() ? white.hex() : black.hex()}>
                  Sábados: 9:00 AM - 4:00 PM
                </Typography>
                <Typography variant="body2" color={isDark() ? white.hex() : black.hex()}>
                  Domingos: Cerrado
                </Typography>
              </Box>
            </Box>
            
            <Box sx={{ mt: 2 }}>
              <ContactItem 
                icon={<LocalShippingIcon />}
                content="Servicios"
              />
              
              <Box sx={{ display: 'flex', flexDirection: 'column', ml: 7 }}>
                <Typography variant="body2" color={isDark() ? white.hex() : black.hex()}>
                  • Entrega a domicilio
                </Typography>
                <Typography variant="body2" color={isDark() ? white.hex() : black.hex()}>
                  • Retiro en el negocio
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </DivM>
    </ThemeSwitcher>
  );
};

export default AboutView;
