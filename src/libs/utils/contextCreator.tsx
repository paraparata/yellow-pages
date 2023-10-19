import { createContext, useContext, useMemo, useState } from 'react';

export const contextCreator = <T,>() => {
  type GetSetState = [
    state: T,
    setState: React.Dispatch<React.SetStateAction<T>>,
  ];
  const Ctx = createContext<GetSetState | null>(null);

  const Provider = ({
    initValue,
    children,
  }: {
    initValue: T;
    children: React.ReactNode;
  }) => {
    const [state, setState] = useState(initValue);
    const memoized = useMemo(() => [state, setState] as GetSetState, [state]);
    return <Ctx.Provider value={memoized}>{children}</Ctx.Provider>;
  };

  const useStore = () => {
    const store = useContext(Ctx);
    if (store === null) throw new Error("Store is outside provider's tree");
    return store;
  };

  return [Provider, useStore] as const;
};
