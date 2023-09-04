import React from "react";
import classes from "./ChecklistItem.module.css";

interface ChecklistItemData {
  id: number;
  item: string;
}

interface ChecklistItemProps {
  item: ChecklistItemData;
  tableName: string;
  // onItemRemove: (itemId: number) => void;
  onItemMove: (itemId: number, item: string) => void;
}

const ChecklistItem: React.FC<ChecklistItemProps> = ({
  item,
  tableName,
  // onItemRemove,
  onItemMove,
}) => {
  // const handleRemoveClick = () => {
  //   onItemRemove(item.id);
  // };
  const handleMoveClick = async () => {
    onItemMove(item.id, item.item);
  };

  return (
    <div className={classes["checklist-item"]}>
      <input type="checkbox" onChange={handleMoveClick} />
      <span>{item.item}</span>
    </div>
  );
};

export default ChecklistItem;
