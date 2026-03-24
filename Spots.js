import React from 'react'
import { useState } from 'react';
import Papa from 'papaparse'

function Spots() { 

    const [data, setData] = useState([]);
    const [columnArray, setColumn] = useState([]);
    const [values, setValues] = useState([]); 

    const handleFile = (event) => { 
        Papa.parse(event.target.files[0]{
            header: true,
            skipEmptyLines: true, 
            complete: function(result) { 
                const columArrary = [];
                const valuesArray = [];

                result.data.map((d)=>{
                    columnArray.push(Object.keys(d));
                    valuesArray.push(Object.values(d));

                });
                setData(result.data); 
                setColumn(columnArray[0]); 
                setValues(valuesArray);
            }
        }), 
    }
    return ( 
        <div>
            <input>
                type = "file"
                name = 'file'
                accept = '.csv'
                onChange ={handleFile}
            </input>
        </div>
    )

}