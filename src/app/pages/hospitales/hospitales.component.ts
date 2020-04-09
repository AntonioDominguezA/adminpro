import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/service.index';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];

  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit(): void {
    this.cargarHospitales();

    this._modalUploadService.notificacion.subscribe(() => this.cargarHospitales());
  }

  cargarHospitales() {
    this._hospitalService.cargarHospitales()
          .subscribe( hospitales => {

            this.hospitales = hospitales;
          });
  }

  buscarHospital( termino: string ) {

    if( termino.length <= 0) {
      this.cargarHospitales();
      return;
    }

    this._hospitalService.buscarHospital( termino )
            .subscribe( (hospitales: any) => this.hospitales = hospitales );
  }

  guardarHospital( hospital: Hospital ) {

    this._hospitalService.actualizarHospitales( hospital )
            .subscribe();
  }

  borrarHospital( hospital: Hospital ) {

    this._hospitalService.borrarHospital( hospital._id )
            .subscribe( () => this.cargarHospitales() );
  }

  async crearHospital() {

    let inputValue;

    const { value: valor } = await Swal.fire({
      title: 'Crear hospital',
      text: 'Ingrese el nombre',
      input: 'text',
      inputValue: inputValue,
      icon: 'info',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write something!'
        }
      }
    });

    if (valor) {
      this._hospitalService.crearHospital( valor)
          .subscribe(() => this.cargarHospitales());
    }

  }

  actualizarImagen(hospital: Hospital) {

    this._modalUploadService.mostrarModal('hospitales', hospital._id);

  }
}
