export interface CreateEmployeeRequest{
    email:string,
    designation:string,
    salary:number | null,
    departmentId:number | null,
    employeeName:string

}