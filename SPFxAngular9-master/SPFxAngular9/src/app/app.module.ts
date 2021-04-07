import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { SpFxAngular9WebPartComponent } from './sp-fx-angular9-web-part/sp-fx-angular9-web-part.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    SpFxAngular9WebPartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  entryComponents: [SpFxAngular9WebPartComponent]
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const el = createCustomElement(SpFxAngular9WebPartComponent, { injector: this.injector });
    customElements.define('app-sp-fx-angular9-web-part', el);
  }
}
