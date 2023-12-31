import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ResponseModel } from 'src/auth/jwtService';
import { AjaxService } from 'src/providers/ajax.service';
import { Toast } from 'src/providers/common.service';
import { Employee } from 'src/providers/constants';
import { iNavigation } from 'src/providers/iNavigation';
declare var $: any;

@Component({
  selector: 'app-manage-employee',
  templateUrl: './manage-employee.component.html',
  styleUrls: ['./manage-employee.component.scss']
})
export class ManageEmployeeComponent implements OnInit {

  isReady: boolean = false;
  employeeForm: FormGroup;
  employeeDetail: EmployeeDetail = new EmployeeDetail();
  employeeId: number = 0;
  lastWorkingDatemodel: NgbDateStruct;

  constructor(private fb: FormBuilder,
              private http: AjaxService,
              private nav: iNavigation){}

  ngOnInit(): void {
    let data = this.nav.getValue();
    if (data){
      this.employeeId = data.employeeId;
      this.loadData();
    } else{
      this.initForm();
      this.isReady = true;
    }

  }

  loadData(){
    this.http.get(`employee/getEmployeeByEmployeeId/${this.employeeId}`).then((res:ResponseModel)=>{
      if(res.ResponseBody){
        this.employeeDetail = res.ResponseBody;
        this.initForm();
        this.isReady = true;
      }
    })
  }

  addEmployee(){
    this.isReady = true;
    let value = this.employeeForm.value;
    this.http.post("employee/addEmployee", value).then((res:ResponseModel) => {
      if(res.ResponseBody){
        Toast("Employee Inserted successfully");
        $('#messageModalEmployee').modal('show');
        this.isReady = false;
      }
    }).catch(e => {
      alert(e.message)
    })
  }

  updateEmployee(){
    this.isReady = true;
    let value = this.employeeForm.value;
    this.http.put(`employee/updateEmployee/${this.employeeDetail.employeeId}`,value).then((res:ResponseModel) => {
      if(res.ResponseBody){
        Toast("Employee Updated successfully");
        $('#messageModalEmployee').modal('show');
        this.isReady = false;
      }
    }).catch(e => {
      alert(e.message)
    })
  }

  initForm(){
    this.employeeForm = this.fb.group({
      employeeId: new FormControl(this.employeeDetail.employeeId),
      firstName: new FormControl(this.employeeDetail.firstName),
      lastName: new FormControl(this.employeeDetail.lastName),
      fatherName: new FormControl(this.employeeDetail.fatherName),
      motherName: new FormControl(this.employeeDetail.motherName),
      email: new FormControl(this.employeeDetail.email),
      mobile: new FormControl(this.employeeDetail.mobile),
      alternateNumber: new FormControl(this.employeeDetail.alternateNumber),
      address: new FormControl(this.employeeDetail.address),
      city: new FormControl(this.employeeDetail.city),
      state: new FormControl(this.employeeDetail.state),
      country: new FormControl(this.employeeDetail.country),
      roleId: new FormControl(this.employeeDetail.roleId),
      designationId: new FormControl(this.employeeDetail.designationId),
      reporteeId: new FormControl(this.employeeDetail.reporteeId),
      pan: new FormControl(this.employeeDetail.pan),
      aadhar: new FormControl(this.employeeDetail.aadhar),
      accountNo: new FormControl(this.employeeDetail.accountNo),
      bankName: new FormControl(this.employeeDetail.bankName),
      ifscCode: new FormControl(this.employeeDetail.ifscCode),
      branch: new FormControl(this.employeeDetail.branch),
      experienceInMonths: new FormControl(this.employeeDetail.experienceInMonths),
      passportNumber: new FormControl(this.employeeDetail.passportNumber),
      jobTypeId: new FormControl(this.employeeDetail.jobTypeId),
      lastCompanyName: new FormControl(this.employeeDetail.lastCompanyName),
      designation: new FormControl(this.employeeDetail.designation),
      salary: new FormControl(this.employeeDetail.salary),
      expectedSalary: new FormControl(this.employeeDetail.expectedSalary),
      expectedDesignation: new FormControl(this.employeeDetail.expectedDesignation),
      pinCode: new FormControl(this.employeeDetail.pinCode)
    })
  }



  gotoEmployeePage(){
    $('#messageModalEmployee').modal('hide');
    this.nav.navigate(Employee, null)
  }

  reset() {
    this.employeeDetail = new EmployeeDetail();
    this.initForm();
  }

  get f() {
    return this.employeeForm.controls;
  }

  onLastWorkingDateSelection(e: NgbDateStruct) {
    let date = new Date(e.year, e.month -1, e.day);
    this.employeeForm.get("lastWorkingDate").setValue(date);
  }

}

class EmployeeDetail {
  employeeId: number = 0;
  firstName: string = null;
  lastName: string = null;
  fatherName: string = null;
  motherName: string = null;
  email: string = null;
  mobile: string = null;
  alternateNumber: string = null;
  address: string = null;
  city: string = null;
  state: string = null;
  country: string = null;
  roleId: number = 0;
  designationId: number = 0;
  reporteeId: number = 0;
  pan: string = null;
  aadhar: string = null;
  passportNumber: string = null;
  bankName: string = null;
  branch: string = null;
  ifscCode: string = null;
  jobTypeId: number = 0;
  experienceInMonths: number = 0;
  lastCompanyName: string = null;
  lastWorkingDate: Date = null;
  designation: string = null;
  salary: number = 0;
  expectedSalary: number = 0;
  expectedDesignation: string = null;
  employeeMedicalDetailId: number = 0;
  medicalConsultancyId: number = 0;
  ConsultedBy: string = null;
  consultedOn: Date = null;
  referenceId: number = 0;
  reportId: number = 0;
  ReportPath: string = null;
  accountNo: string = null;
  pinCode: number = 0;
}
