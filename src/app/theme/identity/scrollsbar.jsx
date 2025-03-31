import Color from "color";

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
  bright_lime_green,
  springgreen,
  gray,
  military_green,
  khaki,
} = global.identity.colors;

export default ({ customizeScrollbar, color_register }) => {
  Object.assign(color_register.load_scrollsbar, {
    sky_blue(darkmode) {
      monochrome({ color: sky_blue, darkmode });
    },
    purple(darkmode) {
      monochrome({ color: purple_emphasis, darkmode });
    },
    lime_green(darkmode) {
      monochrome({ color: lime_green, darkmode });
    },
    springgreen(darkmode) {
      monochrome({ color: springgreen, darkmode });
    },
    gray(darkmode) {
      monochrome({ color: gray, darkmode });
    },
    military(darkmode) {
      monochrome({ color: military_green, darkmode });
    },
  });

  function monochrome({ color, darkmode }) {
   if (darkmode) {
     customizeScrollbar({
       main: color.hex(),
       maindark: color.darken(0.2).hex(),
       maindarker: color.darken(0.4).hex(),
       back: color.toBlack(0.5).hex(),
     });
   } else {
     customizeScrollbar({
       main: color.hex(),
       maindark: color.darken(0.2).hex(),
       maindarker: color.darken(0.4).hex(),
       back: color.toWhite(0.9).hex(),
     });
   }
 }
};
