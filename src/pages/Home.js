import React from 'react';
import Card from "../components/Card/Card";

const Home = ({
                  items,
                  onAddToCart,
                  onAddToFavorite,
                  onChangeSearchInput,
                  searchValue,
                  setSearchValue,
                  isLoading
}) => {


    const renderItems = () => {
        return (
            isLoading
                ? [...Array(8)]
                : items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
        ).map((el, index) =>
            <Card
                key={index}
                onPlus={onAddToCart}
                onFavorite={onAddToFavorite}
                loading={isLoading}
                {...el}
            />
        )
    }
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
                {renderItems()}
            </div>
        </div>

    )
}

export default Home