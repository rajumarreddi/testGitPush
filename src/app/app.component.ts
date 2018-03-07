	
	import { Component } from '@angular/core';
import { Http, Response, Headers,BaseRequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import {DropDetail} from './DropBoxDetail'
import {DcoSignStatus}  from './DocSignStatus'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app works!';
//private headers = new Headers({ 'Content-Type': 'application/json' });
 returnData : DcoSignStatus = null;

 constructor(private http: Http) {

}


//   onChange1(event: any) {
//     let fileList: FileList = event.target.files;
//     if(fileList.length > 0) {
//         let file: File = fileList[0];
        
//         let dropDetail :  DropDetail = new DropDetail();
//         dropDetail.accessToken = "aaaa";
//         //JSON.stringify(json)
//         //dropDetail.inputFile.append('file', file, file.name);
//         let formData:FormData = new FormData();
//         formData.append('file', file, file.name);
       
//        // console.log("FFFFFFFFFFFFFFF"+ formData)
//         // dropDetail.inputFile=formData;
//         // console.log("IIIIIIIIIIIIIIII"+ dropDetail.inputFile);
//         let headers = new Headers();//;content-type=multipart
//         headers.append('Accept', 'application/json');
//         //headers.append('Content-Type', 'multipart/form-data');
//         //'http://localhost:8080/dorpBoxFileUpload'
//         //https://DocuSignExample.cfapps.io/dorpBoxFileUpload
//         this.http.post('http://localhost:8080/dorpBoxFileUpload', formData,headers)
//             .map(res => res.json())
//             .catch(error => Observable.throw(error))
//             .subscribe(
//                 data => console.log('success'),
//                 error => console.log(error)
//             )
//     }
// }

onChange1(event: any)  {
    console.log("onChange1 =======");
    this.onChange(event).subscribe((returnData : DcoSignStatus) => {this.returnData = returnData});
    console.log(this.returnData);
}
 onChange(event: any) : Observable<DcoSignStatus>{
   this.returnData = new DcoSignStatus();
    console.log("onChange =======");
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
        let file: File = fileList[0];
               
        let formData:FormData = new FormData();
        formData.append('file', file, file.name);
       
         // console.log("IIIIIIIIIIIIIIII"+ dropDetail.inputFile);
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        //headers.append('Content-Type', 'multipart/form-data');
        //'http://localhost:8080/dorpBoxFileUpload'
        //https://DocuSignExample.cfapps.io
       return this.http.post('https://DocuSignExample.cfapps.io/docSignFileUpload', formData, headers)
       .map(this.extractLoginData)
            .catch(error => Observable.throw(error))
        }
    }

    extractLoginData(response:Response) {
        this.returnData = response.json();
        console.log("After hitting service ---> " + this.returnData.docuSgingURL);
        window.open(this.returnData.docuSgingURL, "_blank");
        return this.returnData || { };
        
    }

    signature() {
        let url = this.returnData.docuSgingURL;
        window.open(url, "_blank");
    }
}