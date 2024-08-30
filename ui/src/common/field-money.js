import React, { useState } from "react";
import cn from "classnames";
import { isEmpty } from "lodash";

const FieldMoney = ({
  label,
  field,
  record,
  setRecord,
  errors,
  widthClass = "uk-form-width-medium",
}) => {
  const [temp, setTemp] = useState(record[field] / 100.0);

  const handleChange = (e) => {
    let text = e.target.value;
    setTemp(text);

    const fv = parseFloat(text.replace(",", "."));

    const newRecord = { ...record };
    newRecord[field] = Math.round(fv * 100);
    setRecord(newRecord);
  };

  return (
    <div className="uk-margin">
      <label className="uk-form-label">{label}</label>
      <div className="uk-form-controls">
        <input
          className={cn(widthClass, "uk-input uk-form-small", {
            "uk-form-danger": !isEmpty(errors[field]),
          })}
          value={temp}
          onChange={handleChange}
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

export default FieldMoney;
