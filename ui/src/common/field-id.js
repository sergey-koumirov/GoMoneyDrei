import React from "react";

const FieldID = ({ record }) => {
  return (
    <div className="uk-margin">
      <label className="uk-form-label">ID</label>
      <div className="uk-form-controls">
        <input
          className="uk-input uk-form-width-medium uk-form-small"
          type="text"
          value={record.ID}
          disabled
        />
      </div>
    </div>
  );
};

export default FieldID;
