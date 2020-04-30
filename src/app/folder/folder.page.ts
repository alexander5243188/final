import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {FirebaseService,estructura,estructuraRecorrido} from '../services/firebase.service';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;


  public mensajes: estructura[];
  public nombre:string;
  public mensaje:string;
  public email:string;

  public recorridos: estructuraRecorrido[];
  public actividad:string;
  public costo:string;
  public detalle:string;
  public fecha:string;
  public tienpo:string;
  

  constructor(
    private activatedRoute: ActivatedRoute,    
    private ruta:ActivatedRoute,
    private firebase:FirebaseService,
    public alertCtrl: AlertController
    ) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');

    
    this.firebase.verMensajes().subscribe(res=>{
      console.log('mensajes',res);
      this.mensajes=res; 
    });

    this.firebase.verRecorridos().subscribe(res=>{
      console.log('recorridos',res);
      this.recorridos=res; 
    });
  }
  agregar_mensaje(nombre_, mensaje_,email_){ //----------------------
    console.log(nombre_,mensaje_,email_) ;
    this.firebase.agregarMensajes(nombre_, mensaje_,email_);
    console.log("Mensaje enviado");
  }
  agregar_Mensaje(){
    this.firebase.agregarMensajes(this.nombre, this.mensaje, this.email);
    console.log("Mensaje enviado");
  }
  
  eliminar(id){
    this.firebase.eliminarMensajes(id).then(res=>{
      console.log("Eliminado");
    });
  }//-------------------------------

  agregar_recorrido(actividad_, costo_,detalle_,fecha_,tiempo_){
    console.log(actividad_) ;
    this.firebase.agregarRecorridos(actividad_, costo_,detalle_,fecha_,tiempo_);
    console.log("enviado");
  }
  agregar_Recorrido(){
    this.firebase.agregarRecorridos(this.actividad, this.costo, this.detalle, this.fecha, this.tienpo);
    console.log("enviado");
  }
  
  eliminarRecorrido(id){
    this.firebase.eliminarMensajes(id).then(res=>{
      console.log("Eliminado");
    });
  }







  async alertaMensaje(){
    const alert= await this.alertCtrl.create({
      header: "Mensaje",
      message: "enviado",
      buttons: [
        {
          text: 'OK',
          handler: () => { console.log('Mensaje Enviado'); }
        }
        ]
    })
    alert.present();
  };

  async alertaRecorrido(detalle){
    const alert= await this.alertCtrl.create({
      header: "Detalle",
      message: detalle,
      buttons: [
        {
          text: 'OK',
          handler: () => { console.log('Recorrido'); }
        }
        ]
    })
    alert.present();
  };


}
