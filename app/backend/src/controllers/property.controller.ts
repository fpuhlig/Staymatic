import { Router, Request, Response } from 'express';
import { PropertyModel } from '../models/property';
import { createPropertySchema, updatePropertySchema } from '../../../shared/src/schemas/property';
import { BetterAuthUserService } from '../utils/betterAuthUsers';
import { transformPropertyDocument } from '../utils/propertyTransform';
import { buildPropertyFilter, isValidObjectId, APP_CONSTANTS } from '../../../shared/src/index';

export class PropertyController {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', this.getAllProperties);
    this.router.get('/with-hosts', this.getPropertiesWithHosts);
    this.router.get('/:id', this.getPropertyById);
    this.router.get('/:id/with-host', this.getPropertyWithHost);
    this.router.post('/', this.createProperty);
    this.router.put('/:id', this.updateProperty);
    this.router.delete('/:id', this.deleteProperty);
  }

  // GET /api/properties - Get all properties with filtering
  private getAllProperties = async (req: Request, res: Response): Promise<void> => {
    try {
      const { hostId, city, minPrice, maxPrice } = req.query;
      const filter = buildPropertyFilter({
        hostId: hostId as string,
        city: city as string,
        minPrice: minPrice as string,
        maxPrice: maxPrice as string,
      });

      const properties = await PropertyModel.find(filter).sort(APP_CONSTANTS.DEFAULT_SORT_ORDER);
      const formattedProperties = properties.map(transformPropertyDocument);

      res.json({
        success: true,
        data: formattedProperties,
      });
    } catch (error) {
      console.error('[Property] Error getting all properties:', error);
      res.status(500).json({
        success: false,
        error: APP_CONSTANTS.ERRORS.FETCH_PROPERTIES_FAILED,
      });
    }
  };

  // GET /api/properties/:id - Get single property
  private getPropertyById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
        res.status(400).json({
          success: false,
          error: APP_CONSTANTS.ERRORS.INVALID_ID,
        });
        return;
      }

      const property = await PropertyModel.findById(id);

      if (!property) {
        res.status(404).json({
          success: false,
          error: APP_CONSTANTS.ERRORS.PROPERTY_NOT_FOUND,
        });
        return;
      }

      res.json({
        success: true,
        data: transformPropertyDocument(property),
      });
    } catch (error) {
      console.error('[Property] Error getting property by ID:', error);
      res.status(500).json({
        success: false,
        error: APP_CONSTANTS.ERRORS.FETCH_PROPERTY_FAILED,
      });
    }
  };

  // POST /api/properties - Create new property
  private createProperty = async (req: Request, res: Response): Promise<void> => {
    try {
      // Use hostId from request body
      const userId = req.body.hostId || 'anonymous';

      // Validate request body with Zod
      const validationResult = createPropertySchema.safeParse(req.body);

      if (!validationResult.success) {
        res.status(400).json({
          success: false,
          error: APP_CONSTANTS.ERRORS.VALIDATION_FAILED,
          details: validationResult.error.errors,
        });
        return;
      }

      const {
        title,
        description,
        imageUrl,
        images,
        location,
        price,
        amenities,
        availableFrom,
        availableTo,
      } = validationResult.data;

      const property = new PropertyModel({
        hostId: userId,
        title,
        description,
        imageUrl,
        images,
        location,
        price,
        amenities,
        availableFrom,
        availableTo,
      });

      const savedProperty = await property.save();

      res.status(201).json({
        success: true,
        data: transformPropertyDocument(savedProperty),
      });
    } catch (error) {
      console.error('[Property] Error creating property:', error);
      res.status(500).json({
        success: false,
        error: APP_CONSTANTS.ERRORS.CREATE_PROPERTY_FAILED,
      });
    }
  };

  // PUT /api/properties/:id - Update property
  private updateProperty = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
        res.status(400).json({
          success: false,
          error: APP_CONSTANTS.ERRORS.INVALID_ID,
        });
        return;
      }

      const property = await PropertyModel.findById(id);

      if (!property) {
        res.status(404).json({
          success: false,
          error: APP_CONSTANTS.ERRORS.PROPERTY_NOT_FOUND,
        });
        return;
      }

      const validationResult = updatePropertySchema.safeParse(req.body);

      if (!validationResult.success) {
        res.status(400).json({
          success: false,
          error: APP_CONSTANTS.ERRORS.VALIDATION_FAILED,
          details: validationResult.error.errors,
        });
        return;
      }

      const updatedProperty = await PropertyModel.findByIdAndUpdate(id, validationResult.data, {
        new: true,
        runValidators: true,
      });

      res.json({
        success: true,
        data: transformPropertyDocument(updatedProperty!),
      });
    } catch (error) {
      console.error('[Property] Error updating property:', error);
      res.status(500).json({
        success: false,
        error: APP_CONSTANTS.ERRORS.UPDATE_PROPERTY_FAILED,
      });
    }
  };

  // DELETE /api/properties/:id - Delete property
  private deleteProperty = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
        res.status(400).json({
          success: false,
          error: APP_CONSTANTS.ERRORS.INVALID_ID,
        });
        return;
      }

      const property = await PropertyModel.findById(id);

      if (!property) {
        res.status(404).json({
          success: false,
          error: APP_CONSTANTS.ERRORS.PROPERTY_NOT_FOUND,
        });
        return;
      }

      await PropertyModel.findByIdAndDelete(id);

      res.json({
        success: true,
        message: APP_CONSTANTS.SUCCESS.PROPERTY_DELETED,
      });
    } catch (error) {
      console.error('[Property] Error deleting property:', error);
      res.status(500).json({
        success: false,
        error: APP_CONSTANTS.ERRORS.DELETE_PROPERTY_FAILED,
      });
    }
  };

  // GET /api/properties/with-hosts - Get all properties with Better Auth user data
  private getPropertiesWithHosts = async (req: Request, res: Response): Promise<void> => {
    try {
      const { hostId, city, minPrice, maxPrice } = req.query;
      const filter = buildPropertyFilter({
        hostId: hostId as string,
        city: city as string,
        minPrice: minPrice as string,
        maxPrice: maxPrice as string,
      });

      const properties = await PropertyModel.find(filter).sort(APP_CONSTANTS.DEFAULT_SORT_ORDER);

      // Fetch host data for each property
      const propertiesWithHosts = await Promise.all(
        properties.map(async property => {
          const host = await BetterAuthUserService.getUserById(property.hostId);
          const transformedProperty = transformPropertyDocument(property);

          return {
            ...transformedProperty,
            host: BetterAuthUserService.formatUser(host), // Add host data
          };
        }),
      );

      res.json({
        success: true,
        data: propertiesWithHosts,
        hostsFound: propertiesWithHosts.filter(p => p.host).length,
      });
    } catch (error) {
      console.error('[Property] Error getting properties with hosts:', error);
      res.status(500).json({
        success: false,
        error: APP_CONSTANTS.ERRORS.FETCH_PROPERTIES_WITH_HOSTS_FAILED,
      });
    }
  };

  // GET /api/properties/:id/with-host - Get single property with host data
  private getPropertyWithHost = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
        res.status(400).json({
          success: false,
          error: APP_CONSTANTS.ERRORS.INVALID_ID,
        });
        return;
      }

      const property = await PropertyModel.findById(id);

      if (!property) {
        res.status(404).json({
          success: false,
          error: APP_CONSTANTS.ERRORS.PROPERTY_NOT_FOUND,
        });
        return;
      }

      // Fetch host data
      const host = await BetterAuthUserService.getUserById(property.hostId);
      const transformedProperty = transformPropertyDocument(property);

      res.json({
        success: true,
        data: {
          ...transformedProperty,
          host: BetterAuthUserService.formatUser(host), // Add host data
        },
      });
    } catch (error) {
      console.error('[Property] Error getting property with host:', error);
      res.status(500).json({
        success: false,
        error: APP_CONSTANTS.ERRORS.FETCH_PROPERTY_WITH_HOST_FAILED,
      });
    }
  };
}
