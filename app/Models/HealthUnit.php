<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\DataBase\Eloquent\Relations\HasMany;

class HealthUnit extends Model
{
    protected $fillable = [
        'name',
        'city',
        'uuid',
    ];

    public function patients(): HasMany
    {
        return $this->hasMany(Patient::class, 'health_unit_id');
    }
}
