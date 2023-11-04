export const waait = () => new Promise(res => setTimeout(res, Math.random() * 600))

//color
const generateColor = () => {
    const existingWalletLength = fetchData("wallets")?.length ?? 0;
    return `${existingWalletLength * 34} 65% 50%`
}

//local storage
export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key));
};

export const getAllMatchingItems = ({category, key, value}) => {
    const data = fetchData(category) ?? [];
    return data.filter((item) => item[key] === value)
}

export const deleteItem = ({key, id}) => {
    const existingData = fetchData(key);
    if(id){
        const newData = existingData.filter((item) => item.id !== id);
        return localStorage.setItem(key, JSON.stringify(newData));
    }
    return localStorage.removeItem(key);
}

// create a new wallet to local storage
export const createWallet = ({name, amount}) => {
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: +amount,
        color: generateColor()
    }
    const existingWallets = fetchData("wallets") ?? [];
    return localStorage.setItem("wallets", JSON.stringify([...existingWallets, newItem]));
}

//create a new expense 
export const createExpense = ({type, name, amount, walletId}) => {
    const newItem = {
        id: crypto.randomUUID(),
        type: type,
        name: name,
        createdAt: Date.now(),
        amount: +amount,
        walletId: walletId
    }
    const existingExpenses = fetchData("expenses") ?? [];
    return localStorage.setItem("expenses", JSON.stringify([...existingExpenses, newItem]));
}

export const calculateSpentByWallet = (walletId) => {
    const expenses = fetchData("expenses") ?? [];
    const budgetSpent = expenses.reduce((acc, expense) => {
        if(expense.walletId !== walletId) {
            return acc;
        }else if (expense.type === "Expense")
        {
            return acc += expense.amount;
        }else return acc -= expense.amount;
        
    }, 0)
    return budgetSpent;
}

//format currency
export const formatCurrency = (amt) => {
    return amt.toLocaleString(undefined, {
        style: "currency",
        currency: "RON"
    })
}

export const formatDateToLocalString = (epoch) => 
new Date(epoch).toLocaleDateString();