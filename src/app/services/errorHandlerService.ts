import { Injectable } from '@angular/core';
// import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
// import 'rxjs/add/operator/toPromise';

@Injectable()

export class ErrorHandler {

    constructor(private http: HttpClient) { }

    handle401error():any {
       console.log("Authentication failed!");
        
    }

    handleotherErrors():any {
        console.log("Internal server error occured");
    }

    handleRejection(error: any): Promise<any> {
       console.log('a Rejection occurred', error);
        return Promise.reject(error.message || error);
    }

    handleError = (error: any): any => {
       console.log("in ErrorHandler handle error");
        var responsestatus = error.status;
        switch (responsestatus) {
            case 401:
                console.log("this : " + typeof this);
                this.handle401error();

            case 400: 
                console.log("Bad request error : " + typeof this);

            case 404:
                console.log("Does not exist: " + typeof this);

            default:
                this.handleotherErrors();
        }
       
    }


}


