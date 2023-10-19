import type { FallbackProps } from 'react-error-boundary';

interface ErrorMessageProps {
  errorMsg?: string;
  fullScreen?: boolean;
  children?: React.ReactNode;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  fullScreen,
  errorMsg,
}) => {
  return (
    <div
      role='alert'
      css={[
        {
          height: '40dvh',
          margin: 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontFamily: 'monospace',
        },
        fullScreen
          ? {
              height: '100dvh',
            }
          : {},
      ]}
    >
      <span css={{ fontSize: '0.75rem' }}>Something went wrong:</span>
      {errorMsg && <span>{errorMsg}</span>}
    </div>
  );
};

const ErrorComponent: React.FC<ErrorMessageProps & Partial<FallbackProps>> = ({
  fullScreen,
  errorMsg,
  error,
}) => {
  return (
    <ErrorMessage fullScreen={fullScreen} errorMsg={errorMsg}>
      {error.message && <pre css={{ color: 'red' }}>{error.message}</pre>}
    </ErrorMessage>
  );
};

export default ErrorComponent;
