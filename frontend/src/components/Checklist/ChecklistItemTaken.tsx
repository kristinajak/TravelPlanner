import React from "react";

interface ChecklistItemProps {
  item: {
    id: number;
    item: string;
  };
}

const ChecklistItemTaken: React.FC<ChecklistItemProps> = ({ item }) => {
  return (
    <div>
      <span>{item.item}</span>
    </div>
  );
};

export default ChecklistItemTaken;
