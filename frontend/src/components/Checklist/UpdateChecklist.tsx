import Axios from "axios";
import classes from "./UpdateChecklist.module.css";

interface ChecklistItemData {
  id: number;
  item: string;
}
interface ChecklistContainerProps {
  tableName: string;
}
const UpdateChecklist: React.FC = () => {
  const updateChecklistHandler = async () => {
    try {
      const response = await Axios.post("/checklist/updateChecklist");
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating checklist:", error);
    }
  };
  return (
    <button
      type="submit"
      className={classes.update}
      onClick={updateChecklistHandler}
    >
      Update Checklist
    </button>
  );
};

export default UpdateChecklist;
