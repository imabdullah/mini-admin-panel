<?php
namespace App\Repositories;

use App\Models\Company;

class CompanyRepository
{
    public function getAllCompanies()
    {
        return Company::query()->orderBy('id', 'desc')->paginate(10);
    }

    public function createCompany(array $data, $fieldName = 'logo')
    {
        if (isset($data[$fieldName])) {
            $data[$fieldName] = $this->handleFileUpload($data[$fieldName]);
        }
       
        return Company::create($data);
    }

    public function updateCompany(Company $company, array $data, $fieldName = 'logo')
    {
        if (isset($data[$fieldName])) {
            $data[$fieldName] = $this->handleFileUpload($data[$fieldName]);
        }

        $company->update($data);
        return $company;
    }
    

    private function handleFileUpload($file)
    {
        if ($file) {
            $fileName = time() . '_' . $file->getClientOriginalName();
            $file->storeAs('public', $fileName);
            return $fileName;
        }

        return null;
    }

    public function deleteCompany(Company $company)
    {
        $company->delete();
    }

}