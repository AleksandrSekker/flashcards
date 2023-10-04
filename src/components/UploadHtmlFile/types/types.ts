type Note = {
  id: number;
  text: string;
};

type UploadHtmlFileProp = {
  onFileSelect: (notes: Note[]) => void;
};

export type { UploadHtmlFileProp, Note };
export type NoteModalProps = {
  note: Note;
  closeModal: () => void;
  changeValue: string;
  setChangeValue: (value: string) => void;
  changeId: number;
  updatedData: (id: number, changeValue: string) => void;
  isOpenModal: boolean;
};
export type NoteItemProps = {
  note: Note;
  deleteNote: (id: number) => void;
  createCardFromInOpenAi: (word: string) => void;
};
