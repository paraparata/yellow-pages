import Layout from '@/components/base/Layout';
import Button from '@/components/primitive/Button';
import SearchBar from '@/components/base/SearchBar';
import RegularContacts from './RegularContacts';
import FavoriteContacts from './FavoriteContacts';
import { SearchBarProvider } from '@/components/base/SearchBar';
import { Plus } from '@phosphor-icons/react';
import { useLocation } from 'wouter';

const ContactList = () => {
  const [, setLocation] = useLocation();

  return (
    <SearchBarProvider initValue=''>
      <Layout
        header={{
          children: (
            <>
              <SearchBar sx={{ flex: 1 }} />
              <Button variant='filledIcon' onClick={() => setLocation('/new')}>
                <Plus size={25} weight='light' />
              </Button>
            </>
          ),
        }}
        sx={{ minHeight: '100dvh' }}
        mainSx={{ paddingBottom: '2rem' }}
      >
        <FavoriteContacts />
        <RegularContacts />
      </Layout>
    </SearchBarProvider>
  );
};

export default ContactList;
