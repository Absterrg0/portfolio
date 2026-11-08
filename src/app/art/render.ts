// Procedural ASCII renderers. Each one draws a frame for a given grid size and time (seconds).
// Everything here is plain 7-bit ASCII and has no dependencies, so the server can render the
// first frame and the browser can keep animating the same picture.

export type Renderer = (cols: number, rows: number, t: number) => string;

// Light to heavy. Index with a density in [0, 1].
const RAMP = " .,:;-=+*#%@";

function ramp(d: number, chars = RAMP) {
  if (d <= 0) return " ";
  const i = Math.min(chars.length - 1, Math.floor(d * chars.length));
  return chars[i];
}

// Deterministic hash noise in [0, 1).
function hash(x: number, y: number) {
  let h = Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}

function smooth(t: number) {
  return t * t * (3 - 2 * t);
}

// 1D value noise and a few octaves of it.
function noise1(x: number, seed: number) {
  const i = Math.floor(x);
  const f = x - i;
  return hash(i, seed) + (hash(i + 1, seed) - hash(i, seed)) * smooth(f);
}

function noise2(x: number, y: number, seed: number) {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = smooth(x - ix);
  const fy = smooth(y - iy);
  const a = hash(ix + seed, iy);
  const b = hash(ix + 1 + seed, iy);
  const c = hash(ix + seed, iy + 1);
  const d = hash(ix + 1 + seed, iy + 1);
  return a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy;
}

// Terminal cells are taller than they are wide. JetBrains Mono advances 0.6em; lines are 1em.
const CELL = 0.6;

/* ------------------------------------------------------------------------------------------ */
/* A moon over three ridges and a lake that reflects them.                                    */
/* ------------------------------------------------------------------------------------------ */

export const landscape: Renderer = (cols, rows, t) => {
  const aspect = (cols * CELL) / rows; // world width when height is 1
  const horizon = 0.72;
  const moon = { x: aspect * 0.7, y: 0.27, r: 0.19 };

  // Three ridges, far to near. Each has a skyline (0 = top of frame) and a fill density.
  const ridges = [
    { base: 0.66, amp: 0.3, scale: 1.5, seed: 11, fill: 0.1 },
    { base: 0.7, amp: 0.2, scale: 2.4, seed: 29, fill: 0.3 },
    { base: 0.73, amp: 0.13, scale: 3.6, seed: 47, fill: 0.55 },
  ];
  const tops = ridges.map((ridge, k) => {
    const line: number[] = [];
    for (let c = 0; c <= cols + 1; c++) {
      const x = (c / cols) * 2.2;
      let n = 0;
      let amp = 0.6;
      let f = ridge.scale;
      for (let o = 0; o < 3; o++) {
        n += amp * noise1(x * f + k * 7.3, ridge.seed + o * 13);
        amp *= 0.38;
        f *= 2.2;
      }
      line.push(ridge.base - ridge.amp * Math.pow(n / 0.83, 1.6) * 1.35);
    }
    return line;
  });

  // Density of the scene above the waterline at cell (c, r); returns [char, density].
  const scene = (c: number, r: number, twinkle: boolean): [string, number] => {
    const x = ((c + 0.5) / cols) * aspect;
    const y = (r + 0.5) / rows;
    const cellH = 1 / rows;
    for (let k = ridges.length - 1; k >= 0; k--) {
      const top = tops[k][c];
      if (y + cellH * 0.5 < top) continue;
      const left = tops[k][Math.max(0, c - 1)];
      const right = tops[k][c + 1];
      if (y - cellH * 0.5 < top) {
        // the skyline cell: pick a stroke from the slope across it
        const rise = (left - right) * rows * 0.5;
        if (left > top && right > top && Math.abs(left - right) * rows < 0.6) return ["^", 0.5];
        if (rise > 0.45) return ["/", 0.5];
        if (rise < -0.45) return ["\\", 0.5];
        return [y > top ? "-" : "_", 0.45];
      }
      // the face: a little lighter on the side that faces the moon, darker lower down
      const facing = (left - right) * rows * (x < moon.x ? 1 : -1);
      const depth = Math.min(1, (y - top) * 4);
      const grain = hash(c * 7 + k, r * 3) - 0.5;
      const d = ridges[k].fill * (0.6 + 0.5 * depth) + 0.05 * facing + 0.12 * grain;
      if (k === 0) return [" ", d];
      // hatch on alternate cells so the faces read as tone, not as a solid block
      const odd = (c + r) % 2 === 1;
      if (k === 1) return [odd && d > 0.26 ? "." : " ", d];
      if (odd) return [d > 0.5 ? ":" : d > 0.3 ? "." : " ", d];
      return [d > 0.62 ? "." : " ", d];
    }

    // the moon: a drawn rim, pale inside, with darker seas and a shadowed edge
    const dx = (x - moon.x) / moon.r;
    const dy = (y - moon.y) / moon.r;
    const d2 = dx * dx + dy * dy;
    const inside = (cc: number, rr: number) => {
      const ex = (((cc + 0.5) / cols) * aspect - moon.x) / moon.r;
      const ey = ((rr + 0.5) / rows - moon.y) / moon.r;
      return ex * ex + ey * ey <= 1;
    };
    if (d2 <= 1) {
      const up = !inside(c, r - 1);
      const down = !inside(c, r + 1);
      const left = !inside(c - 1, r);
      const right = !inside(c + 1, r);
      if (up || down || left || right) {
        if (up && left) return ["/", 0.4];
        if (up && right) return ["\\", 0.4];
        if (down && left) return ["\\", 0.4];
        if (down && right) return ["/", 0.4];
        if (up) return ["-", 0.4];
        if (down) return ["-", 0.4];
        return [left ? "(" : ")", 0.4];
      }
      const seas = [
        [-0.32, -0.28, 0.3],
        [0.12, -0.42, 0.18],
        [-0.05, 0.22, 0.26],
        [0.38, 0.1, 0.16],
      ].some(([sx, sy, sr]) => (dx - sx) ** 2 + ((dy - sy) * 1.1) ** 2 < sr * sr);
      const shade = dx * 0.8 + dy * 0.35; // the side away from the light
      if (shade > 0.55) return [shade > 0.8 ? ":" : (c + r) % 2 ? ":" : ".", 0.3];
      if (shade > 0.3 && (c + r) % 2) return [".", 0.3];
      if (seas) return [(c + r) % 2 ? "." : " ", 0.3];
      return [" ", 0.3];
    }
    // stars, fewer near the hills
    const h = hash(c, r);
    if (h < 0.014 * Math.max(0, 1 - y / 0.55)) {
      const kind = hash(r, c + 99);
      if (twinkle && Math.sin(t * (0.8 + kind * 1.6) + kind * 40) < -0.7) return [" ", 0];
      return [kind > 0.92 ? "*" : kind > 0.75 ? "+" : ".", 0.08];
    }
    return [" ", 0];
  };

  const out: string[] = [];
  for (let r = 0; r < rows; r++) {
    const y = (r + 0.5) / rows;
    let line = "";
    for (let c = 0; c < cols; c++) {
      if (y < horizon) {
        line += scene(c, r, true)[0];
        continue;
      }
      const x = ((c + 0.5) / cols) * aspect;
      const below = (y - horizon) / (1 - horizon); // 0 at the shore, 1 at the bottom

      // the moon's path: one stroke per row under the moon, wider toward the viewer
      const half = moon.r * (0.25 + below * 0.85) * (0.75 + 0.25 * Math.sin(t * 1.3 + r * 2.1));
      const off = Math.abs(x - moon.x + Math.sin(r * 1.7 + t * 0.9) * 0.012) / half;
      if (off < 1 && (r % 2 === 0 || below < 0.25)) {
        line += off < 0.4 ? "=" : "-";
        continue;
      }
      if (off < 1.6 && hash(c + Math.floor(t * 2) * 31, r) < 0.25) {
        line += "-";
        continue;
      }

      // open water: broken horizontal strokes that drift, closer together near the shore
      const len = 3 + Math.floor(below * 9);
      const drift = t * (0.5 + hash(r, 3) * 0.7) * (r % 2 ? 1 : -1);
      const pos = c + drift + hash(r, 9) * 50;
      const seg = Math.floor(pos / len);
      const within = (pos - seg * len) / len;
      const reflect = scene(c, Math.max(0, Math.floor((horizon - (y - horizon) * 1.2) * rows)), false)[1];
      const odds = 0.2 + (1 - below) * 0.12 + (reflect > 0.25 ? 0.25 : 0);
      if (hash(seg, r * 31) < odds && within < 0.55 + hash(seg, r) * 0.3) line += "-";
      else line += " ";
    }
    out.push(line);
  }
  return out.join("\n");
};

/* ------------------------------------------------------------------------------------------ */
/* A cut gem turning slowly, like the ones in Fox Dash.                                      */
/* ------------------------------------------------------------------------------------------ */

type V3 = [number, number, number];

function norm(v: V3): V3 {
  const l = Math.hypot(v[0], v[1], v[2]);
  return [v[0] / l, v[1] / l, v[2] / l];
}

// A long six-sided crystal: two pyramids joined at a hexagonal waist.
const CRYSTAL_SIDES = 6;
const gemPlanes: { n: V3; d: number }[] = (() => {
  const planes: { n: V3; d: number }[] = [];
  const R = 0.62;
  for (const apexY of [1.05, -0.75]) {
    const apex: V3 = [0, apexY, 0];
    for (let i = 0; i < CRYSTAL_SIDES; i++) {
      const b0 = (i / CRYSTAL_SIDES) * Math.PI * 2;
      const b1 = ((i + 1) / CRYSTAL_SIDES) * Math.PI * 2;
      const v1: V3 = [R * Math.cos(b0), 0, R * Math.sin(b0)];
      const v2: V3 = [R * Math.cos(b1), 0, R * Math.sin(b1)];
      const e1: V3 = [v2[0] - v1[0], v2[1] - v1[1], v2[2] - v1[2]];
      const e2: V3 = [apex[0] - v1[0], apex[1] - v1[1], apex[2] - v1[2]];
      let n = norm([e1[1] * e2[2] - e1[2] * e2[1], e1[2] * e2[0] - e1[0] * e2[2], e1[0] * e2[1] - e1[1] * e2[0]]);
      // point it away from the centre
      if (n[0] * v1[0] + n[1] * v1[1] + n[2] * v1[2] < 0) n = [-n[0], -n[1], -n[2]];
      planes.push({ n, d: n[0] * apex[0] + n[1] * apex[1] + n[2] * apex[2] });
    }
  }
  return planes;
})();

export const gem: Renderer = (cols, rows, t) => {
  const ay = t * 0.6;
  const tilt = 0.22;
  const cy = Math.cos(ay);
  const sy = Math.sin(ay);
  const ct = Math.cos(tilt);
  const st = Math.sin(tilt);
  // world -> object: undo tilt about x, then spin about y
  const toObj = (v: V3): V3 => {
    const y1 = v[1] * ct + v[2] * st;
    const z1 = -v[1] * st + v[2] * ct;
    const x1 = v[0];
    return [x1 * cy - z1 * sy, y1, x1 * sy + z1 * cy];
  };
  const toWorld = (v: V3): V3 => {
    const x1 = v[0] * cy + v[2] * sy;
    const z1 = -v[0] * sy + v[2] * cy;
    const y1 = v[1];
    return [x1, y1 * ct - z1 * st, y1 * st + z1 * ct];
  };
  const light = norm([-0.45, 0.5, 0.75]);
  const view: V3 = [0, 0, 1];
  const scale = 1.15;
  const aspect = (cols * CELL) / rows;

  const out: string[] = [];
  for (let r = 0; r < rows; r++) {
    let line = "";
    for (let c = 0; c < cols; c++) {
      const px = (((c + 0.5) / cols) * 2 - 1) * aspect * scale;
      const py = (1 - ((r + 0.5) / rows) * 2) * scale + 0.15;
      // orthographic ray from z=+3 toward -z, clipped by every plane (convex polytope)
      const o = toObj([px, py, 3]);
      const dir = toObj([0, 0, -1]);
      let tin = -Infinity;
      let tout = Infinity;
      let hit: V3 | null = null;
      let face = 0;
      for (let pi = 0; pi < gemPlanes.length; pi++) {
        const p = gemPlanes[pi];
        const dn = p.n[0] * dir[0] + p.n[1] * dir[1] + p.n[2] * dir[2];
        const on = p.n[0] * o[0] + p.n[1] * o[1] + p.n[2] * o[2];
        if (Math.abs(dn) < 1e-9) {
          if (on > p.d) {
            tin = Infinity;
            break;
          }
          continue;
        }
        const tp = (p.d - on) / dn;
        if (dn < 0) {
          if (tp > tin) {
            tin = tp;
            hit = p.n;
            face = pi;
          }
        } else if (tp < tout) tout = tp;
      }
      if (!hit || tin > tout) {
        line += " ";
        continue;
      }
      const n = toWorld(hit);
      const diffuse = Math.max(0, n[0] * light[0] + n[1] * light[1] + n[2] * light[2]);
      // a little specular sparkle on faces that bounce the light at us
      const h = norm([light[0] + view[0], light[1] + view[1], light[2] + view[2]]);
      const spec = Math.pow(Math.max(0, n[0] * h[0] + n[1] * h[1] + n[2] * h[2]), 24);
      // light passing through the stone comes back out of the lower facets
      const through = Math.max(0, -n[1]) * 0.25;
      const d = 0.12 + 0.6 * diffuse + 0.3 * spec + through + 0.06 * (face % 3);
      line += ramp(Math.min(0.999, d), " .:-=+*#");
    }
    out.push(line);
  }
  return out.join("\n");
};

/* ------------------------------------------------------------------------------------------ */
/* A voice waveform for Circe: bars that rise and fall like someone talking.                  */
/* ------------------------------------------------------------------------------------------ */

export const waveform: Renderer = (cols, rows, t) => {
  const mid = (rows - 1) / 2;
  const reach = mid + 0.5;
  const out: string[] = [];
  const heights: number[] = [];
  for (let c = 0; c < cols; c++) {
    const x = c / (cols - 1);
    // a phrase: loud in the middle, quieter at both ends, with syllables riding on top
    const phrase = Math.pow(Math.sin(Math.PI * x), 1.4);
    const syllables =
      0.5 +
      0.3 * Math.sin(x * 19 - t * 3.1) +
      0.2 * Math.sin(x * 47 + t * 4.3 + Math.sin(t * 0.9) * 3);
    const grain = noise2(c * 0.7, t * 2.6, 5);
    heights.push(c % 2 ? -1 : Math.max(0, Math.min(1, phrase * syllables * (0.55 + 0.7 * grain))));
  }
  for (let r = 0; r < rows; r++) {
    let line = "";
    const dist = Math.abs(r - mid) / reach;
    for (let c = 0; c < cols; c++) {
      const h = heights[c];
      if (h < 0) line += " ";
      else if (dist === 0) line += h < 0.12 ? "." : "|";
      else if (dist <= h) line += dist > h - 1 / reach ? ":" : "|";
      else line += " ";
    }
    out.push(line);
  }
  return out.join("\n");
};

export const renderers = { landscape, gem, waveform } as const;
export type ArtName = keyof typeof renderers;
