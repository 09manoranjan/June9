import { Component, OnInit } from '@angular/core';
import { EmployeesService } from '../employees.service';
import Swal from 'sweetalert2';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employeeId:any ;
  constructor(private employee:EmployeesService,
    private formBuilder:FormBuilder) { }
  employeeList:any = [];
  employeesForm : FormGroup;
  ngOnInit() {
    this.employeesForm = this.formBuilder.group({
      firstName : ['',Validators.required],
      lastName : [''],
      phone : [''],
      email : [''],
      salary : [''],
    })
    this.getAllEmployeeList()
  }
  get firstName(){ return this.employeesForm.get('firstName')}
  getAllEmployeeList(){
    this.employee.getEmployeesList().subscribe((result)=>{
      console.log("getAllEmployeeList result---------> ",result);
      this.employeeList = result;
    })
  }
  deleteEmployee(empData){
    Swal.fire({
      title:"Are you sure you want to delete ?",
      icon:"warning",
      text:"you can't recover deleted data",
      showCancelButton: true,
      cancelButtonText : "No",
      confirmButtonText : "Yes"
    }).then((result)=>{
      if(result.value){
        this.employee.deleteEmployees(empData.id).subscribe((result)=>{
          console.log("deleteEmployee result-------->",result);
          Swal.fire("Success","Data Deleted Successfully !","success")
          this.getAllEmployeeList()
        })
      }
    })
    
  }
  addNewEmployee(){
    console.log("value-------------->",this.employeesForm);
    this.employee.addNewEmployees(this.employeesForm.value).subscribe((result)=>{
      console.log("addNewEmployee result---------------->",result);
      Swal.fire("Success","Data Added Successfully !","success");
      this.getAllEmployeeList()
      this.employeesForm.reset()
      document.getElementById("closeModal").click();
    }) 
  }
  editEmployee(empdata){
    console.log("inside editEmployee--------------->");
    document.getElementById("saveEmployee").style.display = "none";
    document.getElementById("updateEmployee").style.display = "block";
    document.getElementById("openModal").click();
    this.employeeId = empdata.id;
    this.employeesForm.controls['firstName'].setValue(empdata.firstName);
    this.employeesForm.controls['lastName'].setValue(empdata.lastName);
    this.employeesForm.controls['phone'].setValue(empdata.phone);
    this.employeesForm.controls['email'].setValue(empdata.email);
    this.employeesForm.controls['salary'].setValue(empdata.salary);
  }
  updateEmployee(){
    console.log("inside updateEmployee--------------->",this.employeesForm.value);
    this.employee.updateEmployees(this.employeesForm.value,this.employeeId).subscribe((result)=>{
      console.log("updateEmployee result-------------->",result);
      Swal.fire("Success","Data Updated Successfully !","success");
      this.getAllEmployeeList()
      this.employeesForm.reset()
      document.getElementById("closeModal").click();
    })
  }

}
