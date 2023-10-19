import ContactForm, { ContactFormProps } from '@/components/base/ContactForm';
import NoData from '@/components/base/NoData';
import useEditForm from './useEditForm';
import { useMemo } from 'react';
import { useLocation } from 'wouter';
import { skipToken, useSuspenseQuery } from '@apollo/client';
import { useFavoriteContactId } from '../ContactList/useFavoriteContacts';
import { GetContactDetail } from '@/libs/gqlQueries/phoneBookQueries';

const EditForm = ({ id }: { id: number }) => {
  const [, setLocation] = useLocation();

  const favDetail = useFavoriteContactId(id);

  const { data: regContact } = useSuspenseQuery(
    GetContactDetail,
    favDetail ? skipToken : { variables: { id } }
  );

  const detail = regContact?.contact_by_pk ?? favDetail;

  const { submitNewContact, updateNewFavorite } = useEditForm(id);

  const initFormData: ContactFormProps['data'] | undefined = useMemo(() => {
    if (!detail) return undefined;
    return {
      first_name: detail.first_name,
      last_name: detail.last_name,
      phones: detail.phones,
    };
  }, [detail]);

  const handleCancel = () => setLocation(`/detail/${id}`);

  const handleForm: ContactFormProps['onFormValid'] = async (
    newValue,
    raiseError
  ) => {
    if (!initFormData) return;
    if (favDetail) {
      updateNewFavorite(newValue);
      handleCancel();
      return;
    }

    try {
      await submitNewContact(initFormData, newValue);
      handleCancel();
    } catch (err: any) {
      const msg = err.message as string;
      raiseError(msg);
    }
  };

  if (!detail) return <NoData />;

  return (
    <ContactForm
      data={initFormData}
      okLabel='Save'
      onFormValid={handleForm}
      onCancel={handleCancel}
    />
  );
};

export default EditForm;
