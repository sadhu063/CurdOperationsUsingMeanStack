import { Component, Inject } from "@angular/core";
import { DbserviceService } from "./dbservice.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "Policewebsite";
  tmp: boolean;
  txtcat: string;
  cases: number;
  area: string;
  data;
  tmp1: number = 0;

  constructor(@Inject(DbserviceService) public ser) {
    // this.fm = new FormGroup({
    //   catname: new FormControl("", [
    //     Validators.required,
    //     Validators.pattern("[a-zA-Z0-9 ]{3,}$")
    //   ])
    // });
    this.fungetData();
  }

  funInsertcat() {
    alert("hi");
    if (this.data.length == 0) {
      var obj = {
        _id: this.data.length + 1,
        name: this.txtcat,
        cases: this.cases,
        area: this.area
      };
      this.ser.Insertcat(obj).subscribe(dt => {
        if (dt) {
          this.fungetData();
        }
      });
    } else if (this.data.length > 0) {
      const result = this.data.filter(d => d.name === this.txtcat);

      if (result == 0) {
        var obj1 = {
          _id: this.data[this.data.length - 1]._id + 1,
          name: this.txtcat,
          cases: this.cases,
          area: this.area
        };
        this.ser.Insertcat(obj1).subscribe(dt => {
          if (dt) {
            this.fungetData();
            alert("ts > 0");
          }
        });
      } else {
        alert("Thief name already existed ");
      }
    }
  }

  fungetData() {
    this.ser.getCatData().subscribe(dt => {
      this.data = dt;
    });
  }
  tt1: string;
  tt2: number;
  tt3: string;
  funEdit(d) {
    this.tt1 = d.name;
    this.tt2 = d.cases;
    this.tt3 = d.area;
    this.tmp1 = d._id;
  }
  funCanel() {
    this.tmp1 = 0;
  }
  funSave() {
    var obj = [
      { _id: this.tmp1 },
      { $set: { name: this.tt1, cases: this.tt2, area: this.tt3 } }
    ];
    this.ser.catSaveData(obj).subscribe(dt => {
      this.tmp1 = 0;
      this.fungetData();
    });
  }
  funDelete(id) {
    var obj = { _id: id };
    this.ser.catDeleteData(obj).subscribe(dt => {
      this.fungetData();
    });
  }
}
