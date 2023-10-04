import create from 'zustand';
import { usePaginationStore } from './paginationStore';
import { useUserStore } from './userStore';
import { useNotesStore } from './notesStore';
import { combine } from 'zustand/middleware/combine';

const combinedStore = create(combine(usePaginationStore, useUserStore));
const secondCombinedStore = create(combine(combinedStore, useNotesStore));

export default secondCombinedStore;
