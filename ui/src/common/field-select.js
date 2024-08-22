import React from "react";
import { isEmpty, map, find } from "lodash";
import cn from "classnames";

const FieldSelect = ({
  label,
  field,
  fieldName,
  record,
  setRecord,
  collection,
  errors,
}) => {
  const handleChange = (e) => {
    const newID = parseInt(e.target.value);
    const info = find(collection, (el) => {
      return el.ID === newID;
    });

    const newRecord = { ...record };
    if (!!info) {
      newRecord[field] = info.ID;
      if (fieldName) {
        newRecord[fieldName] = info.Name;
      }
    } else {
      newRecord[field] = "";
      if (fieldName) {
        newRecord[fieldName] = "";
      }
    }

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
            <option key={el.ID} value={el.ID}>
              {el.Name}
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

export default FieldSelect;
