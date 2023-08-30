import React from "react";
import classes from "./ChecklistItem.module.css";

interface ChecklistItemData {
  id: number;
  item: string;
}

interface ChecklistItemProps {
  item: ChecklistItemData;
  tableName: string;
}

const ChecklistItemReadOnly: React.FC<ChecklistItemProps> = ({
  item,
  tableName,
}) => {
  return (
    <div className={classes["checklist-item"]}>
      <span>{item.item}</span>
    </div>
  );
};

export default ChecklistItemReadOnly;
