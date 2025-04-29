<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Calendar extends Model
{

    use HasFactory;

    protected $fillable = [
        'name',
        'owner_id',
        'activity_view', //stajalo je active_view a trevba activity_view
    ];

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function view()
    {
        return $this->hasMany(CalendarView::class);
    }

    public function activities()
    {
        return $this->hasMany(Activity::class);
    }
}
