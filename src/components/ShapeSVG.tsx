import type { ShapeName } from '../types/game';

interface Props {
  shape: ShapeName;
  size?: number;
  color?: string;
}

export function ShapeSVG({ shape, size = 120, color = '#6366F1' }: Props) {
  switch (shape) {
    case 'SQUARE':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <rect x="10" y="10" width="80" height="80" fill={color} rx="4" />
        </svg>
      );
    case 'RECTANGLE':
      return (
        <svg width={size * 1.5} height={size} viewBox="0 0 150 100">
          <rect x="10" y="15" width="130" height="70" fill={color} rx="4" />
        </svg>
      );
    case 'TRIANGLE':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <polygon points="50,8 95,92 5,92" fill={color} />
        </svg>
      );
  }
}
