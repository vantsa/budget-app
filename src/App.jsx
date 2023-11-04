// rrd imports
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

//Layouts
import Main, {mainLoader} from "./layouts/Main";

//Actions
import { logoutAction } from "./actions/logout";
import { deleteWallet } from "./actions/deleteWallet";

//Libraries
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Routes
import Dashboard, {dashboardAction, dashboardLoader} from "./pages/Dashboard";
import Error from "./pages/Error";
import ExpensesPage, { expensesAction, expensesLoader } from "./pages/ExpensesPage";
import WalletPage, { walletAction, walletLoader } from "./pages/WalletPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: dashboardLoader,
        action: dashboardAction,
        errorElement: <Error />
      },
      {
        path: "wallet/:id",
        element: <WalletPage />,
        loader: walletLoader,
        action: walletAction,
        errorElement: <Error />,
        children: [
          {
            path: "delete",
            action: deleteWallet,
          }
        ]
      },
      {
        path: "expenses",
        element: <ExpensesPage />,
        loader: expensesLoader,
        action: expensesAction,
        errorElement: <Error />
      },
      {
        path: "logout",
        action: logoutAction,
      }
    ]
  },
  
]);

function App() {
  return <div className="App">
    <RouterProvider router={router} />
    <ToastContainer />
  </div>;
}

export default App
