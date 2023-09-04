import { useState, useEffect } from "react";
import Axios from "axios";

import ChecklistItemReadOnly from "./ChecklistItemReadOnly";

interface ChecklistItemData {
  id: number;
  item: string;
}

interface ChecklistContainerProps {
  tableName: string;
}

const ChecklistReadOnly: React.FC<ChecklistContainerProps> = ({
  tableName,
}) => {
  const [items, setItems] = useState<ChecklistItemData[]>([]);

  useEffect(() => {
    Axios.get(`/checklist?tableName=${tableName}`, {
      withCredentials: true,
    })
      .then((response) => {
        const userItems = response.data;
        console.log(userItems);
        setItems(userItems);
      })
      .catch((error) => {
        console.error("Error fetching checklist data:", error);
      });
  }, [tableName]);

  return (
    <div>
      {items.map((item) => (
        <ChecklistItemReadOnly
          key={item.id}
          item={item}
          tableName={tableName}
        />
      ))}
    </div>
  );
};

export default ChecklistReadOnly;
