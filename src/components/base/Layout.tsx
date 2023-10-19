import { css } from '@emotion/react';
import type { HTMLAttributes } from 'react';
import type { Interpolation, Theme } from '@emotion/react';

const styles = {
  layout: css({
    maxWidth: 600,
    marginInline: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  }),
  header: css({
    position: 'sticky',
    top: 0,
    zIndex: 10,
    padding: '1rem',
    display: 'flex',
    gap: 8,
    background: 'var(--bg)',
    '&::before': {
      content: '" "',
      width: '100%',
      height: '0.5em',
      position: 'absolute',
      bottom: -6,
      left: 0,
      backdropFilter: 'hue-rotate(45deg)',
    },
  }),
  main: css({
    flex: 1,
    padding: '0 1rem',
  }),
};

interface LayoutProps {
  sx?: Interpolation<Theme>;
  mainSx?: Interpolation<Theme>;
  header: HTMLAttributes<HTMLElement> & { sx?: Interpolation<Theme> };
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ sx, mainSx, header, children }) => {
  const { sx: headerSx, children: headerChildren, ...headerProps } = header;

  return (
    <div css={[styles.layout, sx]}>
      <header css={[styles.header, headerSx]} {...headerProps}>
        {headerChildren}
      </header>
      <main css={[styles.main, mainSx]}>{children}</main>
    </div>
  );
};

export default Layout;
