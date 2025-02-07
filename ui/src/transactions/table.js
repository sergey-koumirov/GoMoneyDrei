import React, { useContext } from "react";
import { map } from "lodash";
import { DeleteContext } from "../common/with-delete";
import cn from "classnames";
import Pagination from "../common/pagination";
import { money, stock } from "../formatters";
import { FilterContext } from "..";

const Table = ({
  info,
  handleEdit,
  handleAdd,
  handlePageChange,
  templates,
  handleTemplate,
  handleRepeat,
}) => {
  const { handleDeleteClick } = useContext(DeleteContext);
  const { filter, setFilter } = useContext(FilterContext);

  let stripeN = 1;
  let trClass = "tr-stripe1";

  const onTemplateClick = (ev, template) => {
    ev.preventDefault();
    handleTemplate(template);
  };

  const handleResetFilter = () => {
    setFilter({ fromID: 0, toID: 0 });
  };

  return (
    <>
      <div className="uk-light">
        {map(templates, (template) => (
          <a
            className="uk-badge"
            key={template.ID}
            onClick={(ev) => {
              onTemplateClick(ev, template);
            }}
          >
            {template.Description}
          </a>
        ))}
      </div>
      <table className="uk-table uk-table-small uk-table-grid uk-table-hover">
        <thead>
          <tr>
            <th className="uk-text-center">Date</th>
            <th className="uk-text-center">From</th>
            <th className="uk-text-center">Amount</th>
            <th className="uk-text-center">To</th>
            <th className="uk-text-center">Notes</th>
            <th className="uk-text-right uk-width-small">
              {(!!filter.fromID || !!filter.toID) && (
                <>
                  <button
                    onClick={handleResetFilter}
                    className="uk-button uk-button-primary uk-button-micro"
                  >
                    Reset
                  </button>
                  &nbsp;
                </>
              )}

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
                  <span
                    className="filter"
                    onClick={() => {
                      setFilter({ fromID: record.AccountFromID, toID: 0 });
                    }}
                  >
                    {record.AccountFromName}
                  </span>
                </td>
                <td className="uk-text-right">
                  <AmountText record={record} />
                </td>
                <td className={cn(`clr-${record.AccountToTag}`)}>
                  <span
                    className="filter"
                    onClick={() => {
                      setFilter({ fromID: 0, toID: record.AccountToID });
                    }}
                  >
                    {record.AccountToName}
                  </span>
                </td>
                <td>{record.Description}</td>
                <td className="uk-text-right uk-width-small">
                  <button
                    className="uk-button uk-button-micro uk-button-primary hiddenish"
                    onClick={() => {
                      handleRepeat(record);
                    }}
                  >
                    ↻
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
                    className="uk-button uk-button-micro uk-button-default hiddenish"
                    onClick={() => {
                      handleDeleteClick(record.ID);
                    }}
                  >
                    ✘
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
        <span className={spanClass}>
          {record.AccountFromTag === "stocks"
            ? stock(record.AmountFrom)
            : money(record.AmountFrom)}
        </span>
        <sub>&nbsp;{record.CurrencyFromCode}</sub>
      </>
    );
  }

  return (
    <>
      <span className={cn(`clr-${record.AccountFromTag}`)}>
        {record.AccountFromTag === "stocks"
          ? stock(record.AmountFrom)
          : money(record.AmountFrom)}
      </span>
      <sub>&nbsp;{record.CurrencyFromCode}</sub>
      &nbsp;-&gt;&nbsp;
      <span className={cn(`clr-${record.AccountToTag}`)}>
        {record.AccountToTag === "stocks"
          ? stock(record.AmountTo)
          : money(record.AmountTo)}
      </span>
      <sub>&nbsp;{record.CurrencyToCode}</sub>
    </>
  );
};

export default Table;
