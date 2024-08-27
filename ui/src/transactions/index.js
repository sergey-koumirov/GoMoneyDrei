import React, { useEffect, useState } from "react";
import Table from "./table";
import { WithDeleteContext } from "../common/with-delete";
import { apiTransactions } from "../api";

const Transactions = () => {
  const [data, setData] = useState({});
  const [mode, setMode] = useState("index");
  const [record, setRecord] = useState({});
  const [errors, setErrors] = useState({});
  const [page, setPage] = useState(1);

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
      Dt: "",
      Description: "",
      AccountFromId: 0,
      AccountFromName: "",
      CurrencyFromCode: "",
      AmountFrom: 0,
      AccountToId: 0,
      AccountToName: "",
      CurrencyToCode: "",
      AmountTo: 0,
    });
    setErrors({});
    setMode("edit");
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
    </div>
  );
};

export default Transactions;
