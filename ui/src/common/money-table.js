import React, { Fragment, useContext } from "react";
import { money, percent } from "../formatters";
import { map } from "lodash";
import { FilterContext } from "..";

const MoneyTable = ({ records, showPart = true }) => {
  const { setFilter, setTab } = useContext(FilterContext);

  const applyFilter = (id) => {
    setFilter({ fromID: id, toID: 0 });
    setTab("transactions");
  };

  return (
    <table className="uk-table uk-table-striped uk-table-small uk-table-grid">
      <tbody>
        {map(records, (info, index) => (
          <Fragment key={info.CurrencyCode}>
            <tr>
              <td>
                <b>{info.CurrencyCode}</b>
              </td>
              <td className="money">{money(info.Total)}</td>
              {showPart && (
                <>
                  <td></td>
                  <td></td>
                </>
              )}
            </tr>
            {map(info.Records, (rec) => (
              <tr key={rec.ID}>
                <th>
                  <span
                    className="filter"
                    onClick={() => {
                      applyFilter(rec.ID);
                    }}
                  >
                    {rec.Name}
                  </span>
                </th>
                <td className="money">{money(rec.Amount)}</td>
                {showPart && (
                  <>
                    <td className="uk-text-right">{percent(rec.Part)}</td>
                    <td className="uk-text-right">{percent(rec.PartSum)}</td>
                  </>
                )}
              </tr>
            ))}
            {index !== records.length - 1 && (
              <tr>
                <td>&nbsp;</td>
                <td></td>
                {showPart && (
                  <>
                    <td></td>
                    <td></td>
                  </>
                )}
              </tr>
            )}
          </Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default MoneyTable;
