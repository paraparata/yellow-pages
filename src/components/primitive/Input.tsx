import { forwardRef } from 'react';
import { css } from '@emotion/react';
import type { InputHTMLAttributes } from 'react';
import type { Interpolation, Theme } from '@emotion/react';

const variants = {
  normal: css({
    padding: 9,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    borderRadius: 9,
    background: 'var(--cream)',
    border: 'thin solid var(--border)',

    '& > input': {
      width: '101%',
      outline: 'none',
      border: 1,
      color: 'var(--fg)',
      background: 'transparent',
      fontSize: '1rem',
    },
  }),
};

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: keyof typeof variants;
  sx?: Interpolation<Theme>;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { variant = 'normal', startIcon, endIcon, sx, ...rest } = props;

  return (
    <div css={[variants[variant], sx]}>
      {startIcon}
      <input ref={ref} {...rest} />
      {endIcon}
    </div>
  );
});

export default Input;
