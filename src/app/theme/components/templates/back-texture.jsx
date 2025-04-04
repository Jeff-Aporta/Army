import JS2CSS from "@jeff-aporta/js2css";
import { getThemeName, isDark } from "@jeff-aporta/theme-manager";

import { discriminadorColor } from "@components/Fx/tools";

const {
  verde_cielo,
  verde_lima,
  azul_agua,
  blanco,
  negro,
  morado,
  morado_enfasis,
  morado_brillante,
  verde_cielo_brillante,
} = global.identity.colors;

function lightEffect() {
  if (isDark()) {
    return {};
  }
  return {
    "*": "invert() hue-rotate(180deg)",
  };
}

const PUBLIC_URL = process.env.PUBLIC_URL;

function bgwebp(){
  JS2CSS.insertStyle({
    id: "back-texture",
    objJs: {
      ".back-texture": {
        ...discriminadorColor(lightEffect()),
        background: `url("${PUBLIC_URL}/img/bg.webp")`,
      },
    },
  });
}

function bgdefault() {
  const themeName = getThemeName();
  let color_anillo, color_circulo;

  color_anillo = "rgba(255,255,255, 0.03)";
  color_circulo = "rgba(186, 85, 211, 0.1)";

  let radio_anillo = 35;
  let radio_agujero = (() => {
    const grosor = 7;
    return radio_anillo - grosor;
  })();
  radio_anillo = `max(${radio_anillo}dvw, 250px)`;
  radio_agujero = `max(${radio_agujero}dvw, 200px)`;
  JS2CSS.insertStyle({
    id: "back-texture",
    objJs: {
      ".back-texture": {
        ...discriminadorColor(lightEffect()),

        background: [
          linear({
            angle: "to bottom",
            colors: [
              "transparent 70%",
              "rgba(120,20,255,0.2)",
              "rgba(220,100,255,0.2) 98%",
              "rgba(220,100,255,0.3) calc(100% - 20px)",
            ],
          }),
          radio({
            colores: [color_anillo, "transparent"],
            radio: "max(70dvw, 600px)",
            x: "30%",
            y: "30px",
          }),
          circle({
            color: color_circulo,
            radio: `max(${20}dvw, 80px)`,
            x: "95%",
            y: "25%",
          }),
          ring({
            color: color_anillo,
            agujero: radio_agujero,
            radio: radio_anillo,
            x: "5dvw",
            y: "5dvw",
          }),
          ring({
            color: color_anillo,
            agujero: radio_agujero,
            radio: radio_anillo,
            x: "calc(20dvw + 50px)",
            y: "calc(40dvh + 50px)",
          }),
          ring({
            color: color_anillo,
            agujero: radio_agujero,
            radio: radio_anillo,
            x: "10%",
            y: "60%",
          }),
          ring({
            color: color_anillo,
            agujero: radio_agujero,
            radio: radio_anillo,
            x: "100%",
            y: "100%",
          }),
          ring({
            color: color_anillo,
            agujero: radio_agujero,
            radio: radio_anillo,
            x: "70%",
            y: "80%",
          }),
          radio({
            colores: [`rgba(20, 0, 70, 1)`, "transparent"],
            radio: "max(70dvw, 600px)",
            x: "70%",
            y: "600px",
          }),
        ].join(","),
      },
    },
  });
}

function portal() {
  JS2CSS.insertStyle({
    id: "back-texture",
    objJs: {
      ".back-texture": {
        ...discriminadorColor(lightEffect()),

        background: [
          linear({
            angle: "to top right",
            colors: [
              "rgba(255,0,255,0.3)",
              "rgba(150,0,255,0.3)",
              `transparent 40%`,
            ],
          }),
          linear({
            angle: "to top right",
            colors: [
              "transparent 60%",
              ...(isDark()
                ? [
                    "Indigo calc(60% + 2px)",
                    "Indigo calc(60% + 50px)",
                    "RebeccaPurple calc(60% + 52px)",
                  ]
                : ["transparent 60%"]),
            ],
          }),
          circle_hole({
            color: "rgba(255, 255, 255, 0.08)",
            radio: percent(38),
            x: "center",
            y: "center",
          }),
          ring({
            color: "rgba(255, 0, 255, 0.05)",
            agujero: percent(33),
            radio: `calc(${percent(33)} + 20px)`,
            x: "center",
            y: "center",
          }),
          ring({
            color: "rgba(255, 255, 255, 0.08)",
            agujero: percent(50),
            radio: percent(51),
            x: "center",
            y: "center",
          }),
        ].join(","),
      },
    },
  });
}

function percent(n) {
  return `calc(${n / 100} * max(100dvw, 100dvh))`;
}

function linear({ angle, colors }) {
  return `linear-gradient(${angle}, 
     ${colors.join(",")}
 )`;
}

function radio({ colores, radio, x, y }) {
  return `radial-gradient(circle ${radio} at ${x} ${y}, 
     ${colores.join(",")}
 )`;
}

function circle({ color, radio, x, y }) {
  return `radial-gradient(circle ${radio} at ${x} ${y}, 
     ${color} 100%,
     transparent 100%
 )`;
}

function circle_hole({ color, radio, x, y }) {
  return `radial-gradient(circle ${radio} at ${x} ${y}, 
     transparent 100%,
     ${color} 100%
 )`;
}

function ring({ color, radio, agujero, x, y }) {
  return `radial-gradient(circle ${radio} at ${x} ${y}, 
     transparent ${agujero}, 
     ${color} ${agujero}, 
     ${color} 100%,
     transparent 100%
 )`;
}

export { bgdefault, portal, bgwebp };
