// rrd imports
import { Form, useFetcher } from "react-router-dom"

// react imports
import { useEffect, useRef } from "react";

//library imports
import { CurrencyDollarIcon } from "@heroicons/react/24/solid"


const AddWalletForm = () => {
    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === "submitting"

    const formRef = useRef();
    const focusRef = useRef();
    // clear forms data
    useEffect(() => {
        if(!isSubmitting) {
            formRef.current.reset()
            focusRef.current.focus();
        }
    }, [isSubmitting]);

  return (
    <div className="form-wrapper">
        <h2 className="h3">
            Create wallet
        </h2>
        <fetcher.Form
        method="post"
        className="grid-sm"
        ref={formRef}
        >
        <div className="grid-xs">
            <label htmlFor="newWallet">Wallet name</label>
            <input 
            type="text" 
            name="newWallet"
            placeholder="e.g., Revolut"
            required
            id="newWallet" 
            ref={focusRef}
            />
        </div>
        <div className="grid-xs">
            <label htmlFor="newWalletAmount">Wallet starting amount</label>
            <input 
            type="number"
            step="0.01"
            inputMode="decimal" 
            name="newWalletAmount"
            placeholder="e.g., 300 RON"
            required
            id="newWalletAmount" />
        </div>
        <input type="hidden" name="_action" value="createWallet" />
        <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
            {
                isSubmitting ? <span>Creating...
                </span> : (
                    <>
                    <span>Create wallet</span>
                    <CurrencyDollarIcon width={20} />
                    </>
                )
            }
        </button>
        </fetcher.Form>
    </div>
  )
}

export default AddWalletForm