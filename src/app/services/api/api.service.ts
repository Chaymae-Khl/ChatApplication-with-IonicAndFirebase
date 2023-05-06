import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private firestore:Firestore) { }

docRef(path:any){
  return doc(this.firestore,path);
}
setDocument(path:any,data:any){
  const dataRef=this.docRef(path);
  return setDoc<any>(dataRef,data);
}
getDocById(path:any){
  const dataRef=this.docRef(path);
  return getDoc(dataRef);
}
}
