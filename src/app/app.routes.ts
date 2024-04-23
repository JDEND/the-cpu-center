import { Routes } from '@angular/router';
import { FeaturedComponent } from './featured/featured.component';
import { CatalougeComponent } from './catalouge/catalouge.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { CartComponent } from './cart/cart.component';
import { UserComponent } from './user/user.component';
import { NewsComponent } from './news/news.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'featured',
    pathMatch: 'full',
  },
  {
    path: 'folder/:id',
    loadComponent: () =>
      import('./folder/folder.page').then((m) => m.FolderPage),
  },
  {
    path: 'featured',
    component: FeaturedComponent
  },
  {
    path: 'catalouge',
    component: CatalougeComponent
  },
  {
    path: 'favorites',
    component: FavoritesComponent
  },
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'news',
    component: NewsComponent
  },
];
