import { CSSProperties } from 'react';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';
export type TooltipAlignment = 'start' | 'center' | 'end';
export type ArrowProperties = Pick<
  CSSProperties,
  'top' | 'left' | 'bottom' | 'right'
>;
