/* =====================================================================
   PROPERTY DATA — edit this file to add / change / remove properties.
   TO ADD A PROPERTY: copy one object, change the id + details, save.

   IMAGES: all images are web LINKS (Unsplash samples, illustrative only).
   TO REPLACE: paste any image link (https://...) or a local path such as
   "images/properties/property-001/cover.jpg" into the `images` list.
   The FIRST image is the cover photo.

   VIDEOS: add links/paths to `videos`, e.g.
   videos: ["videos/properties/property-001/walkthrough.mp4"]
   (MP4 or WebM). Leave [] to hide the video section.
   ===================================================================== */

// Sample photo pool (Unsplash). Replace any link, or use your own URLs.
const U = id => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=70`;
const S = [
  "1522708323590-d24dbb6b0267", "1502672260266-1c1ef2d93688", "1560448204-e02f11c3d0e2",
  "1493809842364-78817add7ffb", "1484154218962-a197022b5858", "1505691938895-1758d7feb511",
  "1560185007-cde436f6a4d0", "1512917774080-9991f1c4c750", "1536376072261-38c75010e6c9",
  "1540518614846-7eded433c457", "1586023492125-27b2c045efd7", "1556912172-45b7abe8b7e1",
  "1554995207-c18c203602cb", "1556909114-f6e7ad7d3136", "1560185893-a55cbc8c57e8"
].map(U);

/* Fields:
   area      = filter location (Shaheen Bagh, Johri Farm, Jasola, Noor Nagar, Joga Bai, Tikona Park, Jamia Nagar or "")
   config    = "1 Room Set" | "2 Room Set" | "1 BHK" ... "4 BHK"
   rent      = number (₹ per month)
   family / bachelor = true | false | null (null = not specified)
   parking   = "Bike" | "Car" | null     lift = true | false | null
   floorNo   = number for filter (0 = ground) or null
   status    = "confirm" | "available" | "rented"
   desc      = { en: "", hi: "" } optional descriptions (Hindi falls back to English)
*/
const PROPERTIES = [
  {
    id: "property-001", title: "3 BHK Flat Near Japani Gali", location: "Near Japani Gali", area: "",
    landmark: "Japani Gali", config: "3 BHK", bhk: 3, floor: "3rd Floor", floorNo: 3, rent: 25000,
    security: "Extra (amount not specified)", ref: "LSF", status: "confirm", family: null, bachelor: null,
    desc: { en: "", hi: "" },
    // REPLACE SAMPLE IMAGES WITH YOUR ORIGINAL PHOTOS (any link or local path).
    // Local path example: images/properties/property-001/cover.jpg
    images: [S[0], S[3], S[4]],
    // ADD WALKTHROUGH VIDEO: videos/properties/property-001/walkthrough.mp4
    videos: []
  },
  {
    id: "property-002", title: "1 BHK Flat in Noor Nagar", location: "Noor Nagar", area: "Noor Nagar",
    config: "1 BHK", bhk: 1, floor: "1st Floor", floorNo: 1, rent: 11000, rentNote: "Final",
    electricity: "Separate Meter", ref: "RSY", status: "confirm", family: null, bachelor: null,
    images: [S[1], S[8], S[11]], videos: []
  },
  {
    id: "property-003", title: "Furnished 2 Room Set Near Nuh Masjid", location: "Joga Bai", area: "Joga Bai",
    landmark: "Near Nuh Masjid", config: "2 Room Set", bhk: 2, floor: "Ground Floor", floorNo: 0, rent: 16000,
    furnishing: "Furnished with goods", security: "Extra (amount not specified)", electricity: "Government Meter",
    parking: "Bike", tenant: "Families and Girls Only", family: true, bachelor: true, ref: "ZD", status: "confirm",
    images: [S[2], S[5], S[9]], videos: []
  },
  {
    id: "property-004", title: "4 BHK Flat in Johri Farm", location: "Johri Farm, 9 No. Gali", area: "Johri Farm",
    config: "4 BHK", bhk: 4, floor: "4th Floor", floorNo: 4, rent: 25000, lift: false,
    electricity: "Government Meter", parking: "Bike", ref: "AHC", status: "confirm", family: null, bachelor: null,
    extras: ["Three-side open", "Gas connection available"],
    images: [S[6], S[10], S[13]], videos: []
  },
  {
    id: "property-005", title: "1 Room Set Near Tikona Park", location: "Tikona Park, Jamia Nagar, Okhla, New Delhi 110025",
    area: "Tikona Park", landmark: "Near Chhappar Wali Mosque", config: "1 Room Set", bhk: 1, floor: "4th Floor", floorNo: 4,
    rent: 7000, rentNote: "Final", security: "No Security", electricity: "Included", tenant: "Bachelor Boys Only",
    family: false, bachelor: true, ref: "NHR", status: "confirm",
    extras: ["Cooler", "Fan", "Kitchen slab", "Peaceful gallery", "Separate toilet-cum-washroom"],
    images: [S[7], S[12], S[14]], videos: []
  },
  {
    id: "property-006", title: "3 BHK Flat in Johri Farm Lane No. 1", location: "Johri Farm, Lane No. 1", area: "Johri Farm",
    config: "3 BHK", bhk: 3, size: "100 Gaj", floor: "4th Floor", floorNo: 4, rent: 32000,
    maintenance: "₹1,000/month extra (maintenance and guard)", lift: true, parking: "Car", tenant: "Families Only",
    family: true, bachelor: false, ref: "NZP", status: "confirm",
    images: [S[5], S[0], S[4]], videos: []
  },
  {
    id: "property-007", title: "2 BHK Flat Near Usmaniya Masjid", location: "Jasola", area: "Jasola",
    landmark: "Near Usmaniya Masjid", config: "2 BHK", bhk: 2, size: "70 Gaj", floor: "4th Floor", floorNo: 4, lift: true,
    rent: 17000, security: "₹17,000", maintenance: "₹1,000/month", electricity: "Commercial Meter", parking: "Bike",
    tenant: "Family Only (local tenants not allowed)", family: true, bachelor: false, ref: "NRA", status: "confirm",
    visitCharge: "₹100", availNote: "Vacant as per original listing — please confirm",
    extras: ["Agency note (needs confirmation): commercial-meter billing is said to be about 3–4 normal units per commercial unit."],
    images: [S[10], S[1], S[3]], videos: []
  },
  {
    id: "property-008", title: "3 BHK Residential Flat in Jasola", location: "Jasola", area: "Jasola",
    config: "3 BHK", bhk: 3, floor: "3rd + 1 (as supplied; exact meaning needs confirmation)", floorNo: null, rent: 23000,
    security: "₹23,000", electricity: "Government Meter", tenant: "All", family: true, bachelor: true, ref: "NRA", status: "confirm",
    visitCharge: "₹100 (adjustable against commission)", availNote: "Vacant as per original listing — visit anytime, subject to confirmation",
    images: [S[11], S[2], S[8]], videos: []
  },
  {
    id: "property-009", title: "2 BHK Flat Near Umar Dairy", location: "Shaheen Bagh", area: "Shaheen Bagh",
    landmark: "Near Umar Dairy", config: "2 BHK", bhk: 2, floor: "4th Floor, Back Side", floorNo: 4, rent: 17000,
    security: "₹17,000", electricity: "Government Meter", parking: "Bike", tenant: "Bachelors Only (local bachelors not allowed)",
    family: false, bachelor: true, ref: "NRA", status: "confirm", visitCharge: "₹100 (deductible from commission)",
    availNote: "Vacant and ready to move as per original listing — visit anytime, subject to confirmation",
    images: [S[9], S[13], S[6]], videos: []
  },
  {
    id: "property-010", title: "Fully Furnished 3 BHK in Shaheen Bagh", location: "Shaheen Bagh, 8 No. Juice Wali Gali, Okhla, New Delhi 110025",
    area: "Shaheen Bagh", config: "3 BHK", bhk: 3, size: "80 Gaj", floor: "3rd Floor, Front Side", floorNo: 3, rent: 22000,
    furnishing: "Fully Furnished", electricity: "BSES Meter", tenant: "Families Allowed", family: true, bachelor: null,
    brokerage: "15 Days", ref: "DSR", status: "confirm",
    images: [S[12], S[5], S[14]], videos: []
  },
  {
    id: "property-011", title: "3 BHK Near Javed Nihari", location: "Shaheen Bagh, 40 Futa Road", area: "Shaheen Bagh",
    landmark: "Near Javed Nihari", config: "3 BHK", bhk: 3, size: "100 Gaj", floor: "1st Floor, Front Side", floorNo: 1, rent: 32000,
    electricity: "BSES Meter", parking: "Car", tenant: "Families Allowed", family: true, bachelor: null, ref: "DSR", status: "confirm",
    images: [S[7], S[0], S[10]], videos: []
  },
  {
    id: "property-012", title: "Spacious 3 BHK in Shaheen Bagh German Line", location: "Shaheen Bagh, German Line", area: "Shaheen Bagh",
    config: "3 BHK", bhk: 3, size: "120 Gaj", floor: "3rd Floor, Front Side", floorNo: 3, rent: 25000,
    electricity: "BSES Meter", parking: "Car", tenant: "Families", family: true, bachelor: null, ref: "DSR", status: "confirm",
    images: [S[14], S[3], S[11]], videos: []
  }
];
