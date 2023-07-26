import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private storage: Storage, private router: Router) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isUserLoggedIn = await this.storage.get("isUserLoggedIn");
    console.log("isUserLoggedIn", isUserLoggedIn);

    // Verificar si el usuario está logeado
    if (isUserLoggedIn) {
      // Permitir el acceso a la ruta /menu/home
      return true;
    } else {
      // Si el usuario no está logeado, redirigirlo a la página de inicio de sesión
      this.router.navigate(['/login']);
      return false;
    }
  }
}
