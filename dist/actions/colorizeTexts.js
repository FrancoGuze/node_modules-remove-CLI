import { colors } from "../utils/colors.js";
export const colorizeTexts = (color, text) => {
    return `${color}${text}${colors.reset}`;
};
