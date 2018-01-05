import { Component, OnInit } from "@angular/core";
import { IGateway } from "../shared/igateway";
import { ApiDataService } from "../shared/api-data.service";
import { FormsModule } from "@angular/forms";
import { IDepartures } from "../shared/idepatures";
import { forEach } from "@angular/router/src/utils/collection";
import { IDeparts } from "../shared/ideparts";
import { IDurations } from "../shared/idurations";

@Component({
  selector: "app-searchbox",
  templateUrl: "./searchbox.component.html",
  styleUrls: ["./searchbox.component.css"]
})
export class SearchboxComponent implements OnInit {
  gateways: IGateway[];
  departures: IDepartures[];
  departOptions: IDeparts[] = [];
  selectedGateway: string;
  selectedDeparture: string;
  durations: IDurations[] = [];
  errorMessage: any;

  constructor(private _apiDataService: ApiDataService) {}

  ngOnInit(): void {
    //getting the gateway values from API
    this._apiDataService.getGateways().subscribe(gateways => {
      this.gateways = gateways;
    }, error => (this.errorMessage = <any>error));
    this.selectedGateway = "YYZ";
    //Getting departures value from API
    this.populateDeparture(this.selectedGateway);
  }

  changeDeparture(value: string) {
    this.populateDeparture(value);
  }

  populateDeparture(value: string) {
    this._apiDataService.getDepatures(value).subscribe(departures => {
      this.departures = departures;
      this.selectedDeparture = departures[0].groupCode;
      while (this.departOptions.length > 0) this.departOptions.pop();
      departures.map(departure => {
        if (
          departure.destination[0].destCode != null &&
          departure.destination.length === 1
        ) {
          this.departOptions.push({
            code: departure.groupCode,
            name: `${departure.groupName} (${
              departure.destination[0].destName
            })`,
            duration: departure.destination[0].durations
          });
        } else {
          this.departOptions.push({
            code: departure.groupCode,
            name: departure.groupName,
            duration: departure.destination[0].durations
          });
        }
        if (departure.destination.length > 1) {
          departure.destination.map(dest => {
            this.departOptions.push({
              code: dest.destCode,
              name: ` -${dest.destName}`,
              duration: dest.durations
            });
          });
        }
      });
      this.populateDuration(this.selectedDeparture);
    }, error => (this.errorMessage = <any>error));
  }

  getDuration(value: string) {
    this.populateDuration(value);
  }

  populateDuration(value: string) {
    let dur = [];
    this.durations = [];
    let flag5,
      flag7,
      flag10: boolean = false;

    let durVal = this.departOptions.filter(dur => {
      return dur.code === value;
    });
    dur = durVal[0].duration.split(",");
    dur.map(duration => {
      if (duration >= 0 && duration <= 4) flag5 = true;
      else if (duration >= 5 && duration <= 10) flag7 = true;
      else if (duration >= 11 && duration <= 16) flag10 = true;
    });
    if (flag7) this.durations.push({ value: "7", name: "5 to 10 days" });
    if (flag5) this.durations.push({ value: "4", name: "3 or 4 days" });
    if (flag10) this.durations.push({ value: "14", name: "11 to 16 days" });
    this.durations.push({value:"",name:""});
    dur.map(duration =>
      this.durations.push({
        value: `${duration}DAYS`,
        name: `${duration} days only`
      })
    );
  }
}
