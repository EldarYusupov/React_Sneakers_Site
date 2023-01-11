import React from 'react';
import Card from "../components/Card/Card";

const Home = ({items, onAddToCart, onAddToFavorite, onChangeSearchInput, searchValue, setSearchValue}) => {
    return (
        <div className="content p-40">
            <div className='d-flex align-center justify-between mb-40'>
                <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
                <div className='search-block d-flex'>
                    <img src="/img/search.svg" alt="Search"/>
                    { searchValue &&
                        <img onClick={() => setSearchValue('')}
                             className='removeBtn cu-p clear'
                             src="/img/btn-remove.svg" alt="Remove"/>}
                    <input type="text" placeholder='Поиск...' value={searchValue} onChange={onChangeSearchInput}/>
                </div>
            </div>
            <div className='d-flex flex-wrap'>
                {items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase())).map((el, index) =>
                    <Card
                        key={index}
                        title={el.title}
                        prise={el.prise}
                        img={el.imageUrl}
                        onPlus={onAddToCart}
                        onFavorite={onAddToFavorite}/>
                )}
            </div>
        </div>

    )
}

export default Home