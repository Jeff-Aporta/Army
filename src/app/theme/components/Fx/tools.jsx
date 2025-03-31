import { getThemeName } from "@jeff-aporta/theme-manager";

const {
  sky_blue,
  lime_green,
  water_blue,
  white,
  black,
  purple,
  purple_emphasis,
  bright_purple,
  bright_sky_green,
  springgreen,
  military_green,
  khaki,
} = global.identity.colors;

function discriminadorColor(extra = "") {
  const themeName = getThemeName();
  return {
    filter: (() => {
      let r;
      switch (themeName) {
        case "main":
          r = rotación(military_green);
          break;
        case "lemongreen":
          r = rotación(lime_green);
          break;
        case "springgreen":
          r = rotación(springgreen);
          break;
        default:
          r = "";
          break;
      }
      const extras = [];
      Object.entries(extra).forEach(([key, value]) => {
        if (key == "*") {
          return extras.push(value);
        }
        const queries = key.split(",").map((k) => k.trim());
        if (queries.includes(themeName)) {
          extras.push(value);
        }
      });
      return [r, ...extras].filter(Boolean).join(" ");
    })(),
  };

  function rotación(color) {
    return `hue-rotate(${parseInt(
      -bright_purple.hue() + color.hue()
    )}deg) grayscale(0.5)`;
  }
}

export { discriminadorColor };
