// Reducer => a function that taks ina an old state and an action => new state

const reducer = (state, action) => {
    let transactions;
    if(action.type === 'DEL_TRANSACTION') {
        transactions = state.filter((t) => t.id !== action.payload);
        localStorage.setItem('transactions', JSON.stringify(transactions));
        return transactions;
    } else if(action.type === 'ADD_TRANSACTION') {
        transactions = [action.payload, ...state];
        localStorage.setItem('transactions', JSON.stringify(transactions));
        return transactions;
    } else {
        return state;
    }
}

export default reducer;