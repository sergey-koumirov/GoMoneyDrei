import React from "react";

const ModalWarning = ({ modalError, handleNo, handleYes }) => {
  return (
    <div className="uk-modal">
      <div className="uk-modal-dialog uk-modal-body">
        <h2 className="uk-modal-title">Delete?</h2>
        <p className="uk-text-right">
          {modalError && (
            <span className="uk-form-danger uk-padding-small">
              {modalError}
            </span>
          )}
          <button
            className="uk-button uk-button-default uk-modal-close"
            onClick={handleNo}
            type="button"
          >
            No
          </button>
          <button
            className="uk-button uk-button-primary"
            type="button"
            onClick={handleYes}
          >
            Yes
          </button>
        </p>
      </div>
    </div>
  );
};

export default ModalWarning;
