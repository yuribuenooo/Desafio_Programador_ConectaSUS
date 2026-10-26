<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PatientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('patients')->insert([
            [
                'name' => "Teste Teste",
                'cpf' => '12345678901',
                'birth_date' => '2000-12-25',
                'phone' => null,
                'health_unit_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => "Maria Eduarda",
                'cpf' => '12345678902',
                'birth_date' => '2000-04-16',
                'phone' => null,
                'health_unit_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
