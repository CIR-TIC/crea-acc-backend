
BEGIN;

-- Catálogos base (cultivos, variedades, tipos de suministro, tipos de actividad)
-- Idempotente: se puede correr varias veces sin duplicar datos ni fallar por ids repetidos.
-- Pensado como configuración inicial del backend: sin estos datos, los pickers de
-- Agregar Lote, Agregar Suministro y Actividad de Campo en la app móvil quedan vacíos
-- y esas pantallas no se pueden usar (ni online ni offline, porque la app sincroniza
-- estos catálogos y los guarda localmente para trabajar sin conexión).
-- Rangos de id reservados para no chocar con filas creadas manualmente durante pruebas:
--   crop 100-199, variety 200-299, supply_type 100-199, type_activity 100-199.

-- CULTIVOS (app.crop)
INSERT INTO app.crop (id, name, description)
VALUES
    (100, 'Café', 'Coffea arabica, cultivo principal de la zona'),
    (101, 'Cacao', 'Theobroma cacao, para chocolate y derivados'),
    (102, 'Plátano', 'Musa paradisiaca, cultivo de sombra y policultivo'),
    (103, 'Maíz', 'Zea mays, cultivo de ciclo corto'),
    (104, 'Yuca', 'Manihot esculenta, cultivo de ciclo corto')
ON CONFLICT (id) DO NOTHING;

-- VARIEDADES (app.variety)
INSERT INTO app.variety (id, name, description, id_crop)
VALUES
    -- Café (100)
    (200, 'Typica', 'Variedad tradicional de porte alto', 100),
    (201, 'Bourbon', 'Alta calidad de taza, buena productividad', 100),
    (202, 'Caturra', 'Porte bajo, alta densidad de siembra', 100),
    (203, 'Catuaí', 'Híbrido resistente al viento y de alta producción', 100),
    (204, 'Sarchimor', 'Resistente a la roya del café', 100),

    -- Cacao (101)
    (210, 'CCN-51', 'Alto rendimiento, tolerante a enfermedades', 101),
    (211, 'Nacional (Fino de Aroma)', 'Variedad ecuatoriana de aroma floral y frutal', 101),
    (212, 'Trinitario', 'Híbrido de buena calidad y productividad', 101),
    (213, 'Forastero', 'Resistente, base de la mayoría de híbridos comerciales', 101),

    -- Plátano (102)
    (220, 'Barraganete', 'Fruto grande, uso para verde y maduro', 102),
    (221, 'Dominico', 'Fruto pequeño y dulce', 102),
    (222, 'Orito', 'Variedad tipo banano baby', 102),

    -- Maíz (103)
    (230, 'Amarillo Duro', 'Uso principal para balanceado animal', 103),
    (231, 'Blanco Harinoso', 'Uso para consumo humano', 103),

    -- Yuca (104)
    (240, 'Amarga', 'Requiere procesamiento antes de consumo', 104),
    (241, 'Dulce', 'Apta para consumo directo', 104)
ON CONFLICT (id) DO NOTHING;

-- TIPOS DE SUMINISTRO (app.supply_type)
INSERT INTO app.supply_type (id, name, description)
VALUES
    (100, 'Fertilizante', 'Nutrientes para el suelo y la planta'),
    (101, 'Insecticida', 'Control de plagas e insectos'),
    (102, 'Fungicida', 'Control de hongos y enfermedades'),
    (103, 'Herbicida', 'Control de maleza'),
    (104, 'Abono orgánico', 'Materia orgánica para mejorar el suelo'),
    (105, 'Semilla / Material vegetal', 'Semillas o plántulas para siembra'),
    (106, 'Cal agrícola', 'Corrección del pH del suelo'),
    (107, 'Combustible', 'Diésel o gasolina para maquinaria agrícola'),
    (108, 'Herramienta', 'Herramientas manuales o equipo menor')
ON CONFLICT (id) DO NOTHING;

-- TIPOS DE ACTIVIDAD (app.type_activity) — usado por el formulario de Actividad
-- de Campo (FieldForm) en la app móvil.
INSERT INTO app.type_activity (id, name, description)
VALUES
    (100, 'Poda', 'Poda de mantenimiento o formación'),
    (101, 'Fertilización', 'Aplicación de fertilizante o abono'),
    (102, 'Control de plagas', 'Aplicación de insecticida o control manual'),
    (103, 'Control de maleza', 'Deshierbe manual o con herbicida'),
    (104, 'Riego', 'Riego del cultivo'),
    (105, 'Siembra', 'Siembra o resiembra'),
    (106, 'Cosecha', 'Recolección del cultivo'),
    (107, 'Aplicación de fungicida', 'Control de enfermedades fungosas')
ON CONFLICT (id) DO NOTHING;

-- Resincroniza los contadores de autoincremento con los ids insertados a mano
-- arriba, para que el próximo id generado por la app (sin id explícito) no
-- choque con estos.
SELECT setval(pg_get_serial_sequence('app.crop', 'id'), COALESCE((SELECT MAX(id) FROM app.crop), 1));
SELECT setval(pg_get_serial_sequence('app.variety', 'id'), COALESCE((SELECT MAX(id) FROM app.variety), 1));
SELECT setval(pg_get_serial_sequence('app.supply_type', 'id'), COALESCE((SELECT MAX(id) FROM app.supply_type), 1));
SELECT setval(pg_get_serial_sequence('app.type_activity', 'id'), COALESCE((SELECT MAX(id) FROM app.type_activity), 1));

COMMIT;
