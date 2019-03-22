import { Injectable } from '@angular/core';
// import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import {ErrorHandler} from '../errorHandlerService';
import { HttpClient, HttpResponse } from '@angular/common/http';
// 

@Injectable({
    providedIn: 'root'
})

export class DataService {
    apiUrl: any;
    environment: any;
    windData: any[];

    private windDataSource = new Subject<any>();
    windData$ = this.windDataSource.asObservable();

    constructor(private httpClient: HttpClient, private errorHandler:ErrorHandler) {
        this.apiUrl = "../../../assets/REsuretyWebApplicationEngineer.csv";
        // this.apiUrl = "../../../assets/newdata.csv";

    }

    generateEfficiency = (data) => {
        console.log(data)
        for(let d of data){
          d['"CapacityMW"'] = +d['"CapacityMW"'];
          d['"GenerationMWhPerYear"'] = +d['"GenerationMWhPerYear"'];
          d['"Efficiency"'] = (d['"GenerationMWhPerYear"'] / (d['"CapacityMW"'] * 8760))
        }
    
        return data
      }

    
    extractData = (res) => {
        let csvData = res || "";
        var lines = csvData.split("\n");
    
        var result = [];
    
        var headers = lines[0].split(",");
        let count = 0 
        for (var i = 1; i < lines.length; i++) {
    
          var obj = {};
          var currentline = lines[i].split(",");
          if(currentline.length > 7){
            currentline.splice(3,1)
          }
    
          for (var j = 0; j < headers.length; j++) {
    
            obj[headers[j]] = currentline[j];
            
          }
    
          result.push(obj);
    
        }
    
        //return result; //JavaScript object
        return result; //JSON
      }



    getWindData() {
        var that = this;
        return this.httpClient.get(this.apiUrl, {responseType: 'text'}).pipe(
            map(function (res) {
                let data = that.extractData(res)
                data = that.generateEfficiency(data)
                that.windDataSource.next(data)
                // that.windDataSource.next(res);
                return data;
            }
            )
        )
}
}