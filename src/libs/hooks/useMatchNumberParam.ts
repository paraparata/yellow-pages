import { useRoute } from 'wouter';

export const useMatchNumberParam = (pathName: string) => {
  const [match, params] = useRoute(pathName);
  const id = Number(params?.id);

  if (!(match && typeof id === 'number' && !isNaN(id)))
    throw Error('Invalid URL');
  return id;
};
