<?php

namespace App\Services;

use Illuminate\Support\Facades\Mail;
use App\Mail\NotifyCompany;

class EmailService
{
    public function sendCompanyCreationNotification($company)
    {
        Mail::to($company->email)->send(new NotifyCompany($company));
    }
}
