//rrd imports
import { Form, Link } from "react-router-dom";

// helper functions
import { calculateSpentByWallet, formatCurrency } from "../helpers";

//library imports
import { BanknotesIcon, TrashIcon } from "@heroicons/react/24/solid";

const WalletItem = ({wallet, showDelete = false}) => {
  const {id, name, amount, color} = wallet;
  const spent = calculateSpentByWallet(id);
  const currentAmount = amount - spent;

  return (
    <div className="budget"
    style={{
      "--accent": color
    }}>
      <div className="progress-text">
        <h3>{name}</h3>
        <p> <strong>{formatCurrency(currentAmount)}</strong></p>
      </div>
      {
        showDelete ? (
          <div className="flex-sm">
          <Form 
          method="post"
          action="delete"
          onSubmit={(event) => {
            if(!confirm('Are you sure you want to permanently delete this wallet?')){
              event.preventDefault();
            }
          }}>
          <button type="submit" className="btn">
            <span>Delete Wallet</span>
            <TrashIcon width={20} />
          </button>
          </Form>
          </div>
        ) : (
          <div className="flex-sm">
          <Link
          to={`/wallet/${id}`}
          className="btn">
            <span>View Details</span>
            <BanknotesIcon width={20} />
          </Link>
          </div>
        )
      }
    </div>
  )
}

export default WalletItem