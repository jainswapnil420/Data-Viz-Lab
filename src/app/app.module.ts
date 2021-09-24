import { AppRountingModule } from './app.routing.module';
import { ChartGenerationService } from './shared/service/chart.generation.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BarComponent } from './chart/bar/bar.component';
import { LineComponent } from './chart/line/line.component';
import { AreaComponent } from './chart/area/area.component';
import { StackComponent } from './chart/stack/stack.component';
import { PieComponent } from './chart/pie/pie.component';
import { HomeComponent } from './helper/home/home.component';
import { HeaderComponent } from './helper/header/header.component';
import { HorizontalBarComponent } from './chart/horizontal-bar/horizontal-bar.component';
import { DonutComponent } from './chart/donut/donut.component';
import { GroupBarComponent } from './chart/group-bar/group-bar.component';
import { ScatterPlotComponent } from './chart/scatter-plot/scatter-plot.component';
import { BubbleComponent } from './chart/bubble/bubble.component';
import { ScatterWithShapesComponent } from './chart/scatter-with-shapes/scatter-with-shapes.component';
import { AboutComponent } from './helper/about/about.component';
import { LegendComponent } from './shared/component/legend/legend.component';
import { ContactComponent } from './helper/contact/contact.component';
import { SidemenuComponent } from './helper/sidemenu/sidemenu.component';
import { ForceLayoutComponent } from './chart/force-layout/force-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    BarComponent,
    LineComponent,
    AreaComponent,
    StackComponent,
    PieComponent,
    HomeComponent,
    HeaderComponent,
    HorizontalBarComponent,
    DonutComponent,
    GroupBarComponent,
    ScatterPlotComponent,
    BubbleComponent,
    ScatterWithShapesComponent,
    AboutComponent,
    LegendComponent,
    ContactComponent,
    SidemenuComponent,
    ForceLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRountingModule,
    FormsModule
  ],
  providers: [ChartGenerationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
