import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import {
  SettingsService,
  SidebarService,
  SharedService,
  UsuarioService,
  LoginGuardGuard,
  SubirArchivoService,
  HospitalService,
  MedicoService,
  AdminGuard
} from './service.index';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';

@NgModule({
  declarations: [],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    LoginGuardGuard,
    SubirArchivoService,
    ModalUploadComponent,
    HospitalService,
    MedicoService,
    AdminGuard,
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class ServiceModule { }
