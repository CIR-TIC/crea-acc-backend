// controllers/propertyController.js
const db = require('../models');
const Property = db.Property;
const User = db.User;

exports.getAllProperties = async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden: Only administrators can view all properties.' });
    }

    try {
        const properties = await Property.findAll({
            order: [['audCreatedAt', 'DESC']]
        });
        res.status(200).json(properties);
    } catch (error) {
        console.error('Error fetching all properties:', error);
        res.status(500).json({ message: 'Error retrieving all properties.', error: error.message });
    }
};

exports.getPropertyById = async (req, res) => {
    const { propertyId } = req.params;

    const authenticatedUserId = req.user.id;
    const authenticatedUserRole = req.user.role;

    const propIdInt = parseInt(propertyId, 10);
    if (isNaN(propIdInt)) {
        return res.status(400).json({ message: 'Invalid property ID format.' });
    }

    try {
        const property = await Property.findByPk(propIdInt, {
            include: [
                {
                    model: User,
                    as: 'users', // Incluir los usuarios asociados
                    attributes: ['id', 'username', 'email', 'role'],
                }
            ]
        });

        if (!property) {
            return res.status(404).json({ message: 'Property not found.' });
        }

        // --- Validación de Propiedad ---
        if (authenticatedUserRole !== 'admin' && req.user.property_id !== propIdInt) {
            return res.status(403).json({ message: 'Forbidden: You do not have permission to access this property. It is not associated with your user.' });
        }

        res.status(200).json(property);
    } catch (error) {
        console.error('Error fetching property details:', error);
        res.status(500).json({ message: 'Error retrieving property details.', error: error.message });
    }
};

exports.createProperty = async (req, res) => {
    const { province, canton, parish, community, coordinates_x, coordinates_y } = req.body;
    if (!province || !canton || !parish || !community) {
        return res.status(400).json({ message: 'Province, Canton, Parish, and Community are required to create a property.' });
    }

    try {
        const user = User.findByPk(req.userId)

        const newProperty = await Property.create({
            province,
            canton,
            parish,
            community,
            coordinates_x,
            coordinates_y,
        });

        await User.update({
            property_id: newProperty.id
        }, {
            where: { id: req.userId }
        })
        res.status(201).json({ message: 'Property created successfully.', property: newProperty });
    } catch (error) {
        console.error('Error creating property:', error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ message: 'A property with this unique data already exists.', error: error.message });
        }
        res.status(500).json({ message: 'Error creating property.', error: error.message });
    }
};

exports.updateProperty = async (req, res) => {
    const { propertyId } = req.params;
    const updates = req.body;

    const authenticatedUserId = req.user.id;
    const authenticatedUserRole = req.user.role;

    const propIdInt = parseInt(propertyId, 10);
    if (isNaN(propIdInt)) {
        return res.status(400).json({ message: 'Invalid property ID format.' });
    }

    try {
        const property = await Property.findByPk(propIdInt);

        if (!property) {
            return res.status(404).json({ message: 'Property not found.' });
        }

        // --- Validación de Propiedad ---
        if (authenticatedUserRole !== 'admin' && req.user.property_id !== propIdInt) {
            return res.status(403).json({ message: 'Forbidden: You do not have permission to update this property.' });
        }

        // Añade la fecha de actualización personalizada
        updates.audUpdatedAt = new Date();

        // Actualizar la propiedad con los datos del body y la fecha de actualización
        await property.update(updates);

        res.status(200).json({ message: 'Property updated successfully.', property });
    } catch (error) {
        console.error('Error updating property:', error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ message: 'Update failed: A property with this data already exists.', error: error.message });
        }
        res.status(500).json({ message: 'Error updating property.', error: error.message });
    }
};

exports.deleteProperty = async (req, res) => {
    const { propertyId } = req.params;
    // El rol 'admin' ya se valida en la ruta con authorizeRoles('admin')

    const propIdInt = parseInt(propertyId, 10);
    if (isNaN(propIdInt)) {
        return res.status(400).json({ message: 'Invalid property ID format.' });
    }

    try {
        const property = await Property.findByPk(propIdInt);

        if (!property) {
            return res.status(404).json({ message: 'Property not found.' });
        }

        // Para un soft delete: actualizar audDeletedAt en lugar de destroy
        property.audDeletedAt = new Date();
        await property.save();
        // Si quieres un hard delete:
        // await property.destroy();

        res.status(200).json({ message: 'Property deleted successfully.' });
    } catch (error) {
        console.error('Error deleting property:', error);
        res.status(500).json({ message: 'Error deleting property.', error: error.message });
    }
};

// --- Extra: Obtener la propiedad a la que el usuario autenticado está asociado ---
exports.getMyAssociatedProperty = async (req, res) => {
    const authenticatedUserId = req.user.id;

    try {
        // Buscamos al usuario para obtener su property_id
        const user = await User.findByPk(authenticatedUserId, {
            attributes: ['id', 'username', 'email', 'property_id'] // Asegúrate de incluir property_id
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        if (user.property_id === null) {
            return res.status(404).json({ message: 'No property associated with this user.' });
        }

        // Ahora buscamos la propiedad usando el property_id del usuario
        const property = await Property.findByPk(user.property_id, {
            include: [
                {
                    model: User,
                    as: 'users',
                    attributes: ['id', 'username', 'email'],
                    where: { id: { [db.Sequelize.Op.ne]: authenticatedUserId } }, // Opcional: excluye al propio usuario de la lista de usuarios asociados
                    required: false // Usa false si la propiedad puede existir sin usuarios, o si no todos tienen que ser incluidos.
                }
            ]
        });

        if (!property) {
            return res.status(404).json({ message: `Associated property with ID ${user.property_id} not found.` });
        }

        res.status(200).json(property);
    } catch (error) {
        console.error('Error fetching associated property:', error);
        res.status(500).json({ message: 'Error retrieving associated property.', error: error.message });
    }
};