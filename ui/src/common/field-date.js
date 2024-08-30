import React from "react";
import { isEmpty } from "lodash";

const FieldDate = ({ label, field, record, setRecord, errors }) => {
  const handleChange = (e) => {
    const newRecord = { ...record };
    newRecord[field] = e.target.value;
    setRecord(newRecord);
  };

  return (
    <div className="uk-margin">
      <label className="uk-form-label">{label}</label>
      <div className="uk-form-controls">
        <input
          type="date"
          className="uk-input uk-form-width-medium uk-form-small"
          value={record[field]}
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

export default FieldDate;
