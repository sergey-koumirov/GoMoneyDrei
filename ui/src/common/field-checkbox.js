import React from "react";
import { isEmpty } from "lodash";

const FieldCheckbox = ({ label, field, record, setRecord, errors }) => {
  const handleChange = (e) => {
    const newRecord = { ...record };
    newRecord[field] = e.target.checked ? 1 : 0;
    setRecord(newRecord);
  };

  return (
    <div className="uk-margin">
      <label className="uk-form-label">{label}</label>
      <div className="uk-form-controls">
        <input
          className="uk-checkbox"
          type="checkbox"
          checked={record[field] === 1}
          onChange={handleChange}
        />

        {!isEmpty(errors[field]) && (
          <span className="uk-padding-small uk-form-danger">
            {errors[field].join("; ")}
          </span>
        )}
      </div>
    </div>
  );
};

export default FieldCheckbox;
