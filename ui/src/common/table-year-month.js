import React, { useMemo } from "react";
import { map, each } from "lodash";
import { money } from "../formatters";

const months = [
  "12",
  "11",
  "10",
  "09",
  "08",
  "07",
  "06",
  "05",
  "04",
  "03",
  "02",
  "01",
];

const TableYearMonth = ({ records }) => {
  const data = useMemo(() => {
    if (records.length == 0) {
      return [];
    }

    const asHash = {};
    each(records, (r) => {
      asHash[r.YearMonth] = r.Sum;
    });

    const max = parseInt(records[0].YearMonth.split("-")[0]);
    const min = parseInt(records[records.length - 1].YearMonth.split("-")[0]);

    const result = [];

    for (let y = max; y >= min; y--) {
      const temp = {
        Year: y,
        Total: 0,
        Avg: 0,
        Values: [],
      };

      for (let m of months) {
        const key = `${y}-${m}`;
        temp.Total = temp.Total + (asHash[key] || 0);
        temp.Values.push({ Month: m, Sum: asHash[key] || 0 });
      }

      temp.Avg = Math.round(temp.Total / 12.0);

      result.push(temp);
    }

    return result;
  });

  return (
    <>
      {map(data, (yearInfo, yi) => (
        <table
          className="uk-table uk-table-small uk-table-grid uk-table-hover uk-table-striped"
          key={yi}
        >
          <thead>
            <tr>
              <th>{yearInfo.Year}</th>
              <th className="uk-text-center"></th>
              <th className="uk-text-right money">
                Σ: {money(yearInfo.Total)}
                <br />
                A: {money(yearInfo.Avg)}
              </th>
            </tr>
            {map(yearInfo.Values, (record, index) => (
              <tr key={index}>
                <td></td>
                <th className="uk-text-center">{record.Month}</th>
                <td className="money">{money(record.Sum)}</td>
              </tr>
            ))}
          </thead>
        </table>
      ))}
    </>
  );
};

export default TableYearMonth;
