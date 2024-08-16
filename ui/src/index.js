import React, {useEffect, useState} from 'react';
import { createRoot } from "react-dom/client";
import Report from "./report"
import Menu from "./menu"
import Currencies from './currencies';
const App = () => {

    const [tab, setTab] = useState('currencies')

    return (
        <>
            <Menu tab={tab} setTab={setTab}/>
            {tab == 'report' && <Report/>}
            {tab == 'currencies' && <Currencies/>}
        </>
    )
}

const rootElement = document.getElementById("app");
const root = createRoot(rootElement);
root.render(<App />);
