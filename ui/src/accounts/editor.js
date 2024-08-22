import React, { useState } from "react";
import FieldID from "../common/field-id";
import BaseErrors from "../common/base-errors";
import FieldText from "../common/field-text";
import CancelSave from "../common/cancel-save";
import FieldSelect from "../common/field-select";
import FieldSelectSimple from "../common/field-select-simple";
import FieldCheckbox from "../common/field-checkbox";

const Editor = ({
  handleCancel,
  handleSave,
  initRecord,
  currencies,
  errors,
}) => {
  const [record, setRecord] = useState(initRecord);

  return (
    <form className="uk-form-horizontal">
      <FieldID record={record} />

      <FieldText
        label="Name"
        field="Name"
        record={record}
        errors={errors}
        setRecord={setRecord}
      />

      <FieldSelect
        label="Currency"
        field="CurrencyID"
        fieldName="CurrencyName"
        record={record}
        setRecord={setRecord}
        collection={currencies}
        errors={errors}
      />

      <FieldCheckbox
        label="Visible"
        field="Visible"
        record={record}
        errors={errors}
        setRecord={setRecord}
      />

      <FieldSelectSimple
        label="Tag"
        field="Tag"
        record={record}
        setRecord={setRecord}
        collection={["balance", "expense", "income"]}
        errors={errors}
      />

      <CancelSave
        record={record}
        handleCancel={handleCancel}
        handleSave={handleSave}
      />

      <BaseErrors errors={errors} />
    </form>
  );
};

export default Editor;
