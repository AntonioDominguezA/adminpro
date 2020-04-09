import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import Swal from 'sweetalert2';
import { Hospital } from '../../models/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  totalHospitales: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarHospitales() {

    let url = URL_SERVICIOS + '/hospital';

    return this.http.get(url)
              .pipe(
                map( (res: any) => {

                  this.totalHospitales = res.total;
                  return res.hospitales;
                })
              )
  }

  obtenerHospital( id: string) {

    let url = URL_SERVICIOS + '/hospital/' + id;

    return this.http.get( url )
                .pipe(
                  map( (res: any) => res.hospital)
                );
  }

  borrarHospital( id: string ) {

    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete(url)
                .pipe(
                  map( res => Swal.fire({
                    title: 'Hospital borrado',
                    text: 'Eliminado correctamente',
                    icon: 'success'
                  }))
                )

  }

  crearHospital(nombre: string) {

    let url = URL_SERVICIOS + '/hospital/';
    url += '?token=' + this._usuarioService.token;

    return this.http.post(url, { nombre })
                .pipe(
                  map( (res: any) =>{
                    return res.hospital;
                  })
                );

  }

  buscarHospital( termino: string) {

    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;

    return this.http.get(url)
                .pipe(
                  map( (res: any) => res.hospitales)
                );
  }

  actualizarHospitales( hospital: Hospital) {

    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put(url, hospital)
                .pipe(
                  map( (res: any) => {

                    Swal.fire({
                      title: 'Hospital actualizado',
                      text: hospital.nombre,
                      icon: 'success'
                    });

                    return res.hospital;
                  })
                );

  }
}
