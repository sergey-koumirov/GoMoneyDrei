import React, { useEffect, useState } from "react";
import Table from "./table";
import Editor from "./editor";
import { WithDeleteContext } from "../common/with-delete";
import {
  apiTemplates,
  apiTemplateCreate,
  apiTemplateUpdate,
  apiTemplateDelete,
} from "../api";
import { isEmpty } from "lodash";

const Templates = () => {
  const [data, setData] = useState({});
  const [mode, setMode] = useState("index");
  const [record, setRecord] = useState({});
  const [errors, setErrors] = useState({});

  const handleDelete = (id, afterCallback) => {
    apiTemplateDelete(id).then(({ errors }) => {
      if (isEmpty(errors)) {
        apiTemplates().then((data) => {
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
      Description: "",
      AccountFromID: 0,
      AccountFromName: "",
      AmountFrom: 0,
      AccountToID: 0,
      AccountToName: "",
      AmountTo: 0,
    });
    setErrors({});
    setMode("edit");
  };

  const handleCancel = () => {
    setMode("index");
  };

  const handleSave = (payload) => {
    if (payload.ID === 0) {
      apiTemplateCreate(payload).then(({ _, errors }) => {
        if (isEmpty(errors)) {
          apiTemplates().then((data) => {
            setMode("index");
            setData(data);
          });
        } else {
          setErrors(errors);
        }
      });
    } else {
      apiTemplateUpdate(payload).then(({ _, errors }) => {
        if (isEmpty(errors)) {
          apiTemplates().then((data) => {
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
    apiTemplates().then((data) => {
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
          accountsFrom={data.accountsFrom}
          accountsTo={data.accountsTo}
          errors={errors}
        />
      )}
    </div>
  );
};

export default Templates;
