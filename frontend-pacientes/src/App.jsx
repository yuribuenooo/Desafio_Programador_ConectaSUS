
import { useEffect, useState } from 'react'
import './App.css'

const API = '/api'

async function request(path, method = 'GET', body = null) {
  const options = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }

  if (body !== null) {
    options.body = JSON.stringify(body)
  }

  const response = await fetch(`${API}${path}`, options)

  const data =
    response.status === 204
      ? null
      : await response.json().catch(() => null)

  return {
    ok: response.ok,
    status: response.status,
    data,
  }
}

function App() {
  const [patients, setPatients] = useState([])
  const [healthUnits, setHealthUnits] = useState([])
  const [search, setSearch] = useState('')
  const [patientId, setPatientId] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    name: '',
    cpf: '',
    birth_date: '',
    phone: '',
    health_unit_id: '',
  })

  async function loadHealthUnits() {
    const result = await request('/health-units')

    if (!result.ok) {
      throw new Error('Não foi possível carregar as unidades.')
    }

    const data = result.data
    setHealthUnits(Array.isArray(data) ? data : data?.data ?? [])
  }

  async function loadPatients(searchTerm = '') {
    const query = searchTerm
      ? `?search=${encodeURIComponent(searchTerm)}`
      : ''

    const result = await request(`/patients${query}`)

    if (!result.ok) {
      throw new Error('Não foi possível carregar os pacientes.')
    }

    const data = result.data
    setPatients(Array.isArray(data) ? data : data?.data ?? [])
  }

  useEffect(() => {
    async function initialize() {
      try {
        await Promise.all([loadHealthUnits(), loadPatients()])
      } catch (error) {
        setMessage(error.message || 'Erro ao carregar os dados.')
      }
    }

    initialize()
  }, [])

  function handleChange(event) {
    const { name, value } = event.target

    setForm((current) => ({
      ...current,
      [name]: value,
    }))
  }

  function resetForm() {
    setPatientId('')
    setForm({
      name: '',
      cpf: '',
      birth_date: '',
      phone: '',
      health_unit_id: '',
    })
    setErrors([])
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setMessage('')
    setErrors([])
    setLoading(true)

    try {
      const body = {
        ...form,
        health_unit_id: Number(form.health_unit_id),
      }

      const result = patientId
        ? await request(`/patients/${patientId}`, 'PUT', body)
        : await request('/patients', 'POST', body)

      if (result.status === 422) {
        const validationErrors = result.data?.errors ?? {}
        setErrors(Object.values(validationErrors).flat())
        setMessage('Verifique os campos informados.')
        return
      }

      if (!result.ok) {
        throw new Error(
          result.data?.message || 'Não foi possível salvar o paciente.'
        )
      }

      setMessage(
        patientId
          ? 'Paciente atualizado com sucesso!'
          : 'Paciente cadastrado com sucesso!'
      )

      resetForm()
      await loadPatients(search)
    } catch (error) {
      setMessage(error.message || 'Erro de comunicação com a API.')
    } finally {
      setLoading(false)
    }
  }

  async function editPatient(id) {
    setMessage('')
    setErrors([])

    try {
      const result = await request(`/patients/${id}`)

      if (!result.ok) {
        throw new Error('Não foi possível consultar o paciente.')
      }

      const patient = result.data?.data ?? result.data

      setPatientId(String(patient.id))
      setForm({
        name: patient.name ?? '',
        cpf: patient.cpf ?? '',
        birth_date: patient.birth_date
          ? String(patient.birth_date).slice(0, 10)
          : '',
        phone: patient.phone ?? '',
        health_unit_id: String(patient.health_unit_id ?? ''),
      })

      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (error) {
      setMessage(error.message || 'Erro ao consultar paciente.')
    }
  }

  async function deletePatient(id) {
    if (!window.confirm('Deseja realmente excluir este paciente?')) {
      return
    }

    setMessage('')

    try {
      const result = await request(`/patients/${id}`, 'DELETE')

      if (!result.ok) {
        throw new Error(
          result.data?.message || 'Não foi possível excluir o paciente.'
        )
      }

      setMessage('Paciente excluído com sucesso!')

      if (patientId === String(id)) {
        resetForm()
      }

      await loadPatients(search)
    } catch (error) {
      setMessage(error.message || 'Erro ao excluir paciente.')
    }
  }

  async function handleSearch(event) {
    event.preventDefault()

    try {
      await loadPatients(search)
      setMessage('')
    } catch (error) {
      setMessage(error.message || 'Erro ao pesquisar pacientes.')
    }
  }

  return (
    <main className="container">
      <h1>Cadastro de pacientes</h1>

      {message && (
        <div
          className={`message ${
            errors.length > 0 ? 'error' : 'info'
          }`}
          role="status"
        >
          {message}
          {errors.length > 0 && (
            <ul>
              {errors.map((error, index) => (
                <li key={`${error}-${index}`}>{error}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      <section className="panel">
        <h2>{patientId ? 'Editar paciente' : 'Novo paciente'}</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Nome completo</label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="cpf">CPF</label>
          <input
            id="cpf"
            name="cpf"
            value={form.cpf}
            onChange={handleChange}
            required
          />

          <label htmlFor="birth_date">Data de nascimento</label>
          <input
            id="birth_date"
            name="birth_date"
            type="date"
            value={form.birth_date}
            onChange={handleChange}
            required
          />

          <label htmlFor="phone">Telefone</label>
          <input
            id="phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
          />

          <label htmlFor="health_unit_id">Unidade de saúde</label>
          <select
            id="health_unit_id"
            name="health_unit_id"
            value={form.health_unit_id}
            onChange={handleChange}
            required
          >
            <option value="">Selecione uma unidade</option>

            {healthUnits.map((unit) => (
              <option key={unit.id} value={unit.id}>
                {unit.name ?? unit.nome_fantasia}
              </option>
            ))}
          </select>

          <div className="actions">
            <button type="submit" disabled={loading}>
              {loading
                ? 'Salvando...'
                : patientId
                  ? 'Atualizar'
                  : 'Cadastrar'}
            </button>

            <button
              type="button"
              className="secondary"
              onClick={() => {
                resetForm()
                setMessage('')
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      </section>

      <section className="panel">
        <h2>Pacientes cadastrados</h2>

        <form className="search-form" onSubmit={handleSearch}>
          <input
            aria-label="Pesquisar paciente"
            placeholder="Pesquisar por nome..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <button type="submit">Pesquisar</button>
        </form>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>CPF</th>
                <th>Unidade</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id}>
                  <td>{patient.name}</td>
                  <td>{patient.cpf}</td>
                  <td>
                    {patient.health_unit?.name ??
                      patient.health_unit?.nome_fantasia ??
                      healthUnits.find(
                        (unit) => unit.id === patient.health_unit_id
                      )?.name ??
                      healthUnits.find(
                        (unit) => unit.id === patient.health_unit_id
                      )?.nome_fantasia ??
                      'Não informada'}
                  </td>
                  <td className="actions">
                    <button
                      type="button"
                      onClick={() => editPatient(patient.id)}
                    >
                      Editar
                    </button>

                    <button
                      type="button"
                      className="danger"
                      onClick={() => deletePatient(patient.id)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}

              {patients.length === 0 && (
                <tr>
                  <td colSpan="4">Nenhum paciente encontrado.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}

export default App
