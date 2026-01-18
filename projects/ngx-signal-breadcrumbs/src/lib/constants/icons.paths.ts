export const ICON_PATHS = {
  'home': {
    d: 'M1 6V15H6V11C6 9.89543 6.89543 9 8 9C9.10457 9 10 9.89543 10 11V15H15V6L8 0L1 6Z',
    viewBox: '0 0 16 16',
    isSolid: true
  },
  'chevron-right': {
    d: 'M9 18L15 12L9 6',
    viewBox: '0 0 24 24',
    isSolid: false
  },
  'arrow-right': {
    d: 'M4 12H20M14 6L20 12L14 18',
    viewBox: '0 0 24 24',
    isSolid: false
  },
  'dot': {
    d: 'M12 12C12 13.1046 11.1046 14 10 14C8.89543 14 8 13.1046 8 12C8 10.8954 8.89543 10 10 10C11.1046 10 12 10.8954 12 12Z',
    viewBox: '0 0 20 20',
    isSolid: true
  },
  'slash': {
    d: 'M4 16L16 4',
    viewBox: '0 0 20 20',
    isSolid: false
  },
  'pipe': {
    d: 'M10 2V18',
    viewBox: '0 0 20 20',
    isSolid: false
  }
} as const;

export type IconName = keyof typeof ICON_PATHS;