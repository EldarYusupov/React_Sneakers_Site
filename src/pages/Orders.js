import React, {useContext, useEffect, useState} from 'react';
import Card from "../components/Card/Card";
import axios from "axios";
import AppContext from "../context";

const Orders = () => {

    const{onAddToCart, onAddToFavorite } = useContext(AppContext)
    const[orders, setOrders] = useState([])
    const[isLoading, setIsLoading] =useState(true)

    useEffect(() => {
        (async () => {
            const {data} = await axios.get('https://63a0c327e3113e5a5c465bc9.mockapi.io/order')
            setOrders(data.map((obj) => obj.items).flat())
            setIsLoading(false)
        })()
    },[])

    return (
        <div className="content p-40">
            <div className='d-flex align-center justify-between mb-40'>
                <h1>Мои заказы</h1>
            </div>
            <div className='d-flex flex-wrap'>
                {(
                    isLoading
                        ? [...Array(8)]
                        : orders
                ).map((el, index) =>
                    <Card
                        key={index}
                        onPlus={onAddToCart}
                        onFavorite={onAddToFavorite}
                        loading={isLoading}
                        {...el}
                    />
                )}
            </div>
        </div>
    )
}

export default Orders;