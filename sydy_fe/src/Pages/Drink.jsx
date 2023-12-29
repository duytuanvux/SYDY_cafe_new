import Item from "../Components/Item";
import ItemServices from "../Services/ItemServices";
import { useState, useEffect } from "react";
function Drinks() {
  const [drinksList, setDrinksList] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemServicesInstance = new ItemServices();
        const items = await itemServicesInstance.getAllItem();
        setDrinksList(items);
      } catch (error) {
        // Handle errors
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the async function
  }, []);
  // Render the component with the data

  return (
    <div className="flex flex-wrap gap-2 items-center justify-center">
      {drinksList ? (
        drinksList.map((item) => item.is_visible ? <Item item={item} key={item.id} /> : null)
      ) : (
        <p>Đang tải dữ liệu</p>
      )}
    </div>
  );
}

export default Drinks;
