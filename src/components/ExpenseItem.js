import React from 'react'
import {AiTwotoneEdit,AiTwotoneDelete} from 'react-icons/ai';

const ExpenseItem = ({expense, handleEdit, handleDelete }) => {
    const {id, charge,amount} = expense;
    return (
        <li className="item">
        <div className="info">
            <span className="expense">{charge}</span>
            <span className="amount">${amount}</span>
        </div>
        <div>
            <button className="edit-btn" 
                aria-label="edit button"
                onClick={() =>handleEdit(id)}
                >
                <AiTwotoneEdit/>
            </button>
            <button className="clear-btn" 
            aria-label="delete button"
            onClick={() => handleDelete(id)}
            >
                <AiTwotoneDelete/>
            </button>
        </div>
        </li>
    );
};

export default ExpenseItem
