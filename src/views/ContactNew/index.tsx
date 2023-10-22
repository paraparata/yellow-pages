import ContactForm from '@/components/base/ContactForm';
import Layout from '@/components/base/Layout';
import { useLocation } from 'wouter';
import { useMutation } from '@apollo/client';
import { AddContactWithPhones } from '@/libs/gqlQueries/phoneBookMutations';
import {
  GetContactList,
  GetContactListCount,
} from '@/libs/gqlQueries/phoneBookQueries';
import type { ContactFormProps } from '@/components/base/ContactForm';

const NewForm = () => {
  const [, setLocation] = useLocation();
  const [addContact] = useMutation(AddContactWithPhones, {
    refetchQueries: [GetContactList, GetContactListCount],
    awaitRefetchQueries: true,
  });

  const handleCancel = () => setLocation('/');

  const handleForm: ContactFormProps['onFormValid'] = async (
    values,
    raiseError
  ) => {
    try {
      await addContact({ variables: values });
      handleCancel();
    } catch (err: any) {
      const msg = err.message as string;
      raiseError(msg);
    }
  };

  return (
    <ContactForm
      okLabel='Add'
      onFormValid={handleForm}
      onCancel={handleCancel}
    />
  );
};

const ContactNew = () => (
  <Layout
    header={{
      sx: {
        justifyContent: 'center',
        borderBottom: 'thin solid var(--border)',
      },
      children: <span css={{ fontWeight: '600' }}>Add New Contact</span>,
    }}
    sx={{ height: '100dvh' }}
    mainSx={{ overflowY: 'hidden' }}
  >
    <div css={{ height: '100%', padding: '1rem 0' }}>
      <NewForm />
    </div>
  </Layout>
);

export default ContactNew;
