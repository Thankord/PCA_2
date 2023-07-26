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
      // Verificar si la ruta actual es la página de inicio de sesión, registro o /menu/home
      const currentUrl = state.url;
      if (currentUrl === '/login' || currentUrl === '/register') {
        // Redirigir al usuario a una página diferente (por ejemplo, la página principal)
        this.router.navigate(['/menu/home']); // Redirige a la página principal después del login.
        return false;
      }
    } else {
      // Si el usuario no está logeado, redirigirlo a la página de inicio de sesión o registro
      if (state.url !== '/login' && state.url !== '/register') {
        // Redirige a la página de inicio de sesión
        this.router.navigate(['/login']);
        return false;
      }

      // Prohibir el acceso a /menu/home si el usuario no está logeado
      if (state.url.includes('/menu/home')) {
        // Bloquea el acceso a la ruta /menu/home
        return false;
      }
    }

    // Si el usuario ya está logeado y no está en login, register o /menu/home, permitir el acceso.
    return true;
  }
}
