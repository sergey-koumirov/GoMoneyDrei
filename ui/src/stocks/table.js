import React, { useContext } from "react";
import { map } from "lodash";
import { DeleteContext } from "../common/with-delete";
import { FilterContext } from "..";
import { money, stock, partPerc } from "../formatters";

const Table = ({ info, handleEdit, handleAdd }) => {
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
            <th className="uk-text-center">Code</th>
            <th className="uk-text-center">Buy Sum</th>
            <th className="uk-text-center">Count</th>
            <th className="uk-text-center">Sell Sum</th>
            <th className="uk-text-center">+/-</th>
            <th></th>
            <th className="uk-text-center">Dividents</th>
            <th></th>
            <th className="uk-text-center">Sell Price</th>
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
              <td className="uk-text-center">{record.Code}</td>
              <td className="money">{money(record.BuySum)}</td>
              <td className="money">{stock(record.Rest)}</td>
              <td className="money">{money(record.SellSum)}</td>
              <td className="money">{money(record.SellSum - record.BuySum)}</td>
              <td className="money">
                {partPerc(record.SellSum - record.BuySum, record.BuySum)}
              </td>
              <td className="money">{money(record.Dividents)}</td>
              <td className="money">
                {partPerc(record.Dividents, record.BuySum)}
              </td>
              <td className="money">{money(record.SellPrice)}</td>
              <td className="uk-text-right uk-width-little">
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
    </>
  );
};

export default Table;
