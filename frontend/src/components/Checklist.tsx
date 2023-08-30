import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../store/auth-context";
import classes from "./Checklist.module.css";
import ChecklistContainer from "./ChecklistContainer";
import ChecklistTaken from "./ChecklistTaken";
import ChecklistReadOnly from "./ChecklistReadOnly";

function ChecklistTables() {
  const context = useContext(AuthContext);

  const checklistTables = [
    { tableName: "documents", title: "Documents" },
    { tableName: "general", title: "General" },
    { tableName: "toiletries", title: "Toiletries" },
    { tableName: "clothes", title: "Clothes" },
    { tableName: "medicine", title: "Medicine" },
    { tableName: "ToDo", title: "ToDo" },
  ];

  return (
    <div className={classes.checklist}>
      <h1>Checklist</h1>
      <p>
        Remember to bring not only the essential items that are important for
        everyone, but also your personal must-haves that can make your trip
        complete.
      </p>

      <p>
        {!context.isLoggedIn && (
          <i>
            Ready to update the checklist? <Link to="/login">Log in</Link> or{" "}
            <Link to="/register">register</Link> to get started.
          </i>
        )}
      </p>

      <h2>What do I have on my list?</h2>

      <div className={classes["checklist-tables"]}>
        {checklistTables.map((table) => (
          <div key={table.tableName} className={classes["checklist-table"]}>
            <h3>{table.title}</h3>
            {context.isLoggedIn && (
              <ChecklistContainer tableName={table.tableName} />
            )}
            {!context.isLoggedIn && (
              <ChecklistReadOnly tableName={table.tableName} />
            )}
          </div>
        ))}
      </div>

      <h2 className={classes.text}>I already have in my bags...</h2>

      <div className={classes["checklist-tables"]}>
        {checklistTables.map((table) => (
          <div
            key={`${table.tableName}`}
            className={classes["checklist-table-checked"]}
          >
            <h3>{table.title}</h3>
            {context.isLoggedIn && (
              <ChecklistTaken tableName={table.tableName} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChecklistTables;
