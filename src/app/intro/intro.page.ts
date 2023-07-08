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
      title:"Gatitos",
      img: "assets/images/gatitos.webp",
      icon: "beer-outline",
      description: "Hola soy la explicación del slide"
    },
    {
      title:"Perritos",
      img: "assets/images/perritos.jpg",
      icon: "barbell-outline",
      description: "Hola soy la explicación del slide"
    },
    {
      title:"Hamsters",
      img: "assets/images/hamster.jpg",
      icon: "barbell-outline",
      description: "Hola soy la explicación del slide"
    },
    {
      title:"Mas gatitos",
      img: "assets/images/masgatos.jpg",
      icon: "barbell-outline",
      description: "Hola soy la explicación del slide"
    },
    {
      title:"Cocodrilos",
      img: "assets/images/cocodrilo.jpeg",
      icon: "barbell-outline",
      description: "Hola soy un cocodrilo"
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
