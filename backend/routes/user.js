const express = require("express");
const connection = require("../connection");
require("dotenv").config();
const jwt = require("jsonwebtoken");



const router = express.Router();

// signup api
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
              return res.status(200).json({ message: "Registration Successfully!", });
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

// login api
router.post("/login", (req, res) => {
  const user = req.body;

  let query = "select email, password, role, status from user where email=?";

  connection.query(query, [user.email], (err, results) => {

    if (!err) {
      if (results.length <= 0 || results[0].password !== user.password) {
        return res.status(401).json({ message: "Incorrect username or password" });

      } else if (results[0].status === "false") {
        return res.status(401).json({ message: "Please wait for admin approval" });

      } else if (results[0].password === user.password) {
        const response = {
          email: results[0].email,
          role: results[0].role,
        };

        const accessToken = jwt.sign(response, process.env.TOKEN, {
          expiresIn: "5h",
        });

        res.status(200).json({
          token: accessToken,
          message: "User logged in",
        });
      } else {
        return res
          .status(400)
          .json({ message: "Something went wrong! Please try again!" });
      }
    } else {
      return res.status(500).json({ err });
    }
  });
});



// get users
router.get('/get', (req, res) => {
  const query = 'select id, name, email, phone, status from user where role="user"';

  connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ err });
    } else {
      return res.status(200).json({ data: results });
    }
  })


  router.patch("/update", (req, res) => {
    let user = req.body;
    let query = "update user set status=? where id=?";
    connection.query(query, [user.status, user.id], (err, results) => {
      if (err) {
        return res.status(500).json({ err });

      }
      else {
        if (results.affectedRows == 0) {
          return res.status(404).json({ message: "User ID does not found!!" });
        }
        return res.status(200).json({ message: " User updated successfully." });
      }
    });
  });



})














module.exports = router;









