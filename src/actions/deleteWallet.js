//rrd imports
import { toast } from "react-toastify";

//helper functions
import { deleteItem, getAllMatchingItems } from "../helpers";

//rrd imports
import { redirect } from "react-router-dom";

export function deleteWallet({params}){
    try{
        deleteItem({
            key: "wallets",
            id: params.id,
        });

        const associatedExpenses = getAllMatchingItems({
            category: "expenses",
            key: "walletId",
            value: params.id
        })

        associatedExpenses.forEach((expense) => {
            deleteItem({
                key: "expenses",
                id: expense.id
            })
        })

        toast.success("Budget deleted successfully.");
    }catch(e) {
        throw new Error("There was a problem deleting the wallet.");
    }
    return redirect("/")
}