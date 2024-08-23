import React from "react";
import { map } from "lodash";
import { money } from "../formatters";

const TableYearMonth = ({ records }) => {
  return (
    <table className="uk-table uk-table-small uk-table-grid uk-table-hover uk-table-striped">
      <thead>
        {map(records, (record, index) => (
          <tr key={index}>
            <th className="uk-text-center">{record.YearMonth}</th>
            <td className="money">{money(record.Sum)}</td>
          </tr>
        ))}
      </thead>
    </table>
  );
};

export default TableYearMonth;
