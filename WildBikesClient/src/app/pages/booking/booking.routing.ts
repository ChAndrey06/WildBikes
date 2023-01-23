import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingRoutingEnum } from './enums';

const routes: Routes = [
    {
        path: BookingRoutingEnum.Signing,
        loadChildren: () => import('./containers/signing').then((m) => m.SigningModule)
    },
    {
        path: BookingRoutingEnum.Details,
        loadChildren: () => import('./containers/details').then((m) => m.DetailsModule)
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class BookingRouting {}