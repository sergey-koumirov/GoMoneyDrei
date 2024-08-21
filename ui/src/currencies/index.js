import React, { useEffect, useState } from "react";
import {
  apiCurrencies,
  apiCurrenciesCreate,
  apiCurrenciesUpdate,
} from "../api";
import Table from "./table";
import Editor from "./editor";
import { isEmpty } from "lodash";

const Currencies = () => {
  const [data, setData] = useState({});
  const [mode, setMode] = useState("index");
  const [record, setRecord] = useState({});
  const [errors, setErrors] = useState({});

  const handleDelete = () => {
    console.log("handleDelete");
  };

  const handleEdit = (record) => {
    setRecord(record);
    setErrors({});
    setMode("edit");
  };

  const handleAdd = () => {
    setRecord({ ID: 0, Name: "", Code: "" });
    setErrors({});
    setMode("edit");
  };

  const handleCancel = () => {
    setMode("index");
  };

  const handleSave = (payload) => {
    if (payload.ID === 0) {
      apiCurrenciesCreate(payload).then(({ _, errors }) => {
        if (isEmpty(errors)) {
          apiCurrencies().then((data) => {
            setMode("index");
            setData(data);
          });
        } else {
          setErrors(errors);
        }
      });
    } else {
      apiCurrenciesUpdate(payload).then(({ _, errors }) => {
        if (isEmpty(errors)) {
          apiCurrencies().then((data) => {
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
    apiCurrencies().then((data) => {
      setData(data);
    });
  }, []);

  return (
    <div className="uk-padding-small uk-padding-remove-top ">
      {mode === "index" && (
        <Table
          records={data.records}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleAdd={handleAdd}
        />
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

export default Currencies;
