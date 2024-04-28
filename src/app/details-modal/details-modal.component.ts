import { Component, OnInit, NgModule, Injectable } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { IonHeader, IonInput, IonButtons, IonButton, IonItem, IonContent, IonToolbar, IonTitle, IonModal, ModalController } from "@ionic/angular/standalone";

@Injectable()
@Component({
  selector: 'app-details-modal',
  templateUrl: './details-modal.component.html',
  styleUrls: ['./details-modal.component.scss'],
  standalone: true,
  imports: [IonModal, IonTitle, IonToolbar, IonContent, IonItem, IonButton, IonButtons, IonHeader, IonInput, FormsModule,],
})
export class DetailsModalComponent {
  name!: string;

  constructor(private modalCtrl: ModalController) {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.name, 'confirm');
  }
}
