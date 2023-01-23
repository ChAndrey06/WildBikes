import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { BookingDetailsFormComponent } from './components';

@NgModule({
    declarations: [
        BookingDetailsFormComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        BookingDetailsFormComponent
    ]
})
export class BookingModule {}
