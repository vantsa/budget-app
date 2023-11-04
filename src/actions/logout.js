// rrd imports 
import { redirect } from "react-router-dom"

//library
import { toast } from "react-toastify"

//helper functions
import { deleteItem } from "../helpers"


export async function logoutAction() {
    deleteItem({
        key: "userName",
    })
    deleteItem({
        key: "wallets",
    })
    deleteItem({
        key: "expenses"
    })
    toast.success("You've deleted your account!")
    return redirect("/")
}