exp = require("express");
bp = require("body-parser");
mj = require("mongojs");
file = require("express-fileupload");
app = exp();
app.use(bp.json());
app.use(file());
app.listen(1000);
con = mj("mongodb://localhost:27017/PoliceWebsite");

console.log("server Started");
theifref = require("./serverFiles/theif");
app.use("/theifpath", theifref);
app.post("/insertproimages", function(req, res) {
  var filenames = new Array();
  var _id = 0;

  if (req.files.f1.length == undefined) {
    cont = req.files.f1;
    var fname = req.files.f1.name;
    d = new Date();
    t = d.getTime();
    filenames.push(t + fname);
    cont.mv("FileUploads/" + t + fname);
    //res.send({ result: "hii" });
  } else {
    for (i = 0; i < req.files.f1.length; i++) {
      mtype = req.files.f1[i].mimetype;
      if (mtype == "image/png" || "image/jpg") {
        cont = req.files.f1[i];
        fname = req.files.f1[i].name;
        obj = new Date();
        t = obj.getTime();
        filenames.push(t + fname);
        cont.mv("FileUploads/" + t + fname);
      }
    }
  }

  con.Theif_details.find({}, { _id: true }).sort({ _id: -1 }, function(
    err,
    result
  ) {
    if (result) {
      console.log(filenames);
      console.log(result);
      _id = result[0]._id;
      con.Theif_details.update(
        { _id: _id },
        { $set: { prodImages: filenames } },
        function(err1, result1) {
          if (result1) res.redirect("localhost:4200//");
        }
      );
    }
  });
});
