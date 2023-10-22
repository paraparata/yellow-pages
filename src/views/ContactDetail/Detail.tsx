import Avatar from '@/components/primitive/Avatar';
import ReadOnlyInput from '@/components/primitive/ReadOnlyInput';
import NoteText from '@/components/base/ContactForm/NoteText';
import Button from '@/components/primitive/Button';
import { useLocation } from 'wouter';
import { css } from '@emotion/react';
import { Suspense, useMemo, useState } from 'react';
import { useMutation } from '@apollo/client';
import { DeleteContactPhone } from '@/libs/gqlQueries/phoneBookMutations';
import {
  GetContactList,
  GetContactListCount,
} from '@/libs/gqlQueries/phoneBookQueries';
import { useMatchNumberParam } from '@/libs/hooks/useMatchNumberParam';
import {
  removeFavorite,
  useFavoriteContactId,
} from '../ContactList/useFavoriteContacts';
import type { ContactData } from '@/components/base/ContactForm';
import type { Interpolation, Theme } from '@emotion/react';

const styles = {
  detail: css({
    height: '100%',
    padding: '1rem 0',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  }),
};

const DetailActions = () => {
  const id = useMatchNumberParam('/detail/:id');

  const [deleteError, setDeleteError] = useState('');
  const [deleteMode, setDeleteMode] = useState(false);
  const [, setLocation] = useLocation();

  const favContact = useFavoriteContactId(id);

  const [deleteContact] = useMutation(DeleteContactPhone, {
    refetchQueries: [GetContactList, GetContactListCount],
    awaitRefetchQueries: true,
  });

  const handleFirstBtn = async () => {
    if (!deleteMode) setLocation(`/detail/${id}/edit`);
    else {
      if (favContact) {
        removeFavorite(id);
        setLocation('/');
      } else {
        try {
          await deleteContact({ variables: { id } });
          setLocation('/');
        } catch (err: any) {
          setDeleteError(err.message);
        }
      }
    }
  };

  const handleSecondBtn = () => {
    if (deleteMode) setDeleteMode(false);
    else setDeleteMode(true);
  };

  return (
    <>
      <NoteText text={deleteError} />
      <div
        css={{
          paddingTop: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        <Button
          color={deleteMode ? 'error' : 'primary'}
          onClick={handleFirstBtn}
        >
          {deleteMode ? '🫷Sure?🫸' : 'Edit'}
        </Button>
        <Button
          color={deleteMode ? 'secondary' : 'errorOutline'}
          onClick={handleSecondBtn}
        >
          {deleteMode ? 'Cancel' : 'Delete'}
        </Button>
      </div>
    </>
  );
};

interface DetailProps {
  firstName: ContactData['first_name'];
  lastName: ContactData['last_name'];
  phones: ContactData['phones'];
  isFavorite?: boolean;
  sx?: Interpolation<Theme>;
}

const Detail: React.FC<DetailProps> = ({
  firstName,
  lastName,
  phones,
  isFavorite,
  sx,
}) => {
  const alias = useMemo(
    () => firstName[0] + lastName[0],
    [firstName, lastName]
  );

  return (
    <div css={[styles.detail, sx]}>
      <div css={{ flex: 1, overflowY: 'scroll' }}>
        <div
          css={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            '& > div': {
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            },
          }}
        >
          <Avatar
            alias={alias}
            isFavorite={isFavorite}
            animate
            sx={{ fontSize: '40px' }}
          />
          <div>
            <span>First Name</span>
            <ReadOnlyInput value={firstName} />
          </div>
          <div>
            <span>Last Name</span>
            <ReadOnlyInput value={lastName} />
          </div>
          <div>
            <span>Phone Numbers</span>
            <div
              css={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              {phones.map((phone, i) => (
                <ReadOnlyInput key={i} value={phone.number} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Suspense>
        <DetailActions />
      </Suspense>
    </div>
  );
};

export default Detail;
