import { useMemo } from 'react';
import { localStorageCreator } from '@/libs/utils/localStorageCreator';
import type { ContactData } from '@/components/base/ContactForm';

/**
 * [Reference](https://bobbyhadz.com/blog/typescript-array-element-type)
 */
export type ArrElement<ArrType> = ArrType extends readonly (infer ElementType)[]
  ? ElementType
  : never;

export type ContactDataWithId = { id: number } & ContactData;

export const useFavoriteStore = localStorageCreator<{
  contact: ContactDataWithId[];
}>('yp-favorite-contacts');

export const removeFavorite = (id: number) => {
  if (
    useFavoriteStore.getSnapshot() &&
    useFavoriteStore.getSnapshot()?.contact.length
  ) {
    useFavoriteStore.setItem((prev) => {
      return {
        contact: prev!.contact.filter((item) => item.id !== id),
      };
    });
  }
};

export const addFavorite = (data: ContactDataWithId) => {
  useFavoriteStore.setItem((prev) => {
    if (!prev)
      return {
        contact: [{ ...data }],
      };

    return {
      contact: [...prev.contact, { ...data }],
    };
  });
};

export const editFavoriteId = (id: number, newData: ContactData) => {
  useFavoriteStore.setItem((prev) => {
    if (!prev) return prev;
    return {
      contact: prev.contact.map((item) => {
        if (item.id !== id) return item;
        return {
          ...item,
          first_name: newData.first_name,
          last_name: newData.last_name,
          phones: newData.phones,
        };
      }),
    };
  });
};

const getFavoriteId = (id: number, state: ContactDataWithId[]) =>
  state.find((item) => item.id === id);

export const useFavoriteContactId = (id: number) =>
  useFavoriteStore(
    useMemo(
      () => (state) =>
        state?.contact ? getFavoriteId(id, state.contact) : null,
      [id]
    )
  );
