export type Coordinates = [number, number]; // [latitude, longitude]

export const BENIN_MAP_BOUNDS = {
  west: 0.72,
  east: 3.86,
  south: 6.05,
  north: 12.32,
};

export const BENIN_OUTLINE_PATH = `M 62.793,96.695 L 36.473,98.542 L 28.629,87.615 L 30.079,51.120 L 23.664,47.836 L 22.454,40.004 L 11.395,34.408 L 1.667,29.686 L 5.719,21.253 L 16.671,19.438 L 23.159,12.421 L 38.726,10.920 L 45.684,6.114 L 56.375,1.400 L 67.791,1.359 L 92.076,10.615 L 90.835,15.950 L 97.997,25.460 L 91.722,31.904 L 95.078,36.204 L 79.629,46.089 L 69.819,50.977 L 63.815,61.021 L 64.620,71.135 L 62.793,96.695 Z`;

export const BENIN_OUTLINE = [[6.258817, 2.691702], [6.142158, 1.865241], [6.832038, 1.618951], [9.12859, 1.664478], [9.334624, 1.463043], [9.825395, 1.425061], [10.175607, 1.077795], [10.470808, 0.772336], [10.997339, 0.899563], [11.110511, 1.24347], [11.547719, 1.447178], [11.64115, 1.935986], [11.94015, 2.154474], [12.233052, 2.490164], [12.235636, 2.848643], [11.660167, 3.61118], [11.327939, 3.572216], [10.734746, 3.797112], [10.332186, 3.60007], [10.06321, 3.705438], [9.444153, 3.220352], [9.137608, 2.912308], [8.506845, 2.723793], [7.870734, 2.749063], [6.258817, 2.691702]] as [number, number][];

function mercatorY(lat: number) {
  const rad = (lat * Math.PI) / 180;
  return Math.log(Math.tan(Math.PI / 4 + rad / 2));
}

export function projectToBeninMap([lat, lon]: Coordinates) {
  const x = ((lon - BENIN_MAP_BOUNDS.west) / (BENIN_MAP_BOUNDS.east - BENIN_MAP_BOUNDS.west)) * 100;
  const max = mercatorY(BENIN_MAP_BOUNDS.north);
  const min = mercatorY(BENIN_MAP_BOUNDS.south);
  const y = ((max - mercatorY(lat)) / (max - min)) * 100;
  return {
    x: Math.max(0, Math.min(100, x)),
    y: Math.max(0, Math.min(100, y)),
    left: `${Math.max(0, Math.min(100, x))}%`,
    top: `${Math.max(0, Math.min(100, y))}%`,
  };
}

export function isInsideBenin([lat, lon]: Coordinates) {
  // Ray-casting in geographic space. This is intentionally based on the same
  // WGS84 outline used to draw the map, so "You" cannot appear outside Benin.
  const x = lon;
  const y = lat;
  let inside = false;
  for (let i = 0, j = BENIN_OUTLINE.length - 1; i < BENIN_OUTLINE.length; j = i++) {
    const yi = BENIN_OUTLINE[i][0], xi = BENIN_OUTLINE[i][1];
    const yj = BENIN_OUTLINE[j][0], xj = BENIN_OUTLINE[j][1];
    const intersects = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / ((yj - yi) || Number.EPSILON) + xi);
    if (intersects) inside = !inside;
  }
  return inside;
}

export function buildRoutePath(from: { x: number; y: number }, to: { x: number; y: number }) {
  const dx = to.x - from.x;
  const bend = Math.max(5, Math.min(14, Math.abs(dx) * 0.12));
  const c1x = from.x + dx * 0.34;
  const c2x = to.x - dx * 0.34;
  const c1y = from.y - bend;
  const c2y = to.y - bend;
  return `M ${from.x} ${from.y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${to.x} ${to.y}`;
}
