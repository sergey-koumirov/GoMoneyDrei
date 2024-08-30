import React, { useEffect, useState } from "react";
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

const Transactions = () => {
  const [data, setData] = useState({});
  const [mode, setMode] = useState("index");
  const [record, setRecord] = useState({});
  const [errors, setErrors] = useState({});
  const [page, setPage] = useState(1);
  const [lastUsedDate, setLastUsedDate] = useState(
    new Date().toISOString().split("T")[0],
  );

  const handleDelete = (id, afterCallback) => {
    apiTransactionDelete(id).then(({ errors }) => {
      if (isEmpty(errors)) {
        apiTransactions(page).then((data) => {
          setMode("index");
          setData(data);
        });
      }

      afterCallback && afterCallback(errors);
    });
  };

  const handlePageChange = (newPage) => {
    apiTransactions(newPage).then((data) => {
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
          apiTransactions(page).then((data) => {
            setMode("index");
            setData(data);
          });
        } else {
          setErrors(errors);
        }
      });
    }
  };

  useEffect(() => {
    apiTransactions(page).then((data) => {
      setData(data);
    });
  }, []);

  return (
    <div className="uk-padding-small uk-padding-remove-top ">
      {mode === "index" && data.info && (
        <WithDeleteContext handleDelete={handleDelete}>
          <Table
            info={data.info}
            handleEdit={handleEdit}
            handleAdd={handleAdd}
            handlePageChange={handlePageChange}
          />
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
