import React, { useEffect, useState } from "react";
import {
  apiCurrencies,
  apiCurrenciesCreate,
  apiCurrenciesDelete,
  apiCurrenciesUpdate,
} from "../api";
import Table from "./table";
import Editor from "./editor";
import { isEmpty } from "lodash";
import { WithDeleteContext } from "../common/with-delete";

const Currencies = () => {
  const [data, setData] = useState({});
  const [mode, setMode] = useState("index");
  const [record, setRecord] = useState({});
  const [errors, setErrors] = useState({});

  const handleDelete = (id, afterCallback) => {
    apiCurrenciesDelete(id).then(({ errors }) => {
      if (isEmpty(errors)) {
        apiCurrencies().then((data) => {
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
        <WithDeleteContext handleDelete={handleDelete}>
          <Table
            records={data.records}
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

export default Currencies;
