import { Component } from '@angular/core';
import { NavBar } from '../nav-bar/nav-bar';
import { Hero } from '../hero/hero';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    NavBar,
    Hero
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
