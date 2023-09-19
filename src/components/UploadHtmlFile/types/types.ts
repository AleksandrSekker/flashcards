type Note = {
  id: number;
  text: string;
};

type UploadHtmlFileProp = {
  onFileSelect: (notes: Note[]) => void;
};

export type { UploadHtmlFileProp, Note };
