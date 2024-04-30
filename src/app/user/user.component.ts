import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonGrid, IonImg, IonRow, IonLabel, IonCol, IonButton, IonText, IonTextarea, IonCard, IonCardContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  standalone: true,
  imports: [IonCardContent, IonCard, IonTextarea, IonText, IonButton, IonCol, IonLabel, IonRow, IonImg, IonGrid, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent],
})
export class UserComponent  implements OnInit {
  public user!: string;
  private activatedRoute = inject(ActivatedRoute);
  constructor() {}

  userLoggedIn : boolean = false;
  orders: any = [];

  async ngOnInit() {
    this.user = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.currentUser()
    await sessionStorage.setItem('CurrentUser', '10000')
    await this.getOrders();
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

  getOrders(){
    const response = window.fetch('http://localhost:8000/queries/getUserOrders/' + sessionStorage.getItem('CurrentUser'), {method: 'POST',}).then((returnedJSON) => returnedJSON.json()).then(data => {
     this.orders = data
      console.log(this.orders)
    });
  }

}
