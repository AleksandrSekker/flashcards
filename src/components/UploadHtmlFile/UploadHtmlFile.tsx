import React, { type ChangeEvent, useEffect } from 'react';
import ErrorMessage from '~/components/Message/Message';
import SearchInput from '~/components/Input/SearchInput';
import Pagination from '~/components/Pagination/Pagination';
import { usePaginationStore } from '~/store/paginationStore';
import { PrimaryButton } from '~/components/Button/Buttons';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import type { UploadHtmlFileProp } from '~/components/UploadHtmlFile/types/types';
import NoteItem from '~/components/UploadHtmlFile/components/NoteItem';
import { useNotesStore } from '~/store/notesStore';
export const UploadHtmlFile: React.FC<UploadHtmlFileProp> = () => {
  const { currentPage, setCurrentPage, limit, setLimit } = usePaginationStore();
  const {
    displayedNotes,
    deleteNote,
    createCardFromInOpenAi,
    fileInputRef,
    setError,
    responseNotes,
    setDisplayedNotes,
    error,
    handleFileLoad,
  } = useNotesStore();

  const handleFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    const startIndex = (currentPage - 1) * Number(limit);
    const endIndex = startIndex + Number(limit);
    const notesToDisplay = responseNotes.length
      ? responseNotes.slice(startIndex, endIndex)
      : [];
    setDisplayedNotes(notesToDisplay);
  }, [currentPage, limit, responseNotes, setDisplayedNotes]);

  return (
    <>
      {error ? (
        <ErrorMessage
          show={!!error.length}
          message={error}
          removeError={() => setError('')}
        />
      ) : null}
      <PrimaryButton onClick={handleFileSelect} icon={faUpload}>
        Upload HTML File
      </PrimaryButton>
      <input
        type="file"
        ref={fileInputRef}
        onChange={
          (e: React.ChangeEvent<HTMLInputElement>) => handleFileLoad(e) // Pass the 'file' object here
        }
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
            <NoteItem
              key={note.id}
              note={note}
              deleteNote={deleteNote}
              createCardFromInOpenAi={createCardFromInOpenAi}
            />
          ))}
        </div>
      ) : null}

      {responseNotes.length > 0 ? (
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
