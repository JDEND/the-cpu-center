import { NgFor } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonGrid, IonRow, IonCard, IonCardContent, IonImg, IonCol, IonButton, IonList } from '@ionic/angular/standalone';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  standalone: true,
  imports: [IonList, IonButton, IonCol, IonImg, IonCardContent, IonCard, IonRow, IonGrid, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, NgFor],
})
export class NewsComponent  implements OnInit {
  public news!: string;
  private activatedRoute = inject(ActivatedRoute);
  constructor() {}

  theNews : any[] = [];
  
  async ngOnInit() {
    this.news = this.activatedRoute.snapshot.paramMap.get('id') as string;
    const todaysTopArticles = await window.fetch('http://localhost:8000/queries/getNews', {method: 'POST',}).then((returnedJSON) => returnedJSON.json()).then(data => { this.theNews = data});
    console.log(this.theNews)
  }
}
