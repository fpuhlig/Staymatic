import { Router, Request, Response } from 'express';
import { PropertyModel } from '../models/property';
import { createPropertySchema, updatePropertySchema } from '../../../shared/src/schemas/property';
import { BetterAuthUserService } from '../utils/betterAuthUsers';
import { transformPropertyDocument } from '../utils/propertyTransform';
import {
  buildPropertyFilter,
  isValidObjectId,
  APP_CONSTANTS,
  responseHandlers,
} from '../../../shared/src/index';

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

      responseHandlers.success(res, formattedProperties);
    } catch {
      responseHandlers.serverError(res, APP_CONSTANTS.ERRORS.FETCH_PROPERTIES_FAILED, 'Property');
    }
  };

  // GET /api/properties/:id - Get single property
  private getPropertyById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
        responseHandlers.invalidId(res);
        return;
      }

      const property = await PropertyModel.findById(id);

      if (!property) {
        responseHandlers.notFound(res);
        return;
      }

      responseHandlers.success(res, transformPropertyDocument(property));
    } catch {
      responseHandlers.serverError(res, APP_CONSTANTS.ERRORS.FETCH_PROPERTY_FAILED, 'Property');
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
        responseHandlers.validationError(res, { errors: validationResult.error.errors });
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

      responseHandlers.success(res, transformPropertyDocument(savedProperty), 201);
    } catch {
      responseHandlers.serverError(res, APP_CONSTANTS.ERRORS.CREATE_PROPERTY_FAILED, 'Property');
    }
  };

  // PUT /api/properties/:id - Update property
  private updateProperty = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
        responseHandlers.invalidId(res);
        return;
      }

      const property = await PropertyModel.findById(id);

      if (!property) {
        responseHandlers.notFound(res);
        return;
      }

      const validationResult = updatePropertySchema.safeParse(req.body);

      if (!validationResult.success) {
        responseHandlers.validationError(res, { errors: validationResult.error.errors });
        return;
      }

      const updatedProperty = await PropertyModel.findByIdAndUpdate(id, validationResult.data, {
        new: true,
        runValidators: true,
      });

      responseHandlers.success(res, transformPropertyDocument(updatedProperty!));
    } catch {
      responseHandlers.serverError(res, APP_CONSTANTS.ERRORS.UPDATE_PROPERTY_FAILED, 'Property');
    }
  };

  // DELETE /api/properties/:id - Delete property
  private deleteProperty = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
        responseHandlers.invalidId(res);
        return;
      }

      const property = await PropertyModel.findById(id);

      if (!property) {
        responseHandlers.notFound(res);
        return;
      }

      await PropertyModel.findByIdAndDelete(id);

      responseHandlers.successWithMessage(res, APP_CONSTANTS.SUCCESS.PROPERTY_DELETED);
    } catch {
      responseHandlers.serverError(res, APP_CONSTANTS.ERRORS.DELETE_PROPERTY_FAILED, 'Property');
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

      responseHandlers.successWithMeta(res, propertiesWithHosts, {
        hostsFound: propertiesWithHosts.filter(p => p.host).length,
      });
    } catch {
      responseHandlers.serverError(
        res,
        APP_CONSTANTS.ERRORS.FETCH_PROPERTIES_WITH_HOSTS_FAILED,
        'Property',
      );
    }
  };

  // GET /api/properties/:id/with-host - Get single property with host data
  private getPropertyWithHost = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
        responseHandlers.invalidId(res);
        return;
      }

      const property = await PropertyModel.findById(id);

      if (!property) {
        responseHandlers.notFound(res);
        return;
      }

      // Fetch host data
      const host = await BetterAuthUserService.getUserById(property.hostId);
      const transformedProperty = transformPropertyDocument(property);

      responseHandlers.success(res, {
        ...transformedProperty,
        host: BetterAuthUserService.formatUser(host), // Add host data
      });
    } catch {
      responseHandlers.serverError(
        res,
        APP_CONSTANTS.ERRORS.FETCH_PROPERTY_WITH_HOST_FAILED,
        'Property',
      );
    }
  };
}
