import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BroadPage } from './broad';

@NgModule({
  declarations: [
    BroadPage,
  ],
  imports: [
    IonicPageModule.forChild(BroadPage),
  ],
})
export class BroadPageModule {}
