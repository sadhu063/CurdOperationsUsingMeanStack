exp = require("express");
rt = exp.Router();
rt.post("/insertdata", function(req, res) {
  con.Theif_details.insert(req.body, function(err, result) {
    if (err) res.send(err);
    else {
      res.send(result);
    }
  });
});

rt.get("/getData", function(req, res) {
  con.Theif_details.find(function(err, result) {
    if (err) {
      res.send({ resp: err });
    } else {
      res.send(result);
    }
  });
});

rt.post("/updatedata", function(req, res) {
  con.Theif_details.updateOne(req.body[0], req.body[1], function(
    err,
    response
  ) {
    console.log(err);
    res.send(response);
  });
});

rt.post("/removedata", function(req, res) {
  con.Theif_details.remove(req.body, function(err, response) {
    res.send({ resp: response });
  });
});
module.exports = rt;
