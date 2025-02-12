import React, { useContext } from "react";
import { map } from "lodash";
import { DeleteContext } from "../common/with-delete";
import cn from "classnames";
import Pagination from "../common/pagination";
import { FilterContext } from "..";

const Table = ({
  info,
  handleEdit,
  handleAdd,
  handleReport,
  handlePageChange,
}) => {
  const { handleDeleteClick } = useContext(DeleteContext);
  const { setFilter, setTab } = useContext(FilterContext);

  const applyFilter = (id) => {
    setFilter({ fromID: id, toID: 0 });
    setTab("transactions");
  };

  return (
    <>
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
          {map(info.Records, (record) => (
            <tr key={record.ID}>
              <td className="uk-text-center">{record.ID}</td>
              <td>
                <span
                  className="filter"
                  onClick={() => {
                    applyFilter(record.ID);
                  }}
                >
                  {record.Name}
                </span>
              </td>
              <td className="uk-text-center">{record.CurrencyCode}</td>
              <td className="uk-text-center">
                {record.Visible === 0 ? "HIDDEN" : ""}
              </td>
              <td className={cn("uk-text-center", `clr-${record.Tag}`)}>
                {record.Tag}
              </td>
              <td className="uk-text-right">
                {record.LastUsedDays > 365 ? record.LastUsedDays : ""}
              </td>
              <td className="uk-text-right uk-width-little">
                <button
                  className="uk-button uk-button-micro uk-button-primary hiddenish"
                  onClick={() => {
                    handleReport(record.ID);
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
                  ✘
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        page={info.Index}
        max={info.MaxIndex}
        onChange={handlePageChange}
      />
    </>
  );
};

export default Table;
