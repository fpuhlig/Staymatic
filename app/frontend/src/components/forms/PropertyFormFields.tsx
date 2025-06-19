import { FormField } from './FormField';
import { FormSection } from './FormSection';
import { PropertyFormData } from '../../hooks/usePropertyForm';

interface PropertyFormFieldsProps {
  formData: PropertyFormData;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => void;
}

export const PropertyFormFields = ({ formData, onChange }: PropertyFormFieldsProps) => {
  return (
    <>
      {/* Basic Information */}
      <FormSection title="Basic Information">
        <div className="grid grid-cols-1 gap-4">
          <FormField
            label="Property Title"
            name="title"
            type="text"
            value={formData.title}
            onChange={onChange}
            placeholder="e.g., Beautiful Apartment in Berlin"
            required
          />

          <FormField
            label="Description"
            name="description"
            type="textarea"
            value={formData.description}
            onChange={onChange}
            placeholder="Describe your property, its features, and what makes it special..."
            rows={4}
            required
          />

          <FormField
            label="Image URL"
            name="imageUrl"
            type="url"
            value={formData.imageUrl}
            onChange={onChange}
            placeholder="https://images.unsplash.com/photo-..."
            required
          />
        </div>
      </FormSection>

      {/* Location */}
      <FormSection title="Location">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <FormField
              label="Address"
              name="address"
              type="text"
              value={formData.address}
              onChange={onChange}
              placeholder="e.g., Alexanderplatz 1"
              required
            />
          </div>

          <FormField
            label="City"
            name="city"
            type="text"
            value={formData.city}
            onChange={onChange}
            placeholder="e.g., Berlin"
            required
          />

          <FormField
            label="Country"
            name="country"
            type="select"
            value={formData.country}
            onChange={onChange}
            required
          >
            <option value="Germany">Germany</option>
            <option value="Austria">Austria</option>
            <option value="Switzerland">Switzerland</option>
          </FormField>
        </div>
      </FormSection>

      {/* Pricing */}
      <FormSection title="Pricing">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <FormField
            label="Price"
            name="amount"
            type="number"
            value={formData.amount}
            onChange={onChange}
            placeholder="0"
            min="0"
            step="0.01"
            required
          />

          <FormField
            label="Currency"
            name="currency"
            type="select"
            value={formData.currency}
            onChange={onChange}
            required
          >
            <option value="EUR">EUR (€)</option>
            <option value="USD">USD ($)</option>
            <option value="GBP">GBP (£)</option>
          </FormField>

          <FormField
            label="Period"
            name="period"
            type="select"
            value={formData.period}
            onChange={onChange}
            required
          >
            <option value="night">Per Night</option>
            <option value="week">Per Week</option>
            <option value="month">Per Month</option>
          </FormField>
        </div>
      </FormSection>

      {/* Amenities */}
      <FormSection title="Amenities" description="Enter amenities separated by commas">
        <FormField
          label="Amenities (comma-separated)"
          name="amenities"
          type="text"
          value={formData.amenities}
          onChange={onChange}
          placeholder="WiFi, Kitchen, Air Conditioning, Balcony"
        />
      </FormSection>

      {/* Availability */}
      <FormSection title="Availability">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            label="Available From"
            name="availableFrom"
            type="date"
            value={formData.availableFrom}
            onChange={onChange}
            required
          />

          <FormField
            label="Available Until"
            name="availableTo"
            type="date"
            value={formData.availableTo}
            onChange={onChange}
            required
          />
        </div>
      </FormSection>
    </>
  );
};
