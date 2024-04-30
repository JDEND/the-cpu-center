import { Component, OnInit, NgModule, Injectable } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { IonHeader, IonInput, IonButtons, IonButton, IonItem, IonContent, IonToolbar, IonTitle, IonModal, ModalController, IonRow, IonGrid, IonCol, IonText, IonTextarea, IonIcon } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { star, starOutline } from 'ionicons/icons';


@Injectable()
@Component({
  selector: 'app-details-modal',
  templateUrl: './details-modal.component.html',
  styleUrls: ['./details-modal.component.scss'],
  standalone: true,
  imports: [IonIcon, IonTextarea, IonText, IonCol, IonGrid, IonRow, IonModal, IonTitle, IonToolbar, IonContent, IonItem, IonButton, IonButtons, IonHeader, IonInput, FormsModule,],
})
export class DetailsModalComponent {
  name!: string;

  detail : any;
  hide : boolean = false;
  itemQuantity : number = 0;

  constructor(private modalCtrl: ModalController) {
  }
  
  async ngOnInit() {
    addIcons({star, starOutline})
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.name, 'confirm');
  }

  addQuant(){
    if (this.itemQuantity < this.detail.AvailableStock){
      this.itemQuantity++;}
  }

  subQuant(){
    if(this.itemQuantity > 0){
      this.itemQuantity--
    }
  }

  temp : any;
  currentCart : any;
  addCart(){
    let h = sessionStorage.getItem('currentCart');
    sessionStorage.removeItem('currentCart');
    if(h == null){
      this.temp = this.detail;
      this.temp['PurchaseQuantity'] = this.itemQuantity
      let j = [this.temp]
      sessionStorage.setItem('currentCart', JSON.stringify(j))
    }else{
      let i = JSON.parse(h)
      this.temp = this.detail;
      this.temp['PurchaseQuantity'] = this.itemQuantity
      i.push(this.temp)
      sessionStorage.setItem('currentCart', JSON.stringify(i))
    }
    this.modalCtrl.dismiss();
  }

  addFav(){
    let h = localStorage.getItem('favCards');
    localStorage.removeItem('favCards');
    if(h == null){
      localStorage.setItem('favCards', JSON.stringify(this.detail))
    }else{
      let i = JSON.parse(h)
      if(this.detail['ProductID'] in i){}
      else{
        i.push(this.detail)
        localStorage.setItem('favCards', JSON.stringify(i))}
    }
  }
}
