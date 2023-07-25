import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthenticateService } from '../services/authenticate.service';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
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
    ],

    name: [
      { type: "required", message: "El nombre es obligatorio" },
      { type: "minlength", message: "El nombre debe tener al menos 3 caracteres" },
    ],
    
    last_name: [
      { type: "required", message: "El apellido es obligatorio" },
      { type: "minlength", message: "El apellido debe tener al menos 3 caracteres" },
    ],

  }
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticateService,
    private navCtrl: NavController,
    private toastController: ToastController,    
  ) {
    this.registerForm = this.formBuilder.group(
      {
        name: new FormControl(
          "",
          Validators.compose(
            [
              Validators.required,
              Validators.minLength(3)
            ]
          )
        ),
        
        last_name: new FormControl(
          "",
          Validators.compose(
            [
              Validators.required,
              Validators.minLength(3)
            ]
          )
        ),

        email: new FormControl(
          "",
          Validators.compose(
            [
              Validators.required,
              Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9_.+-]+.[a-zA-Z0-9.-]+$"),
              Validators.email      

          ]
          )
        ),
        password: new FormControl(
          "",
          Validators.compose(
            [
              Validators.required,
              Validators.minLength(6),
              Validators.maxLength(8),
              Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$")
    
            ]
          )
        )

      }
    )
   }

  ngOnInit() {
  }

  goToLogin(){
    console.log("Volver atrás");
  }

  registerUser(userData:any){
    console.log(userData);
      this.authService.registerUser(userData).then(()=>{
      this.navCtrl.navigateBack("/login");
    })
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
    const nameControl = this.registerForm.get('name');
    const last_nameControl = this.registerForm.get('last_name');
    const emailControl = this.registerForm.get('email');
    const passControl = this.registerForm.get('password');
    
    if (nameControl?.hasError('required') && nameControl.dirty) {
      this.mostrarToast(this.validation_messages.name[0].message);
    } else if (nameControl?.hasError('minlength') && nameControl?.dirty) {
      this.mostrarToast(this.validation_messages.name[1].message);
    }

    if (last_nameControl?.hasError('required') && last_nameControl.dirty) {
      this.mostrarToast(this.validation_messages.last_name[0].message);
    } else if (last_nameControl?.hasError('minlength') && last_nameControl?.dirty) {
      this.mostrarToast(this.validation_messages.last_name[1].message);
    }
    
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