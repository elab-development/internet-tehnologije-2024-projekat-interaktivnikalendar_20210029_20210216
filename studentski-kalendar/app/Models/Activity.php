<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{

    use HasFactory;
    protected $fillable = [
        'name',
        'description',
        'start_date',
        'end_date',
        'category_id',
        'calendar_id', //ovo sam dodala sinoc,nije bilo u kodu
        'user_id', //i ovo je dodato zbog migracije za foreign key user_id
    ];

    public function calendar()
    {
        return $this->belongsTo(Calendar::class);
    }

    public function category()
    {
        return $this->belongsTo(ActivityCategory::class, 'category_id');
    }

    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }
}
