import React from "react";
import { map } from "lodash";

const Table = ({ records, handleEdit, handleDelete, handleAdd }) => {
  return (
    <table className="uk-table uk-table-small uk-table-grid uk-table-hover uk-table-striped">
      <thead>
        <tr>
          <th className="uk-text-center">ID</th>
          <th className="uk-text-center">Name</th>
          <th className="uk-text-center">Code</th>
          <th className="uk-text-right uk-width-small">
            <button
              onClick={handleAdd}
              className="uk-button uk-button-primary uk-button-micro"
            >
              Add
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {map(records, (record) => (
          <tr key={record.ID}>
            <td className="uk-text-center">{record.ID}</td>
            <td>{record.Name}</td>
            <td>{record.Code}</td>
            <td className="uk-text-right uk-width-small">
              <button
                className="uk-button uk-button-micro uk-button-primary hiddenish"
                onClick={() => {
                  handleEdit(record);
                }}
              >
                Edit
              </button>
              &nbsp;&nbsp;
              <button
                className="uk-button uk-button-micro uk-button-danger hiddenish"
                onClick={handleDelete}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
