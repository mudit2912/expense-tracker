import React , { useReducer, createContext } from 'react';
import reducer from './reducer';

const initialState = JSON.parse(localStorage.getItem('transactions')) || [];

export const ExpenseTrackerContext = createContext(initialState);

export const Provider = ({ children }) => {
    const [transactions, dispatch] = useReducer(reducer, initialState);

    const delTransaction = (id) => {
        dispatch({ type: 'DEL_TRANSACTION', payload: id});
    }

    const addTransaction = (transaction) => {
        dispatch({ type: 'ADD_TRANSACTION', payload: transaction})
    }

    const balance = transactions.reduce((acc, currVal) => {
        return (currVal.type === 'Expense' ? acc - currVal.amount : acc + currVal.amount)
    }, 0)
    return (
        <ExpenseTrackerContext.Provider value={{
            delTransaction,
            addTransaction,
            transactions,
            balance
        }}>
            {children}
        </ExpenseTrackerContext.Provider>
    )
}