import {
    Routes,
    CanActivate,
    RouterModule,
    PreloadAllModules,
} from '@angular/router';
import { NgModule } from '@angular/core';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
    {
        path: '',
        component: IndexComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HomeRoutingModule {}
