import Button from '@/components/primitive/Button';
import PhoneFields from './PhoneFields';
import NameField from './NameField';
import { useMemo, useState } from 'react';
import { useForm } from '@tanstack/react-form';
import { useLazyQuery } from '@apollo/client';
import { GetPhoneList } from '@/libs/gqlQueries/phoneBookQueries';
import NoteText from './NoteText';

const fullNameQuery = (first: string, last: string) => ({
  where: {
    contact: {
      first_name: {
        _like: first,
      },
      last_name: {
        _like: last,
      },
    },
  },
});

export type ContactData = {
  first_name: string;
  last_name: string;
  phones: { number: string }[];
};

export interface ContactFormProps {
  data?: ContactData;
  okLabel: string;
  onCancel: () => void;
  onFormValid: (
    values: ContactData,
    raiseError: React.Dispatch<React.SetStateAction<string>>
  ) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({
  data,
  okLabel,
  onCancel,
  onFormValid,
}) => {
  const [submitError, setSubmitError] = useState('');
  const [getPhoneList] = useLazyQuery(GetPhoneList);

  const initValues = useMemo(
    () =>
      data ?? {
        first_name: '',
        last_name: '',
        phones: [{ number: '' }],
      },
    [data]
  );

  const form = useForm({
    defaultValues: initValues,
    onSubmit: async (values) => {
      try {
        setSubmitError('');
        if (!data) {
          const { data: queriedList } = await getPhoneList({
            variables: fullNameQuery(values.first_name, values.last_name),
          });
          if (queriedList && queriedList.phone.length > 0)
            throw new Error('Name is already in use 😔');
        }

        onFormValid(values, setSubmitError);
      } catch (err: any) {
        setSubmitError(err.message);
      }
    },
  });

  return (
    <form.Provider>
      <form
        css={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          void form.handleSubmit();
        }}
      >
        <div css={{ flex: 1, overflowY: 'scroll', padding: '0 0 3rem 0' }}>
          <div
            css={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              '& > div': {
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              },
            }}
          >
            <div>
              <NameField form={form} name='first_name' label='First Name' />
            </div>
            <div>
              <NameField form={form} name='last_name' label='Last Name' />
            </div>
            <div>
              <PhoneFields form={form} />
            </div>
          </div>
        </div>

        <div css={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {!!submitError && <NoteText text={submitError} />}

          <form.Subscribe
            selector={(state) => [
              state.values,
              state.canSubmit,
              state.isSubmitting,
            ]}
            children={([values, canSubmit, isSubmitting]) => (
              <Button
                type='submit'
                autoFocus
                disabled={(() => {
                  let isSame = true;
                  if (typeof values !== 'boolean')
                    if (
                      values.first_name === initValues.first_name &&
                      values.last_name === initValues.last_name &&
                      JSON.stringify(values.phones) ===
                        JSON.stringify(initValues.phones)
                    ) {
                      isSame = true;
                    } else {
                      isSame = false;
                    }
                  return !canSubmit || isSame;
                })()}
              >
                {isSubmitting ? '🫷🫸 Submitting...' : okLabel}
              </Button>
            )}
          />
          <Button
            color='secondary'
            onClick={(e) => {
              e.preventDefault();
              onCancel();
            }}
          >
            Cancel
          </Button>
        </div>
      </form>
    </form.Provider>
  );
};

export default ContactForm;
