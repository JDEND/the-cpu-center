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

  constructor(private modalCtrl: ModalController) {}
  
  async ngOnInit() {
    addIcons({star, starOutline})
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.name, 'confirm');
  }

}
