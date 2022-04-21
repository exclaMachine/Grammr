import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditPicture from '../pictures/EditPic';

function EditPicModal({id}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit Picture Title</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditPicture id={id} />
        </Modal>
      )}
    </>
  );
}

export default EditPicModal;
