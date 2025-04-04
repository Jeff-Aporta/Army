import Color from "color";

import { Checkbox, Input } from "@mui/material";

import {PaletteMonochrome} from "@jeff-aporta/theme-manager";

class PaletteBase extends PaletteMonochrome {
  constructor(props) {
    super(props);
  }

  componentsMUI({ constants_color, darkmode }) {
    const colors = {
      ...constants_color,
      ...this.colors(darkmode),
      ...(global?.identity?.colors ?? {})
    };
    const { lime_green, sky_blue, white, cancel } = colors;

    function colorized(color){
      return {
        background: [
          color.hex(),
          color.darken(0.2).hex(),
        ][Number(darkmode)],
        "&:hover": {
          backgroundColor: color.hex(),
        },
      };
    }

    const lime_green_ = colorized(lime_green); 
    const sky_blue_ = colorized(sky_blue); 
    const lemongreen = lime_green_;
    const skygreen = sky_blue_;

    return {
      ...super.componentsMUI({ colors, darkmode }),
      Button: {
        primary: {
          color: white.hex(),
        },
        lime_green: lime_green_,
        sky_blue: sky_blue_,
        lemongreen,
        skygreen,
        cancel: {
          background: darkmode
            ? cancel.color.darken(0.2).hex()
            : cancel.color.hex(),
          "&:hover": {
            backgroundColor: cancel.color.hex(),
          },
        },
      },
    };
  }

  control_components(darkmode) {
    const _THIS_ = this;
    const enfasis_input = [this.name_color, this.name_contrast][+darkmode];
    return {
      ...super.control_components(darkmode),
      enfasis_input,
      themized: {
        Checkbox(props) {
          return <Checkbox color={enfasis_input} {...props} />;
        },
        Input(props) {
          return <Input color={enfasis_input} {...props} />;
        },
      },
    };
  }

  colors(darkmode) {
    const { white, black } = global.identity.colors;
    const colors_contrast = [white, black];
    const color_contrast = colors_contrast[+darkmode];
    const color_uncontrast = colors_contrast[1 - darkmode];

    let p_color = this.main_color;
    if(!this.isMain){
      p_color = p_color.darken(0.2);
    }
    if (darkmode) {
      p_color = p_color.toBlack(0.2);
    }

    return {
      ...super.colors(darkmode),
      primary: {
        color: p_color,
        text: color_contrast,
      },
      secondary: {
        color: this.main_color.toGray(0.5).darken(0.2),
        text: color_contrast,
      },
    };
  }

  willLoad(darkmode) {
    this.color_register.load_scrollsbar[this.scrollname || this.name_color](darkmode);
  }
}

export { PaletteBase };
