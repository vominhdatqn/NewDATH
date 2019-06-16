const express = require('express');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
// const engines = require('consolidate');
// const paypal = require('paypal-rest-sdk');
const app = express();
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const path = require("path");
const cors = require('cors');
const bodyParser = require('body-parser');
const Port = 3001;
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// app.engine("ejs",engines.ejs);
// app.set("views","./views");
// app.set("view engine","ejs");
// paypal.configure({
//   'mode': 'sandbox', //sandbox or live
//   'client_id': 'AdZcWgrG8xc6qqrYgxixIF1loEU2dOKFV2oqZM2AWMB6E2_UW5HkxjfDha4RL3ezHgCOfnIfswTWYOCv',
//   'client_secret': 'EEx33gpQDt2Wvim2OIQgj5W2OSeWis7TpAwnWtbApnh_a0Y2VvZEpQkpn48yLtOp29IQ5CBGCrG6_n2e'
// });
const DIR = './uploads';

const SECRET_KEY = "secretkey";

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "house_db"
});
con.connect(function (err) {
  if (err) throw err;
  console.log("Connected Successfully!")
});
// var storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//       cb(null, './uploads');
//    },
//   filename: function (req, file, cb) {
//       cb(null , file.originalname);
//   }
// });
// app.get("/",(req,res) => {
//   res.render("index");
// });
// app.get('/paypal',(req,res) => {
//   var create_payment_json = {
//     "intent": "sale",
//     "payer": {
//         "payment_method": "paypal"
//     },
//     "redirect_urls": {
//         "return_url": "http://192.168.77.103:3001/success",
//         "cancel_url": "http://192.168.77.103:3001/cancel"
//     },
//     "transactions": [{
//         "item_list": {
//             "items": [{
//                 "name": "item",
//                 "sku": "item",
//                 "price": "1.00",
//                 "currency": "USD",
//                 "quantity": 1
//             }]
//         },
//         "amount": {
//             "currency": "USD",
//             "total": "1.00"
//         },
//         "description": "This is the payment description."
//     }]
// };
 
 
// paypal.payment.create(create_payment_json, function (error, payment) {
//     if (error) {
//         throw error;
//     } else {
//         console.log("Create Payment Response");
//         console.log(payment);
//         res.redirect(payment.links[1].href);
      
//     }
// });
// });
// app.get("/success",(req,res) => {
//   // res.send("Thành Công");
//   var PayerID = req.query.PayerID;
//   var paymentId = req.query.paymentId;
//   var execute_payment_json = {
//     "payer_id": PayerID,
//     "transactions": [{
//         "amount": {
//             "currency": "USD",
//             "total": "1.00"
//         }
//     }]
// };



// paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
//     if (error) {
//         console.log(error.response);
//         throw error;
//     } else {
//         console.log("Get Payment Response");
//         console.log(JSON.stringify(payment));
//         res.render('success');
//     }
// });
// });
// app.get("/cancel",(req,res) => {
//   res.render("cancel");
// });
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, DIR);
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

var upload = multer({storage: storage});
// var uploads = multer({ storage: storage}).single('imgFile');

app.post('/upload', upload.single('imgFile'), (req, res, next) => {
  if (req.file) {
    console.log('Uploading file...');
    var filename = req.file.filename;
    console.log(filename);
  } else {
    console.log('No File Uploaded');
    var filename = 'FILE NOT UPLOADED';
  }
  
  res.json({'img':filename,'status': 200 });
  // res.end();
})
// app.post('/upload', upload.single('imgFile'), (req, res) => {
//   try {
//     console.log(req.file);
//     console.log(req.body.township);
//     console.log(req.body.city);
//     //  var sql = "INSERT INTO house (houseName, note, cate_id, images, township, userID, guild, city, Street, water_money, electric_money, rent_cost, area, Deposit, gender, internet, capacity) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
 
//     //   var query = con.query(sql, function(err, result) {
//     //     console.log('inserted data');
//     //   });
//     // res.json({message: 'Successfully! uploaded', status:200});
//     res.json(req.file);
//   } catch (err) {
//     res.send(400);
//   }
// });
// app.post('/upload', function (req, res, next) {
//   uploads(req, res, function (err) {
//     if (err) throw err;
//     const { ten,house } = req.body;
//     const { filename } = req.file;
//     const tenN = parseInt(ten);
//     console.log(filename)
//     res.json({ "success": true });
//       var sql = "INSERT INTO test (ten, nha, img) VALUES (?,?,?)";
//       if (ten && house && filename) {
//       con.query(sql,[tenN,house,filename], function(err, result){
//           if(err){
//               res.end(err)
//           } else {
//               res.json(result)
//           }
//           // res.end();
//       })
//     }else{
//       res.send('Please enter ten and house and img!');
//       // res.end();
//     }
//   })
// })
app.post('/api/checkToken', verifyToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, user) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.send(

        user
      );
    }
  });

});
// app.get('/api/houses', jsonParser, function (req, res) {

//   con.query('SELECT * FROM house', function (error, results, fields) {
//     if (results.length > 0) {
//       res.json({ "houses": results })
//       //  res.json(results)
//     } else {
//       res.json({ "success": false, 'data': "User not found , please try again" })
//     }
//     res.end();
//   });
// })

app.post('/api/cateID', function (req, res) {
  const { cate_id } = req.body;
  con.query('SELECT * FROM category WHERE cate_id = ?', [cate_id], function (error, results, fields) {
    if (results.length > 0) {
      res.json({ "CateHouse": results })
      //  res.json(results)
    } else {
      res.json({ "success": false, 'data': "User not found , please try again" })
    }
    res.end();
  });
})

app.post('/api/searchStreet', function (req, res) {
  const { nameSearch } = req.body;
  con.query(`SELECT * FROM house WHERE Street LIKE "%${nameSearch}%"`, function (error, results, fields) {
    if (results.length > 0) {
      res.json({ "data": results })
    } else {
      res.json({ "success": false, 'data': "User not found , please try again" })
    }
    res.end();
  });
})
app.get('/api/houses', function (req, res) {
  var pageSize = parseInt(req.query.pageSize);
  var currentPage = 1;
  var start = 0;
  if (typeof req.query.page !== 'undefined') {
    currentPage = parseInt(req.query.page);
  }
  if (currentPage > 1) {
    start = (currentPage - 1) * pageSize;
  }
  con.query('SELECT * FROM house ORDER BY house_id DESC limit ? OFFSET ?', [pageSize, start], function (error, results, fields) {
    res.json({ "houses": results })
    res.end();
  });
})

app.get('/api/example', function (req, res) {
  var pageSize = parseInt(req.query.size);
  var pageCount = 0;
  var totalRec = 0;
  var currentPage = 1;
  var start = 0;
  console.log("currentPage", req.query.page);

  con.query('SELECT COUNT(*) AS totalRec FROM test', function (error, results, fields) {
    if (error) throw error;
    totalRec = results[0].totalRec;
    pageCount = Math.ceil(totalRec / pageSize);
    console.log("totalRec", totalRec);
    console.log("pageCount", pageCount);

    if (typeof req.query.page !== 'undefined') {
      currentPage = parseInt(req.query.page);
    }
    if (currentPage > 1) {
      start = (currentPage - 1) * pageSize;
    }
    con.query('SELECT * FROM test ORDER BY id ASC limit ? OFFSET ?', [pageSize, start], function (error, results, fields) {
      res.json({ "data": results });
    })
  });
})



app.post('/api/register', function (req, res) {
  const { username, password, email } = req.body;
  let sql = "INSERT INTO users (username, password, email) VALUES (?,?,?)";
  if (username && password && email) {
    con.query(sql, [username, password, email], function (error, results, fields) {
      if (error) {
        console.log("error ocurred", error);
        res.send({
          "code": 400,
          "failed": "error ocurred"
        })
      } else {
        console.log('The solution is: ', results);
        res.send({
          "code": 200,
          "success": "user registered sucessfully"
        });
      }
      res.end();
    })
  } else {
    res.send({
      "code": 500,
      "success": "username password email wrong"
    });
  }
})

app.post('/api/userID', function (req, res) {
  const { userID } = req.body;
  con.query('SELECT * FROM users WHERE userID = ?', [userID], function (error, results, fields) {
    if (results.length > 0) {
      res.json({ "user": results })
      //  res.json(results)
    } else {
      res.json({ "success": false, 'data': "User not found , please try again" })
    }
    res.end();
  });
})
function verifyToken(req, res, next) {

  //Request header with authorization key
  const bearerHeader = req.headers['authorization'];

  //Check if there is  a header
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');

    //Get Token arrray by spliting
    const bearerToken = bearer[1];
    req.token = bearerToken;
    //call next middleware
    next();
  } else {
    res.sendStatus(403);
  }
}

app.post('/user/login', function (req, res) {

  const { email, password } = req.body;


  if (email && password) {
    con.query('SELECT * FROM users WHERE email= ? AND password=?', [email, password], function (error, results, fields) {
      if (results.length > 0) {
        const expiresIn = 24 * 60 * 60;
        const token = jwt.sign({ user: results[0] }, SECRET_KEY, {
          expiresIn: expiresIn
        });
        res.json({ "success": true, token })
      } else {
        res.json({ "success": false, 'data': "User not found , please try again" })
      }
      res.end();
    });
  } else {
    res.send('Please enter Username and Password!');
    // res.json({"success":2});
    res.end();
  }
});
var server = app.listen(Port, function () {
  // var host = server.address().address
  // var port = server.address().port
  console.log(`Server đang lắng nghe port ${Port}`);
});