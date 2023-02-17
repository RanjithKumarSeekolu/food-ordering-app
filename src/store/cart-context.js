import React from 'react';

const cartContext=React.createContext({
    items:[],
    totalAmout:0,
    addItem: (item)=>{},
    removeItem: (id)=>{}
});

export default cartContext;