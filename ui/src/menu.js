import React from "react";
import {map} from "lodash";
import cn from "classnames"

const Menu = ({tab, setTab}) => {
    const changeTab = ($ev, newTab) => {
        $ev.preventDefault();
        setTab(newTab);
    }

    return (
        <ul className="uk-tab">
            {map(tabs, (el)=>(
                <li className={cn({"uk-active": el[0] === tab})} key={el[0]}>
                    <a href="#" onClick={($ev)=>{changeTab($ev, el[0])}}>{ el[1] }</a>
                </li>
            ))}
        </ul>
    )
}

const tabs = [
    ['report', 'Report'],
    ['transactions', 'Transactions'],
    ['accounts', 'Accounts'],
    ['currencies', 'Currencies'],
    ['stocks', 'Stocks'],
];

export default Menu;