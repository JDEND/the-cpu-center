import { Component, inject, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonGrid, IonCol, IonRow, IonImg, IonItem, IonCard } from '@ionic/angular/standalone';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {IonicSlides} from '@ionic/angular'
import { ModalController } from '@ionic/angular'
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss'],
  standalone: true,
  imports: [IonCard, IonItem, IonImg, IonRow, IonCol, IonGrid, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, NgFor],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FeaturedComponent  implements OnInit {
  public featured!: string;
  private activatedRoute = inject(ActivatedRoute);
  swiperModules = [IonicSlides]
  constructor() {}

  fastCards : any[] = [];
  lowCards : any[] = [];
  newCards : any[] = [];
  saleCards : any[] = [];
  lastCards : any[] = [];


  async ngOnInit() {
    this.featured = this.activatedRoute.snapshot.paramMap.get('id') as string;
    const fastSell = await window.fetch('http://localhost:8000/queries/fastSellers', {method: 'POST',}).then((returnedJSON) => returnedJSON.json()).then(data => { this.fastCards = data});
    const lowStock = await window.fetch('http://localhost:8000/queries/lowStock', {method: 'POST',}).then((returnedJSON) => returnedJSON.json()).then(data => { this.lowCards = data});
    const newProd = await window.fetch('http://localhost:8000/queries/newArrival', {method: 'POST',}).then((returnedJSON) => returnedJSON.json()).then(data => { this.newCards = data});
    const sale = await window.fetch('http://localhost:8000/queries/sale', {method: 'POST',}).then((returnedJSON) => returnedJSON.json()).then(data => { this.saleCards = data});
    const lastChance = await window.fetch('http://localhost:8000/queries/lastChance', {method: 'POST',}).then((returnedJSON) => returnedJSON.json()).then(data => { this.lastCards = data});
  }

  showDetails(item : any){
    
  }

}
