import React, { useContext } from "react";
import { map } from "lodash";
import { DeleteContext } from "../common/with-delete";
import cn from "classnames";
import Pagination from "../common/pagination";
import { money } from "../formatters";

const Table = ({ info, handleEdit, handleAdd }) => {
  const { handleDeleteClick } = useContext(DeleteContext);

  let stripeN = 1;
  let trClass = "tr-stripe1";

  return (
    <>
      <table className="uk-table uk-table-small uk-table-grid uk-table-hover">
        <thead>
          <tr>
            <th className="uk-text-center">Name</th>
            <th className="uk-text-center">From</th>
            <th className="uk-text-center">Amount From</th>
            <th className="uk-text-center">Amount To</th>
            <th className="uk-text-center">To</th>
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
          {map(info.Records, (record) => {
            return (
              <tr key={record.ID}>
                <td>{record.Description}</td>
                <td className={cn(`clr-${record.AccountFromTag}`)}>
                  {record.AccountFromName}
                </td>
                <td className="uk-text-right">
                  {money(record.AmountFrom)}
                </td>
                <td className="uk-text-right">
                  {money(record.AmountTo)}
                </td>
                <td className={cn(`clr-${record.AccountToTag}`)}>
                  {record.AccountToName}
                </td>                
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
                    onClick={() => {
                      handleDeleteClick(record.ID);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Table;
