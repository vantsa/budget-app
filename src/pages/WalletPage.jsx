//rrd imports
import { useLoaderData } from "react-router-dom";

//helper functions
import { createExpense, deleteItem, getAllMatchingItems } from "../helpers";

//components
import WalletItem from "../components/WalletItem";
import AddExpenseForm from "../components/AddExpenseForm";
import Table from "../components/Table";

//library
import { toast } from "react-toastify";

//loader
export async function walletLoader({params}){
  const wallet = await getAllMatchingItems({
    category: "wallets",
    key: "id",
    value: params.id
  })[0];

  const expenses = await getAllMatchingItems({
    category: "expenses",
    key: "walletId",
    value: params.id
  });

  if(!wallet){
    throw new Error("The wallet you are trying to find out is not available")
  }

  return {wallet, expenses};
}

//action 
export async function walletAction({request}){
  const data = await request.formData();
  const {_action, ...values} = Object.fromEntries(data);

  if(_action === "deleteExpense"){
      try{
          deleteItem({
              key: "expenses",
              id: values.expenseId
          })
          return toast.success(`Transaction deleted!`);
      }catch(e){
          throw new Error ("There was a problem deleting your transaction.")
      }
  }
  if(_action === "createExpense"){
    try{
        createExpense({
            type: values.transactionType,
            name: values.newExpense,
            amount: values.newExpenseAmount,
            walletId: values.newExpenseWallet
        })
        return toast.success(`Transaction ${values.newExpense} Added!`);
    }catch(e){
        throw new Error ("There was a problem adding your transaction.")
    }
}
}

const WalletPage = () => {
  const {wallet, expenses} = useLoaderData();

  return (
    <div className="grid-lg"
    style={{
      "--accent": wallet.color
    }}>
        <h1 className="h2">
          <span className="accent">{wallet.name}</span>
          {" "}Overview
        </h1>
        <div className="flex-lg">
          <WalletItem wallet={wallet} showDelete={true}/>
          <AddExpenseForm wallets={[wallet]} />
        </div>
        {
          expenses && expenses.length > 0 && (
            <div className="grid-md">
            <h2>
              <span className="accent">{wallet.name}</span>   Transactions
            </h2>
            <Table expenses={expenses} showWallet={false}/>
            </div>
          )
        }
    </div>
  )
}

export default WalletPage