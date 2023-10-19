import Input from '../../primitive/Input';
import FieldInfo from './FieldInfo';
import type { FormApi } from '@tanstack/react-form';
import type { ContactData } from './index';

const NameField = ({
  name,
  form,
  label,
}: {
  name: 'first_name' | 'last_name';
  form: FormApi<ContactData, unknown>;
  label: string;
}) => (
  <form.Field
    name={name}
    onBlur={(value, formApi) =>
      !value && !formApi.state.meta.touchedErrors.includes('Required')
        ? 'Required'
        : undefined
    }
    onChange={(value) => {
      if (!value) return 'Required';
      return /[^a-zA-Z0-9 ]/.test(value)
        ? 'Special characters are not allowed'
        : undefined;
    }}
    children={(field) => (
      <>
        <label htmlFor={field.name}>{label}</label>
        <Input
          name={field.name}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
        />
        <FieldInfo field={field} />
      </>
    )}
  />
);

export default NameField;
