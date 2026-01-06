import { colors } from "../utils/colors.js";
export const colorizeTexts = (color: string,text: string ) => {
  return `${color}${text}${colors.reset}`;
};