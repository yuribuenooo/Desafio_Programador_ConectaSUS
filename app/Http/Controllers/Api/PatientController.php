<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePatientRequest;
use App\Http\Requests\UpdatePatientRequest;
use App\Models\Patient;
use Illuminate\Http\Request;

class PatientController extends Controller
{
    public function index(Request $request)
    {
        $query = Patient::with('healthUnit');

        if ($request->filled('search')) {
            $query->where(
                'name',
                'like',
                '%' . $request->input('search') . '%'
            );
        }

        return response()->json(
            $query->orderBy('name')->get()
        );
    }

    public function store(StorePatientRequest $request)
    {
        $patient = Patient::create(
            $request->validated()
        );

        $patient->load('healthUnit');

        return response()->json($patient, 201);
    }

    public function show($id)
    {
        $patient = Patient::with('healthUnit')
            ->findOrFail($id);

        return response()->json($patient);
    }

    public function update(UpdatePatientRequest $request, $id)
    {
        $patient = Patient::findOrFail($id);

        $patient->update(
            $request->validated()
        );

        $patient->load('healthUnit');

        return response()->json($patient);
    }

    public function destroy($id)
    {
        $patient = Patient::findOrFail($id);

        $patient->delete();

        return response()->json([
            'message' => 'Paciente excluído com sucesso'
        ]);
    }
}