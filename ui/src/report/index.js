import React, { useEffect, useState, Fragment } from "react";
import { apiReports } from "../api";
import { map } from "lodash";
import { money, percent } from "../formatters";
const Report = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    apiReports().then((data) => {
      setData(data);
    });
  }, []);

  return (
    <div className="uk-grid uk-padding-small uk-padding-remove-top">
      <div className="uk-width-1-3@s">
        <h5>Accounts</h5>
        <MoneyTable records={data.Balances} showPart={false} />

        <h5>Stocks</h5>
      </div>

      <div className="uk-width-2-3@s">
        <h5>{data.CurrentMonth}</h5>
        <div className="uk-grid uk-padding-small uk-padding-remove-top">
          <div className="uk-width-1-2@s">
            <MoneyTable records={data.CurrentIncomes} />
          </div>
          <div className="uk-width-1-2@s">
            <MoneyTable records={data.CurrentExpenses} />
          </div>
        </div>

        <h5>Prev Month</h5>
        <div className="uk-grid uk-padding-small uk-padding-remove-top">
          <div className="uk-width-1-2@s">
            <MoneyTable records={data.PreviousIncomes} />
          </div>
          <div className="uk-width-1-2@s">
            <MoneyTable records={data.PreviousExpenses} />
          </div>
        </div>

        <h5>Prev 12 Month</h5>
        <div className="uk-grid uk-padding-small uk-padding-remove-top">
          <div className="uk-width-1-2@s">
            <MoneyTable records={data.YearIncomes} />
          </div>
          <div className="uk-width-1-2@s">
            <MoneyTable records={data.YearExpenses} />
          </div>
        </div>
      </div>
    </div>
  );
};

const MoneyTable = ({ records, showPart = true }) => {
  return (
    <table className="uk-table uk-table-striped uk-table-small uk-table-grid">
      <tbody>
        {map(records, (info, index) => (
          <Fragment key={info.CurrencyCode}>
            <tr>
              <th>{info.CurrencyCode}</th>
              <td></td>
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
                <td></td>
                <th>{rec.Name}</th>
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

export default Report;
