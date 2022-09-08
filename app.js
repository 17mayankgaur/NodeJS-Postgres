const client = require('./connection.js')
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require("ejs");
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
client.connect();
//////////HOME//////////
app.get('/', (req, res) => {
  client.query(`Select * from students`, (err, result) => {
    if (!err) {
      res.render('home', {
        userdata: result.rows
      });
    } else {
      console.log("Try Again!");
    }
  });
  client.end;
});

//////////INSERT//////////

app.get('/insert', (req, res) => {
  res.render("insert");
});
app.post('/insert', (req, res) => {
  let insertQuery = `insert into students(id, first_name, last_name, father_name, mother_name, address, phone)
                    values(${req.body.postId}, '${req.body.postFirst_name}', '${req.body.postLast_name}', '${req.body.postFather_name}','${req.body.postMother_name}', '${req.body.postAddress}', '${req.body.postPhone}')`;
  client.query(insertQuery, (err, result) => {
    if (!err) {
      res.send('Insertion was successful')
    } else {
      console.log(err.message)
    }
  });
  client.end;
});

//////////FIND//////////

app.get('/find', (req, res) => {
  res.render("find");
});
app.post('/find', (req, res) => {
  res.redirect(`/findresult/${req.body.postId}`);
});
app.get('/findresult/:id', (req, res) => {
  client.query(`Select * from students where id=${req.params.id}`, (err, result) => {
    if (!err) {
      res.render("findresult", {
        studentId: result.rows[0].id,
        studentFirstName: result.rows[0].first_name,
        studentLastName: result.rows[0].last_name,
        studentFatherName: result.rows[0].father_name,
        studentMotherName: result.rows[0].mother_name,
        studentAddress: result.rows[0].address,
        studentPhone: result.rows[0].phone
      });
    } else {
      res.send("Try Again!");
    }
  });
  client.end;
});

//////////DELETE//////////

app.get('/delete', (req, res) => {
  res.render("delete");
});
app.post(`/delete`, (req, res) => {
  let deleteQuery = `delete from students where id=${req.body.postId}`
  client.query(deleteQuery, (err, result) => {
    if (!err) {
      res.send('Deletion was successful')
    } else {
      console.log(err.message)
    }
  })
  client.end;
});

//////////UPDATE//////////
app.get('/update', (req, res) => {
  res.render("update");
});
app.post('/update', (req, res) => {
  res.redirect(`/updatestudent/${req.body.postId}`);
});
//////////UPDATE STUDENT//////////
app.get(`/updatestudent/:id`, (req, res) => {
  let key = req.params.id;
  client.query(`Select * from students where id=${key}`, (err, result) => {
    if (!err) {
      res.render("updatestudent", {
        studentId: result.rows[0].id,
        studentFirstName: result.rows[0].first_name,
        studentLastName: result.rows[0].last_name,
        studentFatherName: result.rows[0].father_name,
        studentMotherName: result.rows[0].mother_name,
        studentAddress: result.rows[0].address,
        studentPhone: result.rows[0].phone
      });
    } else {
      res.send("Try Again!");
    }
  });
});
app.post('/updatestudent', (req, res) => {
  let updatetQuery = `update students
                       set first_name='${req.body.postFirst_name}',
                       last_name='${req.body.postLast_name}',
                       father_name='${req.body.postFather_name}',
                       mother_name='${req.body.postMother_name}',
                       address='${req.body.postAddress}',
                       phone='${req.body.postPhone}'
                       where id=${req.body.postId}`
  client.query(updatetQuery, (err, result) => {
    if (!err) {
      res.send('Updation was successful')
    } else {
      console.log(err.message)
    }
  });
  client.end;
});

//////////LISTENING TO PORT//////////
app.listen(3000, () => {
  console.log("Sever is now listening at port 3000");
})
