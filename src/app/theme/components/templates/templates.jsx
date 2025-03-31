import React, { useLayoutEffect, useRef, useState, useEffect } from "react";

import "@theme/scss/main.scss";

import JS2CSS from "@jeff-aporta/js2css";
import fluidCSS from "@jeff-aporta/fluidcss";

import {} from "@identity/loader";
import { bgdefault, portal, bgwebp } from "./back-texture";

import { Toaster } from "react-hot-toast";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import toast from "react-hot-toast";

import CursorLight from "@components/Fx/cursor-light";
import Footer from "@components/templates/menu/footer";
import MenuTopUnlog from "@components/templates/menu/head-main";

import {
  setThemeName,
  getTheme,
  getThemeName,
  getThemeLuminance,
  setThemeLuminance,
  isDark,
} from "@jeff-aporta/theme-manager";

import { ThreeBackground } from "@components/templates/mesh";
import { getAllProducts } from "@app/db/services/productService";
import { seedDatabase } from "@app/db/seedData";

const minH = "min-h-80vh";

const themeSwitch_listener = [];

function Notifier({ children }) {
  return (
    <Themized>
      {children}
      <Toaster />
    </Themized>
  );

  function Themized({ children }) {
    return (
      <ThemeProvider theme={getTheme()}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    );
  }
}

function ThemeSwitcher({ children, urlShader, bgtype = "1", bgstyle={}, h_init = "0", h_fin = "0" }) {
  const [theme_name, updateThemeName] = useState(getThemeName());
  const [theme_luminance, updateThemeLuminance] = useState(getThemeLuminance());
  const [loading, setLoading] = useState(false);

  const loadProducts = () => {
    setLoading(true);
    setTimeout(() => {
      try {
        // First check if we have products, if not seed the database
        let loadedProducts = getAllProducts();
        
        if (loadedProducts.length === 0) {
          // Seed the database with sample products
          loadedProducts = seedDatabase();
          toast.success("Base de datos inicializada con productos de prueba", { 
            icon: '📦',
            duration: 3000,
          });

          window.location.reload();
        }
      } catch (error) {
        console.error("Error loading products:", error);
        toast.error("Error al cargar productos", { duration: 4000 });
      } finally {
        setLoading(false);
      }
    }, 500); // Simulated loading delay
  };

  useEffect(() => {
    // Load products when component mounts
    loadProducts();
  }, []);

  if (theme_name != getThemeName()) {
    setThemeName(theme_name);
    window.localStorage.setItem("theme-name", theme_name);
  }

  if (theme_luminance != getThemeLuminance()) {
    setThemeLuminance(theme_luminance);
    window.localStorage.setItem("theme-luminance", theme_luminance);
  }

  useLayoutEffect(() => {
    themeSwitch_listener.forEach((fn) => fn(theme_name, theme_luminance));
  }, [theme_name, theme_luminance]);

  return (
    <Notifier>
      <FirstPart />
      {/* <ThreeBackground urlShader={urlShader} /> */}
      <Footer updateThemeName={updateThemeName} getThemeName={getThemeName} />
      <CursorLight />
    </Notifier>
  );

  function FirstPart() {
    return (
      <div className="p-relative">
        <div
          className={(() => {
            const fluid = fluidCSS();
            switch (bgtype) {
              case "webp":
                bgstyle = {
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  opacity: "0.1",
                }
                bgwebp();
                break;
              default:
              case "1":
                bgdefault();
                fluid.ltX(800, {
                  opacity: ["0.5", "1"],
                });
                break;
              case "2":
              case "portal":
                fluid
                  .btwX(550, 800, {
                    opacity: ["0", "0.5", "1"],
                  })
                  .ltX(550, {
                    display: "none",
                  });
                portal();
                break;
            }
            return fluid.end(
              `expand back-texture dyn-filter z-index-1`
            );
          })()}
          style={bgstyle}
        />
        <div className={`${minH}`}>
          <MenuTopUnlog updateTheme={updateThemeLuminance} />
          <div style={{ minHeight: h_init }} />
          {children}
          <div style={{ minHeight: h_fin }} />
        </div>
      </div>
    );
  }
}

export { ThemeSwitcher, themeSwitch_listener };
