import Axios from "axios";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

import classes from "./BudgetContainer.module.css";

interface BudgetItem {
  id: number;
  description: string;
  category: string;
  quantity: number;
  unitCost: number;
  total: string;
}

const BudgetContainer: React.FC = () => {
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [unitCost, setUnitCost] = useState<string>("");
  const [total, setTotal] = useState<string>("");
  const [budgetData, setBudgetData] = useState<BudgetItem[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [filteredCategory, setFilteredCategory] = useState<string>("");
  const [showFilter, setShowFilter] = useState<boolean>(false);

  const categories = [
    "Transportation",
    "Accommodation",
    "Food",
    "Entertainment",
    "Administrative",
    "Shopping",
    "Other",
  ];

  const fetchBudgetData = async () => {
    try {
      const response = await Axios.get("/budget", {
        withCredentials: true,
      });
      if (response.status === 200) {
        setBudgetData(response.data);
      }
    } catch (error) {
      console.error("Error fetching itinerary data:", error);
    }
  };

  useEffect(() => {
    fetchBudgetData();
  }, []);

  const formatDecimal = (value: string) => {
    const parsedValue = parseFloat(value);
    if (!isNaN(parsedValue)) {
      return parsedValue.toFixed(2);
    }
    return "";
  };

  const calculateTotal = () => {
    const quantityValue = parseInt(quantity);
    const unitCostValue = parseFloat(unitCost);
    const calculatedTotal = quantityValue * unitCostValue;

    setTotal(calculatedTotal.toString());
  };

  const addBudgetHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !description ||
      !category ||
      isNaN(Number(quantity)) ||
      isNaN(Number(unitCost)) ||
      Number(quantity) < 0 ||
      Number(unitCost) < 0
    ) {
      setErrorMessage(
        "Please fill in all required fields and ensure that quantity and unit cost are greater than or equal to 0."
      );
      return;
    }

    calculateTotal();

    const formattedUnitCost = formatDecimal(unitCost);
    const formattedTotal = formatDecimal(total);

    try {
      const response = await Axios.post(
        "/budget",
        {
          description,
          category,
          quantity,
          unitCost: formattedUnitCost,
          total: formattedTotal,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setDescription("");
        setCategory("");
        setQuantity("");
        setUnitCost("");
        setTotal("");
        fetchBudgetData();
        setErrorMessage("");
      }
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const removeItem = async (itemId: number) => {
    try {
      const response = await Axios.post(
        `/budget/${itemId}/delete`,
        { itemId: itemId },
        { withCredentials: true }
      );

      if (response.status === 200) {
        const updatedResponse = await Axios.get("/budget", {
          withCredentials: true,
        });
        setBudgetData(updatedResponse.data);
      }
    } catch (error) {
      console.error("Error removing item", error);
    }
  };

  const handleFilterClick = () => {
    setShowFilter(!showFilter);
  };

  const filterBudgetData = () => {
    if (!filteredCategory) {
      return budgetData;
    } else {
      return budgetData.filter((item) => item.category === filteredCategory);
    }
  };

  const calculateGrandTotal = () => {
    const filteredItems = filterBudgetData();
    const total = filteredItems.reduce(
      (acc, item) => acc + parseFloat(item.total),
      0
    );
    return total.toFixed(2);
  };

  return (
    <div>
      {errorMessage && <p className={classes.error}>{errorMessage}</p>}
      <form onSubmit={addBudgetHandler}>
        <table className={classes["budget-table"]}>
          <thead>
            <tr>
              <th>Description</th>
              <th>
                Category{" "}
                <FontAwesomeIcon
                  icon={faFilter}
                  onClick={handleFilterClick}
                  style={{ cursor: "pointer" }}
                />
                {showFilter && (
                  <select
                    value={filteredCategory}
                    onChange={(e) => setFilteredCategory(e.target.value)}
                  >
                    <option value="">All categories</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                )}
              </th>
              <th>Quantity</th>
              <th>Unit Cost</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {filterBudgetData().length === 0 ? (
              <tr>
                <td colSpan={5}>
                  {filteredCategory
                    ? "No items for the selected category."
                    : "Please add your expenses."}
                </td>
              </tr>
            ) : (
              filterBudgetData().map((item) => (
                <tr key={item.id}>
                  <td>{item.description}</td>
                  <td>{item.category}</td>
                  <td>{item.quantity}</td>
                  <td>{item.unitCost}</td>
                  <td className={classes.total}>{item.total}</td>
                  <td>
                    <button type="button" onClick={() => removeItem(item.id)}>
                      X
                    </button>
                  </td>
                </tr>
              ))
            )}
            <tr>
              <td>
                <input
                  type="text"
                  name="description"
                  placeholder="Description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </td>
              <td>
                <select
                  name="category"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <input
                  type="number"
                  name="quantity"
                  placeholder="Quantity"
                  value={quantity}
                  onChange={(event) => {
                    setQuantity(event.target.value);
                  }}
                />
              </td>
              <td>
                <input
                  type="number"
                  name="unitCost"
                  placeholder="Unit cost"
                  value={unitCost}
                  onChange={(event) => {
                    setUnitCost(event.target.value);
                  }}
                />
              </td>
              <td></td>
              <td>
                <button type="submit" onClick={calculateTotal}>
                  Add
                </button>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th className={classes.grandTotal}>Grand Total: </th>
              <th className={classes.total}>{calculateGrandTotal()}</th>
            </tr>
          </tfoot>
        </table>
      </form>
    </div>
  );
};

export default BudgetContainer;
