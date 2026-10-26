<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class HealthUnitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('health_units')->insert([
            [
                'name' => 'UBS Vila Aparecida',
                'city' => 'Itapeva',
                'uuid' => (string) Str::uuid(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'UBS Jardim Maringa',
                'city'=> 'Itapeva',
                'uuid' => (string) Str::uuid(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
              [
                'name' => 'ESF Guarizinho',
                'city'=> 'Itapeva',
                'uuid' => (string) Str::uuid(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
              [
                'name' => 'ESF Sao Camilo',
                'city'=> 'Itapeva',
                'uuid' => (string) Str::uuid(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            
        ]);
    }
}
