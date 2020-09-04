import React from 'react'
import Item from './ExpenseItem';
import {AiTwotoneDelete} from 'react-icons/ai';

const ExpenseList = ({expenses,handleEdit, handleDelete, 
    clearItems}) => {
    return (
        <>
            <ul className="List">
             {expenses.map((expense)=> {
            return ( 
            <Item 
            key={expense.id} 
            expense={expense}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            />
             );
             })}   
            </ul>
           {expenses.length > 0 && 
           <button className="btn" onClick={clearItems}>
               clear expenses
           <AiTwotoneDelete className="btn-icon" />
           </button>}
        </>
    )
}

export default ExpenseList
