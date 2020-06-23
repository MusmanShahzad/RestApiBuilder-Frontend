import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComboBoxDataService {
readonly ROOT_URL='http://localhost:8080';
public comboBoxDataObservable= new BehaviorSubject <any>(null);
private comboBoxData = this.comboBoxDataObservable.asObservable();
constructor(private http:HttpClient) { 
}
getComboBoxData(){
  if(!this.comboBoxDataObservable.value){
  this.http.get(this.ROOT_URL+'/combobox').subscribe(ele=>{
    this.comboBoxDataObservable.next(ele);
  });
  return null;
}

return this.comboBoxDataObservable.value;
}
}
