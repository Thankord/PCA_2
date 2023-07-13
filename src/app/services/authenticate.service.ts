import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor() { }

  loginUser(credentials:any){
    return new Promise((accept, reject) => {
      if (
        credentials.email == "danedu0727@gmail.com" &&
        credentials.password == "Aa7766"
      )
      {
        accept("Login exitoso")
      }else{
        reject("Verifique sus credenciales")
      }
    })
  }
}
