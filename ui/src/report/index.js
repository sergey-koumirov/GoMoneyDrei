import React, {useEffect, useState, Fragment} from 'react';
import { apiReports } from '../api';
import {map} from "lodash"
import {money} from "../formatters"
const Report = () => {

    const [data, setData] = useState({})

    useEffect(()=>{
        apiReports().then((data)=>{            
            setData(data);
        });
    },[])    

    return (
        <div className="uk-grid uk-padding-small uk-padding-remove-top">
            <div>
                <h5>Accounts</h5>
                <table className="uk-table uk-table-small uk-table-grid">
                    <tbody>
                        {map(data.Balances, (info)=>(
                            <Fragment key={info.CurrencyCode}>
                                <tr>
                                    <th>{info.CurrencyCode}</th>
                                    <td></td>
                                    <td></td>
                                </tr>
                                {map(info.Balances, (rec)=>(
                                    <tr key={rec.ID}>
                                        <td></td>
                                        <th>{rec.Name}</th>
                                        <td className="money">{money(rec.Amount)}</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td>&nbsp;</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </Fragment>
                        ))}
                    </tbody>
                </table>

                <h5>Stocks</h5>
            </div>
            <div>
                <h5>Current Month</h5>
                <h5>Prev Month</h5>
                <h5>Prev 12 Month</h5>
            </div>
        </div>
    )
}

export default Report;