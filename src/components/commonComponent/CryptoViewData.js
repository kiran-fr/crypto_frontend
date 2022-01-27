import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { url } from '../../constants/urlConst';
import { HeroCard } from './HeroCard';

export const CryptoViewData = () => {

    const [viewData, setViewData] = useState([])


    const deleteCryptData = async (id) => {

        try {
            console.log("This is id", id)
            const data = await axios.delete(`${url}/delete/${id}`)
            window.location.reload()
        } catch (error) {
            console.log(error)
        }

    }


    const getCryptoData = async () => {
        try {
            const { data } = await axios.get(`${url}/view`)
            setViewData(data)
            console.log(viewData)
        } catch (error) {
            console.log("This is erro", error)
        }

    }



    useEffect(() => {
        getCryptoData()
    }, [])
    return <div>
         <HeroCard />

        <div style={{ border: '2px solid #ccc', borderRadius: 7, padding: "15px 15px 0px 15px", margin: '20px 20px' }} >
            <Link style={{ marginTop: 20, paddingBottom: 40 }} to='/home'>Go to home page</Link>
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
                    {viewData.length === 0 ?
                        <tr style={{ textAlign: 'center' }}>
                            <td colSpan={5}>No Date here, go to home page save the data <Link to='/home'>Click Here</Link></td>
                        </tr> :
                        viewData.map((view, indx) => {
                            return <tr key={indx} >
                                <td>{indx + 1}</td>
                                <td>{view.crypto_name}</td>
                                <td>{view.crypto_symbol}</td>
                                <td>{view.current_price}</td>
                                <td className="data_action">
                                    <Button variant='danger' onClick={() => deleteCryptData(view._id)} >Delete</Button>
                                </td>
                            </tr>
                        })
                    }

                </tbody>
            </Table>
        </div>
    </div>;
}
