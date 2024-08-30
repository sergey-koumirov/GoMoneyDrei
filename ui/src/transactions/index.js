import React, { useEffect, useState, useContext } from "react";
import Table from "./table";
import Editor from "./editor";
import { WithDeleteContext } from "../common/with-delete";
import {
  apiTransactions,
  apiTransactionCreate,
  apiTransactionUpdate,
  apiTransactionDelete,
} from "../api";
import { isEmpty } from "lodash";
import MoneyTable from "../common/money-table";
import { FilterContext } from "..";

const Transactions = () => {
  const [data, setData] = useState({});
  const [mode, setMode] = useState("index");
  const [record, setRecord] = useState({});
  const [errors, setErrors] = useState({});
  const [page, setPage] = useState(1);
  const [lastUsedDate, setLastUsedDate] = useState(
    new Date().toISOString().split("T")[0],
  );

  const { filter } = useContext(FilterContext);

  const handleDelete = (id, afterCallback) => {
    apiTransactionDelete(id).then(({ errors }) => {
      if (isEmpty(errors)) {
        apiTransactions(page, filter).then((data) => {
          setMode("index");
          setData(data);
        });
      }

      afterCallback && afterCallback(errors);
    });
  };

  const handlePageChange = (newPage) => {
    apiTransactions(newPage, filter).then((data) => {
      setPage(newPage);
      setData(data);
    });
  };

  const handleEdit = (record) => {
    setRecord(record);
    setErrors({});
    setMode("edit");
  };

  const handleAdd = () => {
    setRecord({
      ID: 0,
      Dt: lastUsedDate,
      Description: "",
      AccountFromID: 0,
      AccountFromName: "",
      CurrencyFromCode: "",
      AmountFrom: 0,
      AccountToID: 0,
      AccountToName: "",
      CurrencyToCode: "",
      AmountTo: 0,
    });
    setErrors({});
    setMode("edit");
  };

  const handleCancel = () => {
    setMode("index");
  };

  const handleSave = (payload) => {
    setLastUsedDate(payload.Dt);
    if (payload.ID === 0) {
      apiTransactionCreate(payload).then(({ _, errors }) => {
        if (isEmpty(errors)) {
          apiTransactions(page).then((data) => {
            setMode("index");
            setData(data);
          });
        } else {
          setErrors(errors);
        }
      });
    } else {
      apiTransactionUpdate(payload).then(({ _, errors }) => {
        if (isEmpty(errors)) {
          apiTransactions(page, filter).then((data) => {
            setMode("index");
            setData(data);
          });
        } else {
          setErrors(errors);
        }
      });
    }
  };

  const handleTemplate = (template) => {
    setRecord({
      ID: 0,
      Dt: lastUsedDate,
      Description: "",
      AccountFromID: template.AccountFromID,
      AccountFromName: "",
      CurrencyFromCode: "",
      AmountFrom: template.AmountFrom,
      AccountToID: template.AccountToID,
      AccountToName: "",
      CurrencyToCode: "",
      AmountTo: template.AmountTo,
    });
    setErrors({});
    setMode("edit");
  };

  useEffect(() => {
    apiTransactions(page, filter).then((data) => {
      setData(data);
    });
  }, [filter]);

  return (
    <div className="uk-padding-small uk-padding-remove-top ">
      {mode === "index" && data.info && (
        <WithDeleteContext handleDelete={handleDelete}>
          <Table
            info={data.info}
            handleEdit={handleEdit}
            handleAdd={handleAdd}
            handlePageChange={handlePageChange}
            templates={data.templates}
            handleTemplate={handleTemplate}
          />
          <div className="nailed">
            <MoneyTable records={data.balances} showPart={false} />
          </div>
        </WithDeleteContext>
      )}

      {mode === "edit" && (
        <Editor
          handleCancel={handleCancel}
          handleSave={handleSave}
          initRecord={record}
          accountsFrom={data.accountsFrom}
          accountsTo={data.accountsTo}
          errors={errors}
        />
      )}
    </div>
  );
};

export default Transactions;
