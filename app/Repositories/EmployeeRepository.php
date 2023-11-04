<?php
namespace App\Repositories;

use App\Models\Employee;

class EmployeeRepository
{
    public function getAllEmployees()
    {
        return Employee::with('company')->orderBy('id', 'desc')->paginate(10);
    }

    public function createEmployee(array $data)
    {       
        return Employee::create($data);
    }

    public function updateEmployee(Employee $employee, array $data)
    {
        $employee->update($data);
        return $employee;
    }
    
    public function deleteEmployee(Employee $employee)
    {
        $employee->delete();
    }

}