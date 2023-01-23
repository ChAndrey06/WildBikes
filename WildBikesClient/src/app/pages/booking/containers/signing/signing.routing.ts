import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigningComponent } from './signing.component';
import { BookingRouteParamEnum } from '@pages/booking/enums';

const routes: Routes = [
    {
        path: `:${BookingRouteParamEnum.BookingUuid}`,
        component: SigningComponent
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
export class SigningRouting {}
