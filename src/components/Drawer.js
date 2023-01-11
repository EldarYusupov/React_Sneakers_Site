import React, {useState} from 'react';
import Info from "./Info";
import AppContext from "../context";
import axios from "axios";

const Drawer = ({onClose, onRemove,  items = [] }) => {


    const { cartItems,setCartItems} = React.useContext(AppContext)
    const [isOrderComplete, setIsOrderComplete] = useState(false)
    const [orderId, setOrderId] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const totalPrise = cartItems.reduce((sum, obj) => obj.prise + sum, 0)

    const onClickOrder = async () => {
        setIsLoading(true)
        const {data} = await axios.post('https://63a0c327e3113e5a5c465bc9.mockapi.io/order', {
            items: cartItems,
        })
        setOrderId(data.id)
        setIsOrderComplete(true)
        setCartItems([])

        setIsLoading(false)
    }

    return (
        <div>
            <div  className="overlay">
                <div className="drawer">
                    <h2  className='mb-30 d-flex justify-between'>Корзина <img  onClick={onClose} className='removeBtn cu-p' src="/img/btn-remove.svg" alt="Remove"/></h2>
                    {
                        items.length > 0 ?
                            <div className='d-flex flex-column flex'>
                                <div className="items">
                                    {
                                        items.map((el) =>
                                            <div key={el.id} className="cartItem d-flex align-center mb-20">
                                                <div className="cartItemImg" style={{backgroundImage:`url(${el.imageUrl})`}}></div>
                                                <div className='mr-20 flex'>
                                                    <p className='mb-5'>{el.title}</p>
                                                    <b>{el.prise} грн.</b>
                                                </div>
                                                <img className='removeBtn' onClick={() => onRemove(el.id)} src="/img/btn-remove.svg" alt="Remove"/>
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="cartTotalBlock">
                                    <ul>
                                        <li className='d-flex'>
                                            <span>Итого:</span>
                                            <div></div>
                                            <b>{totalPrise} грн.</b>
                                        </li>
                                        <li className='d-flex'>
                                            <span>Налог 5%:</span>
                                            <div></div>
                                            <b>{(totalPrise/100) * 5} грн.</b>
                                        </li>
                                        <button disabled={isLoading} onClick={onClickOrder} className='greenButton'>Оформить заказ <img src="/img/arrow.svg" alt=""/></button>
                                    </ul>
                                </div>
                            </div>
                        : (
                                <Info
                                    title={isOrderComplete ? "Заказ оформлен":"Корзина пустая" }
                                    description={isOrderComplete ? `Ваш заказ №${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя б 1 пару кроссовок для того чтоб сделать заказ"}
                                    image={isOrderComplete ? "/img/complete-order.jpg" : "/img/empty-cart.jpg"}/>

                            )
                    }
                </div>
            </div>

        </div>
    );
};

export default Drawer;