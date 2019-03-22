import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorHandler } from './services/errorHandlerService';
import { ScatterplotComponent } from './scatterplot/scatterplot.component';
import { ScatterplotGenChartComponent } from './scatterplot-gen-chart/scatterplot-gen-chart.component';


@NgModule({
  declarations: [
    AppComponent,
    ScatterplotComponent,
    ScatterplotGenChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [ErrorHandler],
  bootstrap: [AppComponent]
})
export class AppModule { }
