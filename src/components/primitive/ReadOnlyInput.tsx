import Button from './Button';
import copyToClipboard from '@/libs/utils/copyToClipboard';
import { ClipboardText } from '@phosphor-icons/react';
import { useRef } from 'react';
import { css } from '@emotion/react';
import type { Interpolation, Theme } from '@emotion/react';

const variants = {
  normal: css({
    padding: 9,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1.5rem',
    borderRadius: 9,
    color: 'var(--fg)',
    background: 'var(--cream)',
    border: 'thin solid var(--border)',
  }),
};

interface ReadOnlyInputProps {
  value: string;
  variant?: keyof typeof variants;
  sx?: Interpolation<Theme>;
  startIcon?: JSX.Element;
}

const ReadOnlyInput: React.FC<ReadOnlyInputProps> = ({
  value,
  variant = 'normal',
  startIcon,
  sx,
}) => {
  const textRef = useRef<HTMLSpanElement>(null);

  const handleCopy = () => {
    if (textRef.current) copyToClipboard(textRef.current);
  };

  return (
    <div css={[variants[variant], sx]}>
      {startIcon}
      <span ref={textRef}>{value}</span>
      <Button
        variant='icon'
        aria-label='copy to clipboard'
        sx={{ opacity: 0.5 }}
        onClick={handleCopy}
      >
        <ClipboardText size={20} weight='light' />
      </Button>
    </div>
  );
};

export default ReadOnlyInput;
