import { create } from 'zustand';
import {
  stores as initialStores,
  type Store as StoreType,
} from '../api/mockData';
import { persist } from 'zustand/middleware';

interface StoreState {
  stores: StoreType[];
  updateStoreTheme: (storeId: string, themeColor: string) => void;
  selectedStore: StoreType | null;
  setSelectedStore: (storeId: string | null) => void;
}

export const useStoresStore = create<StoreState>()(
  persist(
    (set, get) => ({
      stores: initialStores,
      selectedStore: null,
      setSelectedStore: (storeId: string | null) => {
        if (!storeId) {
          return set({ selectedStore: null });
        }
        set({
          selectedStore: get().stores.find((store) => store.id === storeId),
        });
      },
      updateStoreTheme: (storeId: string, themeColor: string) => {
        // console.log('updateStoreTheme', storeId, themeColor);
        return set({
          stores: get().stores.map((store) =>
            store.id === storeId ? { ...store, theme: themeColor } : store
          ),
          selectedStore: {
            ...get().selectedStore!,
            theme: themeColor,
          },
        });
      },
    }),
    { name: 'stores-data' }
  )
);
