import { type ReactNode } from 'react';
import { type IconProp } from '@fortawesome/fontawesome-svg-core';

interface ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  children: ReactNode;
  color?: 'blue' | 'red' | 'green';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  icon?: IconProp;
}
interface ButtonGeneral extends ButtonProps {
  classes: string[];
}

export type { ButtonProps, ButtonGeneral };
