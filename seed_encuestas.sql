
BEGIN;

-- CREAR (ejecutar en este orden)
-- Idempotente: se puede correr varias veces sin duplicar datos ni fallar por ids repetidos.
INSERT INTO form.form (id, title, description)
VALUES (
    5,
    'Cuestionario de auditoria',
    'Cuestionario de auditoria para asociaciones de pequeños productores agrícolas.'
)
ON CONFLICT (id) DO NOTHING;

-- Secciones del cuestionario. Antes cada una era una pregunta 'note' más
-- (misma tabla que las preguntas reales, sin nada que las distinguiera como
-- encabezado de bloque); ahora son su propia entidad y las preguntas se
-- agrupan bajo ellas por form.question.section_id.
INSERT INTO form.section (id, form_id, title, index)
VALUES
(1, 5, 'Datos Generales', 2),
(2, 5, 'Transparencia en la gestión', 10),
(3, 5, 'Trazabilidad y sustentabilidad', 28),
(4, 5, 'Gestión financiera responsable', 43),
(5, 5, 'Cumplimiento de obligaciones', 59),
(6, 5, 'Participación y democracia', 74),
(7, 5, 'Reportes y auditorías', 96),
(8, 5, 'Adaptación a las demandas del mercado', 108),
(9, 5, 'Conclusión de la auditoría', 113)
ON CONFLICT (id) DO NOTHING;

-- Preguntas. Las notas "Documentos por solicitar: ..." que antes eran filas
-- 'note' aparte, justo antes de la pregunta que aclaraban, ahora son el
-- help_text de esa misma pregunta. Los índices (index) se dejan exactamente
-- como estaban en el cuestionario original — no se renumeran — así que hay
-- huecos donde antes había una fila de sección o de "Documentos por
-- solicitar"; eso no afecta el orden, solo el orden importa.
INSERT INTO form.question (id, form_id, label, help_text, input_type, question_type, index, is_required)
VALUES
-- Observación de introducción (fuera de cualquier sección)
(100, 5, 'El presente instrumento constituye un cuestionario de auditoría elaborado con el propósito de evaluar de manera integral el funcionamiento de las asociaciones de pequeños productores agrícolas. Su estructura se fundamenta en bloques temáticos que abordan aspectos clave de la gestión organizativa, financiera, productiva y participativa de la asociación. Cada sección contiene interrogantes específicas, criterios de evaluación y documentación de respaldo requerida, lo que garantiza un proceso de verificación objetivo, transparente y estandarizado. De esta manera, el documento busca proporcionar una base sólida para la toma de decisiones, la identificación de oportunidades de mejora y el fortalecimiento institucional de la organización.', NULL, 'note', 'observation', 1, FALSE),

-- Sección 1: Datos Generales
(102, 5, 'Nombre de la asociación', NULL, 'text', 'short_answer', 3, TRUE),
(103, 5, 'Siglas (si aplica)', NULL, 'text', 'short_answer', 4, TRUE),
(104, 5, 'RUC / Registro legal o personería jurídica', NULL, 'text', 'short_answer', 5, TRUE),
(105, 5, 'Fecha de auditoría', NULL, 'text', 'short_answer', 6, TRUE),
(106, 5, 'Nombre del auditor o equipo auditor', NULL, 'text', 'short_answer', 7, TRUE),
(107, 5, 'Periodo evaluado', NULL, 'text', 'short_answer', 8, TRUE),
(108, 5, 'Número de productores actuales', NULL, 'number', 'short_answer', 9, TRUE),

-- Sección 2: Transparencia en la gestión
(110, 5, '¿La asociación cuenta con un sistema de documentación de registros?', NULL, 'radio', 'boolean', 11, TRUE),
(112, 5, 'Puntaje de registro de ubicación', 'Documentos por solicitar: Registros de los agricultores los cuales contengan la información relacionada a su producción y lote (ubicación, descripción de actividades, ventas y cultivos)', 'likert_scale', 'likert_scale', 13, TRUE),
(113, 5, 'Puntaje de registro de materiales', NULL, 'likert_scale', 'likert_scale', 14, TRUE),
(114, 5, 'Puntaje de registro de actividades', NULL, 'likert_scale', 'likert_scale', 15, TRUE),
(115, 5, 'Puntaje de registro sobre ventas', NULL, 'likert_scale', 'likert_scale', 16, TRUE),

(116, 5, 'Número de productores los cuales cuentan con el sistema de registro', NULL, 'number', 'short_answer', 17, TRUE),
(118, 5, 'Puntaje de número de productores los cuales cuentan con el sistema de registro.', 'Documentos por solicitar: El total Registros actualizados de los agricultores los cuales contengan los datos de su producción y ventas de manera clara.', 'likert_scale', 'likert_scale', 19, TRUE),

(119, 5, 'Frecuencia de actualizaciones de los registros.', NULL, 'radio', 'single_choice', 20, TRUE),
(120, 5, 'Número de registros actuales.', NULL, 'number', 'short_answer', 21, TRUE),
(122, 5, 'Puntaje de frecuencia de actualizaciones de registros.', 'Documentos por solicitar: Verificar en los documentos ya entregados (de ser el caso) las fechas de las actualizaciones de los registros de los productores. Colocar el número de reuniones actuales realizadas', 'likert_scale', 'likert_scale', 23, TRUE),

(123, 5, '¿Dispone la asociación de información suficiente y accesible que respalde el proceso de toma de decisiones?', NULL, 'radio', 'boolean', 24, TRUE),
(125, 5, 'Puntaje de valores de producción', 'Documentos por solicitar: Registro de ventas y producción donde se puedan observar valores que muestren la situación actual que afronta la asociación.', 'likert_scale', 'likert_scale', 26, TRUE),
(126, 5, 'Puntaje de ingresos y egresos', NULL, 'likert_scale', 'likert_scale', 27, TRUE),

-- Sección 3: Trazabilidad y sustentabilidad
(128, 5, '¿Los agricultores tienen un registro sobre la información de su cultivo? Es decir, actividades realizadas, registro de productos utilizados y ventas', NULL, 'radio', 'boolean', 29, TRUE),
(130, 5, 'Puntaje de registro de información sobre el cultivo.', 'Documentos por solicitar: Registro de información sobre el cultivo, donde se puedan apreciar las ventas, registro de productos utilizados y la información sobre el cultivo.', 'likert_scale', 'likert_scale', 31, TRUE),
(131, 5, 'Puntaje de registro de productos utilizados.', NULL, 'likert_scale', 'likert_scale', 32, TRUE),
(132, 5, 'Puntaje de registro de labores', NULL, 'likert_scale', 'likert_scale', 33, TRUE),
(133, 5, 'Puntaje de registro de ventas', NULL, 'likert_scale', 'likert_scale', 34, TRUE),

(134, 5, '¿Cuántos agricultores tiene realizado el registro?', NULL, 'number', 'short_answer', 35, TRUE),
(136, 5, 'Puntaje de número de agricultores con registro', 'Documentos por solicitar: Verificar en los documentos ya entregados (de ser el caso) el total de agricultores que realizan el registro. Colocar el número de agricultores que llevan el registro.', 'likert_scale', 'likert_scale', 37, TRUE),

(137, 5, '¿El productor registra el uso de productos agroecológicos?', NULL, 'radio', 'boolean', 38, TRUE),
(139, 5, 'Puntaje de tipo de insumo utilizado.', 'Documentos por solicitar: Registro de información sobre el registro de insumos utilizados en el cultivo. Donde registre los tipos de productos utilizados, el método que utilizo, precio, etc.', 'likert_scale', 'likert_scale', 40, TRUE),
(140, 5, 'Puntaje de cantidad utilizada.', NULL, 'likert_scale', 'likert_scale', 41, TRUE),
(141, 5, 'Puntaje de método de aplicación.', NULL, 'likert_scale', 'likert_scale', 42, TRUE),

-- Sección 4: Gestión financiera responsable
(143, 5, '¿Cuál es la cantidad de productores que llevan un registro financiero, como los agricultores llevan las cuentas de sus cultivos?', NULL, 'number', 'short_answer', 44, TRUE),
(145, 5, 'Puntaje de número de agricultores con registro.', 'Documentos por solicitar: Verificar en los documentos ya entregados (de ser el caso) el total de agricultores que realizan el registro de ventas y producción. Colocar el número de agricultores que llevan el registro.', 'likert_scale', 'likert_scale', 46, TRUE),

(146, 5, '¿La asociación dispone de un presupuesto anual destinado al desarrollo de sus actividades agrícolas?', NULL, 'radio', 'boolean', 47, TRUE),
(148, 5, 'Puntaje de cantidad del monto', 'Documentos por solicitar: Acta de presupuesto aprobada por la directiva.', 'likert_scale', 'likert_scale', 49, TRUE),
(149, 5, 'Puntaje de para qué actividades será destinada', NULL, 'likert_scale', 'likert_scale', 50, TRUE),
(150, 5, 'Puntaje de participación de los socios en la aprobación', NULL, 'likert_scale', 'likert_scale', 51, TRUE),
(151, 5, 'Puntaje de flexibilidad a cambios que se presente', NULL, 'likert_scale', 'likert_scale', 52, TRUE),

(152, 5, '¿La asociación ha sido beneficiaria de créditos o capacitaciones para los productores?', NULL, 'radio', 'boolean', 53, TRUE),
(154, 5, 'Puntaje de sobre si la asociación ha sido beneficiaria de créditos', 'Documentos por solicitar: Registro de información sobre el préstamo o crédito otorgado a la asociación.', 'likert_scale', 'likert_scale', 55, TRUE),

(155, 5, '¿La asociación cuenta con un control de gastos internos y planificación económica además de un sistema de contabilidad?', NULL, 'radio', 'boolean', 56, TRUE),
(157, 5, 'Puntaje de sobre si la asociación cuenta con un control de gastos internos.', 'Documentos por solicitar: Registro de información el control de gastos internos y planificación.', 'likert_scale', 'likert_scale', 58, TRUE),

-- Sección 5: Cumplimiento de obligaciones
(159, 5, '¿Tiene la directiva de la asociación conocimientos sobre procesos de exportación?', NULL, 'radio', 'boolean', 60, TRUE),
(161, 5, 'Puntaje de cursos recibidos y actividades.', 'Documentos por solicitar: Certificación o documento que evidencie que los dirigentes tuvieron formación sobre normas internacionales de agricultura.', 'likert_scale', 'likert_scale', 62, TRUE),
(162, 5, 'Puntaje de exportaciones realizadas.', NULL, 'likert_scale', 'likert_scale', 63, TRUE),

(163, 5, '¿La asociación cuenta con certificaciones sobre regulaciones de exportación y certificaciones?', NULL, 'radio', 'boolean', 64, TRUE),
(165, 5, 'Puntaje de vigencia del certificado.', 'Documentos por solicitar: Certificaciones obtenidas en cumplimiento de normativas internacionales aplicables a procesos agrícolas.', 'likert_scale', 'likert_scale', 66, TRUE),
(166, 5, 'Puntaje de alcance de la certificación.', NULL, 'likert_scale', 'likert_scale', 67, TRUE),
(167, 5, 'Puntaje de reconocimiento y Acreditación de la entidad certificadora.', NULL, 'likert_scale', 'likert_scale', 68, TRUE),

(168, 5, '¿La asociación registra y cumple con los compromisos contractuales con compradores y certificadoras? Otra forma: ¿La asociación guarda los contratos y cumple lo que acuerda con los compradores y con las empresas que dan certificados?', NULL, 'radio', 'boolean', 69, TRUE),
(170, 5, 'Puntaje de vigencia.', 'Documentos por solicitar: Registro de los contratos actuales con los compradores y entidades certificadoras.', 'likert_scale', 'likert_scale', 71, TRUE),
(171, 5, 'Puntaje de cumplimiento documentado.', NULL, 'likert_scale', 'likert_scale', 72, TRUE),
(172, 5, 'Puntaje de firma legalizada.', NULL, 'likert_scale', 'likert_scale', 73, TRUE),

-- Sección 6: Participación y democracia
(174, 5, '¿La asociación realiza reuniones o asambleas para la toma de decisiones o presentaciones de propuestas? Las asambleas tienen que realizarse cada seis meses como mínimo.', NULL, 'radio', 'boolean', 75, TRUE),
(176, 5, 'Puntaje de fecha de reunión.', 'Documentos por solicitar: Actas de reuniones de asambleas o reuniones.', 'likert_scale', 'likert_scale', 77, TRUE),
(177, 5, 'Puntaje de firmas de las participantes.', NULL, 'likert_scale', 'likert_scale', 78, TRUE),
(178, 5, 'Puntaje de tema de discusión.', NULL, 'likert_scale', 'likert_scale', 79, TRUE),
(179, 5, 'Puntaje de responsable de la reunión.', NULL, 'likert_scale', 'likert_scale', 80, TRUE),

(180, 5, '¿Cuál es el porcentaje de hombres de agricultores que forman parte de las asambleas?', NULL, 'number', 'short_answer', 81, TRUE),
(181, 5, '¿Cuál es el porcentaje de mujeres de agricultores que forman parte de las asambleas?', NULL, 'number', 'short_answer', 82, TRUE),
(183, 5, 'Puntaje de porcentaje de hombres y mujeres que forman parte de las asambleas.', 'Documentos por solicitar: Revisión del número de agricultores que asistieron a las reuniones o asambleas.', 'likert_scale', 'likert_scale', 84, TRUE),

(184, 5, '¿La asociación realiza capacitaciones sobre liderazgo y participación?', NULL, 'radio', 'boolean', 85, TRUE),
(186, 5, 'Puntaje de fecha de la clasificación.', 'Documentos por solicitar: Actas de reuniones de capacitaciones.', 'likert_scale', 'likert_scale', 87, TRUE),
(187, 5, 'Puntaje de firmas de los participantes.', NULL, 'likert_scale', 'likert_scale', 88, TRUE),
(188, 5, 'Puntaje de tema de la discusión.', NULL, 'likert_scale', 'likert_scale', 89, TRUE),
(189, 5, 'Puntaje de responsable de la reunión.', NULL, 'likert_scale', 'likert_scale', 90, TRUE),

(190, 5, '¿La asociación cuenta con un sistema de votación para la aprobación de una decisión o proceso?', NULL, 'radio', 'boolean', 91, TRUE),
(192, 5, 'Puntaje de propuesta a votación.', 'Documentos por solicitar: Actas de votaciones de los participantes en las asambleas.', 'likert_scale', 'likert_scale', 93, TRUE),
(193, 5, 'Puntaje de resultados de la votación.', NULL, 'likert_scale', 'likert_scale', 94, TRUE),
(194, 5, 'Puntaje de registro de participantes.', NULL, 'likert_scale', 'likert_scale', 95, TRUE),

-- Sección 7: Reportes y auditorías
(196, 5, '¿La asociación realiza auditorias de manera externas o internas?', NULL, 'radio', 'single_choice', 97, TRUE),
(198, 5, 'Puntaje de auditorias.', 'Documentos por solicitar: Documento de las auditorías realizadas de manera interna o externa, junta de vigilancia.', 'likert_scale', 'likert_scale', 99, TRUE),

(199, 5, '¿Cada qué cierto tiempo se realizan las auditorias en los últimos 3 años?', NULL, 'radio', 'single_choice', 100, TRUE),
(200, 5, 'Número de auditorías actuales', NULL, 'number', 'short_answer', 101, TRUE),
(202, 5, 'Puntaje de auditorias en los últimos 3 años.', 'Documentos por solicitar: Verificar en los documentos ya entregados (de ser el caso) las fechas de las actualizaciones de las auditorías internas o externas. Colocar el número de auditorías actuales realizadas.', 'likert_scale', 'likert_scale', 103, TRUE),

(203, 5, '¿La asociación permite el acceso de la información a los socios, ya sea de manera digital o archivos físicos?', NULL, 'radio', 'boolean', 104, TRUE),
(205, 5, 'Puntaje de disponibilidad.', 'Documentos por solicitar: Evidencia de la información accesible para todos los productores de la asociación.', 'likert_scale', 'likert_scale', 106, TRUE),
(206, 5, 'Puntaje de accesibilidad.', NULL, 'likert_scale', 'likert_scale', 107, TRUE),

-- Sección 8: Adaptación a las demandas del mercado
(208, 5, '¿Cuáles son los principales productos para venta en la asociación?', NULL, 'text', 'short_answer', 109, TRUE),
(209, 5, '¿Cuál es el valor de ventas de la asociación por todos los producto? ', NULL, 'number', 'short_answer', 110, TRUE),
(211, 5, 'Puntaje de ventas totales.', 'Documentos por solicitar: Revisión del libro de ventas, donde se desglose el valor de ventas a dichos mercados', 'likert_scale', 'likert_scale', 112, TRUE),

-- Sección 9: Conclusión de la auditoría
(213, 5, 'Hallazgos principales:', NULL, 'text', 'long_answer', 114, FALSE),
(214, 5, 'Recomendaciones:', NULL, 'text', 'long_answer', 115, FALSE),
(215, 5, 'Acciones correctivas sugeridas:', NULL, 'text', 'long_answer', 116, FALSE)
ON CONFLICT (id) DO NOTHING;

-- Asigna section_id a cada pregunta sembrada arriba: la sección de una
-- pregunta es la de mayor index que sigue siendo menor al index de la
-- pregunta, dentro de la misma Form. Mecánico, no depende de listar ids a
-- mano — así que también corrige preguntas insertadas por corridas previas
-- de este script (antes de que existiera section_id).
UPDATE form.question q
SET section_id = s.id
FROM form.section s
WHERE s.form_id = q.form_id
  AND q.form_id = 5
  AND s.index = (
    SELECT MAX(s2.index) FROM form.section s2
    WHERE s2.form_id = q.form_id AND s2.index < q.index
  );

-- Corrige preguntas ya sembradas antes de que input_type se alineara con
-- question_type='likert_scale' (venían guardadas como 'radio', que es el
-- tipo genérico de opción única y no el widget de escala Likert). El INSERT
-- de arriba usa ON CONFLICT DO NOTHING, así que no corrige filas existentes;
-- este UPDATE sí, y es seguro correrlo las veces que haga falta.
UPDATE form.question
SET input_type = 'likert_scale'
WHERE question_type = 'likert_scale' AND input_type <> 'likert_scale';

-- Igual que arriba con section_id: el INSERT de preguntas usa ON CONFLICT DO
-- NOTHING, así que en una base que ya tenía estas preguntas (de antes de que
-- existiera help_text) el help_text de la lista de VALUES nunca se aplica.
-- Este UPDATE lo rellena leyéndolo de la nota "Documentos por solicitar"
-- correspondiente (la que tiene index = index de la pregunta - 1) antes de
-- que el DELETE de más abajo la borre. En una base nueva no encuentra nada
-- que copiar porque esas notas nunca se insertan — no hace falta, el INSERT
-- ya trae el help_text correcto.
UPDATE form.question q
SET help_text = n.label
FROM form.question n
WHERE n.form_id = q.form_id
  AND q.form_id = 5
  AND n.input_type = 'note'
  AND n.label LIKE 'Documentos por solicitar:%'
  AND n.index = q.index - 1
  AND q.help_text IS NULL;

-- "Fecha de auditoría" pedía una fecha pero estaba guardada como texto
-- libre, sin ningún selector ni validación de formato.
UPDATE form.question SET input_type = 'date' WHERE id = 105 AND form_id = 5;

-- Los dos campos de porcentaje (asistencia por género a las asambleas) son
-- 'number', correcto, pero sin límite — se podía meter cualquier valor.
UPDATE form.question SET min_value = 0, max_value = 100 WHERE id IN (180, 181) AND form_id = 5;

-- La app móvil solo vuelve a descargar un cuestionario completo si
-- form.aud_updated_at es más reciente que la copia local guardada (ver
-- syncFormsFromBackend en cir-acc-mobile). Este UPDATE lo fuerza para el
-- cuestionario 5 cada vez que el seed cambia el contenido del cuestionario.
UPDATE form.form SET aud_updated_at = NOW() WHERE id = 5;

INSERT INTO form.option (id, question_id, value, index)
VALUES
-- Opciones booleanas 'Si'/'No'
(200, 110, 'si', 1), (201, 110, 'no', 2),
(202, 123, 'si', 1), (203, 123, 'no', 2),
(204, 128, 'si', 1), (205, 128, 'no', 2),
(206, 137, 'si', 1), (207, 137, 'no', 2),
(208, 146, 'si', 1), (209, 146, 'no', 2),
(210, 152, 'si', 1), (211, 152, 'no', 2),
(212, 155, 'si', 1), (213, 155, 'no', 2),
(214, 159, 'si', 1), (215, 159, 'no', 2),
(216, 163, 'si', 1), (217, 163, 'no', 2),
(218, 168, 'si', 1), (219, 168, 'no', 2),
(220, 174, 'si', 1), (221, 174, 'no', 2),
(222, 184, 'si', 1), (223, 184, 'no', 2),
(224, 190, 'si', 1), (225, 190, 'no', 2),
(228, 203, 'si', 1), (229, 203, 'no', 2),

-- Opciones de selección única
(231, 119, 'mensual', 1),
(232, 119, 'trimestral', 2),
(233, 119, 'semestral', 3),
(234, 119, 'anual', 4),
(235, 119, 'otra_frecuencia', 5),
(236, 196, 'interna', 1),
(237, 196, 'externa', 2),
(238, 196, 'ninguna', 3),
(239, 199, 'semestral', 1),
(240, 199, 'anual', 2),
(241, 199, 'otra_frecuencia', 3),

-- Opciones de escala Likert (Puntaje)
(300, 112, '1', 1), (301, 112, '2', 2), (302, 112, '3', 3), (303, 112, '4', 4), (304, 112, '5', 5),
(305, 113, '1', 1), (306, 113, '2', 2), (307, 113, '3', 3), (308, 113, '4', 4), (309, 113, '5', 5),
(310, 114, '1', 1), (311, 114, '2', 2), (312, 114, '3', 3), (313, 114, '4', 4), (314, 114, '5', 5),
(315, 115, '1', 1), (316, 115, '2', 2), (317, 115, '3', 3), (318, 115, '4', 4), (319, 115, '5', 5),
(320, 118, '1', 1), (321, 118, '2', 2), (322, 118, '3', 3), (323, 118, '4', 4), (324, 118, '5', 5),
(325, 122, '1', 1), (326, 122, '2', 2), (327, 122, '3', 3), (328, 122, '4', 4), (329, 122, '5', 5),
(330, 125, '1', 1), (331, 125, '2', 2), (332, 125, '3', 3), (333, 125, '4', 4), (334, 125, '5', 5),
(335, 126, '1', 1), (336, 126, '2', 2), (337, 126, '3', 3), (338, 126, '4', 4), (339, 126, '5', 5),
(340, 130, '1', 1), (341, 130, '2', 2), (342, 130, '3', 3), (343, 130, '4', 4), (344, 130, '5', 5),
(345, 131, '1', 1), (346, 131, '2', 2), (347, 131, '3', 3), (348, 131, '4', 4), (349, 131, '5', 5),
(350, 132, '1', 1), (351, 132, '2', 2), (352, 132, '3', 3), (353, 132, '4', 4), (354, 132, '5', 5),
(355, 133, '1', 1), (356, 133, '2', 2), (357, 133, '3', 3), (358, 133, '4', 4), (359, 133, '5', 5),
(360, 136, '1', 1), (361, 136, '2', 2), (362, 136, '3', 3), (363, 136, '4', 4), (364, 136, '5', 5),
(365, 139, '1', 1), (366, 139, '2', 2), (367, 139, '3', 3), (368, 139, '4', 4), (369, 139, '5', 5),
(370, 140, '1', 1), (371, 140, '2', 2), (372, 140, '3', 3), (373, 140, '4', 4), (374, 140, '5', 5),
(375, 141, '1', 1), (376, 141, '2', 2), (377, 141, '3', 3), (378, 141, '4', 4), (379, 141, '5', 5),
(380, 145, '1', 1), (381, 145, '2', 2), (382, 145, '3', 3), (383, 145, '4', 4), (384, 145, '5', 5),
(385, 148, '1', 1), (386, 148, '2', 2), (387, 148, '3', 3), (388, 148, '4', 4), (389, 148, '5', 5),
(390, 149, '1', 1), (391, 149, '2', 2), (392, 149, '3', 3), (393, 149, '4', 4), (394, 149, '5', 5),
(395, 150, '1', 1), (396, 150, '2', 2), (397, 150, '3', 3), (398, 150, '4', 4), (399, 150, '5', 5),
(400, 151, '1', 1), (401, 151, '2', 2), (402, 151, '3', 3), (403, 151, '4', 4), (404, 151, '5', 5),
(405, 154, '1', 1), (406, 154, '2', 2), (407, 154, '3', 3), (408, 154, '4', 4), (409, 154, '5', 5),
(410, 157, '1', 1), (411, 157, '2', 2), (412, 157, '3', 3), (413, 157, '4', 4), (414, 157, '5', 5),
(415, 161, '1', 1), (416, 161, '2', 2), (417, 161, '3', 3), (418, 161, '4', 4), (419, 161, '5', 5),
(420, 162, '1', 1), (421, 162, '2', 2), (422, 162, '3', 3), (423, 162, '4', 4), (424, 162, '5', 5),
(425, 165, '1', 1), (426, 165, '2', 2), (427, 165, '3', 3), (428, 165, '4', 4), (429, 165, '5', 5),
(430, 166, '1', 1), (431, 166, '2', 2), (432, 166, '3', 3), (433, 166, '4', 4), (434, 166, '5', 5),
(435, 167, '1', 1), (436, 167, '2', 2), (437, 167, '3', 3), (438, 167, '4', 4), (439, 167, '5', 5),
(440, 170, '1', 1), (441, 170, '2', 2), (442, 170, '3', 3), (443, 170, '4', 4), (444, 170, '5', 5),
(445, 171, '1', 1), (446, 171, '2', 2), (447, 171, '3', 3), (448, 171, '4', 4), (449, 171, '5', 5),
(450, 172, '1', 1), (451, 172, '2', 2), (452, 172, '3', 3), (453, 172, '4', 4), (454, 172, '5', 5),
(455, 176, '1', 1), (456, 176, '2', 2), (457, 176, '3', 3), (458, 176, '4', 4), (459, 176, '5', 5),
(460, 177, '1', 1), (461, 177, '2', 2), (462, 177, '3', 3), (463, 177, '4', 4), (464, 177, '5', 5),
(465, 178, '1', 1), (466, 178, '2', 2), (467, 178, '3', 3), (468, 178, '4', 4), (469, 178, '5', 5),
(470, 179, '1', 1), (471, 179, '2', 2), (472, 179, '3', 3), (473, 179, '4', 4), (474, 179, '5', 5),
(475, 183, '1', 1), (476, 183, '2', 2), (477, 183, '3', 3), (478, 183, '4', 4), (479, 183, '5', 5),
(480, 186, '1', 1), (481, 186, '2', 2), (482, 186, '3', 3), (483, 186, '4', 4), (484, 186, '5', 5),
(485, 187, '1', 1), (486, 187, '2', 2), (487, 187, '3', 3), (488, 187, '4', 4), (489, 187, '5', 5),
(490, 188, '1', 1), (491, 188, '2', 2), (492, 188, '3', 3), (493, 188, '4', 4), (494, 188, '5', 5),
(495, 189, '1', 1), (496, 189, '2', 2), (497, 189, '3', 3), (498, 189, '4', 4), (499, 189, '5', 5),
(500, 192, '1', 1), (501, 192, '2', 2), (502, 192, '3', 3), (503, 192, '4', 4), (504, 192, '5', 5),
(505, 193, '1', 1), (506, 193, '2', 2), (507, 193, '3', 3), (508, 193, '4', 4), (509, 193, '5', 5),
(510, 194, '1', 1), (511, 194, '2', 2), (512, 194, '3', 3), (513, 194, '4', 4), (514, 194, '5', 5),
(515, 198, '1', 1), (516, 198, '2', 2), (517, 198, '3', 3), (518, 198, '4', 4), (519, 198, '5', 5),
(520, 202, '1', 1), (521, 202, '2', 2), (522, 202, '3', 3), (523, 202, '4', 4), (524, 202, '5', 5),
(525, 205, '1', 1), (526, 205, '2', 2), (527, 205, '3', 3), (528, 205, '4', 4), (529, 205, '5', 5),
(530, 206, '1', 1), (531, 206, '2', 2), (532, 206, '3', 3), (533, 206, '4', 4), (534, 206, '5', 5),
(535, 211, '1', 1), (536, 211, '2', 2), (537, 211, '3', 3), (538, 211, '4', 4), (539, 211, '5', 5)
ON CONFLICT (id) DO NOTHING;

-- Elimina las preguntas 'note' que ahora son secciones o help_text (ya
-- migradas arriba). Solo aplica a instalaciones que vienen de la versión
-- vieja del cuestionario; en una base nueva estos ids nunca se insertan.
DELETE FROM form.question
WHERE id IN (
  101, 109, 127, 142, 158, 173, 195, 207, 212, -- encabezados de sección
  111, 117, 121, 124, 129, 135, 138, 144, 147, 153, 156, 160, 164, 169, 175,
  182, 185, 191, 197, 201, 204, 210 -- "Documentos por solicitar"
);

-- Resincroniza los contadores de autoincremento con los ids insertados a mano arriba,
-- para que el próximo id generado por la app (sin id explícito) no choque con estos.
SELECT setval(pg_get_serial_sequence('form.form', 'id'), COALESCE((SELECT MAX(id) FROM form.form), 1));
SELECT setval(pg_get_serial_sequence('form.section', 'id'), COALESCE((SELECT MAX(id) FROM form.section), 1));
SELECT setval(pg_get_serial_sequence('form.question', 'id'), COALESCE((SELECT MAX(id) FROM form.question), 1));
SELECT setval(pg_get_serial_sequence('form.option', 'id'), COALESCE((SELECT MAX(id) FROM form.option), 1));

COMMIT;
