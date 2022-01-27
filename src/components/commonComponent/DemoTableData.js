import React, { useEffect, useRef, useState } from "react";
import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import axios from "axios";
import { cryptUrl } from "../../constants/urlConst";
import '../../assets/css/DemoTable.css'
import { Button, ToastContainer } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { HeroCard } from "./HeroCard";


// const q = quote.USD.price

const tableHead = {
  cmc_rank: "ID",
  name: "Company/Crypto Name",
  symbol: "Stock/Crypto Symbol",
  q: "Market Cap / Current Price",
  action: "Actions"
};

const DemoTableData = () => {
  const countPerPage = 5;
  const [value, setValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [cryptData, setCryptData] = useState([]);
  const [collection, setCollection] = useState([]);
  const [cryptoDb, setCryptoDb] = useState([]);

  const cryptoFun = async () => {
    try {
      const cryptodata = await axios.get(cryptUrl)
      const { data } = cryptodata.data
      setCryptData(data)
      setCollection(cloneDeep(data.slice(0, countPerPage)))
    } catch (error) {
      console.log('Crypto Data error', error)
    }
  }

  useEffect(() => {
    cryptoFun()
  }, [])





  const myNewFun = (e) => {
    console.log("This is crypdata", e.target.value)

    let d = cryptData.filter(item => item.name.toLowerCase().includes(e.target.value)).slice(0, countPerPage)
    cryptData.filter(item => console.log(item.name.toLowerCase().includes(e.target.value)))
    setCollection(d)
    setValue(e.target.value)

  }



  useEffect(() => {
    const fun = async () => {
      const { data } = await axios.get(`https://crypto-web-apps.herokuapp.com/view`)
      setCryptoDb(data)
    }
    fun()
  }, [])

  const updatePage = p => {
    setCurrentPage(p);
    const to = countPerPage * p;
    const from = to - countPerPage;
    setCollection(cloneDeep(cryptData.slice(from, to)));
  };
  const saveData = async (saveData) => {
    try {
      const postData = {
        crypto_name: saveData.name,
        crypto_symbol: saveData.symbol,
        current_price: Math.round(saveData.quote.USD.price)
      }
      await axios.post(`https://crypto-web-apps.herokuapp.com/home`, postData)
      window.location.reload()
    } catch (error) {
      console.log(error)
      toast.error(error)
    }
  }
  const tableRows = rowData => {
    let savedData = cryptoDb.find(e => e.crypto_name === rowData.key.name);

    const { key, index } = rowData;

    return <tr key={index}>
      <td>{key.cmc_rank}</td>
      <td>{key.name}</td>
      <td>{key.symbol}</td>
      <td>{key.quote.USD.price}</td>
      <td className="data_action">
        {savedData ?
          <Button size="sm"  >
            <Link to={{ pathname: '/view' }} style={{ color: '#fff', textDecoration: 'none' }} >view</Link>
          </Button> :
          <Button variant="success" onClick={() => saveData(key)} size="sm">Save</Button>}
      </td>
    </tr>;
  };

  const tableData = () => {
    return collection.map((key, index) => tableRows({ key, index }));
  };

  const headRow = () => {
    return Object.values(tableHead).map((title, index) => (
      <td key={index}>{title}</td>
    ));
  };

  return (
    <>
    <HeroCard/>
    <ToastContainer/>
      <div style={{ border: '2px solid #ccc', borderRadius: 7, padding: "15px 15px 15px 15px", margin: '20px 20px' }}>
        <div className="search">
          <input
            placeholder="Search Campaign"
            value={value}
            onChange={myNewFun}
          />
        </div>
        <table>
          <thead>
            <tr>{headRow()}</tr>
          </thead>
          <tbody className="trhover">{tableData()}</tbody>
        </table>
        <Pagination
          pageSize={countPerPage}
          onChange={updatePage}
          current={currentPage}
          total={cryptData.length}
        />
      </div>
    </>
  );
};
export default DemoTableData;