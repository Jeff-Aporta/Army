import { register_colors, Color, JS2CSS} from "@jeff-aporta/theme-manager";

global.identity ??= { colors: {} };

(() => {
  const primaries = {
    sky_blue: Color("#1e9cde"),
    lime_green: Color("#c6e50e"),
    water_blue: Color("#21ebef"),
    purple: Color("#1b053d"),
    springgreen: Color("rgb(0, 255, 127)"),
    white: Color("white"),
    black: Color("black"),
    dark_gray: Color("#132"),
    whitesmoke: Color("whitesmoke"),
    slategray: Color("slategray"),
    gray: Color("gray"),
    steelblue: Color("steelblue"),
    cornflowerblue: Color("cornflowerblue"),
    
    // Military themed colors
    military_green: Color("#4b5320"),      // Olive drab (classic army green)
    camo_green: Color("#53593f"),          // Camouflage green
    olive_green: Color("#708238"),         // Olive green (lighter)
    khaki: Color("#bfb878"),               // Khaki
    tactical_brown: Color("#594d3c"),      // Tactical brown
    desert_tan: Color("#d2b48c"),          // Desert tan
    dark_green: Color("#2e3d1d"),          // Dark military green
    tactical_black: Color("#1a1a1a"),      // Tactical black
  };

  const secundaries = {
    purple_emphasis: Color(`hsl(${primaries.purple.hue()}, 45%, 53%)`),
    bright_purple: Color(`hsl(${primaries.purple.hue()}, 100%, 80%)`),
    bright_sky_green: Color(`hsl(${primaries.sky_blue.hue()}, 100%, 80%)`),
    bright_lime_green: Color(`hsl(${primaries.lime_green.hue()}, 100%, 80%)`),
    lemongreen: primaries.lime_green,
    skygreen: primaries.sky_blue,
    
    // Military secondary colors - light/bright versions
    light_military_green: Color(`hsl(${primaries.military_green.hue()}, 60%, 50%)`),
    bright_military_green: Color(`hsl(${primaries.military_green.hue()}, 70%, 60%)`),
    pale_military_green: Color(`hsl(${primaries.military_green.hue()}, 35%, 65%)`),
    light_camo_green: Color(`hsl(${primaries.camo_green.hue()}, 30%, 60%)`),
    
    // Military secondary colors - dark versions
    dark_military_green: Color(`hsl(${primaries.military_green.hue()}, 70%, 25%)`),
    dark_camo_green: Color(`hsl(${primaries.camo_green.hue()}, 40%, 22%)`),
    dark_olive_green: Color(`hsl(${primaries.olive_green.hue()}, 60%, 20%)`),
    dark_khaki: Color(`hsl(${primaries.khaki.hue()}, 45%, 30%)`),
    dark_tactical_brown: Color(`hsl(${primaries.tactical_brown.hue()}, 50%, 20%)`),
    dark_desert_tan: Color(`hsl(${primaries.desert_tan.hue()}, 40%, 35%)`),
  };

  const all = {
    ...primaries,
    ...secundaries,
  };

  Object.assign(global.identity.colors, all);
  register_colors(all);

  return {
    primaries,
    secundaries,
  };
})();

const {
  sky_blue,
  lime_green,
  water_blue,

  bright_purple,
  purple_emphasis,
  purple,

  white,
  black,
  bright_sky_green,
  bright_lime_green,
  lemongreen,
  skygreen,
  springgreen,
  
  // Military themed colors
  military_green,
  camo_green,
  olive_green,
  khaki,
  tactical_brown,
  desert_tan,
  dark_green,
  tactical_black,
  light_military_green,
  bright_military_green,
  pale_military_green,
  light_camo_green,
  dark_military_green,
  dark_camo_green,
  dark_olive_green,
  dark_khaki,
  dark_tactical_brown,
  dark_desert_tan,
} = global.identity.colors;

function genHSL(name, color){
  return {
    [`--${name}`]: color.hex(),
    [`--${name}-h`]: color.hsl().object()["h"].toString()+"deg",
    [`--${name}-s`]: color.hsl().object()["s"].toString()+"%",
    [`--${name}-l`]: color.hsl().object()["l"].toString()+"%",
  }
}

JS2CSS.insertStyle({
  id: "palette-theme-colors",
  objJs: {
    ":root": {
      ...genHSL("sky-blue", sky_blue),
      ...genHSL("skygreen", sky_blue),
      ...genHSL("lime-green", lime_green),
      ...genHSL("lemongreen", lime_green),
      ...genHSL("water-blue", water_blue),
      ...genHSL("purple", purple),
      ...genHSL("purple-emphasis", purple_emphasis),
      ...genHSL("bright-purple", bright_purple),
      ...genHSL("bright-sky-green", bright_sky_green),
      ...genHSL("bright-lime-green", bright_lime_green),
      ...genHSL("springgreen", springgreen),
      
      // Military theme color CSS variables
      ...genHSL("military-green", military_green),
      ...genHSL("camo-green", camo_green),
      ...genHSL("olive-green", olive_green),
      ...genHSL("khaki", khaki),
      ...genHSL("tactical-brown", tactical_brown),
      ...genHSL("desert-tan", desert_tan),
      ...genHSL("dark-green", dark_green),
      ...genHSL("tactical-black", tactical_black),
      ...genHSL("light-military-green", light_military_green),
      ...genHSL("bright-military-green", bright_military_green),
      ...genHSL("pale-military-green", pale_military_green),
      ...genHSL("light-camo-green", light_camo_green),
      ...genHSL("dark-military-green", dark_military_green),
      ...genHSL("dark-camo-green", dark_camo_green),
      ...genHSL("dark-olive-green", dark_olive_green),
      ...genHSL("dark-khaki", dark_khaki),
      ...genHSL("dark-tactical-brown", dark_tactical_brown),
      ...genHSL("dark-desert-tan", dark_desert_tan),

      "--bg-table-dark": "rgba(0, 0, 0, 0.2)",
    },
  },
});

export default { status: "runned" };
