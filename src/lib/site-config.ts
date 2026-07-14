export const siteConfig = {
  name: "Buy The Way Journeys",
  shortName: "buytheway",
  tagline: "JOURNEYS",
  logo: "/buythewaylogo.webp",
  phone: "8921595561",
  phoneIntl: "+91 89215 95561",
  email: "info@buythewayjourneys.com",
  address: {
    line1: "B Block, First floor,",
    line2: "Mather Square,",
    line3: "Opp Ekm North Railway Station",
    pincode: "Pincode- 682018",
    full: "B Block, First floor, Mather Square, Opp Ekm North Railway Station, Pincode- 682018",
  },
  copyrightYear: 2026,
  description:
    "At Buy The Way Journeys, we specialize in providing exceptional travel experiences tailored to your needs. Whether you're looking for a dream vacation, a spiritual journey, or a seamless event, we've got you covered!",
} as const;

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; description: string }[];
};

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Why Choose Us", href: "/why-choose-us" },
  {
    label: "Our Services",
    href: "/services",
    children: [
      {
        label: "Tour Packages",
        href: "/services/tour-packages",
        description: "Inbound & outbound adventures crafted for you",
      },
      {
        label: "Hotel & Resort",
        href: "/services/hotel-resort",
        description: "Top-rated stays at the best prices",
      },
      {
        label: "Umrah",
        href: "/services/umrah",
        description: "Spiritually fulfilling, hassle-free pilgrimage",
      },
      {
        label: "Event Management",
        href: "/services/event-management",
        description: "Conferences, weddings & celebrations",
      },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export type ServiceInfo = {
  slug: string;
  title: string;
  short: string;
  description: string;
  highlights: string[];
  image: string;
  icon: string; // lucide icon name handled in component
  accent: "brand" | "teal" | "leaf";
};

export const services: ServiceInfo[] = [
  {
    slug: "tour-packages",
    title: "Tour Packages",
    short: "Inbound & Outbound",
    description:
      "Discover breathtaking destinations with our local & international tour packages. Whether you seek adventure, relaxation, or cultural experiences, we design the perfect itinerary for you.",
    highlights: [
      "Hand-picked destinations across the globe",
      "Adventure, relaxation & cultural experiences",
      "Perfectly crafted itineraries",
      "Local & international packages",
    ],
    image:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1600&q=80",
    icon: "Compass",
    accent: "brand",
  },
  {
    slug: "hotel-resort",
    title: "Hotel & Resort Bookings",
    short: "Comfortable stays",
    description:
      "Enjoy a comfortable stay at top-rated hotels and resorts. We offer exclusive deals and the best prices for your perfect getaway.",
    highlights: [
      "Top-rated hotels & luxury resorts",
      "Exclusive member-only deals",
      "Best price guarantee",
      "Seamless booking experience",
    ],
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80",
    icon: "Building2",
    accent: "teal",
  },
  {
    slug: "umrah",
    title: "Customized Umrah Packages",
    short: "Spiritual journeys",
    description:
      "Experience a spiritually fulfilling journey with our carefully curated Umrah packages. We handle flights, accommodation, and guided tours for a hassle-free pilgrimage.",
    highlights: [
      "Flights, accommodation & transfers included",
      "Guided tours of holy sites",
      "Hassle-free, devotion-first planning",
      "Carefully curated packages",
    ],
    image:
      "https://sfile.chatglm.cn/images-ppt/2ce6a80386d3.jpg",
    icon: "Moon",
    accent: "leaf",
  },
  {
    slug: "event-management",
    title: "Event Management",
    short: "Unforgettable events",
    description:
      "From corporate conferences to destination weddings, we bring your vision to life! Our expert event planners ensure a seamless and unforgettable experience.",
    highlights: [
      "Corporate conferences & galas",
      "Destination weddings & celebrations",
      "Expert event planners",
      "Seamless, unforgettable experiences",
    ],
    image:
      "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1600&q=80",
    icon: "PartyPopper",
    accent: "brand",
  },
];

export const benefitCards = [
  {
    title: "Best Price Guarantee",
    description: "We have got the best deals for you!!",
    icon: "BadgePercent",
    accent: "brand" as const,
  },
  {
    title: "Easy & Quick Booking",
    description: "Booking made so easy with Buy The Way Journeys",
    icon: "CalendarCheck2",
    accent: "teal" as const,
  },
  {
    title: "Experienced Guide",
    description:
      "We offer tailor-made tour packages for unforgettable travel experiences",
    icon: "MapPin",
    accent: "leaf" as const,
  },
];

export const stats = [
  {
    value: "10+",
    label: "Years Of Experience",
    description: "A decade of crafting journeys travellers cherish.",
  },
  {
    value: "Best",
    label: "Tour Selection",
    description: "Discover and book the perfect tour for you!!",
  },
  {
    value: "Best",
    label: "Price Guarantee",
    description: "We have got the best deals for you!!",
  },
];
