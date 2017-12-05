import { BrowserModule } from '@angular/platform-browser';
import { NgModule  } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { NavigationComponent } from './components/navigation/navigation.component';

import { EFooterComponent } from './components/e-footer/e-footer.component';

import { NgZorroAntdModule } from 'ng-zorro-antd';


@NgModule({
  declarations: [
    NavigationComponent,
    EFooterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgZorroAntdModule,
  ],
  exports: [
    NavigationComponent,
    EFooterComponent
  ]
})

export class SharedModule { }
