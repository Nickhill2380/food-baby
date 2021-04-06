import React from 'react';
import { useStoreContext } from '../../utils/GlobalState';
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';

function MenuItem(item) {
    const {
        _id,
        name,
        image,
        price  
    } = item;

    const [state, dispatch] = useStoreContext();
    const { cart } = state;

    // need to add IDB save
    const addToCart = () => {
        const itemInCart = cart.find((cartItem) => cartItem._id === _id);

        // if there was an item in cart, update purchase qty
        if (itemInCart) {
            dispatch({
                type: UPDATE_CART_QUANTITY,
                _id: _id,
                purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
            });
        } else {
            dispatch({
                type: ADD_TO_CART,
                product: { ...item, purchaseQuantity: 1 }
            })
        }
    };

    return (
        <div>
            <img alt={name} src={`/images/${image}`} />
            <div>
                <span>${price}</span>
            </div>
            <button onClick={addToCart}>Add To Cart</button>
        </div>
    );
};

export default MenuItem