export const colors =
  '$gray-1 #f7fafc;$gray-2 #edf2f7;$gray-3 #e2e8f0;$gray-4 #cbd5e0;$gray-5 #a0aec0;$gray-6 #718096;$gray-7 #4a5568;$gray-8 #2d3748;$gray-9 #1a202c;$red-1 #fff5f5;$red-2 #fed7d7;$red-3 #feb2b2;$red-4 #fc8181;$red-5 #f56565;$red-6 #e53e3e;$red-7 #c53030;$red-8 #9b2c2c;$red-9 #742a2a;$orange-1 #fffaf0;$orange-2 #feebc8;$orange-3 #fbd38d;$orange-4 #f6ad55;$orange-5 #ed8936;$orange-6 #dd6b20;$orange-7 #c05621;$orange-8 #9c4221;$orange-9 #7b341e;$yellow-1 #fffff0;$yellow-2 #fefcbf;$yellow-3 #faf089;$yellow-4 #f6e05e;$yellow-5 #ecc94b;$yellow-6 #d69e2e;$yellow-7 #b7791f;$yellow-8 #975a16;$yellow-9 #744210;$green-1 #f0fff4;$green-2 #c6f6d5;$green-3 #9ae6b4;$green-4 #68d391;$green-5 #48bb78;$green-6 #38a169;$green-7 #2f855a;$green-8 #276749;$green-9 #22543d;$teal-1 #e6fffa;$teal-2 #b2f5ea;$teal-3 #81e6d9;$teal-4 #4fd1c5;$teal-5 #38b2ac;$teal-6 #319795;$teal-7 #2c7a7b;$teal-8 #285e61;$teal-9 #234e52;$blue-1 #ebf8ff;$blue-2 #bee3f8;$blue-3 #90cdf4;$blue-4 #63b3ed;$blue-5 #4299e1;$blue-6 #3182ce;$blue-7 #2b6cb0;$blue-8 #2c5282;$blue-9 #2a4365;$indigo-1 #ebf4ff;$indigo-2 #c3dafe;$indigo-3 #a3bffa;$indigo-4 #7f9cf5;$indigo-5 #667eea;$indigo-6 #5a67d8;$indigo-7 #4c51bf;$indigo-8 #434190;$indigo-9 #3c366b;$purple-1 #faf5ff;$purple-2 #e9d8fd;$purple-3 #d6bcfa;$purple-4 #b794f4;$purple-5 #9f7aea;$purple-6 #805ad5;$purple-7 #6b46c1;$purple-8 #553c9a;$purple-9 #44337a;$pink-1 #fff5f7;$pink-2 #fed7e2;$pink-3 #fbb6ce;$pink-4 #f687b3;$pink-5 #ed64a6;$pink-6 #d53f8c;$pink-7 #b83280;$pink-8 #97266d;$pink-9 #702459;'

// from tailwind
export const textSizes = {
  xs: '.75rem',
  sm: '.875rem',
  base: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
  '4xl': '2.25rem',
  '5xl': '3rem',
  '6xl': '4rem'
}

// define from biggest to smallest (for now)
export const breakpoints = {
  uw: '3440px',
  xl: '1200px',
  lg: '992px',
  md: '768px',
  sm: '576px'
}

type Breakpoint = keyof typeof breakpoints

export const isBreakpoint = (name: Breakpoint) =>
  window.innerWidth >= parseInt(breakpoints[name], 10)
export const getCurrentBreakpoint = () =>
  (Object.keys(breakpoints) as Breakpoint[]).find(isBreakpoint)

const shadowMap = {
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  outline: '0 0 0 3px rgba(66, 153, 225, 0.5)',
  none: 'none'
}

const dirMap = {
  up: 'min',
  down: 'max'
}

const calcRem = (x: number) => x * 0.25 + 'rem'
const makeRemHelper = (prefix: string) => (x: number, dirs: string) => {
  const rem = calcRem(x)
  return dirs
    ? dirs
        .split('')
        .map(d => prefix + d + ' ' + rem)
        .join(';')
    : prefix + ' ' + rem
}

export const helpers = {
  pad: makeRemHelper('p'),
  mar: makeRemHelper('m'),
  'font-sans':
    'ff -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
  'font-serif': 'ff Georgia, Cambria, "Times New Roman", Times, serif',
  'font-mono': 'ff Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  rounded: 'br .25rem',
  text: (key: keyof typeof textSizes) => 'font-size ' + (textSizes[key] || textSizes.base),
  shadow: (size: keyof typeof shadowMap) => 'box-shadow ' + (shadowMap[size] || shadowMap.base),
  size: (x: number, y = x) => `width ${calcRem(x)}; height ${calcRem(y)}`,
  'flex-center': 'd flex;jc center;ai center',
  '@resp': (type: Breakpoint, dir: keyof typeof dirMap) =>
    `@media (${dirMap[dir || 'up']}-width: ${breakpoints[type]})`,
  '@between': (a: Breakpoint, b: Breakpoint) =>
    `@media (min-width: ${breakpoints[a]}) and (max-width: ${breakpoints[b]})`,
  'limit-lines': (x: number) =>
    `display -webkit-box;-webkit-box-orient vertical;-webkit-line-clamp ${x};overflow hidden`,
  anim: 'transition'
}
