import React from "react";
import cn from "classnames";
import TableYearMonth from "../common/table-year-month";

const Report = ({ data, handleBack }) => {
  return (
    <div className="uk-grid uk-padding-small uk-padding-remove-top">
      <div>
        <table className="uk-table uk-table-small uk-table-grid uk-table-hover uk-table-striped">
          <thead>
            <tr>
              <th className="uk-text-center">ID</th>
              <td className="uk-text-center">{data.Record.ID}</td>
            </tr>
            <tr>
              <th className="uk-text-center">Name</th>
              <td>{data.Record.Name}</td>
            </tr>
            <tr>
              <th className="uk-text-center">Currency</th>
              <td className="uk-text-center">{data.Record.CurrencyCode}</td>
            </tr>
            <tr>
              <th className="uk-text-center">Visible</th>
              <td className="uk-text-center">{data.Record.Visible}</td>
            </tr>
            <tr>
              <th className="uk-text-center">Tag</th>
              <td className={cn("uk-text-center", `clr-${data.Record.Tag}`)}>
                {data.Record.Tag}
              </td>
            </tr>
            <tr>
              <th className="uk-text-center">Last Used</th>
              <td className="uk-text-right">{data.Record.LastUsedDays}</td>
            </tr>
          </thead>
        </table>
      </div>

      <div>
        <h5>In</h5>
        {!data.IncomeSums.length && <span className="uk-form-danger">N/A</span>}
        {!!data.IncomeSums.length && <TableYearMonth records={data.IncomeSums} />}
      </div>

      <div>
        <h5>Out</h5>
        {!data.ExpenseSums.length && (
          <span className="uk-form-danger">N/A</span>
        )}
        {!!data.ExpenseSums.length && <TableYearMonth records={data.ExpenseSums} />}
      </div>

      <div>
        <button
          type="button"
          className="uk-button uk-button-primary"
          onClick={handleBack}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default Report;
