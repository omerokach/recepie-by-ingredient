import React from 'react';
import { RecepieInterface, Ingredient } from '../utils/Interfaces';
function RecepiePage(recepie:RecepieInterface) {
    return (
        <>
        <div className='main-container'>
            <h1>{recepie.title}</h1>
            <img src={recepie.image} alt="" />
        </div>
        </>
    );
}

export default RecepiePage;