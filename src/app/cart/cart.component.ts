import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonList, IonRow, IonCol, IonCard, IonCardContent, IonButton, IonGrid, IonItem, IonTextarea, IonIcon } from '@ionic/angular/standalone';
import { NgFor, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { trash } from 'ionicons/icons';
import { DetailsModalComponent } from '../details-modal/details-modal.component';
import { defineCustomElement } from '@ionic/core/components/ion-modal.js';
import { ModalController } from '@ionic/angular/standalone'
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  standalone: true,
  imports: [IonIcon, FormsModule, IonTextarea, IonItem, NgFor, NgForOf, IonGrid, IonButton, IonCardContent, IonCard, IonCol, IonRow, IonList, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent],
})
export class CartComponent  implements OnInit {
  public cart!: string;
  private activatedRoute = inject(ActivatedRoute);
  
  constructor(private modalCtrl: ModalController, public router:Router) {
    defineCustomElement();
  }

  currentCart : any;
  subTotal : string = '0.0';
  Tax : string = '0.0';
  Total : string = '0.0';
  item : any;

  ngOnInit() {
    this.cart = this.activatedRoute.snapshot.paramMap.get('id') as string;
    addIcons({trash});
    let h = sessionStorage.getItem('currentCart');
    if(h == null){

    }else{
      console.log(h)
      this.currentCart = JSON.parse(h)
      console.log(this.currentCart)
    }
    this.loadPrices();
  }

  loadCart(){
    let h = sessionStorage.getItem('currentCart');
    if(h == null){

    }else{
      console.log(h)
      this.currentCart = JSON.parse(h)
      console.log(this.currentCart)
    }
  }

  loadPrices(){
      let money = 0;
      for(let i = 0; i < this.currentCart.length; i++){
        money += (this.currentCart[i].ListPrice 
                  * 
                  this.currentCart[i].PurchaseQuantity)
                  *
                  (1 - this.currentCart[i].Discount);
      }
      this.subTotal = money.toFixed(2);
      this.Tax = (money * .06).toFixed(2)
      this.Total = (money * 1.06).toFixed(2)
  }

  DeleteItem(item : any){
   this.currentCart = this.currentCart.filter((obj: { ProductID: any; }) => obj.ProductID !== item.ProductID)
   sessionStorage.setItem('currentCart', JSON.stringify(this.currentCart))
   this.loadPrices()
  }

  async openModal(item : any) {
    const detailsModal = await this.modalCtrl.create({
      component: DetailsModalComponent,
      componentProps: {detail: item , hide: true}
    });
    detailsModal.present()

    const { data, role } = await detailsModal.onWillDismiss();
  }
}
