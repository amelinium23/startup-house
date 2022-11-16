export function invertColor(hexColor: string) {
  const color = hexColor.indexOf('#') === 0 ? hexColor.substring(1, 7) : hexColor;
  const r = (255 - parseInt(color.substring(0, 2), 16)).toString(16);
  const g = (255 - parseInt(color.substring(2, 4), 16)).toString(16);
  const b = (255 - parseInt(color.substring(4, 6), 16)).toString(16);
  const rr = r.length === 1 ? '0' + r : r;
  const gg = g.length === 1 ? '0' + g : g;
  const bb = b.length === 1 ? '0' + b : b;
  return '#' + rr + gg + bb;
}
