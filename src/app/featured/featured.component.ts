import { Component, inject, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonGrid, IonCol, IonRow, IonImg, IonItem, IonCard } from '@ionic/angular/standalone';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {IonicSlides} from '@ionic/angular'
import { ModalController } from '@ionic/angular'

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss'],
  standalone: true,
  imports: [IonCard, IonItem, IonImg, IonRow, IonCol, IonGrid, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent,],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FeaturedComponent  implements OnInit {
  public featured!: string;
  bestSellers: Array<string> = ['Dog', 'Cat', 'cow', 'pig'];
  private activatedRoute = inject(ActivatedRoute);
  swiperModules = [IonicSlides]
  constructor() {}

  ngOnInit() {
    this.featured = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

}
