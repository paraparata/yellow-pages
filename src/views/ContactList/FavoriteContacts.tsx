import ContactMiniCard from './ContactMiniCard';
import { useMemo } from 'react';
import { removeFavorite, useFavoriteStore } from './useFavoriteContacts';
import { useSearchBar } from '@/components/base/SearchBar';
import { useMutation } from '@apollo/client';
import { AddContactWithPhones } from '@/libs/gqlQueries/phoneBookMutations';
import {
  GetContactList,
  GetContactListCount,
} from '@/libs/gqlQueries/phoneBookQueries';
import type { ContactDataWithId } from './useFavoriteContacts';

interface FavoriteListProps {
  contact: ContactDataWithId[];
}

const FavoriteList: React.FC<FavoriteListProps> = ({ contact }) => {
  const [addContact] = useMutation(AddContactWithPhones, {
    refetchQueries: [GetContactList, GetContactListCount],
    awaitRefetchQueries: true,
  });

  const [searchQuery] = useSearchBar();

  const contactVisual = useMemo(
    () =>
      searchQuery
        ? contact.filter(
            (item) =>
              item.first_name.includes(searchQuery) ||
              item.last_name.includes(searchQuery)
          )
        : contact,
    [contact, searchQuery]
  );

  const handleToFavorite = async (person: ContactDataWithId) => {
    await addContact({
      variables: {
        first_name: person.first_name,
        last_name: person.last_name,
        phones: person.phones.map((item) => ({ number: item.number })),
      },
    });
    removeFavorite(person.id);
  };

  return (
    <div css={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <ul css={{ margin: 0, padding: 0 }}>
        {contactVisual.map((person, index) => {
          return (
            <li key={index} css={{ padding: '0.5rem 0', listStyle: 'none' }}>
              <ContactMiniCard
                id={person.id}
                firstName={person.first_name}
                lastName={person.last_name}
                phones={person.phones}
                isFavorite
                onClickFavorite={(e) => {
                  e.stopPropagation();
                  handleToFavorite(person);
                }}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const FavoriteContacts = () => {
  const contact = useFavoriteStore((state) => (state ? state.contact : null));

  if (!contact || contact.length === 0) return null;
  return (
    <>
      <div>
        <span css={{ color: 'var(--primary)', fontWeight: 600 }}>
          My Favorite
        </span>
        <FavoriteList contact={contact} />
      </div>
      <hr css={{ marginBlock: '1rem' }} />
    </>
  );
};

export default FavoriteContacts;
