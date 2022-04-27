import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditComment from '../comments/EditComment';

function EditCommentModal({id}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit Comment</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditComment id={id} />
        </Modal>
      )}
    </>
  );
}

export default EditCommentModal;
