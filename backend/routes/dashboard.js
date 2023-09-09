const express = require("express");
const connection = require("../connection");
const auth = require("../service/authentication");

const router = express.Router();

router.get("/details", auth.authenticate, (req, res) => {
    let countCategory;
    let countProduct;
    let countBill;

    // count total number of category
    const categoryQuery = "select count(id) as countCategory from category";
    connection.query(categoryQuery, (err, results) => {
        if (!err) {
            countCategory = results[0].countCategory;
        } else {
            return res.status(500).json({ err });
        }
    });

    // count total number of products
    const productQuery = "select count(id) as countProduct from product";
    connection.query(productQuery, (err, results) => {
        if (!err) {
            countProduct = results[0].countProduct;
        } else {
            return res.status(500).json({ err });
        }
    });

    // count total number of bills
    const billQuery = "select count(id) as countBill from bill";
    connection.query(billQuery, (err, results) => {
        if (!err) {
            countBill = results[0].countBill;
            let data = {
                category: countCategory,
                product: countProduct,
                bill: countBill,
            };
            return res.status(200).json({ data });
        } else {
            return res.status(500).json({ err });
        }
    });
});

module.exports = router;
