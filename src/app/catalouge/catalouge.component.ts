import { Component, ElementRef, inject, NgModule, OnInit, viewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonSearchbar, IonButton, IonIcon, IonList, IonInput, IonModal, IonItem, IonRadioGroup, IonRadio, IonCheckbox, IonRange, IonCard, IonCardContent, IonFabList, IonFab, IonFabButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronUpCircle, filter } from 'ionicons/icons';
import { ViewChild } from '@angular/core';
import { OverlayEventDetail } from '@ionic/core/components';
import { FormsModule } from '@angular/forms';
import { NgFor, NgForOf } from '@angular/common';
import {RangeCustomEvent} from '@ionic/angular'
import { NgxSearchFilterModule } from 'ngx-search-filter';

interface itemModel{
  imgSrc: String;
  productId: Number;
  productName: String;
  manufacturer: string;
  description: String;
  listPrice: Number;
  noLongerAvailable: Boolean;
  productType: String;
};



@Component({
  imports: [IonFabButton, IonFab, IonFabList, IonCardContent, IonCard, IonRange, IonCheckbox, IonRadio, 
            IonRadioGroup, IonItem, IonModal, IonInput, IonList, IonIcon, IonButton, IonSearchbar, 
            IonCol, IonRow, IonGrid, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, 
            FormsModule, NgFor, NgForOf, NgxSearchFilterModule],
  selector: 'app-catalouge',
  templateUrl: './catalouge.component.html',
  styleUrls: ['./catalouge.component.scss'],
  standalone: true,
})
export class CatalougeComponent  implements OnInit {
  public catalouge!: string;
  private activatedRoute = inject(ActivatedRoute);
  @ViewChild(IonModal) modal!: IonModal;
  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name!: string;
  searchCards! : itemModel[];

  productType : any = "CPU";
  prices : any;
  priceLow : number = 0;
  priceHigh : number = 10000;

  searchTerm : string = "";
  filterargs = {title: this.searchTerm}

  cartList : any = [];

  ngOnInit() {
    this.catalouge = this.activatedRoute.snapshot.paramMap.get('id') as string;
    addIcons({filter, chevronUpCircle});
    this.searchCards = [];
    for (let i = 0; i < 100; i++) {
      this.searchCards.push({
        imgSrc: "..\\..\\assets\\images\\banner.jpeg",
        productId: i,
        productName: "thatDawgInMe",
        manufacturer: "BNE",
        description: "Spoopy",
        listPrice: 10,
        noLongerAvailable: false,
        productType: "CPU"
      })

      }
    for (let i = 100; i < 200; i++) {
      this.searchCards.push({
        imgSrc: "..\\..\\assets\\images\\banner.jpeg",
        productId: i,
        productName: "bigbog",
        manufacturer: "Commqual",
        description: "Spoopy",
        listPrice: 30,
        noLongerAvailable: false,
        productType: "GPU"
      })
    }
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    console.log(this.productType, this.priceLow, this.priceHigh)
    this.modal.dismiss(this.name, 'confirm');

    // have this create a new searchCards query for filtering
  }

  onWillDismiss(event: Event) {

  }

  pinFormatter(value: number) {
    return `${value}`;
  }

  onIonKnobMoveEnd(ev: Event) {
    this.prices = (ev as RangeCustomEvent).detail.value;
    this.priceLow = this.prices['lower'];
    this.priceHigh = this.prices['upper'];
  }

  addToCart(item : any){
    console.log(item)
    localStorage.removeItem('cartItems');
    this.cartList.push(item);
    localStorage.setItem('cartItems', JSON.stringify(this.cartList));
    console.log(localStorage.getItem('cartItems'))
  }
}