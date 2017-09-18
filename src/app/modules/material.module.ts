
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MdAutocompleteModule,
  MdButtonModule,
  MdCardModule,
  MdIconModule,
  MdSidenavModule,
  MdToolbarModule,
  MdTooltipModule,
  MdSlideToggleModule,
  MdInputModule,
  MdSnackBarModule,
  MdGridListModule,
  MdMenuModule,
  MdSelectModule,
  MdChipsModule,
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MdAutocompleteModule,
    MdButtonModule,
    MdCardModule,
    MdIconModule,
    MdSlideToggleModule,
    MdTooltipModule,
    MdToolbarModule,
    MdSidenavModule,
    MdInputModule,
    MdSnackBarModule,
    MdGridListModule,
    MdMenuModule,
    MdSelectModule,
    MdChipsModule,
  ],
  declarations: [],
  exports: [
    MdAutocompleteModule,
    MdButtonModule,
    MdCardModule,
    MdIconModule,
    MdSlideToggleModule,
    MdTooltipModule,
    MdToolbarModule,
    MdSidenavModule,
    MdInputModule,
    MdSnackBarModule,
    MdGridListModule,
    MdMenuModule,
    MdSelectModule,
    MdChipsModule
  ]
})
export class AppMaterialModule { }
