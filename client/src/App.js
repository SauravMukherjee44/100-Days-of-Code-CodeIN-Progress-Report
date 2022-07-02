import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';
import './App.css';
import img from './logo.png';

export default function App() {

  const [user, setUser] = useState([]);
  const [filterVal, setfilterVal] = useState("");
  const br = useState(window.innerWidth <= 550 ? <br /> : null);

  useEffect(() => {
    const callData = async (req, res) => {
      try {
        const res = await fetch('/getdata', {
          method: 'GET',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            "Content-Type": "application/json",
          },
          credentials: "include"
        });

        const sheetData = await res.json();
        setUser(sheetData.data.data);
      }
      catch (error) {
        console.log(error);
      }
    }

    callData();
  }, []);


  return (
    <>
      <div className='container py-3'>
        <img src={img} width="50" height="50" loading='lazy' alt="codein community" />
      </div>

      <div className=' w-100'>
        <h1 className='text-center mx-2 lh-base lh-sm-0 fs-2'>100 DAYS OF CODE {br} PROGRESS REPORT</h1>

        <div className='d-flex justify-content-center my-5 '>
          <div className="border-2 w-50">
            <input type="search" onChange={(e) => setfilterVal(e.target.value)} id="form1" className="form-control" placeholder="Search Your Name.." aria-label="Search" />
          </div>
        </div>

      <div className='container'>
        <Table responsive bordered className='table-fixed my-2 overflow-scroll mx-4 mx-sm-auto '>
          <thead>
            <tr className='text-uppercase table-success'>
              <th>#</th>
              <th>NAME</th>
              <th className='text-nowrap '>College NAME</th>
              <th className='text-nowrap text-center'>DAYSCOMPLETED</th>
              
            </tr>
          </thead>
          <tbody>

            {
              [...user]
                .sort((a, b) => b.DAYSCOMPLETED - a.DAYSCOMPLETED)
                .filter((val) => {
                  if (filterVal === "" || val.NAME === undefined || val.DAYSCOMPLETED === undefined) {
                    return val;
                  }
                  else if (val.NAME.toLowerCase().includes(filterVal.toLowerCase())) {
                    return val;
                  }
                  return ;
                })
                .map((val, index) => {
                  return <tr key={index}>
                    <td className='w-auto'>{index + 1}</td>
                    <td>{val.NAME.toUpperCase()}</td>
                    <td>{val.COLLEGENAME}</td>
                    <td className='text-center'>{val.DAYSCOMPLETED}</td>
                    
                  </tr>
                })
            }
          </tbody>
        </Table>
        </div>
      </div>
    </>
  );
}
