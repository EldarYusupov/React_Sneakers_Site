import React, { useEffect, useState} from "react";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import axios from "axios";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home"
import Favorites from "./pages/Favorites";
import AppContext from "./context";
import Orders from "./pages/Orders";




function App() {

    const  [items, setItems] = useState([])
    const [cartItems, setCartItems] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [cartOpened, setCartOpened] = useState(false)
    const [favorites, setFavorites] =useState([])
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        async function fetchData () {
            const cartResponse = await axios.get('https://63a0c327e3113e5a5c465bc9.mockapi.io/cart')

            const favoritesResponse = await axios.get('https://63a0c327e3113e5a5c465bc9.mockapi.io/favorites')

            const itemsResponse = await axios.get('https://63a0c327e3113e5a5c465bc9.mockapi.io/items')

            setIsLoading(false)

            setCartItems(cartResponse.data)
            setFavorites(favoritesResponse.data)
            setItems(itemsResponse.data)

        }
        fetchData()
    }, [])

    const onAddToCart = (param) => {
        if (cartItems.find(obj => Number(param.id) === Number(obj.id))){
            onRemoveItem(param.id)
        } else {
            axios.post('https://63a0c327e3113e5a5c465bc9.mockapi.io/cart', param).then(res => {
                setCartItems((prev) => [...prev, res.data])
            })
        }


    }

    const onRemoveItem = (id) => {
        axios.delete(`https://63a0c327e3113e5a5c465bc9.mockapi.io/cart/${id}`)
        setCartItems((prev) => prev.filter(item => Number(item.id) !== Number(id)))
    }

    const onAddToFavorite = (param) => {
        if (favorites.find(obj => param.id === obj.id)){
            axios.delete(`https://63a0c327e3113e5a5c465bc9.mockapi.io/favorites/${param.id}`).then(res => {
                setFavorites((prev) => prev.filter(item => item.id !== res.data.id))
            })
        } else {
            axios.post('https://63a0c327e3113e5a5c465bc9.mockapi.io/favorites', param).then(res => {
                setFavorites((prev) => [...prev, res.data])

            })
        }

    }


    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value)
    }

    const isItemAdded = (id) =>{
        return cartItems.some(obj => Number(obj.id) === Number(id))
    }
  return (
      <AppContext.Provider value={{items, cartItems, favorites, isItemAdded, setCartOpened, setCartItems, onAddToFavorite, onAddToCart, isLoading}}>
          <div className="wrapper clear">
              { cartOpened ? <Drawer onRemove={onRemoveItem} items={cartItems} onClose={() => setCartOpened(false)}/> : null}

              <Header onClickCart={() => setCartOpened(true)}/>

              <Routes>
                  <Route
                      path="/"
                      element={
                          <Home
                              cartItems={cartItems}
                              items={items}
                              searchValue={searchValue}
                              setSearchValue={setSearchValue}
                              onChangeSearchInput={onChangeSearchInput}
                              onAddToFavorite={onAddToFavorite}
                              onAddToCart={onAddToCart}
                              isLoading={isLoading}
                          />
                      }
                  >
                  </Route>

                  <Route path="/favorites" element={<Favorites  onAddToFavorite={onAddToFavorite}/>}>

                  </Route>
                  <Route path="/orders" element={<Orders  onAddToFavorite={onAddToFavorite}/>}>

                  </Route>
              </Routes>



          </div>
      </AppContext.Provider>
  )
}

export default App;
