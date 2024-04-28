import { Component, ElementRef, inject, NgModule, OnInit, viewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, ModalController, IonContent, IonGrid, IonRow, IonCol, IonSearchbar, IonButton, IonIcon, IonList, IonInput, IonModal, IonItem, IonRadioGroup, IonRadio, IonCheckbox, IonRange, IonCard, IonCardContent, IonFabList, IonFab, IonFabButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronUpCircle, filter, text } from 'ionicons/icons';
import { ViewChild } from '@angular/core';
import { OverlayEventDetail } from '@ionic/core/components';
import { FormsModule } from '@angular/forms';
import { NgFor, NgForOf, NgIf } from '@angular/common';
import {RangeCustomEvent} from '@ionic/angular'
import { NgxSearchFilterModule } from 'ngx-search-filter';
import { DetailsModalComponent } from '../details-modal/details-modal.component';
import { defineCustomElement } from '@ionic/core/components/ion-modal.js';

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
            FormsModule, NgFor, NgForOf, NgxSearchFilterModule, NgIf,],
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
  brandsSelected : string = "BNE,Lntei,Commqual,Aidivn";

  manufacturers : string[] = ["BNE", "Lntei", "Commqual", "Aidivn"];
  manCheckedList : boolean[] = [true, true, true, true];
  manList : any;
  notes : any;

  searchTerm : string = "";
  filterargs = {title: this.searchTerm}

  cartList : any = [];

  async ngOnInit() {
    this.catalouge = this.activatedRoute.snapshot.paramMap.get('id') as string;
    addIcons({filter, chevronUpCircle});
    this.searchCards = [];
    await this.fetchCards();
  }

  constructor(private modalCtrl: ModalController){
    defineCustomElement();
  }

  async fetchCards(){
    const response = await window.fetch('http://localhost:8000/queries/getCatalouge/' + this.productType + '/' + this.priceLow + '/' + this.priceHigh + '/' + '\'' + this.brandsSelected + '\''
    , {method: 'POST',}).then((returnedJSON) => returnedJSON.json()).then(data => {
      for(let i = 0; i < data.length; i++){
        this.searchCards.push(data[i]);
      }
    });
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
    this.returnMans()

    // have this create a new searchCards query for filtering
    this.searchCards = [];
    this.fetchCards();
    this.manCheckedList = [true, true, true, true];
    this.priceLow = 0;
    this.priceHigh = 10000;
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

  showDetails(item : any){

  }

  flipManbool(item : any){
    this.manCheckedList[item] = !this.manCheckedList[item];
  }

  returnMans(){
    this.brandsSelected = "";
    for(let i = 0; i < this.manufacturers.length; i++){
      if(this.manCheckedList[i] == true){
        this.brandsSelected += this.manufacturers[i] + ","
      }
    }
  }

  prodNLA(item : any){
    if(this.searchCards[item].noLongerAvailable == true){
      this.notes = "This item is not longer available form the Manufacturer, once stock is depleted it will be delisted from the website. Manufacturer warranty will still apply."
    }
  }

  async openModal() {
    const detailsModal = await this.modalCtrl.create({
      component: DetailsModalComponent,
    });
    detailsModal.present()

    const { data, role } = await detailsModal.onWillDismiss();
  }
}