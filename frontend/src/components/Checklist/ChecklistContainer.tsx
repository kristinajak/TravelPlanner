import { useState, useEffect } from "react";
import Axios from "axios";

import ChecklistItem from "./ChecklistItem";
import classes from "./ChecklistContainer.module.css";

interface ChecklistItemData {
  id: number;
  item: string;
}

interface ChecklistContainerProps {
  tableName: string;
}

const ChecklistContainer: React.FC<ChecklistContainerProps> = ({
  tableName,
}) => {
  const [items, setItems] = useState<ChecklistItemData[]>([]);
  const [newItem, setNewItem] = useState<string>("");

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

  const moveItemHandler = async (itemId: number, item: string) => {
    try {
      const response = await Axios.post(
        `/moveItem/${tableName}/${itemId}`,
        { item: item },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        const updatedResponse = await Axios.get(
          `/checklist?tableName=${tableName}`,
          {
            withCredentials: true,
          }
        );
        setItems(updatedResponse.data);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error moving item:", error);
    }
  };

  const addItemHandler = async () => {
    try {
      if (newItem.trim() !== "") {
        const response = await Axios.post(
          "/addItem",
          { tableName, newItem },
          {
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          setNewItem("");
          const updatedResponse = await Axios.get(
            `/checklist?tableName=${tableName}`,
            {
              withCredentials: true,
            }
          );
          setItems(updatedResponse.data);
        }
      }
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  return (
    <div>
      {items.map((item) => (
        <ChecklistItem
          key={item.id}
          item={item}
          tableName={tableName}
          onItemMove={moveItemHandler}
        />
      ))}
      <input
        className={classes["new-item"]}
        value={newItem}
        onChange={(event) => setNewItem(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            addItemHandler();
          }
        }}
      />
    </div>
  );
};

export default ChecklistContainer;
