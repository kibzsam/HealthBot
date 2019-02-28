import { NgModule } from '@angular/core';
import { RouterModule, Routes, } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
    {
        path: '',
        component:TabsPage,
        children: [
            { path: 'schedule', loadChildren: '../schedule/schedule.module#SchedulePageModule' },
            { path: 'profile', loadChildren: '../profile/profile.module#ProfilePageModule' },
            { path: 'chat', loadChildren: '../chat/chat.module#ChatPageModule' }
        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabsRoutingModule { }
