import { Request, Response } from 'express';
import { PropertyController } from '../../controllers/property.controller';
import { PropertyModel } from '../../models/property';
import { responseHandlers } from '../../../../shared/src/utils/responseHandlers';

// Mock dependencies
jest.mock('../../models/property');
jest.mock('../../../../shared/src/utils/responseHandlers');
jest.mock('../../utils/propertyTransform');

const mockPropertyModel = PropertyModel as jest.Mocked<typeof PropertyModel>;
const mockResponseHandlers = responseHandlers as jest.Mocked<typeof responseHandlers>;

describe('PropertyController', () => {
  let propertyController: PropertyController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    propertyController = new PropertyController();
    mockRequest = {};
    mockResponse = {};
    jest.clearAllMocks();
  });

  describe('GET /properties', () => {
    it('should return properties successfully', async () => {
      // Arrange
      const mockProperties = [
        { _id: '507f1f77bcf86cd799439011', title: 'Test Property 1' },
        { _id: '507f1f77bcf86cd799439012', title: 'Test Property 2' },
      ];

      mockRequest = {
        query: { city: 'Berlin' },
      };

      // Mock PropertyModel.find to return properties
      const mockFind = jest.fn().mockReturnValue({
        sort: jest.fn().mockResolvedValue(mockProperties),
      });
      mockPropertyModel.find = mockFind;

      // Act
      await (
        propertyController as unknown as {
          getAllProperties: (req: Request, res: Response) => Promise<void>;
        }
      ).getAllProperties(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockFind).toHaveBeenCalled();
      expect(mockResponseHandlers.success).toHaveBeenCalled();
    });
  });

  describe('GET /properties/:id', () => {
    it('should return invalid ID error for malformed ID', async () => {
      // Arrange
      mockRequest = {
        params: { id: 'invalid-id' },
      };

      // Act
      await (
        propertyController as unknown as {
          getPropertyById: (req: Request, res: Response) => Promise<void>;
        }
      ).getPropertyById(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockResponseHandlers.invalidId).toHaveBeenCalledWith(mockResponse);
      expect(mockPropertyModel.findById).not.toHaveBeenCalled();
    });
  });
});
