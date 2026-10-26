<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StorePatientRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'cpf' => ['required', 'string', 'digits:11', 'unique:patients,cpf'],
            'birth_date' => ['required', 'date'],
            'phone' => ['nullable', 'string', 'max:11'],
            'health_unit_id' => ['required', 'integer', 'exists:health_units,id'],
        ];
    }

    public function messages():array
    {
        return [
            'name.required' => 'O nome do paciente é obrigatório',
            'name.string' => 'O nome do pacinte deve conter apenas letras',
            
            'cpf.required' => 'O CPF do paciente é Obrigatório',
            'cpf.digits' => 'O CPF do paciente deve conter 11 digítos',
            'cpf.unique' => 'O CPF do Paciente já está cadastrado',

            'birth_date.required' => 'A data de nascimento é obrigatória',
            'birth_date.before_or_equal' => 'A data de nascimento deve ser anterior ou igual a hoje',

            'phone.string' => 'O telefone do paciente deve conter apenas números',
            'phone.digits' => 'O telefone do paciente deve conter 11 digítos',

            'health_unit_id.required' => 'Selecione a unidade de saúde do paciente',
            'health_unit_id.integer' => 'Selecione uma unidade de saúde válida',
            'health_unit_id.exists' => 'Selecione uma unidade de saúde válida',
            ];
    }
}
