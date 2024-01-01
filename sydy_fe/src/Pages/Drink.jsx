import React, { useState, useEffect } from "react";
import { Select, Input, Spin, Button, Row, Col } from "antd";
import Item from "../Components/Item";
import ItemServices from "../Services/ItemServices";
import CommonServices from "../Services/CommonServices";
const { Option } = Select;

function Drinks() {
  const [drinksList, setDrinksList] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const [filteredDrinks, setFilteredDrinks] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortBy, setSortBy] = useState(""); // 'price' or 'avgRating'
  const [sortOrder, setSortOrder] = useState("asc"); // 'asc' or 'desc'
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemServicesInstance = new ItemServices();
        const items = await itemServicesInstance.getAllItem();
        const commonServicesInstance = new CommonServices();
        const categories = await commonServicesInstance.getCategory();
        setCategoryList(categories);
        setDrinksList(items);
        setFilteredDrinks(items);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Apply filters
    let updatedList = drinksList;

    if (categoryFilter) {
      updatedList = updatedList.filter(
        (item) => item.category_id === categoryFilter
      );
    }

    if (searchTerm) {
      updatedList = updatedList.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    if (sortBy === "price" || sortBy === "avgRating") {
      updatedList.sort((a, b) => {
        const valueA = sortBy === "price" ? a.price : a.avgRating;
        const valueB = sortBy === "price" ? b.price : b.avgRating;

        if (sortOrder === "asc") {
          return valueA - valueB;
        } else {
          return valueB - valueA;
        }
      });
    }

    setFilteredDrinks(updatedList);
  }, [categoryFilter, sortBy, sortOrder, searchTerm, drinksList]);

  const handleResetFilters = () => {
    setCategoryFilter(null);
    setSortBy(null);
    setSortOrder("asc");
    setSearchTerm("");
  };

  return (
    <div>
      <Row gutter={16}>
        {/* Sidebar with filters and sorter */}
        <Col span={8}>
          <div
            style={{
              padding: "16px",
              borderRight: "1px solid #e8e8e8",
              position: "sticky",
              top: "0", // Adjust top value as needed
              height: "100vh", // Adjust height as needed
              overflowY: "auto",
            }}
          > 
          <Input
              placeholder="Search..."
              style={{ width: "100%", marginBottom: "16px" }}
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
            <h3 className="text-lg">Filters</h3>
            <Select
              placeholder="Select Category"
              style={{ width: "100%", marginBottom: "16px" }}
              onChange={(value) => setCategoryFilter(value)}
              value={categoryFilter}
            >
              <Option value="">All Categories</Option>
              {categoryList.map((category) => (
                <Option key={category.id} value={category.id}>
                  {category.name}
                </Option>
              ))}
            </Select>

            <Select
              placeholder="Sort By"
              style={{ width: "100%", marginBottom: "16px" }}
              onChange={(value) => setSortBy(value)}
              value={sortBy}
            >
              <Option value="">No Sorting</Option>
              <Option value="price">Price</Option>
              <Option value="avgRating">Average Rating</Option>
            </Select>

            <Select
              placeholder="Sort Order"
              style={{ width: "100%", marginBottom: "16px" }}
              onChange={(value) => setSortOrder(value)}
              value={sortOrder}
            >
              <Option value="asc">Ascending</Option>
              <Option value="desc">Descending</Option>
            </Select>

            
            <Button onClick={handleResetFilters}>Reset Filters</Button>
          </div>
        </Col>

        {/* Content area with items list and search bar */}
        <Col span={16}>
          <div className="flex flex-wrap gap-2">
            {loading ? (
              <Spin size="large" fullscreen />
            ) : (
              filteredDrinks.map((item) =>
                item.is_visible ? <Item item={item} key={item.id} /> : null
              )
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Drinks;
