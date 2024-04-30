import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonGrid, IonImg, IonRow, IonLabel, IonCol, IonButton, IonText, IonTextarea } from '@ionic/angular/standalone';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  standalone: true,
  imports: [IonTextarea, IonText, IonButton, IonCol, IonLabel, IonRow, IonImg, IonGrid, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent],
})
export class UserComponent  implements OnInit {
  public user!: string;
  private activatedRoute = inject(ActivatedRoute);
  constructor() {}

  userLoggedIn : boolean = false;

  ngOnInit() {
    this.user = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.currentUser()
  }

  currentUser(){
    let user = localStorage.getItem('currentUser');
    if(this.currentUser === null){
      
    }else{

    }
  }

  userLogin(){
    this.userLoggedIn = true;
  }

  userLogout(){
    this.userLoggedIn = false;
  }

}
