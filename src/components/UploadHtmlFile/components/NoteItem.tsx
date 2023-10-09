import { SecondaryButton } from '~/components/Button/Buttons';
import { type Note } from '~/components/UploadHtmlFile/types/types';
import { useNotesStore } from '~/store/notesStore';
import NoteModal from '~/components/UploadHtmlFile/components/NoteModal';
import { faPlus, faSpinner } from '@fortawesome/free-solid-svg-icons';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';

type NoteItemProps = {
  note: Note;
  deleteNote: (id: number) => void;
  createCardFromInOpenAi: (word: string) => void;
};
const NoteItem = ({
  note,
  deleteNote,
  createCardFromInOpenAi,
}: NoteItemProps) => {
  const {
    isOpenModal,
    openModal,
    closeModal,
    changeValue,
    setChangeValue,
    changeId,
    setChangeId,
    updatedData,
    loading,
  } = useNotesStore();

  return (
    <div className="mb-4 grid grid-cols-4 gap-4">
      <p className="text-grey-darkest w-full dark:text-white">{note.text}</p>
      <SecondaryButton
        onClick={() => {
          openModal(note);
          setChangeValue(note.text);
          setChangeId(note.id);
        }}
        color="blue"
      >
        Update
      </SecondaryButton>
      <SecondaryButton onClick={() => deleteNote(note.id)} color="red">
        Delete
      </SecondaryButton>
      <SecondaryButton
        onClick={() => createCardFromInOpenAi(note.text)}
        color="green"
        icon={loading ? (faSpinner as IconProp) : (faPlus as IconProp)}
      >
        Create Card
      </SecondaryButton>
      {isOpenModal && (
        <NoteModal
          note={note}
          isOpenModal={isOpenModal}
          closeModal={closeModal}
          changeValue={changeValue}
          setChangeValue={setChangeValue}
          changeId={changeId}
          updatedData={updatedData}
        />
      )}
    </div>
  );
};

export default NoteItem;
