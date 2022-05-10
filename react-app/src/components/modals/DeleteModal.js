import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeleteAlbum from '../albums/DeleteAlbum';

function DeleteModal({id}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='deleteButton' onClick={() => setShowModal(true)}>
      <i className="fa-solid fa-trash"></i>
        </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteAlbum id={id} />
        </Modal>
      )}
    </>
  );
}

export default DeleteModal;
