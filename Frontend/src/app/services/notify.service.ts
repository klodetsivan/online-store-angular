// import { Injectable } from '@angular/core';
// import { Notyf } from 'notyf';


// @Injectable({
//     providedIn: 'root'
// })

// export class NotifyService {

//     private notify = new Notyf({
//         duration: 3000, // display duration
//         position: { x: "center", y: "top" }, // message location
//         dismissible: true // can user click on X
//     });

//     public success(message: string): void {
//         this.notify.success(message);
//     }

//     public error(err: any): void {
//         const message = this.extractErrorMessage(err);
//         this.notify.error(message);
//     }

//     private extractErrorMessage(err: any): string {

//         // Front: throw "some error...";
//         if (typeof err === "string") return err;

//         // Back: throws string (500 - server crash / 401 - unauthorized / 404...)
//         if (typeof err.error === "string") return err.error;

//         // Back throws string[] (400 - validation)
//         if (Array.isArray(err.error)) return err.error[0];

//         // Front: throw new Error("some error...");
//         if (typeof err.message === "string") return err.message;

//         // Other: 
//         return "Some error occurred, please try again";
//     }

// }
