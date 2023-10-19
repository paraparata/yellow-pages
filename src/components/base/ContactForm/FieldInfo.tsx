import NoteText from './NoteText';

const FieldInfo = ({ field }: { field: any }) => {
  if (field.state.meta.touchedErrors || field.state.meta.errors)
    return (
      <NoteText
        text={field.state.meta.touchedErrors ?? field.state.meta.errors}
      />
    );
  if (field.state.meta.isValidating)
    return <NoteText text='Validating...' sx={{ color: 'orange' }} />;
  return null;
};

export default FieldInfo;
