export const company = {
  name: "Guru Shree Sai Realators",
  kannadaName: "ಗುರು ಶ್ರೀ ಸಾಯಿ ರಿಯಲೇಟರ್ಸ್",
  tagline: "Real Estate • Builders • Developers",
  blessing: "ಶ್ರೀ ಬೀರಲಿಂಗೇಶ್ವರ ಸ್ವಾಮಿ ಪ್ರಸನ್ನ",
  phones: ["9880508077", "9901893629"] as [string, string],
  whatsapp: "919880508077",
  city: "Bengaluru, Karnataka",
};

export const telHref = (phone: string) => `tel:+91${phone}`;
export const waHref = (
  message = "Hello, I would like to enquire about your real estate services.",
) => `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(message)}`;

export const dealings = [
  "Residential Sites & Houses",
  "Revenue Sites, Houses & Lands",
  "BBMP Commercial Sites & Buildings",
  "Residential Plots & Apartment Flats",
  "Industrial Lands & Agricultural Lands",
  "Villas & Independent Houses",
  "Rental Lands & Other Properties",
  "Warehouse & Vacant Land for Rent",
];

export const transactions = ["Sale", "Purchase", "Rent", "Mortgage", "Lease", "Joint Development"];

export const legalServices = [
  "Advocate Consultant",
  "Advocate Legal Opinion",
  "Drafting of Sale Deeds",
  "Sale Agreements",
  "Rental & Lease Deeds",
  "Mortgage Deeds",
  "Registration Works",
  "Searching & Getting Property Documents",
];

export const constructionServices = [
  "Building Construction",
  "Plumbing Works",
  "Electrical Works",
  "Interior Design",
  "Architecture",
  "Vastu Consultant",
];

export interface Project {
  id: string;
  title: string;
  category: "Residential" | "Commercial" | "Industrial" | "Plots" | "Construction";
  location: string;
  image: string;
  description: string;
  year: number;
  details?: string[];
}

export const projects: Project[] = [
  {
    id: "1",
    title: "Premium Villas - White Field",
    category: "Residential",
    location: "Whitefield, Bengaluru",
    image: "hero-villa.jpg",
    description: "Luxury villa complex with modern amenities and sustainable design",
    year: 2023,
    details: ["12 units", "Individual villas", "3-4 BHK", "Clubhouse & Gardens"],
  },
  {
    id: "2",
    title: "Residential Apartments Complex",
    category: "Residential",
    location: "Koramangala, Bengaluru",
    image: "house-night.jpg",
    description: "Multi-story residential complex with world-class facilities",
    year: 2022,
    details: ["180 apartments", "2-3 BHK", "Swimming pool", "Gym & Yoga center"],
  },
  {
    id: "3",
    title: "Commercial Office Space",
    category: "Commercial",
    location: "Indiranagar, Bengaluru",
    image: "plots-aerial.jpg",
    description: "Modern commercial building designed for corporate offices",
    year: 2023,
    details: ["50,000 Sq.ft", "IT Parks", "Parking facility", "Conference rooms"],
  },
  {
    id: "4",
    title: "Industrial Warehouse",
    category: "Industrial",
    location: "Peenya, Bengaluru",
    image: "hero-villa.jpg",
    description: "Large-scale industrial warehouse with modern infrastructure",
    year: 2021,
    details: ["100,000 Sq.ft", "Loading docks", "24/7 Security", "Separate offices"],
  },
  {
    id: "5",
    title: "Residential Plot Development",
    category: "Plots",
    location: "Sarjapur Road, Bengaluru",
    image: "plots-aerial.jpg",
    description: "Well-planned residential plot community with excellent connectivity",
    year: 2022,
    details: ["150 plots", "25x40 to 50x80", "Ready to build", "Gated community"],
  },
  {
    id: "6",
    title: "Commercial Plot - BBMP Approved",
    category: "Plots",
    location: "Marathahalli, Bengaluru",
    image: "house-night.jpg",
    description: "BBMP approved commercial plots ideal for retail and offices",
    year: 2023,
    details: ["20 plots", "Commercial zoning", "High visibility", "Road access"],
  },
];
