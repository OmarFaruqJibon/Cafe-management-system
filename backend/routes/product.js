const express = require("express");
const connection = require("../connection");
const auth = require("../service/authentication");
const role = require("../service/role");

const router = express.Router();

// add new product
router.post("/add-product", auth.authenticate, role.checkRole, (req, res) => {
    const product = req.body;

    const query = "insert into product (name, categoryID, description, price, status) values (?,?,?,?,'true')";

    connection.query(query, [product.name, product.categoryID, product.description, product.price], (err, results) => {
        if (!err) {
            return res.status(200).json({ message: "Product add successfully!" });

        } else {
            return res.status(500).json(err);
        }
    })

});


// get all products
router.get("/get-products", auth.authenticate, role.checkRole, (req, res) => {
    const query = "select * from product";

    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results)
        } else {
            return res.status(500).json(err);
        }
    })
});


//get product by category id
router.get("/get-by-category/:id", auth.authenticate, role.checkRole, (req, res) => {
    const id = req.params.id;
    const query = "select id, name, categoryID, description, price from product where categoryID= ? and status='true' ";
    // console.log("hit" + id);

    connection.query(query, [id], (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        } else {
            return res.status(500).json(err);
        }
    })
});



//get product by product id
router.get("/get-by-id/:id", auth.authenticate, role.checkRole, (req, res) => {
    const id = req.params.id;
    const query = "select id, name, categoryID, description, price from product where id= ? ";
    // console.log("hit" + id);

    connection.query(query, [id], (err, results) => {
        if (!err) {
            return res.status(200).json(results[0]);
        } else {
            return res.status(500).json(err);
        }
    });
});

//update product
router.patch("/update-product", auth.authenticate, role.checkRole, (req, res) => {
    const product = req.body;
    const query = "update product set name=?,categoryID=?, description=?, price=? where id=? ";

    connection.query(query,
        [
            product.name,
            product.categoryID,
            product.description,
            product.price,
            product.id
        ], (err, results) => {
            if (!err) {
                if (results.affectedRows == 0) {
                    return res.status(404).json({ message: "Sorry, Product ID not found!!" });
                } else {
                    return res.status(200).json({ message: "Product updated succeddfully." });
                }
            } else {
                return res.status(500).json(err);
            }
        })
});


//delete product
router.put("/delete-product/:id", auth.authenticate, role.checkRole, (req, res) => {
    const id = req.params.id;
    const query = "delete from product where id=? ";

    connection.query(query, [id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "Sorry, Product ID not found!!" });
            }
            return res.status(200).json({ message: "Product deleted successfully" });
        } else {
            return res.status(500).json(err);
        }
    })

});



module.exports = router;