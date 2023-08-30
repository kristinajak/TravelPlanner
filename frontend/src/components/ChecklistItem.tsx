import React from "react";
import classes from "./ChecklistItem.module.css";

interface ChecklistItemData {
  id: number;
  item: string;
}

interface ChecklistItemProps {
  item: ChecklistItemData;
  tableName: string;
  onItemRemove: (itemId: number) => void;
  // onItemMove: (movedItem: ChecklistItemData) => void;
}

const ChecklistItem: React.FC<ChecklistItemProps> = ({
  item,
  tableName,
  onItemRemove,
  // onItemMove,
}) => {
  const handleRemoveClick = () => {
    onItemRemove(item.id);
  };
  // const moveItemHandler = async () => {
  //   try {
  //     const response = await Axios.post(
  //       "/moveItem",
  //       { tableName, item },
  //       {
  //         withCredentials: true,
  //       }
  //     );
  //     if (response.status === 200) {
  //       onItemMove(item);
  //     }
  //   } catch (error) {
  //     console.error("Error moving item:", error);
  //   }
  // };

  return (
    <div className={classes["checklist-item"]}>
      <input type="checkbox" />
      <span>{item.item}</span>
      <button className={classes["remove-button"]} onClick={handleRemoveClick}>
        x
      </button>
    </div>
  );
};

export default ChecklistItem;
