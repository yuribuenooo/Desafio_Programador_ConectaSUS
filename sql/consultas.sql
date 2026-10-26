--consulta1

SELECT

patients.name as patient_name,
health_units.name as healt_unit_name

FROM patients
JOIN health_units ON patients.health_unit_id = health_units.id;

--consulta2
SELECT

health_units.id,
health_units.name as health_unit_name,
COUNT(patients.id) as total_patients

FROM health_units
LEFT JOIN patients on patients.health_unit_id = health_units.id
GROUP BY health_units.id, health_units.name;

--consulta3
SELECT*
FROM patients
WHERE name LIKE 'Teste%';