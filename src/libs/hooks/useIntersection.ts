import { useEffect, useState } from 'react';

export type CallbackIntersection = {
  entries: IntersectionObserverEntry[];
  observer: IntersectionObserver;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export type UseIntersectionParams<E> = {
  el: React.RefObject<E>;
  opts?: IntersectionObserverInit;
  cb?: ({ entries, observer }: CallbackIntersection) => void;
  activate?: boolean;
};

const useIntersection = <E extends Element>({
  el,
  opts,
  cb,
  activate = true,
}: UseIntersectionParams<E>) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isActive, setIsActive] = useState(activate);

  useEffect(() => {
    if (isActive && el?.current) {
      const obs = new IntersectionObserver((...args) => {
        const [entries] = args;
        if (entries.some((entry) => entry.isIntersecting)) setIsVisible(true);
        else setIsVisible(false);

        if (cb) cb({ entries: args[0], observer: args[1], setIsActive });
      }, opts);

      obs.observe(el.current);

      return () => {
        obs.disconnect();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [el.current, isActive, cb]);

  return activate ? isVisible : true;
};

export default useIntersection;
