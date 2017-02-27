import { HelpComponent } from './app/help/help.component';
import { HomeMainComponent } from './app/home/home.main.component';
import { NotauthComponent } from './app/notauth/notauth.component';
import { NotfoundComponent } from './app/notfound/notfound.component';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/'},
    { component: HomeMainComponent,  path: 'home'},
    { component: HelpComponent, path: 'help' },
    { component: NotfoundComponent, path: '404' },
    { component: NotauthComponent, path: '500' },
];

export const Routing: any = RouterModule.forRoot(appRoutes);
