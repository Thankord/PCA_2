import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private storage: Storage, private router: Router) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isUserLoggedIn = await this.storage.get("isUserLoggedIn");
    console.log("isUserLoggedIn", isUserLoggedIn);

    // Verificar si el usuario ya está logeado
    if (isUserLoggedIn) {
      // Verificar si la ruta actual es la página de inicio de sesión o registro
      const currentUrl = state.url;
      if (currentUrl === '/login' || currentUrl === '/register') {
        // Redirigir al usuario a una página diferente (por ejemplo, la página principal)
        this.router.navigate(['/menu/home']); // Redirige a la página principal después del login.
        return false;
      }
    } else {
      // Si el usuario no está logeado, redirigirlo a la página de inicio de sesión
      if (state.url !== '/login') {
        this.router.navigate(['/login']); // Redirige a la página de inicio de sesión
        return false;
      }
    }

    // Si el usuario ya está logeado y no está en login o register, o si no ha iniciado sesión y está en login, permitir el acceso.
    return true;
  }
}
