import Avatar from '@/components/primitive/Avatar';
import Button from '@/components/primitive/Button';
import useIntersection from '@/libs/hooks/useIntersection';
import { Star } from '@phosphor-icons/react';
import { forwardRef, useRef } from 'react';
import { animPulse } from '@/libs/utils/cssKeyrames';
import { useLocation } from 'wouter';
import type { CallbackIntersection } from '@/libs/hooks/useIntersection';

interface ContactMiniCardProps {
  id: number;
  firstName: string;
  lastName: string;
  phones: { number: string }[];
  hasLoader?: boolean;
  isFavorite?: boolean;
  onClickFavorite?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface LastContactMiniCardProps
  extends Omit<ContactMiniCardProps, 'hasLoader'> {
  isLoading: boolean;
  onVisible: (arg: CallbackIntersection) => void;
}

export const LastContactMiniCard: React.FC<LastContactMiniCardProps> = ({
  isLoading,
  onVisible,
  ...props
}) => {
  const elRef = useRef<HTMLDivElement>(null);

  useIntersection({
    el: elRef,
    opts: { threshold: 1 },
    cb: ({ entries, ...args }) => {
      if (entries.some((entry) => entry.isIntersecting))
        onVisible({ entries, ...args });
    },
  });

  return <ContactMiniCard ref={elRef} hasLoader={isLoading} {...props} />;
};

const ContactMiniCard = forwardRef<HTMLDivElement, ContactMiniCardProps>(
  (props, ref) => {
    const {
      id,
      firstName,
      lastName,
      phones,
      hasLoader,
      isFavorite,
      onClickFavorite,
    } = props;
    const [, setLocation] = useLocation();
    const clippedPhones = phones.slice(0, 2);
    const restLength = phones.length - clippedPhones.length;

    return (
      <>
        <div
          ref={ref}
          css={{
            cursor: 'pointer',
            padding: '8px 12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            background: 'var(--cream)',
            borderRadius: 4,
            '&:hover': {
              filter: 'brightness(1.025)',
            },
          }}
          onClick={() => setLocation(`/detail/${id}`)}
        >
          <Avatar
            alias={firstName[0] + lastName[0]}
            sx={{ fontSize: '16px' }}
          />
          <div
            css={{
              overflowX: 'hidden',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              css={{
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              }}
            >
              <span>{firstName + ' ' + lastName}</span>
            </div>
            <div
              css={{
                fontSize: '0.75em',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              }}
            >
              {clippedPhones.map((phone, index) => (
                <span key={index}>
                  {index < clippedPhones.length - 1
                    ? `${phone.number}, `
                    : phone.number}
                </span>
              ))}
              {restLength > 0 ? (
                <em
                  css={{ paddingLeft: '1ch', opacity: 0.5 }}
                >{`(+${restLength})`}</em>
              ) : null}
            </div>
          </div>
          <div>
            <Button
              variant='icon'
              aria-label='add to favorite'
              sx={{
                color: '#ffad00',
                '&:hover': { backdropFilter: 'hue-rotate(45deg)' },
              }}
              onClick={onClickFavorite}
            >
              <Star weight={isFavorite ? 'fill' : 'regular'} size={20} />
            </Button>
          </div>
        </div>
        {hasLoader && (
          <div
            css={[
              {
                marginTop: '16px',
                padding: '8px 12px',
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                background: 'var(--cream)',
                borderRadius: 4,
              },
              animPulse,
            ]}
          >
            <span
              css={{ background: '#556b2f36', width: '45%', height: '1ch' }}
            ></span>
            <span
              css={{
                background: '#556b2f36',
                width: '100%',
                height: '1ch',
              }}
            ></span>
          </div>
        )}
      </>
    );
  }
);

export default ContactMiniCard;
