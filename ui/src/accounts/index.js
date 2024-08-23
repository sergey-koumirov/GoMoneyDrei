import React, { useEffect, useState } from "react";
import {
  apiAccounts,
  apiAccountCreate,
  apiAccountUpdate,
  apiAccountDelete,
  apiAccountReport,
} from "../api";
import Table from "./table";
import Editor from "./editor";
import Report from "./report";
import { isEmpty } from "lodash";
import { WithDeleteContext } from "../common/with-delete";

const Accounts = () => {
  const [data, setData] = useState({});
  const [reportData, setReportData] = useState({});
  const [mode, setMode] = useState("index");
  const [record, setRecord] = useState({});
  const [errors, setErrors] = useState({});

  const handleDelete = (id, afterCallback) => {
    apiAccountDelete(id).then(({ errors }) => {
      if (isEmpty(errors)) {
        apiAccounts().then((data) => {
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
      Name: "",
      Tag: "",
      Visible: 1,
      CurrencyCode: "",
      CurrencyID: "",
    });
    setErrors({});
    setMode("edit");
  };

  const handleCancel = () => {
    setMode("index");
  };

  const handleSave = (payload) => {
    if (payload.ID === 0) {
      apiAccountCreate(payload).then(({ _, errors }) => {
        if (isEmpty(errors)) {
          apiAccounts().then((data) => {
            setMode("index");
            setData(data);
          });
        } else {
          setErrors(errors);
        }
      });
    } else {
      apiAccountUpdate(payload).then(({ _, errors }) => {
        if (isEmpty(errors)) {
          apiAccounts().then((data) => {
            setMode("index");
            setData(data);
          });
        } else {
          setErrors(errors);
        }
      });
    }
  };

  const handleReport = (id) => {
    apiAccountReport(id).then((data) => {
      setMode("report");
      setReportData(data);
      console.log("report", data);
    });
  };

  useEffect(() => {
    apiAccounts().then((data) => {
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
            handleReport={handleReport}
          />
        </WithDeleteContext>
      )}

      {mode === "edit" && (
        <Editor
          handleCancel={handleCancel}
          handleSave={handleSave}
          initRecord={record}
          currencies={data.currencies}
          errors={errors}
        />
      )}

      {mode === "report" && (
        <Report
          data={reportData}
          handleBack={() => {
            setMode("index");
          }}
        />
      )}
    </div>
  );
};

export default Accounts;
