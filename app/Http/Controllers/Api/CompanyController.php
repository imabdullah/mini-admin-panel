<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Http\Requests\StoreCompanyRequest;
use App\Http\Requests\UpdateCompanyRequest;
use App\Http\Resources\CompanyResource;
use App\Repositories\CompanyRepository;
use Illuminate\Support\Facades\Mail;
use App\Mail\NotifyCompany;
use App\Services\EmailService;

class CompanyController extends Controller
{
    protected $companyRepository;
    protected $emailService;
    public function __construct(CompanyRepository $companyRepository, EmailService $emailService)
    {
        $this->companyRepository = $companyRepository;
        $this->emailService = $emailService;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return CompanyResource::collection(
            $this->companyRepository->getAllCompanies()
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreCompanyRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreCompanyRequest $request)
    {
        $data = $request->validated();
        $company = $this->companyRepository->createCompany($data);

        $this->emailService->sendCompanyCreationNotification($company);
        //Mail::to($company->email)->send(new NotifyCompany($company->name));
        return response(new CompanyResource($company), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Company  $company
     * @return \Illuminate\Http\Response
     */
    public function show(Company $company)
    {
        return new CompanyResource($company);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateCompanyRequest  $request
     * @param  \App\Models\Company  $company
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateCompanyRequest $request, Company $company)
    {
        $data = $request->validated();
        $updatedCompany = $this->companyRepository->updateCompany($company, $data);
        return new CompanyResource($updatedCompany);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Company  $company
     * @return \Illuminate\Http\Response
     */
    public function destroy(Company $company)
    {
        $this->companyRepository->deleteCompany($company);
        return response('', 204);
    }
}
