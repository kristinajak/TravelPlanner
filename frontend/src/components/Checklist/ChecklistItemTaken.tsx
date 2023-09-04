import React from "react";
import classes from "./ChecklistItemTaken.module.css";

interface ChecklistItemProps {
  item: {
    id: number;
    item: string;
  };
}

const ChecklistItemTaken: React.FC<ChecklistItemProps> = ({ item }) => {
  return (
    <div className={classes["checklist-item-taken"]}>
      <span>{item.item}</span>
    </div>
  );
};

export default ChecklistItemTaken;
