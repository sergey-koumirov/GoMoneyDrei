import React, { createContext, useState } from "react";
import { createRoot } from "react-dom/client";
import Report from "./report";
import Menu from "./menu";
import Currencies from "./currencies";
import Accounts from "./accounts";
import Transactions from "./transactions";
import Templates from "./templates";
import Stocks from "./stocks";

export const FilterContext = createContext({});

const App = () => {
  const [tab, setTab] = useState("stocks");
  const [filter, setFilter] = useState({ fromID: 0, toID: 0 });

  const dd = { filter, setFilter, setTab };

  return (
    <FilterContext.Provider value={dd}>
      <Menu tab={tab} setTab={setTab} />
      {tab == "report" && <Report />}
      {tab == "accounts" && <Accounts />}
      {tab == "templates" && <Templates />}
      {tab == "currencies" && <Currencies />}
      {tab == "transactions" && <Transactions />}
      {tab == "stocks" && <Stocks />}
    </FilterContext.Provider>
  );
};

const rootElement = document.getElementById("app");
const root = createRoot(rootElement);
root.render(<App />);
