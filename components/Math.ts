export const bin = (value: boolean): 0 | 1 => (value ? 1 : 0);

export const mix = (value, x, y) => {
  'worklet';
  return x + value * (y - x);
};

export const fract = x => {
  'worklet';
  return x - Math.floor(x);
};

export const clamp = (value, lowerBound, upperBound) => {
  'worklet';
  return Math.min(Math.max(lowerBound, value), upperBound);
};

export const cubicBezier = (t, from, c1, c2, to) => {
  'worklet';
  const term = 1 - t;
  const a = 1 * term ** 3 * t ** 0 * from;
  const b = 3 * term ** 2 * t ** 1 * c1;
  const c = 3 * term ** 1 * t ** 2 * c2;
  const d = 1 * term ** 0 * t ** 3 * to;
  return a + b + c + d;
};

export const round = (value, precision = 0) => {
  'worklet';
  const p = Math.pow(10, precision);
  return Math.round(value * p) / p;
};

export const canvas2Cartesian = ({x, y}, center) => {
  'worklet';
  return {
    x: x - center.x,
    y: -1 * (y - center.y),
  };
};

export const cartesian2Canvas = ({x, y}, center) => {
  'worklet';
  return {
    x: x + center.x,
    y: -1 * y + center.y,
  };
};

export const cartesian2Polar = ({x, y}) => {
  'worklet';
  return {
    theta: Math.atan2(y, x),
    radius: Math.sqrt(x ** 2 + y ** 2),
  };
};

export const polar2Cartesian = ({theta, radius}) => {
  'worklet';
  return {
    x: radius * Math.cos(theta),
    y: radius * Math.sin(theta),
  };
};

export const polar2Canvas = ({theta, radius}, center) => {
  'worklet';
  return cartesian2Canvas(polar2Cartesian({theta, radius}), center);
};

export const canvas2Polar = ({x, y}, center) => {
  'worklet';
  return cartesian2Polar(canvas2Cartesian({x, y}, center));
};
