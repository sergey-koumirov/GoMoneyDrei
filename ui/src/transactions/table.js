import React, { useContext } from "react";
import { map } from "lodash";
import { DeleteContext } from "../common/with-delete";
import cn from "classnames";
import Pagination from "../common/pagination";
import { money } from "../formatters";

const Table = ({ info, handleEdit, handleAdd, handlePageChange }) => {
  const { handleDeleteClick } = useContext(DeleteContext);

  let stripeN = 1;
  let trClass = "tr-stripe1";

  return (
    <>
      <table className="uk-table uk-table-small uk-table-grid uk-table-hover">
        <thead>
          <tr>
            <th className="uk-text-center">Dt</th>
            <th className="uk-text-center">From</th>
            <th className="uk-text-center">Amount</th>
            <th className="uk-text-center">To</th>
            <th className="uk-text-center">Notes</th>
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
          {map(info.Records, (record, index) => {
            if (record.Dt === info.Today) {
              trClass = "tr-today";
            } else if (
              index > 0 &&
              stripeN === 1 &&
              info.Records[index - 1].Dt !== record.Dt
            ) {
              stripeN = 2;
              trClass = "tr-stripe2";
            } else if (
              index > 0 &&
              stripeN === 2 &&
              info.Records[index - 1].Dt !== record.Dt
            ) {
              stripeN = 1;
              trClass = "tr-stripe1";
            }

            return (
              <tr key={record.ID} className={trClass}>
                <td className="uk-text-center">{record.Dt}</td>
                <td className={cn(`clr-${record.AccountFromTag}`)}>
                  {record.AccountFromName}
                </td>
                <td className="uk-text-right">
                  <AmountText record={record} />
                </td>
                <td className={cn(`clr-${record.AccountToTag}`)}>
                  {record.AccountToName}
                </td>
                <td>{record.Description}</td>
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
      <Pagination
        page={info.Index}
        max={info.MaxIndex}
        onChange={handlePageChange}
      />
    </>
  );
};

const AmountText = ({ record }) => {
  if (record.CurrencyFromCode === record.CurrencyToCode) {
    const spanClass =
      record.AccountFromTag === "balance"
        ? `clr-${record.AccountToTag}`
        : `clr-${record.AccountFromTag}`;
    return (
      <>
        <span className={spanClass}>{money(record.AmountFrom)}</span>
        <sub>&nbsp;{record.CurrencyFromCode}</sub>
      </>
    );
  }

  return (
    <>
      <span className={cn(`clr-${record.AccountFromTag}`)}>
        {money(record.AmountFrom)}
      </span>
      <sub>&nbsp;{record.CurrencyFromCode}</sub>
      &nbsp;-&gt;&nbsp;
      <span className={cn(`clr-${record.AccountToTag}`)}>
        {money(record.AmountTo)}
      </span>
      <sub>&nbsp;{record.CurrencyToCode}</sub>
    </>
  );
};

export default Table;
