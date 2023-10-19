import { localStorageCreator } from '@/libs/utils/localStorageCreator';

type Phone = { number: string };
type Contact = { id: number; name: string; phones: Phone[] };

const useContact = localStorageCreator<{ contact: Contact[] }>('contact');

const Controller = () => {
  return (
    <button
      onClick={() => {
        useContact.setItem((prev) => {
          console.log(prev);
          if (!prev)
            return {
              contact: [{ id: 1, name: 'ipen', phones: [{ number: '222' }] }],
            };
          return {
            contact: [
              ...prev.contact,
              { id: 1, name: 'ipen', phones: [{ number: '222' }] },
            ],
          };
        });
      }}
    >
      Push
    </button>
  );
};

const Viewer = () => {
  const name = useContact((s) => (s ? s.contact[0].name : null));
  return <p>{name || 'nothing'}</p>;
};

const Home = () => {
  return (
    <div>
      <span>Home</span>
      <Viewer />
      <Controller />
    </div>
  );
};

export default Home;
