//rrd imports
import { Link, useFetcher } from "react-router-dom";

//helpers
import { formatCurrency, formatDateToLocalString, getAllMatchingItems } from "../helpers"

//library
import { TrashIcon } from "@heroicons/react/24/solid";

const ExpenseItem = ({expense, showWallet}) => {
    const isSmallScreen = window.innerWidth < 600;
    const fethcer = useFetcher();
    const wallet = getAllMatchingItems({
        category: "wallets",
        key: "id",
        value: expense.walletId
    })[0];

  return (
    <>
        <td className={expense.type === "Expense" ? "red-background" : "green-background"}>{expense.name}</td>
        <td className={expense.type === "Expense" ? "red-background" : "green-background"}>{formatCurrency(expense.amount)}</td>
        <td className={expense.type === "Expense" ? "red-background" : "green-background"}>{formatDateToLocalString(expense.createdAt)}</td>
        {
            showWallet && (
                <td className={"greyish"}>{<Link to={`/wallet/${wallet.id}`} style={{"--accent" : wallet.color}}>{wallet.name}</Link>}</td>
            )
        }
        <td className={"greyish"}>
            <fethcer.Form method="post">
                <input type="hidden" name="_action" value="deleteExpense" />
                <input type="hidden" name="expenseId" value={expense.id} />
                <button
                type="submit"
                className="btn btn--warning"
                aria-label={`Delete ${expense.name} expense`}>
                    <TrashIcon width={isSmallScreen ? 16: 20}/>
                </button>
            </fethcer.Form>
        </td>

    </>
  )
}

export default ExpenseItem