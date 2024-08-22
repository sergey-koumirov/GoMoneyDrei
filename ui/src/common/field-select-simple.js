import React from "react";
import { isEmpty, map } from "lodash";
import cn from "classnames";

const FieldSelectSimple = ({
  label,
  field,
  record,
  setRecord,
  collection,
  errors,
}) => {
  const handleChange = (e) => {
    const newVal = e.target.value;
    const newRecord = { ...record };
    newRecord[field] = newVal;
    setRecord(newRecord);
  };

  return (
    <div className="uk-margin">
      <label className="uk-form-label">{label}</label>
      <div className="uk-form-controls">
        <select
          className={cn("uk-form-width-medium", {
            "uk-form-danger": !isEmpty(errors[field]),
          })}
          value={record[field]}
          onChange={handleChange}
        >
          <option value="">Please select...</option>
          {map(collection, (el) => (
            <option key={el} value={el}>
              {el}
            </option>
          ))}
        </select>
        {!isEmpty(errors[field]) && (
          <span className="uk-padding-small uk-form-danger">
            {errors[field].join("; ")}
          </span>
        )}
      </div>
    </div>
  );
};

export default FieldSelectSimple;
