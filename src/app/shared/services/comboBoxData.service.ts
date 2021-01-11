import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComboBoxDataService {

public comboBoxDataObservable= new BehaviorSubject <any>(null);
private comboBoxData = this.comboBoxDataObservable.asObservable();
constructor(private http:HttpClient) { 
}
getComboBoxData(){
  if(!this.comboBoxDataObservable.value){
  this.http.get(environment.url+'combobox').subscribe(ele=>{
    this.comboBoxDataObservable.next(ele);
  });
  return null;
}

return this.comboBoxDataObservable.value;
}
}
