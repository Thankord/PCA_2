import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthenticateService } from '../services/authenticate.service';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  validation_messages = {
    email: [
      { type: "required", message: "El email es obligatorio" },
      { type: "pattern", message: "Debe poner un email válido" }
    ],
    password: [
      { type: "required", message: "La contraseña es obligatoria" },
      { type: "minlength", message: "La contraseña debe tener al menos 6 caracteres" },
      { type: "maxlength", message: "La contraseña no puede tener más de 8 caracteres" },
      { type: "pattern", message: "La contraseña debe contener al menos una mayúscula, un número y un carácter alfanumérico" }
    ]
  }
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthenticateService,
    private navCtrl: NavController,
    private storage: Storage,
    private toastController: ToastController,
    ) { 
    this.loginForm = this.formBuilder.group({
      email: new FormControl(          
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9_.+-]+.[a-zA-Z0-9.-]+$"),
          Validators.email      
        ])
      ),
      password: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(8),
          Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$")
        ])
      )
    });
  }

  ngOnInit() {
  }

  loginUser(credentials: any){
    console.log(credentials);
    this.authService.loginUser(credentials).then(res => {
      this.errorMessage = "";
      this.storage.set("isUserLoggedIn", true);
      this.navCtrl.navigateForward("/menu/home");
    }).catch(err => {
      this.errorMessage = err;
      console.log(this.errorMessage);
    })
  }

  goToRegister() {
    this.navCtrl.navigateForward("/register")
  }

  async mostrarToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000, // Duración del toast en mili segundos
      position: 'bottom', // Puedes cambiar la posición si lo prefieres ('top', 'bottom', 'middle')
    });
    toast.present();
  }

  validarCampos() {
    const emailControl = this.loginForm.get('email');
    const passControl = this.loginForm.get('password');
    
    if (emailControl?.hasError('required') && emailControl.dirty) {
      this.mostrarToast(this.validation_messages.email[0].message);
    } else if (emailControl?.hasError('email') && emailControl?.dirty) {
      this.mostrarToast(this.validation_messages.email[1].message);
    }

    if (passControl?.hasError('required') && passControl.dirty) {
      this.mostrarToast(this.validation_messages.password[0].message);
    } else if (passControl?.hasError('minlength') && passControl?.dirty) {
      this.mostrarToast(this.validation_messages.password[1].message);
    } else if (passControl?.hasError('maxlength') && passControl?.dirty) {
      this.mostrarToast(this.validation_messages.password[2].message);
    } else if (passControl?.hasError('pattern') && passControl?.dirty) {
      this.mostrarToast(this.validation_messages.password[3].message);
    }
  }
  
}
