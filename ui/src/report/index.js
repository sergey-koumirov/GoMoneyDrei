import React, { useEffect, useState } from "react";
import { apiReports } from "../api";
import MoneyTable from "../common/money-table";

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

        <h5>{data.PreviousMonth}</h5>
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

export default Report;
