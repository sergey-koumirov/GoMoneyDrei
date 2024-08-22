import React, { useContext } from "react";
import { map } from "lodash";
import { DeleteContext } from "../common/with-delete";

const Table = ({ records, handleEdit, handleAdd }) => {
  const { handleDeleteClick } = useContext(DeleteContext);

  return (
    <table className="uk-table uk-table-small uk-table-grid uk-table-hover uk-table-striped">
      <thead>
        <tr>
          <th className="uk-text-center">ID</th>
          <th className="uk-text-center">Name</th>
          <th className="uk-text-center">Currency</th>
          <th className="uk-text-center">Visible</th>
          <th className="uk-text-center">Tag</th>
          <th className="uk-text-center">Last Used</th>
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
            <td className="uk-text-center">{record.CurrencyCode}</td>
            <td className="uk-text-center">
              {record.Visible === 0 ? "HIDDEN" : ""}
            </td>
            <td className="uk-text-center">{record.Tag}</td>
            <td className="uk-text-right">
              {record.LastUsedDays > 365 ? record.LastUsedDays : ""}
            </td>
            <td className="uk-text-right uk-width-little">
              <button
                className="uk-button uk-button-micro uk-button-primary hiddenish"
                onClick={() => {
                  handleReport(record);
                }}
              >
                Report
              </button>
              &nbsp;&nbsp;
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
                onClick={() => {
                  handleDeleteClick(record.ID);
                }}
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
