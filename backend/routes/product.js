const express = require("express");
const connection = require("../connection");
const auth = require("../service/authentication");
const role = require("../service/role");

const router = express.Router();


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
    const query = "select id, name, categoryID, description, price from product where id= ? and status='true' ";
    // console.log("hit" + id);

    connection.query(query, [id], (err, results) => {
        if (!err) {
            return res.status(200).json(results[0]);
        } else {
            return res.status(500).json(err);
        }
    });
});










module.exports = router;