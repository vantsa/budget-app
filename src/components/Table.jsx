//components
import ExpenseItem from "./ExpenseItem"

const Table = ({expenses, showWallet = true}) => {
  return (
    <div className="table">
        <table>
            <thead>
                <tr>
                    {
                        ["Name","Amount","Date", showWallet ? "Wallet" : "",""].map((i, index) => (
                            <th key={index}>{i}</th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                {
                    expenses.map((expense) => (
                        <tr key={expense.id}>
                            <ExpenseItem expense={expense} showWallet= {showWallet} />
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
  )
}

export default Table