import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog/dialog.component';
import { DialogBodyComponent } from './dialog-body/dialog-body.component';
import { DialogFooterComponent } from './dialog-footer/dialog-footer.component';
import { DialogHeaderComponent } from './dialog-header/dialog-header.component';
import { DialogModalComponent } from './dialog-modal/dialog-modal.component';

@NgModule({
  declarations: [
    DialogComponent,
    DialogBodyComponent,
    DialogFooterComponent,
    DialogHeaderComponent,
    DialogModalComponent,
  ],
  imports: [CommonModule],
})
export class DialogsModule {}
