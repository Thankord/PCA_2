import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private storage: Storage) { }

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
    registerUser(userData:any){
      userData.password = btoa(userData.password);
      return this.storage.set("user", userData);
  }
}
