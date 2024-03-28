import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blank-layout',
  templateUrl: './blank-layout.component.html',
  styleUrls: ['./blank-layout.component.css']
})
export class BlankLayoutComponent {
  hideButton = true;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Set the visibility of the side button based on the scroll position
    this.hideButton = window.pageYOffset <= 50;
  }
  goToUp() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // window.scrollTo(0, 0);
  }
}
