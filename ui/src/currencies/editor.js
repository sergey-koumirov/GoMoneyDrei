import React, { useState } from "react";
import cn from "classnames";
import { isEmpty } from "lodash";

const Editor = ({ handleCancel, handleSave, initRecord, errors }) => {
  const [record, setRecord] = useState(initRecord);

  return (
    <form className="uk-form-horizontal">
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

      <div className="uk-margin">
        <label className="uk-form-label">Name</label>
        <div className="uk-form-controls">
          <input
            className={cn("uk-input uk-form-width-medium uk-form-small", {
              "uk-form-danger": !isEmpty(errors.Name),
            })}
            value={record.Name}
            onChange={(e) => {
              setRecord({ ...record, Name: e.target.value });
            }}
            type="text"
          />
        </div>
      </div>

      <div className="uk-margin">
        <label className="uk-form-label">Code</label>
        <div className="uk-form-controls">
          <input
            className={cn("uk-input uk-form-width-medium uk-form-small", {
              "uk-form-danger": !isEmpty(errors.Code),
            })}
            value={record.Code}
            onChange={(e) => {
              setRecord({ ...record, Code: e.target.value });
            }}
            type="text"
          />
        </div>
      </div>

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
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default Editor;
