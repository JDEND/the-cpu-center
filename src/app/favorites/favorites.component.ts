import { NgFor } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonCol, IonItem, IonTextarea, IonButton, IonRow, IonIcon, IonGrid, IonCardContent, IonCard } from '@ionic/angular/standalone';
import { DetailsModalComponent } from '../details-modal/details-modal.component';
import { defineCustomElement } from '@ionic/core/components/ion-modal.js';
import { ModalController } from '@ionic/angular/standalone'
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { trash } from 'ionicons/icons';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  standalone: true,
  imports: [IonCard, IonCardContent, IonGrid, IonIcon, IonRow, IonButton, IonTextarea, IonItem, IonCol, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, NgFor],
})
export class FavoritesComponent  implements OnInit {
  public favorites!: string;
  private activatedRoute = inject(ActivatedRoute);
  constructor(private modalCtrl: ModalController, public router:Router) {defineCustomElement();}

  ngOnInit() {
    addIcons({trash});
    this.favorites = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.favLoad();
  }

  favList : any;

  favLoad(){
    let h = localStorage.getItem('favCards');
    if(h == null){

    }else{
      let j = JSON.parse(h);
      this.favList = j;
      console.log(h)
    }
  }

  DeleteItem(item : any){
    this.favList = this.favList.filter((obj: { ProductID: any; }) => obj.ProductID !== item.ProductID)
    localStorage.setItem('favCards', JSON.stringify(this.favList))
   }

  async openModal(item : any) {
    const detailsModal = await this.modalCtrl.create({
      component: DetailsModalComponent,
      componentProps: {detail: item}
    });
    detailsModal.present()

    const { data, role } = await detailsModal.onWillDismiss();
  }

}
