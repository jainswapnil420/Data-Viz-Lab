import { AppRountingModule } from './app.routing.module';
import { ChartGenerationService } from './shared/chart.generation.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BarComponent } from './chart/bar/bar.component';
import { LineComponent } from './chart/line/line.component';
import { AreaComponent } from './chart/area/area.component';
import { StackComponent } from './chart/stack/stack.component';
import { PieComponent } from './chart/pie/pie.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './helper/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    BarComponent,
    LineComponent,
    AreaComponent,
    StackComponent,
    PieComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRountingModule
  ],
  providers: [ChartGenerationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
