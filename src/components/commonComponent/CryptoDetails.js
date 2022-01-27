import { useEffect, useState } from "react"
import { Button, Table } from "react-bootstrap"
import axios from 'axios'
import "../../assets/css/cryptoDetails.css"
import { toast, ToastContainer } from "react-toastify"
import _ from "lodash";
import { cryptUrl, url } from "../../constants/urlConst"
import { Link } from "react-router-dom"
import { HeroCard } from "./HeroCard"

export const CryptoDetails = () => {
    const pageSize = 5;

    // states
    const [crypData, setCryptData] = useState([])
    const [pagenatePost, setPagenatePost] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [viewBtn, setViewBtn] = useState(false)
    const [text, setText] = useState("")
    const [cryptoDb, setCryptoDb] = useState()




    // get data from api
    useEffect(() => {
        const cryptoFun = async () => {
            try {
                const cryptodata = await axios.get(cryptUrl)
                const { data } = cryptodata.data
                setCryptData(data)
                let d = _(data).slice(0).take(pageSize).value()
                setPagenatePost(d)
            } catch (error) {
                console.log('Crypto Data error', error)
            }
        }
        cryptoFun()
    }, [])

    // pagination function
    const pagination = (pageNo) => {
        setCurrentPage(pageNo);
        const startIndex = (pageNo - 1) * pageSize;
        const paginatedPost = _(crypData).slice(startIndex).take(pageSize).value();
        setPagenatePost(paginatedPost);
    }

    // save data to data base function
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
            toast.error(error)
        }
    }


    // get data from data base
    useEffect(() => {
        const fun = async () => {
            const { data } = await axios.get(`https://crypto-web-apps.herokuapp.com/view`)
            setCryptoDb(data)
        }
        fun()
    }, [])


    // api data maping function
    const cryptoTableData = (viewData) => {
        if (viewData.length === 0) {
            return <tr style={{textAlign:'center'}}><td colSpan={5} >No Data Found</td></tr>
        } else {
            return viewData.filter(post => {
                if (text === '') {
                    return post
                } else if (post.name.toLowerCase().includes(text.toLowerCase())) {
                    return post
                }
            })
                .map((data, indx) => {
                    let d = cryptoDb.find(e => e.crypto_name === data.name);
                    return <tr key={indx} >
                        <td>{data.cmc_rank}</td>
                        <td>{data.name}</td>
                        <td>{data.symbol}</td>
                        <td>{Math.round(data.quote.USD.price)}</td>
                        <td className="data_action">
                            {d ?
                                <Button size="sm"  >
                                    <Link to={{ pathname: '/view' }} style={{ color: '#fff', textDecoration: 'none' }} >view</Link>
                                </Button> :
                                <Button variant="success" onClick={() => saveData(data)} size="sm">Save</Button>}
                        </td>
                    </tr>
                })
        }
    }

    const pageCount = crypData ? Math.round(crypData.length / pageSize) : 0

    // if (pageCount === 1) return null
    const pages = _.range(1, pageCount + 1)

    return (
        <>
             <HeroCard />

            <ToastContainer />

            <div style={{ border: '2px solid #ccc', borderRadius: 7, padding: "15px 15px 0px 15px", margin: '20px 20px' }} >
                <input placeholder="Search..." type={'text'} onChange={(e) => setText(e.target.value)} style={{ marginBottom: 15 }} />
                <Table striped bordered hover style={{ boxShadow: '1px 2px 2px #ccc' }}>
                    <thead>
                        <tr style={{ textAlign: 'center' }}>
                            <th>ID</th>
                            <th>Company/Crypto Name</th>
                            <th>Stock/Crypto Symbol</th>
                            <th>Market Cap / Current Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cryptoTableData(pagenatePost)}
                    </tbody>
                </Table>
            </div>

            <nav className="d-flex justify-content-center">
                <ul className="pagination">
                    {pages.map((page, indx) => {
                        return <li key={indx} className={page === currentPage ? "page-item active" : "page-item"}>
                            <p className="page-link"
                                onClick={() => pagination(page)}
                            >{page}</p>
                        </li>
                    })}
                </ul>
            </nav>
        </>
    )
}
