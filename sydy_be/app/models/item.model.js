const db = require("../common/connect");

function Item(id, name, price, img) {
  this.id = id;
  this.name = name;
  this.price = price;
  this.img = img;
}

Item.get_all = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM item", function (error, data) {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
};
Item.add_item = (newItem) => {
    return new Promise((resolve, reject) => {
      const { name, price, img, description, is_visible, category_id, discount } =
        newItem;
      db.query(
        "INSERT INTO item (name, price, img, description, is_visible, category_id) VALUES (?, ?, ?, ?, ?, ?)",
        [name, price, img, description, is_visible, category_id],
        function (error, result) {
          if (error) {
            reject(error);
          } else {
            const insertedItemId = result.insertId;
  
            const addedItem = {
              id: insertedItemId,
              name,
              price,
              img,
            };
  
            // Check if discount information is provided
            if (discount && Object.keys(discount).length > 0) {
              const { discount_amount, date } = discount;
              const startDate = new Date(date[0])
                .toISOString()
                .slice(0, 19)
                .replace("T", " ");
              const endDate = new Date(date[1])
                .toISOString()
                .slice(0, 19)
                .replace("T", " ");
              db.query(
                "INSERT INTO discount (item_id, discount_amount, start_date, end_date) VALUES (?, ?, ?,?)",
                [insertedItemId, discount_amount, startDate, endDate],
                function (discountError) {
                  if (discountError) {
                    reject(discountError);
                  } else {
                    // No need to store discount ID in addedItem
                    resolve({
                      success: true,
                      message: "Item and discount added successfully",
                      item: addedItem,
                    });
                  }
                }
              );
            } else {
              // No discount information provided
              resolve({
                success: true,
                message: "Item added successfully",
                item: addedItem,
              });
            }
          }
        }
      );
    });
  };
  

Item.edit_item = (item_id, updatedItemData) => {
    return new Promise((resolve, reject) => {
        const {
            name,
            price,
            img,
            description,
            is_visible,
            category_id,
            discount,
        } = updatedItemData;

        // Extract discount data
        const { discount_amount, date } = discount;

        // Check if discount is an empty object
        const isDiscountEmpty = Object.keys(discount).length === 0 && discount.constructor === Object;

        // If discount is not empty, proceed with updating or inserting
        if (!isDiscountEmpty) {
            const startDate = new Date(date[0]).toISOString().slice(0, 19).replace('T', ' ');
            const endDate = new Date(date[1]).toISOString().slice(0, 19).replace('T', ' ');

            // Check if a discount record exists for the item
            db.query(
                "SELECT * FROM discount WHERE item_id = ?",
                [item_id],
                function (selectError, selectResult) {
                    if (selectError) {
                        reject(selectError);
                    } else {
                        if (selectResult.length > 0) {
                            // Discount record exists, update it
                            db.query(
                                "UPDATE discount SET discount_amount = ?, start_date = ?, end_date = ? WHERE item_id = ?",
                                [discount_amount, startDate, endDate, item_id],
                                function (updateError, updateResult) {
                                    if (updateError) {
                                        reject(updateError);
                                    } else {
                                        updateItem();
                                    }
                                }
                            );
                        } else {
                            // Discount record does not exist, insert it
                            db.query(
                                "INSERT INTO discount (item_id, discount_amount, start_date, end_date) VALUES (?, ?, ?, ?)",
                                [item_id, discount_amount, startDate, endDate],
                                function (insertError, insertResult) {
                                    if (insertError) {
                                        reject(insertError);
                                    } else {
                                        updateItem();
                                    }
                                }
                            );
                        }
                    }
                }
            );
        } else {
            // If discount is empty, proceed with updating the item without updating discount
            updateItem();
        }

        // Function to update the item
        function updateItem() {
            // Update item table
            db.query(
                "UPDATE item SET name = ?, price = ?, img = ?, description = ?, is_visible = ?, category_id = ? WHERE id = ?",
                [name, price, img, description, is_visible, category_id, item_id],
                function (error, result) {
                    if (error) {
                        reject(error);
                    } else {
                        if (result.affectedRows > 0) {
                            const editedItem = {
                                id: item_id,
                                name,
                                price,
                                img,
                                discount: isDiscountEmpty ? {} : { discount_amount, date },
                            };
                            resolve({
                                success: true,
                                message: "Item and discount updated successfully",
                                item: editedItem,
                            });
                        } else {
                            resolve({
                                success: false,
                                message: "Item not found",
                            });
                        }
                    }
                }
            );
        }
    });
};

  
Item.getTopItems = () => {
  return new Promise((resolve, reject) => {
    const sql = `
            SELECT f.item_id as id, i.name, i.price, i.img, ROUND(ROUND(AVG(f.rating) * 2) / 2, 1) as avgRating
            FROM feedback f
            JOIN item i ON f.item_id = i.id
            GROUP BY f.item_id
            ORDER BY avgRating DESC
            LIMIT 5
        `;
    db.query(sql, (err, data) => {
      if (err) {
        reject(err);
      } else {
        // Parse avgRating to ensure it's a number
        data.forEach((item) => {
          item.avgRating = parseFloat(item.avgRating);
        });
        resolve(data);
      }
    });
  });
};

Item.getDiscountForItem = (itemId) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT discount_amount, start_date, end_date FROM discount WHERE item_id = ?",
      [itemId],
      function (error, data) {
        if (error) {
          reject(error);
        } else {
          if (data.length > 0) {
            const discount = {
              discount_amount: data[0].discount_amount,
              date: [new Date(data[0].start_date).toLocaleDateString('en-GB'),
                new Date(data[0].end_date).toLocaleDateString('en-GB'),],
            };
            resolve(discount);
          } else {
            resolve(null);
          }
        }
      }
    );
  });
};
module.exports = Item;
