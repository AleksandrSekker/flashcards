import create from 'zustand';
import React from 'react';
import { api } from '~/utils/api';

type Note = {
  id: number;
  text: string;
};

type NotesStore = {
  error: string;
  setError: (error: string) => void;
  responseNotes: Note[];
  setResponseNotes: (notes: Note[]) => void;
  setDisplayedNotes: (notes: Note[]) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  limit: number;
  setLimit: (limit: number) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileLoad: (file: React.ChangeEvent<HTMLInputElement>) => void;
  isOpenModal: boolean;
  openModal: (note: Note) => void;
  closeModal: () => void;
  changeValue: string;
  setChangeValue: (value: string) => void;
  changeId: number;
  setChangeId: (id: number) => void;
  updatedData: (id: number, changeValue: string) => void;
  createCardFromInOpenAi: (word: string) => void;
  displayedNotes: Note[];
  deleteNote: (id: number) => void;
  responseFromOpenAi: {
    word: string;
    meaning: string;
    examples: string;
    translation: string;
    image: string;
  };
};

export const useNotesStore = create<NotesStore>((set) => ({
  displayedNotes: [],
  responseFromOpenAi: {
    word: '',
    meaning: '',
    examples: '',
    translation: '',
    image: '',
  },
  error: '',
  setError: (error) => set({ error }),
  responseNotes: [],
  setResponseNotes: (notes) => set({ responseNotes: notes }),
  currentPage: 1,
  setCurrentPage: (page) => set({ currentPage: page }),
  limit: 10,

  setLimit: (limit) => set({ limit }),
  fileInputRef: React.createRef<HTMLInputElement>(),
  handleFileLoad: (event) => {
    if (!event.target || !event.target.files) {
      set({ error: 'Invalid file input' });
      return;
    }

    const file = event.target.files[0];

    if (!file || !file.name.endsWith('.html')) {
      set({ error: 'Please select an HTML file' });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const fileContent = reader.result as string;
      const parser = new DOMParser();
      const doc = parser.parseFromString(fileContent, 'text/html');
      const noteTextElements = doc.getElementsByClassName('noteText');
      const newNotes: Note[] = [];

      for (let i = 0; i < noteTextElements.length; i++) {
        const element = noteTextElements[i];
        const noteText = element?.textContent || '';

        const cleanNoteText = noteText.replace(/[^a-zA-Z\s]/g, '');

        newNotes.push({ id: i + 1, text: cleanNoteText });
      }
      const uniqueNotes = newNotes.reduce(
        (accumulator: Note[], currentNote: Note) => {
          if (!accumulator.find((note) => note.text === currentNote.text)) {
            accumulator.push(currentNote);
          }
          return accumulator;
        },
        [],
      );

      set({ responseNotes: uniqueNotes, error: '' });

      // Call onFileSelect with uniqueNotes
      // onFileSelect(uniqueNotes);
    };

    reader.readAsText(file);
  },

  setDisplayedNotes: (notes: Note[]) => set({ displayedNotes: notes }),
  isOpenModal: false,
  openModal: (note) => {
    set({ isOpenModal: true, changeValue: note.text, changeId: note.id });
  },
  closeModal: () => set({ isOpenModal: false }),
  changeValue: '',
  setChangeValue: (value) => set({ changeValue: value }),
  changeId: 0,
  setChangeId: (id) => set({ changeId: id }),
  deleteNote: (id) => {
    set((state) => {
      const updatedNotes = state.responseNotes.filter((item) => item.id !== id);
      return { responseNotes: updatedNotes };
    });
  },
  updatedData: (id, changeValue) => {
    set((state) => {
      const updatedNotes = state.responseNotes.map((item) => {
        if (item.id === id) {
          return { ...item, text: changeValue };
        }
        return item;
      });
      return { responseNotes: updatedNotes };
    });
  },
  createCardFromInOpenAi: async (word) => {
    try {
      const response = await fetch(`/api/create-card?word=${word}`);
      if (!response.ok) {
        console.log('API request failed');
      }
      const data = await response.json();
      set({ responseFromOpenAi: data }); // Set the state with OpenAI response
    } catch (error) {
      console.error(error);
    }
  },
  removeResponseFromOpenAi: () => {
    set({
      responseFromOpenAi: {
        word: '',
        meaning: '',
        examples: '',
        translation: '',
        image: '',
      },
    });
  },
}));
