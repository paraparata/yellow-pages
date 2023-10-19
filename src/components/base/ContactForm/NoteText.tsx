import { Interpolation, Theme } from '@emotion/react';

interface NoteTextProps {
  text: string;
  sx?: Interpolation<Theme>;
}
const NoteText: React.FC<NoteTextProps> = ({ text, sx }) => (
  <p
    css={[{ margin: 0, marginTop: -5, fontSize: '0.75rem', color: 'red' }, sx]}
  >
    {text}
  </p>
);

export default NoteText;
