import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import Report from "./report";
import Menu from "./menu";
import Currencies from "./currencies";
import Accounts from "./accounts";
import Transactions from "./transactions";
import Templates from "./templates";

const App = () => {
  const [tab, setTab] = useState("transactions");

  return (
    <>
      <Menu tab={tab} setTab={setTab} />
      {tab == "report" && <Report />}
      {tab == "accounts" && <Accounts />}
      {tab == "templates" && <Templates />}
      {tab == "currencies" && <Currencies />}
      {tab == "transactions" && <Transactions />}
    </>
  );
};

const rootElement = document.getElementById("app");
const root = createRoot(rootElement);
root.render(<App />);
