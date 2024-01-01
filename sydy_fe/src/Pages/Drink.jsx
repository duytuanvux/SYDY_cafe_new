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
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [sortBy, setSortBy] = useState(null); // 'price' or 'avgRating'
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
      {/* Add filter, sorter, and search bar UI elements */}
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={6}>
          <Select
            placeholder="Select Category"
            style={{ width: "100%" }}
            onChange={(value) => setCategoryFilter(value)}
          >
            <Option value="">All Categories</Option>
            {categoryList.map((category) => (
              <Option key={category.id} value={category.id}>
                {category.name}
              </Option>
            ))}
          </Select>
        </Col>
        <Col span={6}>
          <Select
            placeholder="Sort By"
            style={{ width: "100%" }}
            onChange={(value) => setSortBy(value)}
          >
            <Option value="">No Sorting</Option>
            <Option value="price">Price</Option>
            <Option value="avgRating">Average Rating</Option>
          </Select>
        </Col>
        <Col span={6}>
          <Select
            placeholder="Sort Order"
            style={{ width: "100%" }}
            onChange={(value) => setSortOrder(value)}
          >
            <Option value="asc">Ascending</Option>
            <Option value="desc">Descending</Option>
          </Select>
        </Col>
        <Col span={6}>
          <Input
            placeholder="Search..."
            style={{ width: "100%" }}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
      </Row>

      {/* Reset Filters Button */}
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={24}>
          <Button onClick={handleResetFilters}>Reset Filters</Button>
        </Col>
      </Row>

      {/* Render the filtered and sorted drinks */}
      <div className="flex flex-wrap gap-2 items-center justify-center">
        {loading ? (
          <Spin size="large" fullscreen />
        ) :  (
          filteredDrinks.map((item) =>
            item.is_visible ? <Item item={item} key={item.id} /> : null
          )
        ) }
      </div>
    </div>
  );
}

export default Drinks;
