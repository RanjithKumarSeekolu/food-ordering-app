import React from 'react';

const cartContext=React.createContext({
    items:[],
    totalAmout:0,
    addItem: (item)=>{},
    removeItem: (id)=>{},
    clearCart: ()=>{},
    search:''
});

export default cartContext;