import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class DbserviceService {
  constructor(@Inject(HttpClient) public ht) {}

  // Insert Operation for cat ,subcat,subsubcat
  Insertcat(obj) {
    return this.ht.post("theifpath/insertdata", obj);
  }

  getCatData() {
    return this.ht.get("theifpath/getData");
    //  this.$catdata.emit(dt);
    //console.log(dt);
  }
  catSaveData(obj) {
    return this.ht.post("theifpath/updatedata", obj);
  }
  // Delete Cat Data
  catDeleteData(obj) {
    return this.ht.post("theifpath/removedata", obj);
  }
}
