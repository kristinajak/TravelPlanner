import { Link } from "react-router-dom";
import classes from "./BudgetReadOnly.module.css";

const BudgetReadOnly = () => {
  return (
    <div>
      <table className={classes["budget-table"]}>
        <thead>
          <tr>
            <th>Description</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Unit Cost</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <i>e.g. Lunch</i>
            </td>
            <td>
              <i>e.g. Food</i>
            </td>
            <td>
              <i>e.g. 2 </i>
            </td>
            <td>
              <i>e.g. €20 </i>
            </td>
            <td>
              <i>e.g. €40 </i>
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        <i className={classes.link}>
          Ready to update the checklist? <Link to="/login">Log in</Link> or{" "}
          <Link to="/register">register</Link> to get started.
        </i>
      </p>
    </div>
  );
};

export default BudgetReadOnly;
