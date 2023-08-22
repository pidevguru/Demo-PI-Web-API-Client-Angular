import { Component, OnInit } from '@angular/core';
import { PIWebApi, PWAPoint } from 'piwebapi-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'piwebapi-app';
  private piwebapi: PIWebApi
  public dataStr: string
  constructor(piwebapiService: PIWebApi) {
    this.piwebapi = piwebapiService;
    this.dataStr = '';
    this.piwebapi.setBasicAuth("https://marc-pi2018.marc.net/piwebapi", "marc.adm", "1");
  }
  ngOnInit(): void {
    this.piwebapi.point.getByPath("\\\\MARC-PI2018\\sinusoid").subscribe({
      next: (res) => {  this.dataStr = JSON.stringify(res, null, 4) }, // completeHandler
      error: (error) => {    console.log(error.json()) },    // errorHandler 
    });

    var newPoint = new PWAPoint();
    newPoint.Name = "NEWPOINT";
    newPoint.Descriptor = "Test PI Point for Angular PI Web API Client";
    newPoint.PointClass = "classic";
    newPoint.PointType = "float32";
    newPoint.Future = false;
    this.piwebapi.dataServer?.createPoint("webId", newPoint).subscribe({
      next: (res) => { console.log(res) }, 
      error: (error) => { console.log(error.json()) }
    }); 

    var webIds = []
    webIds.push("a");
    webIds.push("b");
    webIds.push("c");

    this.piwebapi.streamSet?.getRecordedAdHoc(webIds, undefined, "*", undefined, true, 1000, undefined, "*-3d", undefined).subscribe({
      next: (res) => { console.log(res) }, 
      error: (error) => { console.log(error.json()) }
    });   
  }
}
