import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeletePicture from '../pictures/DeletePic';

function DeleteModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Delete</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeletePicture />
        </Modal>
      )}
    </>
  );
}

export default DeleteModal;
