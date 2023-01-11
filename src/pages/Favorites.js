import React, {useContext} from 'react';
import Card from "../components/Card/Card";
import AppContext from "../context";

const Favorites = ({ onAddToFavorite}) => {

    const {favorites} = useContext(AppContext)

    return (
        <div className="content p-40">
            <div className='d-flex align-center justify-between mb-40'>
                <h1>Мои закладки</h1>
            </div>
            <div className='d-flex flex-wrap'>
                {favorites.map((el, index) =>
                   <Card
                       id={el.id}
                        key={index}
                        title={el.title}
                        prise={el.prise}
                        imageUrl={el.imageUrl}
                        favorited={true}
                        onFavorite={onAddToFavorite}
                        />
                )}
            </div>
        </div>
    )
}

export default Favorites;