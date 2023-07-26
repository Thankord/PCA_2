import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(
    private menu: MenuController,
    private navCtrl: NavController,
    private storage: Storage
    ) { }

  ngOnInit() {
  }

  closeMenu(){
    this.menu.close();
  }

  logout(){
    this.navCtrl.navigateRoot('/login');
    // Cambiar el valor de isUserLoggedIn a false
    this.storage.set('isUserLoggedIn', false).then(() => {
      console.log('isUserLoggedIn changed to false');
    });
  }

  goToSettings(){
    this.navCtrl.navigateForward('/menu/settings');
    this.menu.close();
  }
  goToIntro(){
    this.navCtrl.navigateForward('/intro');
    this.menu.close();
  }

  goToHome(){
    this.navCtrl.navigateRoot("/menu/home");
    this.menu.close();
  }

}