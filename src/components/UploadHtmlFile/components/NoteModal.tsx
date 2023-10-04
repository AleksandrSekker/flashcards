import { NoteModalProps } from '~/components/UploadHtmlFile/types/types';
import Modal from '~/components/Modal/Modal';
import Input from '~/components/Input/Input';
import { PrimaryButton } from '~/components/Button/Buttons';

const NoteModal = ({
  note,
  closeModal,
  changeValue,
  setChangeValue,
  changeId,
  updatedData,
  isOpenModal,
}: NoteModalProps) => {
  return (
    <Modal title={'Update Item'} isOpen={isOpenModal} closeModal={closeModal}>
      <Input
        name={'changeItemName'}
        onChange={(e) => setChangeValue(e.target.value)}
        placeholder="changeItemName"
        type="text"
        value={changeValue}
      />
      <div className="mt-4 flex w-full justify-between">
        <PrimaryButton onClick={() => updatedData(changeId, changeValue)}>
          Save
        </PrimaryButton>
        <PrimaryButton color="red" onClick={closeModal}>
          Cancel
        </PrimaryButton>
      </div>
    </Modal>
  );
};

export default NoteModal;
