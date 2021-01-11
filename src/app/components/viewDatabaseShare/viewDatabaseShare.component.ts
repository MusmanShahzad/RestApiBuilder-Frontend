import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from 'src/app/shared/services/auth/login.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { v4 as uuidv4 } from 'uuid';
import { ComboBoxDataService } from 'src/app/shared/services/comboBoxData.service';

export interface ColumnInterface{
    id?: string;
    name?: string;
    type: number;
    key : number;
    length: number;
    default: number;
    null: boolean;

}
export interface TableInterface{
    id?: string,
    name?: string,
    columns?: [ColumnInterface]
}

@Component({
  selector: 'app-viewDatabaseShare',
  templateUrl: './viewDatabaseShare.component.html',
  styleUrls: ['./viewDatabaseShare.component.css']
})
export class ViewDatabaseShareComponent implements OnInit {
@Input() database;
url;
isLoading = false;
combobox;
message;
fileUploading=false;
  constructor(private loginService: LoginService,private http: HttpClient, private toastr: ToastrService,
    private ComboBoxData :ComboBoxDataService) {
    this.url = environment.url;
   }

  ngOnInit() {
    if(this.ComboBoxData.comboBoxDataObservable.value){
      this.combobox=this.ComboBoxData.comboBoxDataObservable.value;
    }
    else{
      this.ComboBoxData.getComboBoxData();
      this.ComboBoxData.comboBoxDataObservable.subscribe(data =>{
        this.combobox = data;
      })
    }
  }
  fileChange(e){
    this.fileUploading=true;
    this.message="File Uploading...";
    var fr=new FileReader(); 
    fr.onload=()=>{
      this.message="Converting...";
        this.submit(fr.result);
        

    }
    fr.readAsText(e.target.files[0]); 
  }
  deleteProject(id){
    this.isLoading = true;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: {id}
    }
    this.http.delete(`${this.url}project`,options).subscribe(ele=>{
      this.isLoading = false;
      if(ele['error']){
        this.toastr.error(ele['message'],ele['title']);
        return;
      }
      this.loginService.setUser(ele['user']);
    })
   }
    submit(textData){
    const data=textData;
    const tables:TableInterface[]=[];
    const queries=(
        data.match
        (/(CREATE TABLE)\s*(`?[a-zA-Z_\-\.\d]*`?)(\s*\(\s*)((`?[a-zA-Z_\-\.\d]*`?) (\s*)([a-zA-Z]*\(\d*\))?[a-zA-Z\s]*,?\s*)*\)([a-zA-Z\d\s]*\=[a-zA-Z\d\s]*)*;/gmi)
        );
        for(let query of queries){
            let table:TableInterface={
              id:uuidv4()
            };
            query=query.replace(/(\r\n|\n|\r)/gm, '');
        //    Table Names
          table.name=(query.match(/([^CREATE TABLE])\s*([^`]?[a-zA-Z_\-\.\d]*[^`]?)/mi)[2]);
          const regexAdd=new RegExp(`Alter Table\\s*\`${table.name}\`\\s* Add\\s* .*;`,'ig')
            const alterMatch = data.match(regexAdd);
           const regexModify= new RegExp(`Alter Table\\s*\`${table.name}\`\\s*modify\\s*.*;`,'ig')
           const modifyMatch = data.match(regexModify);
        // Get Columns Data
        // tslint:disable-next-line: max-line-length
        const columns=(query.match(/(\(\s*)((`?[a-zA-Z_\-\.\d]*`?) (\s*)([a-zA-Z]*\(\d*\))?[a-zA-Z\s]*,?\s*)*\)/mi)[0].replace('(','').match(/(\s*(`?[a-zA-Z_\-\.\d]*`?) (\s*)([a-zA-Z]*\(\d*\))?[a-zA-Z\s]*[,\)])/mig));
        // columns
        for(const column of columns){
            const name = column.match(/`[a-zA-Z_\-\.\d]*`/mi)[0].replace(/`/g,'');
            if(!table.columns){
              table.columns=[{...this.getColumn(column),name}];
            }
            else{
          table.columns.push({...this.getColumn(column),name});
            }
          if(alterMatch)
           alterMatch.forEach(element => {
               const regex = new RegExp(`\\b${name}\\b`,'mi');
                    const matchTemp=element.match(regex);
                    if(matchTemp!=null&&matchTemp.length>0&&matchTemp[0]!==''){
                        const key = (this.checkKey(element));
                        table.columns[table.columns.length-1].key=key===0?table.columns[table.columns.length-1].key:key;
                    }
           });
           if(modifyMatch)
           modifyMatch.forEach(element => {
               element=element.replace(/(\r\n|\n|\r)/gm, '');
               const regex = new RegExp(`\\b${name}\\b`,'mi');
                    const matchTemp=element.match(regex);
                    if(matchTemp!=null&&matchTemp.length>0&&matchTemp[0]!==''){
                       // console.log(match);
                        const modifyColumnData=this.getColumn(element);
                        console.log(modifyColumnData,table.columns.length-1);
                        if(modifyColumnData.default)
                        table.columns[table.columns.length-1].default=modifyColumnData.default;
                        if(modifyColumnData.key)
                        table.columns[table.columns.length-1].key=modifyColumnData.key;
                        if(modifyColumnData.length)
                        table.columns[table.columns.length-1].length=modifyColumnData.length;
                        if(modifyColumnData.type)
                        table.columns[table.columns.length-1].type=modifyColumnData.type;
                    }
           });
        }
        tables.push(table);
        }
        this.database.tables=(tables);
        this.message='Saving...';
        this.http.put(this.url+'project',{...this.database}).subscribe(ele=>{
          if(ele['error']){
            this.toastr.error(ele['message'],ele['title']);
          }
          this.loginService.setUser(ele['user']);
          this.toastr.success('Database saved SuccessFully','success');
          this.fileUploading=false;
          this.message=undefined;
        })
}
 extractTypeLength(column){
    let type = 0;
            let length = 0;
            for(let i=0;i<this.combobox.type.length;i++){
                const regex = new RegExp(`\\b${this.combobox.type[i]}\\b`,'mi');
                    const match=column.match(regex);
                    if(match!=null&&match.length>0&&match[0]!==''){
                        type=i;
                        const lengthMatch=column.match(/(\(\d*\))/);
                        if(lengthMatch&&lengthMatch.length>0&&lengthMatch[0]!==''){
                           // tslint:disable-next-line: radix
                           length= parseInt(lengthMatch[0].replace(/\(/g,'').replace(/\)/g,'').replace(/\s/g,''));
                        }
                    }
            }

            return {
                type,
                length
            }
}
 checkKey(column){
    let key=0;
    for(let i=0;i<this.combobox.keys.length;i++){
                let regex = new RegExp(`\\b${this.combobox.keys[i]}\\b`,'mi');
                    const match=column.match(regex);
                    if(match!=null&&match.length>0&&match[0]!==''){
                        key=i;
                    }
            }
            return key;
}
 checkNull(column){
    const match=column.match(/not null/ig);
    if(match!=null&&match.length>0&&match[0]!==''){
                        return false;
                    }
                    return true;
}
 checkDefault(column){
    let key=0;
    for(let i=0;i<this.combobox.defaults.length;i++){
                const regex = new RegExp(`\\b${this.combobox.defaults[i]}\\b`,'mi');
                const match=column.match(regex);
                    if(match!=null&&match.length>0&&match[0]!==''){
                        key=i;
                    }
            }
            return key;
}
 getColumn(column):ColumnInterface{
   const typeLength=this.extractTypeLength(column);
return   {
  id:uuidv4(),
  name:'',
               type:typeLength.type,
               length:typeLength.length,
               key:this.checkKey(column),
               null:this.checkNull(column),
               default:this.checkDefault(column)
           }
}
extractAlterAdd(alterAdd){

}
}
