import {} from "@identity/colors";

import { Main, MilitarySlate } from "@identity/palettes/main";
import scrollbar from "@identity/scrollsbar";

import { packLoadPalette, load_scrollbar, init, getTheme } from "@jeff-aporta/theme-manager";

const militarySlate = new MilitarySlate(packLoadPalette);
packLoadPalette.color_register["main"] = militarySlate;

load_scrollbar(scrollbar);

init()

export default {status:"runned"};
