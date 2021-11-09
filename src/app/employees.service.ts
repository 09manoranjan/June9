import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private http:HttpClient) { }
  getEmployeesList(){
    return this.http.get("http://localhost:3000/employees")
  }
  addNewEmployees(data){
    return this.http.post("http://localhost:3000/employees",data)
  }
  deleteEmployees(id){
    return this.http.delete("http://localhost:3000/employees/"+id)
  }
  updateEmployees(data,id){
    return this.http.put("http://localhost:3000/employees/"+id,data)
  }
}
