// ng build --base-href '/coverage/' --configuration production --aot

import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeRu from '@angular/common/locales/ru';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import {ContextMenuModule} from 'primeng/contextmenu';
import { CookieModule, CookieService } from 'ngx-cookie';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {TreeModule} from 'primeng/tree';
import {SplitterModule} from 'primeng/splitter';
import {TabViewModule} from 'primeng/tabview';
import {InputTextModule} from 'primeng/inputtext';
import {EditorModule} from 'primeng/editor';
import { QuillModule } from 'ngx-quill';
import {AccordionModule} from 'primeng/accordion';
import {CheckboxModule} from 'primeng/checkbox';
import { LeftToolbarComponent } from './toolbar/lefttoolbar.component';
import { NgChartsModule } from 'ng2-charts';
import {ListboxModule} from 'primeng/listbox';
import {CardModule} from 'primeng/card';
import { MessagesModule } from 'primeng/messages';
import {MenuModule} from 'primeng/menu'; 
import {MenuItem} from 'primeng/api';
import { MainComponent } from './main/main.component';





const appRoutes: Routes = [
  {
    path: '',
    component: MainComponent
  },
];

registerLocaleData(localeRu);

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LeftToolbarComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes, {
      enableTracing: false
    }),
    CookieModule.forRoot(),
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserModule,
    DialogModule,
    ButtonModule,
    TableModule,
    DropdownModule,
    TreeModule,
    SplitterModule,
    TabViewModule,
    InputTextModule,
    EditorModule,
    AccordionModule,
		ContextMenuModule,
    CheckboxModule,
    MessagesModule,
    MenuModule,
    
    QuillModule.forRoot({
      customOptions: [{
        import: 'formats/font',
        whitelist: ['mirza', 'roboto', 'aref', 'serif', 'sansserif', 'monospace']
      }]
    }),
    NgChartsModule,
    ListboxModule,
    CardModule
  ],
  exports: [],
  providers: [
    CookieService,
    { provide: LOCALE_ID, useValue: "ru" },
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor() {
  }
}
