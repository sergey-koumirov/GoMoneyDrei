import React, { useState } from "react";
import FieldID from "../common/field-id";
import BaseErrors from "../common/base-errors";
import FieldText from "../common/field-text";
import CancelSave from "../common/cancel-save";

const Editor = ({ handleCancel, handleSave, initRecord, errors }) => {
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

      <FieldText
        label="Code"
        field="Code"
        record={record}
        errors={errors}
        setRecord={setRecord}
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
