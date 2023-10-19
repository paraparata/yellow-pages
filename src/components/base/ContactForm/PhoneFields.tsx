import FieldInfo from './FieldInfo';
import Button from '../../primitive/Button';
import Input from '../../primitive/Input';
import { Plus, X } from '@phosphor-icons/react';
import type { FormApi } from '@tanstack/react-form';
import type { ContactData } from './index';

const PhoneFields = ({ form }: { form: FormApi<ContactData, unknown> }) => (
  <form.Field
    name='phones'
    mode='array'
    children={(phonesField) => (
      <>
        <div
          css={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span>Phone Numbers</span>
          <Button
            type='button'
            variant='icon'
            aria-label='add phone number'
            onClick={() => phonesField.pushValue({ number: '' })}
          >
            <Plus size={18} weight='light' />
          </Button>
        </div>
        <div
          css={{
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          {phonesField.state.value.map((_, i) => (
            <phonesField.Field
              key={i}
              index={i}
              name='number'
              onChange={(value) => {
                if (!value) return 'Can not be empty';
                return (value as string).length < 4
                  ? 'Must be at least 4 characters'
                  : /[^\+][^0-9]/.test(value as string)
                  ? 'Not valid'
                  : undefined;
              }}
              children={(field) => (
                <>
                  <div
                    css={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                    }}
                  >
                    <Input
                      type='tel'
                      name={field.name}
                      value={field.state.value as string}
                      sx={{ flex: 1 }}
                      autoFocus={
                        i !== 0 && i === phonesField.state.value.length - 1
                      }
                      onChange={(e) => field.handleChange(e.target.value)}
                    />

                    <Button
                      type='button'
                      variant='icon'
                      aria-label='delete phone number'
                      disabled={phonesField.state.value.length === 1}
                      onClick={() => phonesField.removeValue(i)}
                    >
                      <X size={18} weight='light' />
                    </Button>
                  </div>
                  <FieldInfo field={field} />
                </>
              )}
            />
          ))}
        </div>
      </>
    )}
  />
);

export default PhoneFields;
