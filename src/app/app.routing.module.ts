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
    {path: 'pie', component: PieComponent}
];
@NgModule({
    imports : [RouterModule.forRoot(appRoutes)],
    exports : [RouterModule]
})
export class AppRountingModule{

}
