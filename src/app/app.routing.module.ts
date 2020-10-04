import { ScatterWithShapesComponent } from './chart/scatter-with-shapes/scatter-with-shapes.component';
import { BubbleComponent } from './chart/bubble/bubble.component';
import { GroupBarComponent } from './chart/group-bar/group-bar.component';
import { HorizontalBarComponent } from './chart/horizontal-bar/horizontal-bar.component';
import { ScatterPlotComponent } from './chart/scatter-plot/scatter-plot.component';
import { DonutComponent } from './chart/donut/donut.component';
import { PieComponent } from './chart/pie/pie.component';
import { StackComponent } from './chart/stack/stack.component';
import { AreaComponent } from './chart/area/area.component';
import { LineComponent } from './chart/line/line.component';
import { HomeComponent } from './helper/home/home.component';
import { BarComponent } from './chart/bar/bar.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'bar', component: BarComponent},
    {path: 'line', component: LineComponent},
    {path: 'area', component: AreaComponent},
    {path: 'stack', component: StackComponent},
    {path: 'pie', component: PieComponent},
    {path: 'donut', component: DonutComponent},
    {path: 'scatter', component: ScatterPlotComponent},
    {path: 'horizontal-bar', component: HorizontalBarComponent},
    {path: 'grouped-bar', component: GroupBarComponent},
    {path: 'bubble', component: BubbleComponent},
    {path: 'scatter-shape', component: ScatterWithShapesComponent}
];
@NgModule({
    imports : [RouterModule.forRoot(appRoutes)],
    exports : [RouterModule]
})
export class AppRountingModule{

}
