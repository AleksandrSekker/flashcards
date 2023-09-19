import React, { type ChangeEvent, useEffect, useRef, useState } from 'react';
import ErrorMessage from '~/components/Message/Message';
import SearchInput from '~/components/Input/SearchInput';
import Pagination from '~/components/Pagination/Pagination';
import { usePaginationStore } from '~/store/paginationStore';
import { PrimaryButton, SecondaryButton } from '~/components/Button/Buttons';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import type {
  Note,
  UploadHtmlFileProp,
} from '~/components/UploadHtmlFile/types/types';
import Modal from '~/components/Modal/Modal';
import Input from '../Input/Input';

export const UploadHtmlFile: React.FC<UploadHtmlFileProp> = ({
  onFileSelect,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');
  const [responseNotes, setResponseNotes] = useState<Note[]>([]);
  const { currentPage, setCurrentPage, limit, setLimit } = usePaginationStore();
  const [displayedNotes, setDisplayedNotes] = useState<Note[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [changeValue, setChangesValue] = useState('');
  const handleFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileLoad = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file || !file.name.endsWith('.html')) {
      setError('Please select an HTML file');
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
        newNotes.push({ id: i + 1, text: noteText });
      }
      const uniqueNotes = newNotes.reduce(
        (accumulator: Note[], currentNote: Note) => {
          if (!accumulator.find((note) => note.text === currentNote.text)) {
            accumulator.push(currentNote);
          }
          return accumulator;
        },
        []
      );
      setResponseNotes(uniqueNotes);
      onFileSelect(uniqueNotes);
    };

    reader.readAsText(file);
  };

  const handleRemoveError = () => {
    setError('');
  };
  useEffect(() => {
    const startIndex = (currentPage - 1) * Number(limit);
    const endIndex = startIndex + Number(limit);
    const notesToDisplay = responseNotes.slice(startIndex, endIndex);
    setDisplayedNotes(notesToDisplay);
  }, [currentPage, limit, responseNotes]);

  return (
    <>
      {error ? (
        <ErrorMessage
          show={!!error.length}
          message={error}
          removeError={handleRemoveError}
        />
      ) : null}
      <PrimaryButton onClick={handleFileSelect} icon={faUpload}>
        Upload HTML File
      </PrimaryButton>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileLoad}
        style={{ display: 'none' }}
      />
      <SearchInput
        title={`Limit: ${limit}`}
        placeholder={`Change limit`}
        type="number"
        className="mt-2"
        name="limitChange"
        value={limit}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setLimit(parseInt(e.target.value))
        }
      />
      {displayedNotes.length > 0 ? (
        <div className="w-full">
          {displayedNotes.map((note) => (
            <div key={note.id} className="mb-4 grid grid-cols-3 gap-4">
              <p className="text-grey-darkest w-full dark:text-white">
                {note.text}
              </p>
              <SecondaryButton
                onClick={() => {
                  setIsOpenModal(true);
                  setChangesValue(note.text);
                }}
                color="blue"
              >
                Update
              </SecondaryButton>
              <SecondaryButton
                onClick={() => {
                  setResponseNotes(
                    responseNotes.filter((arr) => arr.id !== note.id)
                  );
                }}
                color="red"
              >
                Delete
              </SecondaryButton>
            </div>
          ))}
        </div>
      ) : null}
      <Modal
        title={'Update Item'}
        isOpen={isOpenModal}
        closeModal={() => setIsOpenModal(!isOpenModal)}
      >
        <Input
          name={'changeItemName'}
          onChange={(e) => setChangesValue(e.target.value)}
          placeholder="changeItemName"
          type="text"
          value={changeValue}
        />
        <div className="mt-4 flex w-full justify-between">
          <PrimaryButton>Save</PrimaryButton>
          <PrimaryButton color="red">Cancel</PrimaryButton>
        </div>
      </Modal>
      {responseNotes ? (
        <Pagination
          currentPage={currentPage}
          limit={limit}
          onPageChange={setCurrentPage}
          totalPages={Math.ceil(responseNotes.length / Number(limit))}
        />
      ) : null}
    </>
  );
};
