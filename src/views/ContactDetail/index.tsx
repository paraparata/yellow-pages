import Detail from './Detail';
import Button from '@/components/primitive/Button';
import Layout from '@/components/base/Layout';
import NoData from '@/components/base/NoData';
import Loading from '@/components/base/Loading';
import ErrorComponent from '@/components/base/ErrorComponent';
import { ArrowLeft } from '@phosphor-icons/react';
import { useLocation } from 'wouter';
import { skipToken, useSuspenseQuery } from '@apollo/client';
import { GetContactDetail } from '@/libs/gqlQueries/phoneBookQueries';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';
import { useMatchNumberParam } from '@/libs/hooks/useMatchNumberParam';
import { useFavoriteContactId } from '../ContactList/useFavoriteContacts';

const ContactDetailId = ({ id }: { id: number }) => {
  const favDetail = useFavoriteContactId(id);

  const { data: regContact } = useSuspenseQuery(
    GetContactDetail,
    favDetail ? skipToken : { variables: { id } }
  );

  const detail = regContact?.contact_by_pk ?? favDetail;

  if (!detail) return <NoData />;

  return (
    <Detail
      firstName={detail.first_name}
      lastName={detail.last_name}
      phones={detail.phones}
      isFavorite={!!favDetail}
    />
  );
};

const ContactDetail = () => {
  const id = useMatchNumberParam('/detail/:id');

  const [, setLocation] = useLocation();

  return (
    <Layout
      header={{
        sx: {
          alignItems: 'center',
          gap: '1rem',
          borderBottom: 'thin solid var(--border)',
        },
        children: (
          <>
            <Button
              variant='icon'
              aria-label='delete phone number'
              onClick={() => setLocation('/')}
            >
              <ArrowLeft size={18} weight='light' />
            </Button>
            <span css={{ fontWeight: '600' }}>Contact Detail</span>,
          </>
        ),
      }}
      sx={{ height: '100dvh' }}
      mainSx={{ overflowY: 'hidden' }}
    >
      <ErrorBoundary
        FallbackComponent={(props) => (
          <ErrorComponent errorMsg='Contact Not Found' {...props} />
        )}
      >
        <Suspense fallback={<Loading />}>
          <ContactDetailId id={id} />
        </Suspense>
      </ErrorBoundary>
    </Layout>
  );
};

export default ContactDetail;
