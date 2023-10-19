import { forwardRef, useMemo } from 'react';
import { css } from '@emotion/react';
import type { Interpolation, Theme } from '@emotion/react';
import type { ButtonHTMLAttributes } from 'react';

const styles = css({
  cursor: 'pointer',

  '&:disabled': {
    opacity: '0.5',
    cursor: 'not-allowed',
  },
});

const variants = {
  normal: css({
    padding: '10px 12px',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: '0.25em',
    borderRadius: 8,
    border: 'none',
    fontSize: '16px',
    fontFamily: "'Inter', sans-serif",
    fontWeight: '600',
    '&:hover:not(:disabled)': {
      transition: '300ms',
      boxShadow: '0 1px 6px #556b2fa6',
    },
  }),
  filledIcon: css({
    display: 'flex',
    alignItems: 'center',
    borderRadius: 8,
    border: 'none',
  }),
  icon: css({
    padding: 0,
    display: 'flex',
    border: 'none',
    color: 'var(--fg)',
    background: 'none',
  }),
};

const colors = {
  primary: css({
    color: 'var(--white)',
    background: 'var(--primary)',
  }),
  secondary: css({
    color: 'var(--black)',
    background: 'var(--secondary)',
    border: 'thin solid var(--border)',
  }),
  accent: css({
    color: 'var(--white)',
    background: 'var(--accent)',
  }),
  error: css({
    color: 'var(--white)',
    background: 'var(--error)',
  }),
  errorOutline: css({
    color: 'var(--error)',
    background: 'transparent',
    border: 'thin solid var(--error)',
  }),
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  sx?: Interpolation<Theme>;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
  color?: keyof typeof colors;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    variant = 'normal',
    color = 'primary',
    startIcon,
    endIcon,
    sx,
    children,
    ...rest
  } = props;

  const isIcon = useMemo(() => variant === 'icon', [variant]);

  return (
    <button
      ref={ref}
      css={[styles, variants[variant], isIcon ? null : colors[color], sx]}
      {...rest}
    >
      {!isIcon && startIcon}
      {children}
      {!isIcon && endIcon}
    </button>
  );
});

export default Button;
