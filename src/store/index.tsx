import create from 'zustand';
import { usePaginationStore } from './paginationStore';
import { useUserStore } from './userStore';
import { combine } from "zustand/middleware";

const combinedStore = create(
  combine(
    usePaginationStore,
    useUserStore,
  ),
);

export default combinedStore;
