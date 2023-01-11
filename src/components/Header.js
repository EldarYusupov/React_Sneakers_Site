import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import AppContext from "../context";

const Header = (props) => {

    const {cartItems} = useContext(AppContext)
    const totalPrise = cartItems.reduce((sum, obj) => obj.prise + sum, 0)

    return (
        <header className="d-flex  justify-between align-center p-40">
            <Link to="/">
            <div className='d-flex align-center'>
                    <img  width={40} height={40} src="/img/logo.png" alt=""/>
                    <div>
                        <h3 className='text-uppercase'>React Sneakers</h3>
                        <p className="opacity-5">Магазин лучших кроссовок</p>
                    </div>
            </div>
            </Link>
            <ul className='d-flex'>
                <li className='mr-30 cu-p' onClick={props.onClickCart}>
                    <img src="/img/cart.svg" alt=""/>
                    <span>{totalPrise}грн.</span>
                </li>
                <li className='mr-20 cu-p'>
                    <Link to="/favorites">
                        <img src="/img/heart.svg" alt="heart"/>
                    </Link>
                </li>
                <Link to="/orders">
                    <li>
                        <img src="/img/user.svg" alt="User"/>
                    </li>
                </Link>
            </ul>
        </header>

    );
};

export default Header;