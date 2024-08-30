import React, { useState } from "react";
import FieldID from "../common/field-id";
import BaseErrors from "../common/base-errors";
import FieldText from "../common/field-text";
import FieldMoney from "../common/field-money";
import CancelSave from "../common/cancel-save";
import FieldSelect from "../common/field-select";
import FieldDate from "../common/field-date";
import { find } from "lodash";

const Editor = ({
  handleCancel,
  handleSave,
  initRecord,
  accountsFrom,
  accountsTo,
  errors,
}) => {
  const [record, setRecord] = useState(initRecord);

  const accountFrom = find(accountsFrom, (a) => a.ID === record.AccountFromID);
  const accountTo = find(accountsTo, (a) => a.ID === record.AccountToID);
  const showSecond =
    accountFrom &&
    accountTo &&
    accountFrom.CurrencyCode !== accountTo.CurrencyCode;

  return (
    <form className="uk-grid uk-grid-small">
      <div className="uk-width-1-1">
        <FieldID record={record} />
      </div>

      <div className="uk-width-1-1">
        <FieldDate
          label="Date"
          field="Dt"
          record={record}
          setRecord={setRecord}
          errors={errors}
        />
      </div>

      <div className="uk-width-1-4@s">
        <FieldSelect
          label="From"
          field="AccountFromID"
          fieldName="AccountFromName"
          record={record}
          setRecord={setRecord}
          collection={accountsFrom}
          errors={errors}
          widthClass="uk-form-width-100"
        />
        <FieldMoney
          label=""
          field="AmountFrom"
          record={record}
          errors={errors}
          setRecord={setRecord}
          widthClass="uk-form-width-100"
        />
      </div>

      <div className="uk-width-1-4@s">
        <FieldSelect
          label="To"
          field="AccountToID"
          fieldName="AccountToName"
          record={record}
          setRecord={setRecord}
          collection={accountsTo}
          errors={errors}
          widthClass="uk-form-width-100"
        />

        {showSecond && (
          <FieldMoney
            label=""
            field="AmountTo"
            record={record}
            errors={errors}
            setRecord={setRecord}
            widthClass="uk-form-width-100"
          />
        )}
      </div>

      <div className="uk-width-1-1">
        <FieldText
          label="Notes"
          field="Description"
          record={record}
          errors={errors}
          setRecord={setRecord}
          widthClass="uk-form-width-large"
        />
      </div>

      <div className="uk-width-1-1 uk-margin">
        <CancelSave
          record={record}
          handleCancel={handleCancel}
          handleSave={handleSave}
        />
      </div>

      <BaseErrors errors={errors} />
    </form>
  );
};

export default Editor;
