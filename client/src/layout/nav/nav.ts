import { NgClass } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  imports: [
    NgClass
  ],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  activeSection = 'matches'; // Default active section

  setSection(section: string) {
    this.activeSection = section;
  }

  onLogin(event: Event) {
    event.preventDefault();
    console.log('Login form submitted!');
    // Add your auth logic here
  }
}
