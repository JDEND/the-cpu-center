import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { bookSharp, cart, home, newspaper, personCircle, star } from 'ionicons/icons';
import { register } from 'swiper/element/bundle';
import './details-modal/details-modal.component';




register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet]
})
export class AppComponent {
  public appPages = [
    { title: 'Featured', url: 'featured', icon: 'home' },
    { title: 'Catalouge', url: 'catalouge', icon: 'book-sharp' },
    { title: 'Favorites', url: 'favorites', icon: 'star' },
    { title: 'News', url: 'news', icon: 'newspaper' },
    { title: 'Cart', url: 'cart', icon: 'cart' },
    { title: 'User', url: 'user', icon: 'person-circle' },
  ];
  constructor() {
    addIcons({home, bookSharp, star, newspaper, cart, personCircle});
  }
}
