import { Link } from "react-router-dom";
import classes from "./ItineraryReadOnly.module.css";

const ItineraryReadOnly = () => {
  return (
    <div>
      <table className={classes["itinerary-table"]}>
        <thead>
          <tr>
            <th>Date</th>
            <th>City</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <i>e.g. March 30 - April 3</i>
            </td>
            <td>
              <i>e.g. Kaunas</i>
            </td>
            <td>
              <i>
                e.g. Places to visit: Pazaislis Monastery, Kaunas Castle,
                Oldtown
              </i>
            </td>
          </tr>
        </tbody>
      </table>
      <i className={classes.link}>
        Ready to update the checklist? <Link to="/login">Log in</Link> or{" "}
        <Link to="/register">register</Link> to get started.
      </i>
    </div>
  );
};

export default ItineraryReadOnly;
