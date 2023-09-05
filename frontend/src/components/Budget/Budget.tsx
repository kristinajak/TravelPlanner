import { useContext } from "react";
import classes from "./Budget.module.css";
import BudgetReadOnly from "./BudgetReadOnly";
import AuthContext from "../../store/auth-context";
import BudgetContainer from "./BudgetContainer";

const Budget = () => {
  const context = useContext(AuthContext);
  return (
    <div className={classes.budget}>
      <h1>Budget</h1>
      <p>
        Traveling is always an option if you know how much you can afford to
        spend.
      </p>
      {!context.isLoggedIn && <BudgetReadOnly />}
      {context.isLoggedIn && <BudgetContainer />}
    </div>
  );
};

export default Budget;
