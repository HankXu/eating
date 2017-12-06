import { NgModule  } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CommonModule } from '@angular/common'

import { NavigationComponent } from './components/navigation/navigation.component';

import { EFooterComponent } from './components/e-footer/e-footer.component';

import { NgZorroAntdModule } from 'ng-zorro-antd';


@NgModule({
  declarations: [
    NavigationComponent,
    EFooterComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    NgZorroAntdModule,
  ],
  exports: [
    NavigationComponent,
    EFooterComponent
  ]
})

export class SharedModule { }
