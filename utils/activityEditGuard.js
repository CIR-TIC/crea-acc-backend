const { Lot, User } = require('../models');

// Pasados estos días desde que se creó el registro, ya no se puede editar ni
// eliminar — evita que un registro de trazabilidad ya usado en reportes se
// modifique mucho después de ocurrido. Compartido por los 5 tipos de
// actividad (campo, cosecha, secado, fermentado, venta), que tienen la misma
// regla de dueño-del-lote + ventana de edición.
const EDIT_WINDOW_DAYS = 7;
const EDIT_WINDOW_MS = EDIT_WINDOW_DAYS * 24 * 60 * 60 * 1000;

/**
 * Verifica que el usuario autenticado sea dueño (vía la propiedad del lote)
 * del registro de actividad, y que todavía esté dentro de la ventana de
 * edición/borrado.
 * @param {{ id_lot: number, audCreatedAt?: Date|string }} record Instancia del modelo (Activity/Harvest/Drying/Fermentation/Sale).
 * @param {number} userId req.userId puesto por el middleware verifyToken.
 * @returns {Promise<{status: number, message: string} | null>} null si está permitido, o el error listo para responder.
 */
async function checkActivityEditable(record, userId) {
    const lot = await Lot.findByPk(record.id_lot);
    if (!lot) {
        return { status: 404, message: 'Associated lot not found.' };
    }

    const user = await User.findByPk(userId);
    if (!user || lot.id_property !== user.property_id) {
        return { status: 403, message: 'You do not have permission to modify this record.' };
    }

    const createdAt = record.audCreatedAt ? new Date(record.audCreatedAt) : null;
    if (createdAt && Date.now() - createdAt.getTime() > EDIT_WINDOW_MS) {
        return {
            status: 409,
            message: `This record can no longer be edited or deleted (more than ${EDIT_WINDOW_DAYS} days have passed since it was created).`,
        };
    }

    return null;
}

module.exports = { checkActivityEditable, EDIT_WINDOW_DAYS };
