# Information Architecture

## Database System Decision

**Chosen Database:** MongoDB

**Reasoning:**

- Flexible schema for diverse property types and user data
- JSON-like documents match our API structure
- Excellent scalability for growing user base
- Strong community support and integration with Node.js

## Logical Structure and Main Entities

### Core Entities

```
Users
├── _id, name, email, password, role (guest/host/admin)
├── preferences: [String] (location, amenities, price_range)
└── booking_history: [ObjectId] → Bookings

Properties
├── _id, title, description, location, price_per_night
├── host_id: ObjectId → Users
├── amenities: [String], images: [String]
└── availability: [Date]

Bookings
├── _id, guest_id: ObjectId → Users
├── property_id: ObjectId → Properties
├── check_in, check_out, total_price, status
└── created_at, updated_at

Reviews
├── _id, booking_id: ObjectId → Bookings
├── rating: Number, comment: String
└── created_at
```

### Key Relations

- Users (hosts) → Properties (1:many)
- Users (guests) → Bookings (1:many)
- Properties → Bookings (1:many)
- Bookings → Reviews (1:1)

## Main Views by User Profiles

### Guest User Views

- **Search & Discovery:** Property listings with filters
- **Booking Management:** Personal booking history and status
- **Profile Dashboard:** Preferences and past reviews

### Host User Views

- **Property Management:** Add/edit listings and availability
- **Booking Requests:** Accept/decline incoming requests
- **Revenue Dashboard:** Earnings and booking statistics

### Admin Views

- **User Management:** Monitor and moderate user accounts
- **Platform Analytics:** Usage statistics and performance metrics

## User Groups

### Primary Users

- **Leisure Travelers (25-45):** Families and couples seeking vacation rentals
- **Business Travelers (30-50):** Professionals needing temporary accommodation
- **Property Owners (35-65):** Individuals monetizing their properties

### Secondary Users

- **Platform Administrators:** Managing operations and user support

## Sample Content Examples

### For Leisure Travelers

- **Property Title:** "Cozy Mountain Cabin with Lake View"
- **Description:** "Perfect for weekend getaways. Fully equipped kitchen, fireplace, and private deck overlooking serene lake."
- **Amenities:** WiFi, Kitchen, Parking, Pet-friendly

### For Business Travelers

- **Property Title:** "Downtown Executive Apartment"
- **Description:** "Modern 1BR in business district. High-speed internet, workspace, walking distance to conference centers."
- **Amenities:** WiFi, Workspace, 24/7 Check-in, Business Center

### For Property Owners

- **Dashboard Messages:** "Your property 'Lake House' has 3 new booking requests"
- **Revenue Summary:** "This month: €1,240 earned from 8 nights booked"
- **Tips:** "Add photos of your kitchen to increase bookings by 23%"
