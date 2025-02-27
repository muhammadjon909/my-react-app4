import { createContext, useContext, useEffect, useState } from "react";

const Context = createContext();

const Provider = ({ children }) => {
    const [wishlist, setWishlist] = useState(
        JSON.parse(localStorage.getItem('wishlist')) || []
    );
    const [cart, setCart] = useState(
        JSON.parse(localStorage.getItem('cart')) || []
    );

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    return (
        <Context.Provider value={{ wishlist, setWishlist, cart, setCart }}>
            {children}
        </Context.Provider>
    );
};

export default Provider;

export const useStateValue = () => {
    return useContext(Context);
};