//react imports
import { useEffect, useRef, useState } from "react"

//rrd imports
import { useFetcher } from "react-router-dom"

//library imports
import { PlusCircleIcon } from "@heroicons/react/24/solid";


const AddExpenseForm = ({ wallets }) => {
    const [transactionType, setTransactionType] = useState('Expense');
    const fetcher = useFetcher()
    const isSubmitting = fetcher.state === "submitting";
    const formRef = useRef();
    const focusRef = useRef();

    useEffect(() => {
        if (!isSubmitting) {
            formRef.current.reset();
            focusRef.current.focus();
        }
    }, [isSubmitting])


    return (
        <div className='form-wrapper'>
            <h2 className="h3">Add new{" "}<span className="accent">
                {wallets.length === 1 && `${wallets.map((wallet) => wallet.name)}`}
            </span>{" "} Transaction</h2>
            <fetcher.Form
                method="post"
                className="grid-sm"
                ref={formRef}>
                <div className="expense-inputs">
                    {/* <div className="grid-xs">
            <label htmlFor="newExpenseType">Type</label>
            <select name="newExpenseType" id="newExpenseType" required>
            {
                <option>Expense</option>
            }
        </select>
        </div> */}
                    <div className="grid-xs">
                        <label htmlFor="transactionType">Transaction Type</label>
                        <select
                            name="transactionType"
                            id="transactionType"
                            required
                            value={transactionType}
                            onChange={(e) => setTransactionType(e.target.value)}
                        >
                            <option value="Expense">Expense</option>
                            <option value="Income">Income</option>
                        </select>
                    </div>

                    <div className="grid-xs">
                        <label htmlFor="newExpense">Transaction name</label>
                        <input
                            type="text"
                            name="newExpense"
                            id="newExpense"
                            placeholder="e.g., Coffee"
                            ref={focusRef}
                            required
                        />
                    </div>
                    <div className="grid-xs">
                        <label htmlFor="newExpenseAmount">Amount</label>
                        <input
                            type="number"
                            name="newExpenseAmount"
                            step="0.1"
                            inputMode="decimal"
                            id="newExpenseAmount"
                            placeholder="e.g., 15"
                            required
                        />
                    </div>
                </div>
                <div className="grid-xs" hidden={wallets.length === 1}>
                    <label htmlFor="newExpenseWallet">Wallet</label>
                    <select name="newExpenseWallet" id="newExpenseWallet" required>
                        {
                            wallets.sort((a, b) => a.createdAt - b.createdAt).map((wallet) => {
                                return (
                                    <option value={wallet.id} key={wallet.id}>
                                        {wallet.name}
                                    </option>
                                )
                            })
                        }
                    </select>
                </div>
                <input type="hidden" name="_action" value="createExpense" />
                <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
                    {
                        isSubmitting ? <span>Creating...
                        </span> : (
                            <>
                                <span>Add Transaction</span>
                                <PlusCircleIcon width={20} />
                            </>
                        )
                    }
                </button>
            </fetcher.Form>
        </div>
    )
}

export default AddExpenseForm