import NoData from '@/components/base/NoData';
import Loading from '@/components/base/Loading';
import ContactMiniCard from './ContactMiniCard';
import {
  LastContactMiniCard,
  LastContactMiniCardProps,
} from './ContactMiniCard';
import {
  GetContactList,
  GetContactListCount,
} from '@/libs/gqlQueries/phoneBookQueries';
import {
  useReadQuery,
  NetworkStatus,
  useSuspenseQuery,
  useBackgroundQuery,
  useMutation,
} from '@apollo/client';
import { Suspense, startTransition } from 'react';
import { addFavorite } from './useFavoriteContacts';
import { useSearchBar } from '@/components/base/SearchBar';
import {
  Order_By,
  type Contact_Bool_Exp,
  type InputMaybe,
  type GetContactListCountQuery,
  GetContactListQuery,
} from '@/__generated_gql_type__/graphql';
import type { QueryReference } from '@apollo/client';
import type { ArrElement } from './useFavoriteContacts';
import { DeleteContactPhone } from '@/libs/gqlQueries/phoneBookMutations';

const LIMIT = +import.meta.env.VITE_GET_CONTACT_LIMIT ?? 10;

const nameQuery = (query: string): InputMaybe<Contact_Bool_Exp> | undefined =>
  query
    ? {
        _or: [
          {
            first_name: { _like: `%${query}%` },
          },
          {
            last_name: { _like: `%${query}%` },
          },
        ],
      }
    : undefined;

interface RegularListProps {
  query: string;
  countQueryRef: QueryReference<GetContactListCountQuery>;
}

const RegularList: React.FC<RegularListProps> = ({ query, countQueryRef }) => {
  const {
    data: { contact_aggregate },
  } = useReadQuery(countQueryRef);

  const {
    data: { contact },
    networkStatus,
    fetchMore,
  } = useSuspenseQuery(GetContactList, {
    fetchPolicy: 'cache-and-network',
    variables: {
      offset: 0,
      limit: LIMIT,
      order_by: [{ first_name: Order_By.Asc }],
      where: nameQuery(query),
    },
  });

  const [deleteContact] = useMutation(DeleteContactPhone, {
    refetchQueries: [GetContactList, GetContactListCount],
    awaitRefetchQueries: true,
  });

  const isLast = contact.length === contact_aggregate.aggregate?.count;

  const handlePageChange: LastContactMiniCardProps['onVisible'] = async ({
    setIsActive,
    observer,
  }) => {
    if (!isLast || networkStatus === NetworkStatus.fetchMore)
      await fetchMore({
        variables: {
          offset: contact.length,
        },
      });
    else {
      observer.disconnect();
      setIsActive(false);
    }
  };

  const handleUnFavorite = async (
    person: ArrElement<GetContactListQuery['contact']>
  ) => {
    await deleteContact({ variables: { id: person.id } });
    addFavorite({
      id: person.id,
      first_name: person.first_name,
      last_name: person.last_name,
      phones: person.phones,
    });
  };

  if (contact.length === 0) return <NoData />;
  return (
    <div css={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <ul css={{ margin: 0, padding: 0 }}>
        {contact.map((person, index) => {
          return (
            <li key={index} css={{ padding: '0.5rem 0', listStyle: 'none' }}>
              {index !== contact.length - 1 ? (
                <ContactMiniCard
                  id={person.id}
                  firstName={person.first_name}
                  lastName={person.last_name}
                  phones={person.phones}
                  onClickFavorite={(e) => {
                    e.stopPropagation();
                    handleUnFavorite(person);
                  }}
                />
              ) : (
                <LastContactMiniCard
                  id={person.id}
                  firstName={person.first_name}
                  lastName={person.last_name}
                  phones={person.phones}
                  isLoading={
                    isLast && networkStatus === NetworkStatus.fetchMore
                  }
                  onClickFavorite={(e) => {
                    e.stopPropagation();
                    handleUnFavorite(person);
                  }}
                  onVisible={(args) => {
                    startTransition(() => {
                      handlePageChange(args);
                    });
                  }}
                />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const RegularContacts = () => {
  const [searchQuery] = useSearchBar();

  const [countQueryRef] = useBackgroundQuery(GetContactListCount, {
    fetchPolicy: 'cache-and-network',
    variables: {
      where: nameQuery(searchQuery),
    },
  });

  return (
    <Suspense fallback={<Loading />}>
      <span css={{ color: 'var(--primary)', fontWeight: 600 }}>Contact</span>
      <RegularList query={searchQuery} countQueryRef={countQueryRef} />
    </Suspense>
  );
};

export default RegularContacts;
