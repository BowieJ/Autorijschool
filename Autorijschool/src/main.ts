import {bootstrapApplication} from '@angular/platform-browser';
import {appConfig} from './app/app.config';
import {AppComponent} from './app/app.component';
import {provideRouter, Routes} from "@angular/router";
import {HomeComponent} from "./app/home/home.component";
import {VoertuigenComponent} from "./app/voertuigen/voertuigen.component";
import {NotfoundComponent} from "./app/notfound/notfound.component";
import {InformatieComponent} from "./app/informatie/informatie.component";

bootstrapApplication(AppComponent, appConfig)
    .catch((err) => console.error(err));

const routes: Routes = [
    {
        path: '',
        title: 'Vierkante Wielen - Home',
        component: HomeComponent
    },
    {
        path: 'home',
        title: 'Vierkante Wielen - Home',
        component: HomeComponent
    },
    {
        path: 'voertuigen',
        title: 'Vierkante Wielen - Voertuigen',
        component: VoertuigenComponent
    },
    {
      path: 'informatie',
      title: 'Vierkante Wielen - Informatie',
      component: InformatieComponent },
    {
        path: '**',
        title: 'Vierkante Wielen - Not Found',
        component: NotfoundComponent
    },
];

bootstrapApplication(AppComponent, {
    providers: [provideRouter(routes)],
});
