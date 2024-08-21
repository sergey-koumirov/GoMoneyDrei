import React from "react";
import { isEmpty } from "lodash";

const CancelSave = ({ record, handleCancel, handleSave }) => {
  return (
    <div className="uk-grid">
      <div>
        <button
          type="button"
          className="uk-button uk-button-default"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
      <div>
        <button
          type="button"
          className="uk-button uk-button-primary"
          onClick={() => {
            handleSave(record);
          }}
        >
          {record.ID === 0 ? "Add" : "Save"}
        </button>
      </div>
    </div>
  );
};

export default CancelSave;
