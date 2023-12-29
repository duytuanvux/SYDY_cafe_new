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
      "INSERT INTO item (name, price, img, description, is_visible, category_id, discount) VALUES (?, ?,?,?,?,?,?)",
      [name, price, img, description, is_visible, category_id, discount],
      function (error, result) {
        if (error) {
          reject(error);
        } else {
          const addedItem = {
            id: result.insertId, // Assuming your database returns the ID of the newly inserted item
            name,
            price,
            img,
          };
          resolve({
            success: true,
            message: "Item added successfully",
            item: addedItem,
          });
        }
      }
    );
  });
};

Item.edit_item = (item_id, updatedItemData) => {
  return new Promise((resolve, reject) => {
    // Assuming you have a proper field in your database for the item ID
    const {
      name,
      price,
      img,
      description,
      is_visible,
      category_id,

    } = updatedItemData;
    db.query(
      "UPDATE item SET name = ?, price = ?, img = ?, description = ?, is_visible = ?, category_id = ?, discount = ? WHERE id = ?",
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
            };
            resolve({
              success: true,
              message: "Item updated successfully",
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
              date: [data[0].start_date, data[0].end_date],
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

Item.updateDiscount = (item_id, discounts) => {
  return new Promise((resolve, reject) => {
    // Assuming you have a proper field in your database for the item ID
    const { discount_amount, date } = discounts;
    db.query(
      "UPDATE discount SET discount_amount = ?, start_date = ?, end_date = ? WHERE item_id = ?",
      [discount_amount, date[0], date[1], item_id],
      function (error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};
module.exports = Item;
