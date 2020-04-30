import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Action} from 'rxjs/internal/scheduler/Action';

export interface estructura{
  id?:string;
  nombre:string;
  mensaje:string;
  email:string;
};
export interface estructuraRecorrido{
  id?:string;
  actividad:string;
  costo:string;
  detalle:string;
  fecha:string;
  tienpo:string;
};

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private Collection:AngularFirestoreCollection<estructura>;
  private mensajes$:Observable<estructura[]>;

  private CollectionRecorrido:AngularFirestoreCollection<estructuraRecorrido>;
  private recorridos$:Observable<estructuraRecorrido[]>;

  constructor(
    db:AngularFirestore
  ) {  
    this.Collection=db.collection<estructura>('mensajes');
    this.mensajes$=this.Collection.snapshotChanges().pipe(map(
      actions =>{
        return actions.map(action =>{
          const data = action.payload.doc.data();
          const id= action.payload.doc.id;
          return{id,...data};
        });
      }
    ));

    this.CollectionRecorrido=db.collection<estructuraRecorrido>('recorrido');
    this.recorridos$=this.CollectionRecorrido.snapshotChanges().pipe(map(
      actions =>{
        return actions.map(action =>{
          const data = action.payload.doc.data();
          const id= action.payload.doc.id;
          return{id,...data};
        });
      }
    ));
  }//-------------------------------

  
    agregarMensajes(nombre_,mensaje_,email_){//------------------------------
    this.Collection.add({
      nombre:nombre_,
      mensaje:mensaje_,
      email:email_
    });
  }
  verMensajes(){
    return this.mensajes$;
  }
  verMensaje(id:string){
    return this.Collection.doc<estructura>(id).valueChanges();
  }
  updateMensaje(m:estructura, id:string){
    return this.Collection.doc(id).update(m);
  }
  eliminarMensajes(id:string){
    return this.Collection.doc(id).delete();
  }//-------

  agregarRecorridos(actividad_,costo_,detalle_,fecha_,tiempo_){
    this.CollectionRecorrido.add({
      actividad:actividad_,
      costo:costo_,
      detalle:detalle_,
      fecha:fecha_,
      tienpo:tiempo_
    });
  }
  verRecorridos(){
    return this.recorridos$;
  }
  verRecorrido(id:string){
    return this.CollectionRecorrido.doc<estructura>(id).valueChanges();
  }
  updateRecorrido(r:estructuraRecorrido, id:string){
    return this.CollectionRecorrido.doc(id).update(r);
  }
  eliminarRecoridos(id:string){
    return this.CollectionRecorrido.doc(id).delete();
  }
}
