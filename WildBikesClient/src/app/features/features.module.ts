import { NgModule } from '@angular/core';
import { BookingModule } from './booking';
import { UserModule } from './user';

@NgModule({
    exports: [
        BookingModule
    ]
})
export class FeaturesModule {}
