import Layout from '@/components/base/Layout';
import Loading from '@/components/base/Loading';
import EditForm from './EditForm';
import ErrorComponent from '@/components/base/ErrorComponent';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useMatchNumberParam } from '@/libs/hooks/useMatchNumberParam';

const ContactEdit = () => {
  const id = useMatchNumberParam('/detail/:id/edit');

  return (
    <Layout
      header={{
        sx: {
          justifyContent: 'center',
          borderBottom: 'thin solid var(--border)',
        },
        children: <span css={{ fontWeight: '600' }}>Edit Contact</span>,
      }}
      sx={{ height: '100dvh' }}
      mainSx={{ overflowY: 'hidden' }}
    >
      <div css={{ height: '100%', padding: '1rem 0' }}>
        <ErrorBoundary
          FallbackComponent={(props) => (
            <ErrorComponent errorMsg='Contact Not Found' {...props} />
          )}
        >
          <Suspense fallback={<Loading />}>
            <EditForm id={id} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </Layout>
  );
};

export default ContactEdit;
