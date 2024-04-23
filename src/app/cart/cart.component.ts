import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonList, IonRow, IonCol, IonCard, IonCardContent, IonButton, IonGrid, IonItem, IonTextarea } from '@ionic/angular/standalone';
import { NgFor, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  standalone: true,
  imports: [FormsModule, IonTextarea, IonItem, NgFor, NgForOf, IonGrid, IonButton, IonCardContent, IonCard, IonCol, IonRow, IonList, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent],
})
export class CartComponent  implements OnInit {
  public cart!: string;
  private activatedRoute = inject(ActivatedRoute);
  constructor() {}

  currentCart : any;
  subTotal : Number = 12345.67;
  Tax : Number = 740.74;
  Total : Number = 13086.41;

  ngOnInit() {
    this.cart = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.currentCart = JSON.parse(localStorage.getItem('cartItems') || '{}');
    console.log(this.currentCart);
  }
}
