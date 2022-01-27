import React, { useEffect, useState } from "react";
import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import axios from "axios";
import { cryptUrl } from "../../constants/urlConst";
// import '../../assets/css/DemoTable.css'

const tableHead = {
  name: "Campaign Name",
  parentId: "Campaign Id",
  campaignType: "Type",
  status: "Status",
  channel: "Channel",
  action: "Actions"
};

const DemoTableData = () => {
  const countPerPage = 10;
  const [value, setValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [cryptData, setCryptData] = useState([]);
  const [collection, setCollection] = useState([]);

  const cryptoFun = async () => {
    try {
      const cryptodata = await axios.get(cryptUrl)
      const { data } = cryptodata.data
      setCryptData(data)
      
          setCollection(cloneDeep(cryptData.slice(0, countPerPage)))
      

    } catch (error) {
      console.log('Crypto Data error', error)
    }
  }

  // get data from api
  useEffect(() => {

    cryptoFun()
  }, [])


  
  console.log("tHIS IS CRYP cryptData", cloneDeep(cryptData.slice(0,5)))

  console.log("tHIS IS CRYP collection", collection)


  const searchData = React.useRef(
    throttle(val => {
      const query = val.toLowerCase();
      setCurrentPage(1);
      const data = cloneDeep(
        cryptData
          .filter(item => item.name.toLowerCase().indexOf(query) > -1)
          .slice(0, countPerPage)
      );
      setCollection(data);
    }, 400)
  );

  React.useEffect(() => {
    if (!value) {
      updatePage(1);
    } else {
      searchData.current(value);
    }
  }, [value]);

  const updatePage = p => {
    setCurrentPage(p);
    const to = countPerPage * p;
    const from = to - countPerPage;
    setCollection(cloneDeep(cryptData.slice(from, to)));
  };

  const tableRows = rowData => {

    console.log("This isrowDatarowData", rowData)
    const { key, index } = rowData;
    const tableCell = Object.keys(tableHead);
    const columnData = tableCell.map((keyD, i) => {
      console.log(key, keyD)
      return <td key={i}>{key[keyD]}</td>;
    });

    return <tr key={index}>{columnData}</tr>;
  };

  const tableData = () => {
    console.log(collection)
    // return collection.map((key, index) => tableRows({ key, index }));
  };

  const headRow = () => {
    return Object.values(tableHead).map((title, index) => (
      <td key={index}>{title}</td>
    ));
  };

  return (
    <>
      <div className="search">
        <input
          placeholder="Search Campaign"
          value={value}
          onChange={e => setValue(e.target.value)}
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
    </>
  );
};
export default DemoTableData;