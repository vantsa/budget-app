//rrd imports
import { Link, useLoaderData } from "react-router-dom";

// library imports
import { toast } from "react-toastify";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

//helper functions
import { createExpense, createWallet, fetchData, waait, deleteItem } from "../helpers"

//components
import Intro from "../components/Intro";
import AddWalletForm from "../components/AddWalletForm";
import AddExpenseForm from "../components/AddExpenseForm";
import WalletItem from "../components/WalletItem";
import Table from "../components/Table";

//react imports
import { useState } from "react";

//loader
export function dashboardLoader() {
    const userName = fetchData("userName");
    const wallets = fetchData("wallets")
    const expenses = fetchData("expenses")
    return { userName, wallets, expenses }
}

//action
export async function dashboardAction({ request }) {
    await waait();

    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data);
    if (_action === "newUser") {
        try {
            localStorage.setItem("userName", JSON.stringify(values.userName))
            return toast.success(`Welcome, ${values.userName}`)
        }
        catch (e) {
            throw new Error("There was a problem creating your account.")
        }
    }
    if (_action === "createWallet") {
        try {
            createWallet({
                name: values.newWallet,
                amount: values.newWalletAmount
            })
            return toast.success("Wallet created!");
        } catch (e) {
            throw new Error("There was a problem creating your wallet.")
        }
    }
    if (_action === "createExpense") {
        try {
            createExpense({
                type: values.transactionType,
                name: values.newExpense,
                amount: values.newExpenseAmount,
                walletId: values.newExpenseWallet
            })
            return toast.success(`Transaction ${values.newExpense} Added!`);
        } catch (e) {
            throw new Error("There was a problem adding your transaction.")
        }
    }
    if (_action === "deleteExpense") {
        try {
            deleteItem({
                key: "expenses",
                id: values.expenseId
            })
            return toast.success(`Transaction deleted!`);
        } catch (e) {
            throw new Error("There was a problem deleting your transaction.")
        }
    }

}

const Dashboard = () => {
    const { userName, wallets, expenses } = useLoaderData()

    const [isAddWalletFormVisible, setIsAddWalletFormVisible] = useState(false);

    const toggleAddWalletForm = () => {
        setIsAddWalletFormVisible(!isAddWalletFormVisible);
    };

    return (
        <>
            {userName ? (
                <div className="dashboard">
                    <h1>Welcome back, <span className="accent">{userName}</span></h1>
                    <div className="grid-sm">
                        {
                            wallets && wallets.length > 0 ? (
                                <div className="grid-lg">
                                    <h2>Wallets</h2>
                                    <div className="budgets">
                                        {
                                            wallets.map((wallet) => (<WalletItem key={wallet.id} wallet={wallet} />))
                                        }
                                    </div>
                                    <button onClick={toggleAddWalletForm} className="btn btn--dark">
                                        <span>Add New Wallet</span><PlusCircleIcon width={25} />
                                    </button>
                                    <div className={`add-wallet-form ${isAddWalletFormVisible ? 'visible' : ''}`}>
                                        <AddWalletForm />
                                    </div>
                                    <div className="flex-lg">

                                        <AddExpenseForm wallets={wallets} />
                                    </div>
                                    {
                                        expenses && expenses.length > 0 && (<div className="grid-md">
                                            <h2>Recent Activity</h2>
                                            <Table expenses={expenses.sort((a, b) => b.createdAt - a.createdAt)
                                                .slice(0, 8)
                                            } />
                                            {expenses.length > 8 && (
                                                <Link
                                                    to="expenses"
                                                    className="btn btn--dark">
                                                    View all transactions
                                                </Link>
                                            )}
                                        </div>)
                                    }
                                </div>) : (
                                <div className="grid-sm">
                                    <p>Personal budgeting is the secret to the financial freedom.</p>
                                    <p>Create a wallet to get started!</p>
                                    <AddWalletForm />
                                </div>
                            )
                        }
                    </div>
                </div>
            ) : <Intro />}
        </>
    )
}

export default Dashboard