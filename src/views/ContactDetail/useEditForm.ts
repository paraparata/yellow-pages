import { useCallback } from 'react';
import { useMutation } from '@apollo/client';
import {
  AddNumberToContact,
  DeletePhoneFromContact,
  EditContactById,
  EditPhoneNumber,
} from '@/libs/gqlQueries/phoneBookMutations';
import {
  GetContactDetail,
  GetContactList,
  GetContactListCount,
} from '@/libs/gqlQueries/phoneBookQueries';
import { apolloClient } from '@/libs/configs/apolloClient';
import {
  editFavoriteId,
  useFavoriteContactId,
} from '../ContactList/useFavoriteContacts';
import type { ContactData } from '@/components/base/ContactForm';

const useEditForm = (id: number) => {
  const favDetail = useFavoriteContactId(id);

  const [editContact] = useMutation(EditContactById);
  const [editPhones] = useMutation(EditPhoneNumber);
  const [addPhone] = useMutation(AddNumberToContact);
  const [deletePhone] = useMutation(DeletePhoneFromContact);

  const updateNewFavorite = useCallback(
    (newData: ContactData) => editFavoriteId(id, newData),
    [favDetail]
  );

  const submitNewContact = useCallback(
    async (initData: ContactData, newData: ContactData) => {
      try {
        const { first_name, last_name } = newData;

        // Update name
        const oldFullName = `${initData.first_name} ${initData.last_name}`;
        const newFullName = `${first_name} ${last_name}`;
        if (oldFullName !== newFullName)
          await editContact({
            variables: { id, _set: { first_name, last_name } },
          });

        // Update phones
        let i = 0;
        const [lessPh, morePh, statusPh] =
          initData.phones.length > newData.phones.length
            ? ([newData.phones, initData.phones, 'dec'] as const)
            : ([initData.phones, newData.phones, 'inc'] as const);
        for (const phone of morePh) {
          if (i < lessPh.length) {
            // Edit phone
            if (phone.number !== lessPh[i].number)
              await editPhones({
                variables: {
                  pk_columns: { contact_id: id, number: phone.number },
                  new_phone_number: lessPh[i].number,
                },
              });
          } else {
            // Delete phone
            if (statusPh === 'dec')
              await deletePhone({
                variables: { contact_id: id, number: phone.number },
              });
            // Add phone
            else
              await addPhone({
                variables: { contact_id: id, phone_number: phone.number },
              });
          }

          i++;
        }

        // Re-fetch list
        await apolloClient.refetchQueries({
          include: [GetContactList, GetContactListCount, GetContactDetail],
        });
      } catch (e) {
        throw e as Error;
      }
    },
    [editContact, id, editPhones, deletePhone, addPhone]
  );

  return { submitNewContact, updateNewFavorite };
};

export default useEditForm;
