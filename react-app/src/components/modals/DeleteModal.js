import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeleteAlbum from '../albums/DeleteAlbum';
import DeletePicture from '../pictures/DeletePic';

function DeleteModal({id}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Delete</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteAlbum id={id} />
        </Modal>
      )}
    </>
  );
}

export default DeleteModal;
