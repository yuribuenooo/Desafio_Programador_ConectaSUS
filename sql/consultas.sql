--consulta1

SELECT

patients.name as "Nome do paciente",
health_units.name as "Unidade"

FROM patients
JOIN health_units ON patients.health_unit_id = health_units.id;

--consulta2
SELECT

health_units.id,
health_units.name as "Unidade",
COUNT(patients.id) as "total_pacientes"

FROM health_units
LEFT JOIN patients on patients.health_unit_id = health_units.id
GROUP BY health_units.id, health_units.name;

--consulta3
SELECT*
FROM patients
WHERE name LIKE 'Teste%';

--consulta4
SELECT
patients.id,
patients.name as "Nome do paciente",
health_units.id as "ID da Unidade"

FROM patients
where patients.health_unit_id = 1
ORDER BY patients.name ASC