import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  slides = [
    {
      title:"Batería eléctrica",
      img: "assets/images/Drums.jpg",
      icon: "beer-outline",
      description: "Una batería musical es un conjunto de tambores y platillos que se tocan simultáneamente para proporcionar ritmo y percusión en una canción."
    },
    {
      title:"Guitarra eléctrica",
      img: "assets/images/Guitarr.jpg",
      icon: "barbell-outline",
      description: "Una guitarra eléctrica convierte las vibraciones de las cuerdas en señales eléctricas para producir un sonido amplificado."
    },
    {
      title:"Bajo eléctrico",
      img: "assets/images/Bass.jpg",
      icon: "barbell-outline",
      description: "El bajo eléctrico es un instrumento de cuerda más grande que la guitarra eléctrica, utilizado para tocar líneas de bajo en distintos géneros musicales."
    },
    {
      title:"Piano",
      img: "assets/images/Piano.jpg",
      icon: "barbell-outline",
      description: "El piano es un instrumento de teclado que produce sonidos al golpear las cuerdas con martillos."
    },
    {
      title:"Saxofón",
      img: "assets/images/Sax.jpg",
      icon: "barbell-outline",
      description: "El saxofón es un instrumento de viento-madera utilizado en varios géneros musicales, conocido por su sonido cálido y expresivo."
    }
  ]
  
  
  constructor(private router: Router) { }

  ngOnInit() {
  }

  finish(){
    this.router.navigateByUrl("/home");
    console.log("salir")

}
}
