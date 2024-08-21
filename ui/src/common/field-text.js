import React from "react";
import cn from "classnames";
import { isEmpty } from "lodash";

const FieldText = ({ label, field, record, setRecord, errors }) => {
  return (
    <div className="uk-margin">
      <label className="uk-form-label">{label}</label>
      <div className="uk-form-controls">
        <input
          className={cn("uk-input uk-form-width-medium uk-form-small", {
            "uk-form-danger": !isEmpty(errors[field]),
          })}
          value={record[field]}
          onChange={(e) => {
            const newRecord = { ...record };
            newRecord[field] = e.target.value;
            setRecord(newRecord);
          }}
          type="text"
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

export default FieldText;
