import { useReducer } from "react";
import {
    ADD_TO_CART,
    ADD_MULTIPLE_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    CLEAR_CART,
    TOGGLE_CART,
    TOGGLE_EDIT_MODE,
    UPDATE_ACTIVE_INDEX,
    UPDATE_ALL_COURSES,
    UPDATE_CURRENT_COURSE,
    UPDATE_MENU_ITEM,
    UPDATE_MENU_LIST,
    UPDATE_USER
  } from "./actions";


export const reducer = (state, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return {
                ...state,
                cartOpen: true,
                cart: [...state.cart, action.menuItem]
            };
      
        case ADD_MULTIPLE_TO_CART:
            return {
                ...state,
                cartOpen: true,
                cart:[...state.cart, ...action.menuItems]
            };
      
        case REMOVE_FROM_CART:
            let newState = state.cart.filter(menuItem => {
                return menuItem._id !== action._id
            });
      
            return{
                ...state,
                cartOpen: newState.length > 0,
                cart: newState
            };
      
        case UPDATE_CART_QUANTITY:
            return {
                ...state,
                cartOpen: true,
                cart: state.cart.map(menuItem=> {
                    if (action._id === menuItem._id) {
                        menuItem.purchaseQuantity = action.purchaseQuantity;
                    }
                    return menuItem;
                })
            };
      
        case CLEAR_CART:
            return {
                ...state,
                cartOpen: false,
                cart:[]
            };    
      
        case TOGGLE_CART:
            return {
                ...state,
                cartOpen: !state.cartOpen
            };
      
        case TOGGLE_EDIT_MODE:
            return {
                ...state,
                editMode: action.editMode
            };

        case UPDATE_ACTIVE_INDEX: 
            return {
                ...state,
                activeIndex: action.activeIndex
            };
        
        case UPDATE_ALL_COURSES:
            return {
                ...state,
                allCourses: [...action.allCourses]
            };

        case UPDATE_MENU_ITEM:
            return {
                ...state,
                itemPreview: {...action.itemPreview}
            };
            
        case UPDATE_MENU_LIST:
            return {
                ...state,
                menuItems: action.menuItems
            };

        case UPDATE_USER:
            return {
                ...state,
                user: {...action.user}
            };
            
        default:
            return state;
    }
};
      
export function useMenuReducer(initialState) {
    return useReducer(reducer, initialState)
};