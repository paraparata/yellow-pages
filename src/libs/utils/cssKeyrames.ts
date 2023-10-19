import { css, keyframes } from '@emotion/react';

const ping = keyframes`
    75%, 100% {
      transform: scale(2);
      opacity: 0;
    }
`;

export const animPing = css({
  animation: `${ping} 1s cubic-bezier(0,0,.2,1) infinite`,
});

const pulse = keyframes`
    50% {
      opacity: 0.5;
    }
`;

export const animPulse = css({
  animation: `${pulse} 2s cubic-bezier(.4,0,.6,1) infinite`,
});
