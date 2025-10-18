SELECT
    q.id AS pregunta_id,
    q.label AS pregunta,
    q.question_type AS tipo_pregunta,
    CASE
        -- Para preguntas de tipo abierto (texto)
        WHEN q.question_type IN ('short_answer', 'long_answer', 'number', 'text') THEN r.text_value
        -- Para preguntas con opciones (boolean, single_choice, likert_scale)
        ELSE STRING_AGG(o.value, ', ' ORDER BY o.index)
    END AS respuesta
FROM
    form.survey_submission AS ss
LEFT JOIN
    form.response AS r ON ss.id = r.survey_submission_id
LEFT JOIN
    form.question AS q ON r.question_id = q.id
LEFT JOIN
    form.response_selected_option AS rso ON r.id = rso.response_id
LEFT JOIN
    form.option AS o ON rso.option_id = o.id
WHERE
    ss.id = 6
GROUP BY
    q.id, q.label, q.question_type, r.text_value, q.index
ORDER BY
    q.index;