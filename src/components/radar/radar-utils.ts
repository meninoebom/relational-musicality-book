import { MAX_VALUE } from '../../data/practices';

export interface Point {
  x: number;
  y: number;
}

/** Convert polar to cartesian coordinates */
export function polarToXY(cx: number, cy: number, radius: number, angleRad: number): Point {
  return {
    x: cx + radius * Math.cos(angleRad),
    y: cy + radius * Math.sin(angleRad),
  };
}

/** Angle for axis i (starting from top, going clockwise) */
export function axisAngle(i: number, numAxes: number): number {
  return (2 * Math.PI * i) / numAxes - Math.PI / 2;
}

/** Convert scores to polygon vertex points */
export function polygonPoints(scores: number[], cx: number, cy: number, maxRadius: number): Point[] {
  return scores.map((s, i) => {
    const r = (s / MAX_VALUE) * maxRadius;
    const a = axisAngle(i, scores.length);
    return polarToXY(cx, cy, r, a);
  });
}

/** Format points array as SVG points string */
export function pointsToString(pts: Point[]): string {
  return pts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
}

/** Determine text-anchor for a label at the given angle */
export function textAnchorForAngle(angle: number): string {
  const x = Math.cos(angle);
  if (Math.abs(x) < 0.15) return 'middle';
  return x > 0 ? 'start' : 'end';
}

/** Calculate label offset based on angle */
export function labelOffset(angle: number): { dx: number; dy: number } {
  const x = Math.cos(angle);
  const y = Math.sin(angle);
  return {
    dx: Math.abs(x) < 0.15 ? 0 : (x > 0 ? 6 : -6),
    dy: Math.abs(y) < 0.15 ? (y >= 0 ? 14 : -8) : (y > 0 ? 4 : -2),
  };
}

/** Build SVG grid (rings + spokes + optional labels) */
export function buildGridSVG(
  cx: number,
  cy: number,
  maxR: number,
  numAxes: number,
  axisLabels: readonly string[],
  showLabels: boolean,
  labelSize: string,
): string {
  let svg = '';

  // Grid rings
  for (let level = 1; level <= MAX_VALUE; level++) {
    const r = (level / MAX_VALUE) * maxR;
    const pts: Point[] = [];
    for (let i = 0; i < numAxes; i++) {
      pts.push(polarToXY(cx, cy, r, axisAngle(i, numAxes)));
    }
    const opacity = level === 3 ? 0.2 : 0.08;
    const dash = level === 3 ? '3,3' : 'none';
    svg += `<polygon points="${pointsToString(pts)}" fill="none" stroke="#666" stroke-opacity="${opacity}" stroke-width="0.8" stroke-dasharray="${dash}"/>`;
  }

  // Axis spokes
  for (let i = 0; i < numAxes; i++) {
    const a = axisAngle(i, numAxes);
    const end = polarToXY(cx, cy, maxR, a);
    svg += `<line x1="${cx}" y1="${cy}" x2="${end.x.toFixed(1)}" y2="${end.y.toFixed(1)}" stroke="#666" stroke-opacity="0.12" stroke-width="0.8"/>`;
  }

  // Labels
  if (showLabels) {
    for (let i = 0; i < numAxes; i++) {
      const a = axisAngle(i, numAxes);
      const lp = polarToXY(cx, cy, maxR + 14, a);
      const off = labelOffset(a);
      const anchor = textAnchorForAngle(a);
      svg += `<text x="${(lp.x + off.dx).toFixed(1)}" y="${(lp.y + off.dy).toFixed(1)}" text-anchor="${anchor}" fill="#777" font-size="${labelSize}" font-family="'Inter Variable', -apple-system, system-ui, sans-serif">${axisLabels[i]}</text>`;
    }
  }

  return svg;
}

/** Build SVG polygon + vertex dots for one practice */
export function buildPolygonSVG(
  scores: number[],
  cx: number,
  cy: number,
  maxR: number,
  color: string,
  fillOpacity: number,
  strokeOpacity: number,
  strokeWidth: number,
): string {
  const pts = polygonPoints(scores, cx, cy, maxR);
  const dots = pts
    .map(p => `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="2.5" fill="${color}" opacity="${strokeOpacity}"/>`)
    .join('');
  return (
    `<polygon points="${pointsToString(pts)}" fill="${color}" fill-opacity="${fillOpacity}" stroke="${color}" stroke-opacity="${strokeOpacity}" stroke-width="${strokeWidth}"/>` +
    dots
  );
}
