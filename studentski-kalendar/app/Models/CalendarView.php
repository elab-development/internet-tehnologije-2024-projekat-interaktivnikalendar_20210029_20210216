<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CalendarView extends Model
{

    use HasFactory;

    protected $fillable = [
        'view_name',
        'date_from',
        'date_to',
        'calendar_id', //ovo sam takodje dodala nije imalo u kodu a ima u migraciji
    ];

    public function calendar()
    {
        return $this->belongsTo(Calendar::class);
    }
}
