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
