import React, { useEffect, useState } from "react";
import {
  apiStocks,
  apiStockCreate,
  apiStockUpdate,
  apiStockDelete,
} from "../api";
import Table from "./table";
import Editor from "./editor";
import { isEmpty } from "lodash";
import { WithDeleteContext } from "../common/with-delete";

const Stocks = () => {
  const [data, setData] = useState({});
  const [mode, setMode] = useState("index");
  const [record, setRecord] = useState({});
  const [errors, setErrors] = useState({});

  const handleDelete = (id, afterCallback) => {
    apiStockDelete(id).then(({ errors }) => {
      if (isEmpty(errors)) {
        apiStocks().then((data) => {
          setMode("index");
          setData(data);
        });
      }
      afterCallback && afterCallback(errors);
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
      Name: "[A] ",
      Code: "",
      CurrencyID: 0,
    });
    setErrors({});
    setMode("edit");
  };

  const handleCancel = () => {
    setMode("index");
  };

  const handleSave = (payload) => {
    if (payload.ID === 0) {
      apiStockCreate(payload).then(({ _, errors }) => {
        if (isEmpty(errors)) {
          apiStocks().then((data) => {
            setMode("index");
            setData(data);
          });
        } else {
          setErrors(errors);
        }
      });
    } else {
      apiStockUpdate(payload).then(({ _, errors }) => {
        if (isEmpty(errors)) {
          apiStocks().then((data) => {
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
    apiStocks().then((data) => {
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
          />
        </WithDeleteContext>
      )}

      {mode === "edit" && (
        <Editor
          handleCancel={handleCancel}
          handleSave={handleSave}
          initRecord={record}
          errors={errors}
        />
      )}
    </div>
  );
};

export default Stocks;
