import { animPing } from '@/libs/utils/cssKeyrames';
import { css } from '@emotion/react';
import { Star } from '@phosphor-icons/react';
import type { Interpolation, Theme } from '@emotion/react';

const avaStyles = {
  circle: css({
    position: 'relative',
    color: 'var(--white)',
    fontWeight: 600,
    width: 'calc(1em * 2.5)',
    aspectRatio: '1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'var(--accent)',
    borderRadius: '50%',
    textTransform: 'uppercase',
  }),
  anim: css({
    '& > span:nth-of-type(1)': css(
      {
        position: 'absolute',
        height: '60%',
        width: '60%',
        background: 'var(--accent)',
        borderRadius: '100%',
      },
      animPing
    ),
  }),
};

interface AvatarProps {
  alias?: string;
  isFavorite?: boolean;
  animate?: boolean;
  sx?: Interpolation<Theme>;
}

const Avatar: React.FC<AvatarProps> = ({
  alias = 'o,o',
  isFavorite,
  animate,
  sx,
}) => (
  <div
    css={[
      {
        padding: '8px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      sx,
    ]}
  >
    <div css={[avaStyles.circle, animate ? avaStyles.anim : {}]}>
      <span></span>
      <span>{alias || 'o,o'}</span>
      {isFavorite && (
        <Star
          size={35}
          weight='fill'
          css={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            color: '#ffad00',
          }}
        />
      )}
    </div>
  </div>
);

export default Avatar;
