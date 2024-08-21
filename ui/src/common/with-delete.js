import React, { createContext, useState } from "react";
import ModalWarning from "./modal-warning";
import { isEmpty, map } from "lodash";

const DeleteContext = createContext({});

const WithDeleteContext = ({ handleDelete, children }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalError, setModalError] = useState("");
  const [deleteID, setDeleteID] = useState(0);

  const handleDeleteClick = (id) => {
    setDeleteID(id);
    setShowModal(true);
  };

  const handleNoClick = () => {
    setModalError("");
    setShowModal(false);
  };

  const handleYesClick = () => {
    handleDelete(deleteID, (errors) => {
      if (isEmpty(errors)) {
        setShowModal(false);
      } else {
        const texts = map(errors, (values, key) => {
          return `${key}: ${values.join(", ")}`;
        });
        setModalError(texts.join("; "));
      }
    });
  };

  const dd = {
    handleDeleteClick,
  };

  return (
    <DeleteContext.Provider value={dd}>
      {children}

      {showModal && (
        <ModalWarning
          modalError={modalError}
          handleNo={handleNoClick}
          handleYes={handleYesClick}
        />
      )}
    </DeleteContext.Provider>
  );
};

export { WithDeleteContext, DeleteContext };
