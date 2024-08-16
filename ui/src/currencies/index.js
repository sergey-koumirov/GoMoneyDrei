import React, {useEffect, useState} from 'react';
import { apiCurrencies } from '../api';
import {map} from "lodash"
const Currencies = () => {

    const [data, setData] = useState({})

    const handleDelete = ()=>{
        console.log("handleDelete");
    }

    useEffect(()=>{
        apiCurrencies().then((data)=>{            
            setData(data);
        });
    },[])    

    return (
        <div className="uk-padding-small uk-padding-remove-top ">
            <table className="uk-table uk-table-small uk-table-grid uk-table-hover uk-table-striped">
                <thead>
                    <tr>
                        <th className="uk-text-center">ID</th>
                        <th className="uk-text-center">Name</th>
                        <th className="uk-text-center">Code</th>
                        <th className="uk-text-right uk-width-small">
                            <button>Add</button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {map(data.records, (record)=>(
                        <tr key={record.ID}>
                            <td className="uk-text-center">
                                {record.ID}
                            </td>
                            <td>{record.Name}</td>
                            <td>{record.Code}</td>
                            <td className="uk-text-right uk-width-small">
                                <button className="hiddenish">Edit</button>
                                &nbsp;&nbsp;
                                <button className="hiddenish" onClick={handleDelete}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Currencies;