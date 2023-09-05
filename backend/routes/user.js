const express = require("express");
const connection = require("../connection");
require("dotenv").config();



const router = express.Router();


router.post("/signup", (req, res) => {
  let user = req.body;

  let query = "select email, password, role, status from user where email=?";

  connection.query(query, [user.email], (err, results) => {
    if (!err) {
      if (results.length <= 0) {
        let query = "insert into user(name, phone, email, password, status, role) values(?, ?, ?, ?, 'false', 'user')";

        connection.query(query, [user.name, user.phone, user.email, user.password],
          (err, results) => {
            if (err) {
                return res.status(500).json({ err });

            } else {
                return res.status(200).json({message: "Registration Successfully!",});
            }
          }
        );
      } else {
        return res.status(400).json({ message: "Email already exists. Try with another email!" });
      }
    } else {
      return res.status(500).json({ err });
    }
  });
});





module.exports = router;









