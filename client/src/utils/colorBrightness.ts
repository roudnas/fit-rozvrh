import {DEFAULT_THEME} from '../components/ThemeDropdown'

/**
 * Converts the @see hexColor from HEX to RGB.
 * @param hexColor The HEX input color
 * @returns The RGB color
 */
function hexToRgb(hexColor: string) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor);
    var r = result ? parseInt(result[1], 16) : 0;
    return result ? {
      r: parseInt(result[1], 16).toString(),
      g: parseInt(result[2], 16).toString(),
      b: parseInt(result[3], 16).toString()
    } : null;
  }

/**
 * The brightness treshold
 */
export const BRIGHTNESS_TRESHOLD = 100;

/**
 * Computes the pseudo brightness from the @see hexColor. For more see the @link https://stackoverflow.com/a/11868159
 * @param hexColor The HEX input color
 * @returns The brightness
 */
export function getHexBrightness(hexColor: string) {
    const rgb = hexToRgb(hexColor);
    return rgb ? (Math.round(((parseInt(rgb.r) * 299) +
    (parseInt(rgb.g) * 587) +
    (parseInt(rgb.b) * 114)) / 1000)) : 0;
  }
/**
 * Computes the text color according to the background color so it is visible.
 * Uses the @see BRIGHTNESS_TRESHOLD to determine if to use the @see DEFAULT_THEME.lightText or @see DEFAULT_THEME.darkText 
 * @param backgroundCol The background color
 * @returns The corresponding text color
 */
export function getContrastTextColor(backgroundCol: string) {
    const brightness = getHexBrightness(backgroundCol);
    return brightness < BRIGHTNESS_TRESHOLD ? DEFAULT_THEME.lightText : DEFAULT_THEME.darkText;
}