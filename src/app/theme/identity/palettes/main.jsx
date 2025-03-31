import { PaletteBase } from "@identity/palettes/PaletteBase";


const {
  purple_emphasis,
  lime_green,
  purple,
  bright_purple,
  light_camo_green,
  sky_blue,
  bright_sky_green,
  bright_lime_green,
  springgreen,
  dark_gray,
  whitesmoke,
  slategray,
  steelblue,
  cornflowerblue,
  military_green,
  khaki,
  light_military_green,
  pale_military_green,
  dark_green,
  desert_tan,
  bright_military_green,
} = global.identity.colors;

class Main extends PaletteBase {
  constructor(props) {
    super({
      isMain: true,
      main_color: purple_emphasis,
      name_color: "purple_emphasis",
      scrollname: "purple",
      constrast_color: lime_green,
      name_contrast: "lime_green",
      main_bright_color: bright_purple,
      name_bright_color: "bright_purple",
      ...props,
    });
  }
}

class MilitarySlate extends PaletteBase {
  constructor(props) {
    super({
      main_color: military_green,
      name_color: "military_green",
      scrollname: "military",
      constrast_color: khaki,
      name_contrast: "khaki",
      main_bright_color: pale_military_green,
      name_bright_color: "pale_military_green",
      ...props,
    });
  }
}

class Lemongreen extends PaletteBase {
  constructor(props) {
    super({
      main_color: lime_green,
      name_color: "lime_green",
      constrast_color: bright_purple,
      name_contrast: "bright_purple",
      main_bright_color: bright_lime_green,
      name_bright_color: "bright_lime_green",
      ...props,
    });
  }
}

class Skygreen extends PaletteBase {
  constructor(props) {
    super({
      main_color: sky_blue,
      name_color: "sky_blue",
      constrast_color: lime_green,
      name_contrast: "lime_green",
      main_bright_color: bright_sky_green,
      name_bright_color: "bright_sky_green",
      ...props,
    });
  }
}

class Springgreen extends PaletteBase {
  constructor(props) {
    super({
      main_color: springgreen,
      name_color: "springgreen",
      constrast_color: purple_emphasis,
      name_contrast: "purple_emphasis",
      main_bright_color: springgreen,
      name_bright_color: "springgreen",
      ...props,
    });
  }
}

class MilitaryGreen extends PaletteBase {
  constructor(props) {
    super({
      main_color: dark_green,
      name_color: "dark_green",
      scrollname: "gray",
      constrast_color: desert_tan,
      name_contrast: "desert_tan",
      main_bright_color: bright_military_green,
      name_bright_color: "bright_military_green",
      ...props,
    });
  }
}

export { Main, MilitarySlate, MilitaryGreen, Lemongreen, Skygreen, Springgreen };
