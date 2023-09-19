import create from 'zustand';

interface PaginationStore {
  limit: number;
  offset: number;
  currentPage: number;
  setLimit: (limit: number) => void;
  setCurrentPage: (currentPage: number, limit: number) => void;
}

export const usePaginationStore = create<PaginationStore>((set) => ({
  limit: 10,
  offset: 0,
  currentPage: 1,
  setLimit: (limit) => set(() => ({ limit: limit })),
  setCurrentPage: (currentPage, limit) => set(() => ({ currentPage: currentPage, offset: (currentPage - 1) * limit })),
}));
