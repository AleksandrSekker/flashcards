import React, { type FunctionComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { type ButtonGeneral, type ButtonProps } from './types/types';
import {
  getClassesByColorPrimary,
  getClassesByColorSecondary,
  getClassesByColorTertiary,
  getClassesBySize,
} from './utils/utils';

const Button: FunctionComponent<ButtonGeneral> = ({
  children,
  disabled,
  onClick,
  classes,
  icon,
  size,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={onClick ? 'button' : 'submit'}
      className={`font-2 min-w-100px rounded-lg p-4 text-sm font-medium transition-colors duration-200 ${classes.join(
        ' ',
      )} ${getClassesBySize(size ? size : 'md')}`}
    >
      {icon ? (
        <span className="mr-2">{<FontAwesomeIcon icon={icon} />}</span>
      ) : null}
      {children}
    </button>
  );
};

const PrimaryButton = ({
  children,
  disabled,
  onClick,
  icon,
  color,
  size,
}: ButtonProps) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      classes={
        disabled
          ? [...getClassesByColorPrimary(color ? color : 'blue').disabled]
          : [...getClassesByColorPrimary(color ? color : 'blue').regular]
      }
      icon={icon}
      size={size}
    >
      {children}
    </Button>
  );
};

const SecondaryButton: FunctionComponent<ButtonProps> = ({
  children,
  disabled,
  onClick,
  icon,
  color,
  size,
}: ButtonProps) => (
  <Button
    onClick={onClick}
    disabled={disabled}
    classes={
      disabled
        ? [...getClassesByColorSecondary(color ? color : 'blue').disabled]
        : [...getClassesByColorSecondary(color ? color : 'blue').regular]
    }
    icon={icon}
    size={size}
  >
    {children}
  </Button>
);

const TertiaryButton: FunctionComponent<ButtonProps> = ({
  children,
  disabled,
  onClick,
  icon,
  size,
  color,
}) => (
  <Button
    onClick={onClick}
    disabled={disabled}
    classes={
      disabled
        ? [...getClassesByColorTertiary(color ? color : 'blue').disabled]
        : [...getClassesByColorTertiary(color ? color : 'blue').regular]
    }
    icon={icon}
    size={size}
  >
    {children}
  </Button>
);

export { PrimaryButton, SecondaryButton, TertiaryButton, Button };
