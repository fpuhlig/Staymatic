#!/bin/bash

# Staymatic Test Data Creation Script
# Creates 3 users with profile pictures and 2 properties each

BASE_URL="http://localhost:3001"
API_URL="${BASE_URL}/api"

echo "🏠 Creating test data for Staymatic..."
echo "=================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to create user and get session
create_user() {
    local name="$1"
    local email="$2"
    local password="$3"
    local profile_image="$4"
    
    echo -e "${YELLOW}📝 Creating user: $name ($email)${NC}"
    
    # Create user
    response=$(curl -s -X POST "${API_URL}/auth/sign-up/email" \
        -H "Content-Type: application/json" \
        -c "cookies_${email}.txt" \
        -d "{
            \"name\": \"$name\",
            \"email\": \"$email\",
            \"password\": \"$password\"
        }")
    
    if [[ $? -eq 0 ]]; then
        echo -e "${GREEN}✅ User created successfully${NC}"
        
        # Get user ID from users API
        echo -e "${YELLOW}🔐 Getting user ID...${NC}"
        users_response=$(curl -s -X GET "${API_URL}/users" \
            -H "Content-Type: application/json" \
            -b "cookies_${email}.txt")
        
        if [[ $? -eq 0 ]]; then
            # Extract user ID by email from users list
            user_id=$(echo "$users_response" | grep -o "\"id\":\"[^\"]*\"[^}]*\"email\":\"$email\"" | grep -o "\"id\":\"[^\"]*\"" | cut -d'"' -f4)
            
            if [[ -n "$user_id" ]]; then
                echo -e "${GREEN}✅ User ID found${NC}"
                echo "User ID: $user_id"
                
                # Update user profile with image
                if [[ -n "$profile_image" ]]; then
                    echo -e "${YELLOW}🖼️  Adding profile picture...${NC}"
                    profile_response=$(curl -s -X PUT "${API_URL}/users/profile" \
                        -H "Content-Type: application/json" \
                        -b "cookies_${email}.txt" \
                        -d "{
                            \"userId\": \"$user_id\",
                            \"name\": \"$name\",
                            \"image\": \"$profile_image\"
                        }")
                    
                    if echo "$profile_response" | grep -q '"success":true'; then
                        echo -e "${GREEN}✅ Profile picture added${NC}"
                    else
                        echo -e "${YELLOW}⚠️  Profile picture update failed${NC}"
                    fi
                fi
                
                # Return user ID via global variable
                CURRENT_USER_ID="$user_id"
                return 0
            else
                echo -e "${RED}❌ Could not find user ID for email: $email${NC}"
                # Debug: show response
                echo "Response: $users_response" | head -c 200
                return 1
            fi
        else
            echo -e "${RED}❌ Failed to get users list${NC}"
            return 1
        fi
    else
        echo -e "${RED}❌ Failed to create user${NC}"
        return 1
    fi
}

# Function to convert amenities string to JSON array
create_amenities_json() {
    local amenities="$1"
    local json_array=""
    
    if [[ -n "$amenities" ]]; then
        # Split by comma and create JSON array
        IFS=',' read -ra AMENITIES_ARRAY <<< "$amenities"
        json_array="["
        for i in "${!AMENITIES_ARRAY[@]}"; do
            if [[ $i -gt 0 ]]; then
                json_array+=","
            fi
            json_array+="\"${AMENITIES_ARRAY[$i]// /}\""  # Remove spaces
        done
        json_array+="]"
    else
        json_array="[]"
    fi
    
    echo "$json_array"
}

# Function to convert images string to JSON array
create_images_json() {
    local images="$1"
    local json_array=""
    
    if [[ -n "$images" ]]; then
        # Split by comma and create JSON array
        IFS=',' read -ra IMAGES_ARRAY <<< "$images"
        json_array="["
        for i in "${!IMAGES_ARRAY[@]}"; do
            if [[ $i -gt 0 ]]; then
                json_array+=","
            fi
            json_array+="\"${IMAGES_ARRAY[$i]// /}\""  # Remove spaces
        done
        json_array+="]"
    else
        json_array="[]"
    fi
    
    echo "$json_array"
}

# Function to create property with multiple images and realistic dates
create_property() {
    local email="$1"
    local host_id="$2"
    local title="$3"
    local description="$4"
    local image_url="$5"
    local additional_images="$6"
    local address="$7"
    local city="$8"
    local country="$9"
    local amount="${10}"
    local currency="${11}"
    local amenities="${12}"
    local available_from="${13}"
    local available_to="${14}"
    
    echo -e "${YELLOW}🏡 Creating property: $title${NC}"
    
    # Convert amenities and images to JSON arrays
    amenities_json=$(create_amenities_json "$amenities")
    images_json=$(create_images_json "$additional_images")
    
    response=$(curl -s -X POST "${API_URL}/properties" \
        -H "Content-Type: application/json" \
        -b "cookies_${email}.txt" \
        -d "{
            \"hostId\": \"$host_id\",
            \"title\": \"$title\",
            \"description\": \"$description\",
            \"imageUrl\": \"$image_url\",
            \"images\": $images_json,
            \"location\": {
                \"address\": \"$address\",
                \"city\": \"$city\",
                \"country\": \"$country\"
            },
            \"price\": {
                \"amount\": $amount,
                \"currency\": \"$currency\",
                \"period\": \"night\"
            },
            \"amenities\": $amenities_json,
            \"availableFrom\": \"$available_from\",
            \"availableTo\": \"$available_to\"
        }")
    
    if [[ $? -eq 0 ]]; then
        # Check if response contains success
        if echo "$response" | grep -q '"success":true'; then
            echo -e "${GREEN}✅ Property created successfully${NC}"
        else
            echo -e "${YELLOW}⚠️  Property creation returned response${NC}"
            echo "Response: $response" | head -c 200
        fi
    else
        echo -e "${RED}❌ Failed to create property${NC}"
        echo "Response: $response" | head -c 200  # Show error details
    fi
}

# Create all users first
echo -e "\n${YELLOW}👤 USER 1: Maria Schmidt${NC}"
if create_user "Maria Schmidt" "maria.schmidt@berlin-stays.com" "MariaSecure123!" "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face"; then
    MARIA_ID="$CURRENT_USER_ID"
fi

echo -e "\n${YELLOW}👤 USER 2: Hans Müller${NC}"
if create_user "Hans Müller" "hans.mueller@munich-homes.de" "HansSecure456!" "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"; then
    HANS_ID="$CURRENT_USER_ID"
fi

echo -e "\n${YELLOW}👤 USER 3: Anna Weber${NC}"
if create_user "Anna Weber" "anna.weber@hamburg-harbor.com" "AnnaSecure789!" "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face"; then
    ANNA_ID="$CURRENT_USER_ID"
fi

# Now create properties in mixed order
echo -e "\n${YELLOW}🏡 Creating properties in mixed order...${NC}"

# Property 1: Maria's Berlin apartment
create_property "maria.schmidt@berlin-stays.com" "$MARIA_ID" \
    "Cozy Apartment in Prenzlauer Berg" \
    "Beautiful 2-bedroom apartment in the heart of Prenzlauer Berg. Perfect for couples or small families. Walking distance to cafes, restaurants, and public transport. Fully equipped kitchen, comfortable living area, and quiet bedroom with quality beds. Experience authentic Berlin life in this charming neighborhood known for its vibrant culture and excellent dining scene." \
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800" \
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800,https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800,https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800,https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800" \
    "Kastanienallee 45" \
    "Berlin" \
    "Germany" \
    "89" \
    "EUR" \
    "WiFi,Kitchen,Heating,Washing Machine,Coffee Machine,Balcony" \
    "2025-01-01" \
    "2025-06-30"

# Property 2: Hans's Munich Bavarian apartment
create_property "hans.mueller@munich-homes.de" "$HANS_ID" \
    "Bavarian Charm in Schwabing" \
    "Authentic Bavarian apartment in the trendy Schwabing district. This spacious 3-bedroom home combines traditional Munich charm with modern comfort. Located near the English Garden and University. Perfect for families or groups wanting to experience real Munich culture. Features traditional German furniture, fully equipped kitchen, and a sunny terrace with garden view." \
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800" \
    "https://images.unsplash.com/photo-1595846519845-68e298c2edd8?w=800,https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800,https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800,https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800" \
    "Leopoldstraße 123" \
    "Munich" \
    "Germany" \
    "125" \
    "EUR" \
    "WiFi,Kitchen,Garden,Terrace,Heating,Parking,Washing Machine" \
    "2025-02-01" \
    "2025-11-30"

# Property 3: Anna's Hamburg harbor apartment
create_property "anna.weber@hamburg-harbor.com" "$ANNA_ID" \
    "Harbor View Apartment in HafenCity" \
    "Stunning waterfront apartment with panoramic harbor views in Hamburg's prestigious HafenCity district. This modern 2-bedroom apartment features floor-to-ceiling windows, designer furniture, and a private balcony overlooking the Elbe River. Perfect for romantic getaways or business trips. Walking distance to Miniatur Wunderland, Elbphilharmonie, and historic Speicherstadt." \
    "https://images.unsplash.com/photo-1592928302636-c83cf1e1c887?w=800" \
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800,https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=800,https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800,https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800" \
    "Am Sandtorkai 12" \
    "Hamburg" \
    "Germany" \
    "145" \
    "EUR" \
    "WiFi,Harbor View,Balcony,Modern Kitchen,Elevator,Dishwasher" \
    "2025-02-15" \
    "2025-09-15"

# Property 4: Hans's Munich executive loft
create_property "hans.mueller@munich-homes.de" "$HANS_ID" \
    "Executive Loft near BMW Museum" \
    "Luxurious loft apartment in modern building near BMW Museum and Olympic Park. Designed for business executives and affluent travelers. Features premium furnishings, state-of-the-art kitchen, home office space, and panoramic city views. Building amenities include gym, concierge service, and underground parking. Walking distance to public transport and major business districts." \
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800" \
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800,https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=800,https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800,https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800" \
    "Olympiapark 7" \
    "Munich" \
    "Germany" \
    "180" \
    "EUR" \
    "WiFi,Air Conditioning,Gym,Concierge,Parking,City View,Office Space" \
    "2025-01-01" \
    "2025-12-31"

# Property 5: Anna's Hamburg townhouse
create_property "anna.weber@hamburg-harbor.com" "$ANNA_ID" \
    "Cozy Townhouse in St. Pauli" \
    "Charming 19th-century townhouse in vibrant St. Pauli neighborhood. This unique 3-bedroom property combines historic character with modern amenities. Features original brick walls, hardwood floors, and a private courtyard garden. Close to the famous Reeperbahn, St. Pauli Theater, and excellent restaurants. Ideal for groups wanting an authentic Hamburg experience with easy access to nightlife and culture." \
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800" \
    "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800,https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800,https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800,https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800" \
    "Bernhard-Nocht-Straße 34" \
    "Hamburg" \
    "Germany" \
    "95" \
    "EUR" \
    "WiFi,Garden,Historic Building,Kitchen,Courtyard,Near Nightlife" \
    "2025-03-01" \
    "2025-10-31"


# Property 6: Maria's Berlin studio
create_property "maria.schmidt@berlin-stays.com" "$MARIA_ID" \
    "Modern Studio near Alexanderplatz" \
    "Stylish studio apartment just 10 minutes from Alexanderplatz. Ideal for business travelers and tourists. Features modern amenities, high-speed internet, and a comfortable workspace. The building offers 24/7 security and is located in a safe, well-connected area. Easy access to major attractions like Museum Island, Brandenburg Gate, and the TV Tower." \
    "https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=800" \
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800,https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800,https://images.unsplash.com/photo-1571055107559-3e67626fa8be?w=800,https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800" \
    "Karl-Marx-Allee 78" \
    "Berlin" \
    "Germany" \
    "65" \
    "EUR" \
    "WiFi,Air Conditioning,Desk,Coffee Machine,Elevator,Security" \
    "2025-01-15" \
    "2025-12-31"

# Cleanup function to remove cookie files
cleanup() {
    echo -e "\n${YELLOW}🧹 Cleaning up cookie files...${NC}"
    rm -f cookies_*.txt
    echo -e "${GREEN}✅ Cookie files cleaned up!${NC}"
}

# Set trap to cleanup on script exit (normal or interrupted)
trap cleanup EXIT

echo -e "\n${GREEN}🎉 Test data creation completed!${NC}"
echo -e "${YELLOW}📊 Summary:${NC}"
echo "- 3 users created with realistic profile pictures"
echo "- 6 properties created across Berlin, Munich, and Hamburg"
echo "- Each property has 4-5 additional images for carousel"
echo "- All data includes realistic descriptions, amenities, and pricing"
echo "- Check-in/Check-out dates updated to 2025 for current availability"
echo ""
echo -e "${YELLOW}🧹 Cleanup:${NC}"
echo "Cookie files created for testing (cookies_*.txt)"
echo "You can delete these after testing is complete"

# List created cookie files
ls -la cookies_*.txt 2>/dev/null && echo "" || echo "No cookie files found"

echo -e "${GREEN}✨ Ready to test your application!${NC}" 