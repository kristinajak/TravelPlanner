import { useState, useEffect, useContext } from "react";
import Axios from "axios";

import AuthContext from "../store/auth-context";

import ChecklistItemTaken from "./ChecklistItemTaken";

interface ChecklistItemData {
  id: number;
  item: string;
}

interface ChecklistTakenProps {
  tableName: string;
}

const ChecklistTaken: React.FC<ChecklistTakenProps> = ({ tableName }) => {
  const [items, setItems] = useState<ChecklistItemData[]>([]);
  const context = useContext(AuthContext);

  useEffect(() => {
    Axios.get(`/checklist_checked?tableName=${tableName}`, {
      withCredentials: true,
    })
      .then((response) => {
        const userItemsChecked = response.data;
        console.log("userItemsChecked", userItemsChecked);
        setItems(userItemsChecked);
      })
      .catch((error) => {
        console.error("Error fetching checklist checked data:", error);
      });
  }, [tableName]);

  return (
    <div>
      {context.isLoggedIn && (
        <div>
          {items.length > 0 && (
            <div>
              {items.map((item) => (
                <ChecklistItemTaken key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      )}
      {!context.isLoggedIn && <div>Some other table</div>}
    </div>
  );
};

export default ChecklistTaken;
