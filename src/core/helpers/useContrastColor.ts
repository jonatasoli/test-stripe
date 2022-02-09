/**
 * Helper function used to find the best contrast color between black and white, based a given hexadecimal color code.
 *
 * @param { string } hexcolor hexadecimal code for the color
 * @returns reactive copy of the property
 */
export function useContrast(hexcolor: string): string {
  // If a leading # is provided, remove it
  if (hexcolor.slice(0, 1) === '#') {
    hexcolor = hexcolor.slice(1)
  }

  // If a three-character hexcode, make six-character
  if (hexcolor.length === 3) {
    hexcolor = hexcolor
      .split('')
      .map(hex => hex + hex)
      .join('')
  }

  // Convert to RGB value
  const r = parseInt(hexcolor.substr(0, 2), 16)
  const g = parseInt(hexcolor.substr(2, 2), 16)
  const b = parseInt(hexcolor.substr(4, 2), 16)

  // Get YIQ ratio (Y = Luminosity, I,Q = Color spectrum)
  const yiq = (r * 299 + g * 587 + b * 114) / 1000

  // Check contrast based on the concept that if a YIQ ratio is higher than 128, it's a light color and lower than 128
  // it's a darker color.
  return yiq >= 128 ? 'white' : 'black'
}
