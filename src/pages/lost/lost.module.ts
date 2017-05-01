import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LostPage } from './lost';

@NgModule({
  declarations: [
    LostPage,
  ],
  imports: [
    IonicPageModule.forChild(LostPage),
  ],
  exports: [
    LostPage
  ]
})
export class LostModule {}
