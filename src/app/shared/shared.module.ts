import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { BreadcrumsComponent } from './breadcrums/breadcrums.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { PipesModule } from '../pipes/pipes.module';


@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        PipesModule
    ],
    declarations: [
        BreadcrumsComponent,
        HeaderComponent,
        NopagefoundComponent,
        SidebarComponent,
    ],
    exports: [
        BreadcrumsComponent,
        HeaderComponent,
        NopagefoundComponent,
        SidebarComponent,
    ]
})
export class SharedModule { }
