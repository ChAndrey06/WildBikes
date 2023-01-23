import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './details.component';
import { BookingRouteParamEnum } from '@pages/booking/enums';

const routes: Routes = [
    {
        path: `:${BookingRouteParamEnum.BookingUuid}`,
        component: DetailsComponent
    },
    {
        path: '',
        component: DetailsComponent
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
export class DetailsRouting {}
