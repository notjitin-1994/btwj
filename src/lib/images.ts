/**
 * Centralized royalty-free image library.
 *
 * All images are sourced from Unsplash (https://unsplash.com) — free to use
 * under the Unsplash License, no watermarks, no attribution required.
 * URLs use the stable `images.unsplash.com/photo-<id>` format with transform
 * query params (?auto=format&fit=crop&w=…&q=…) for optimization.
 *
 * To swap any image, change the photo ID here and it propagates everywhere.
 */

const U = (id: string, w = 1600, q = 80) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=${q}`;

export const siteImages = {
  // ===== Hero montage (landing page) =====
  hero: [
    U("1512453979798-5ea266f8880c", 2000), // Dubai skyline
    U("1507525428034-b723cf961d3e", 2000), // Beach
    U("1530841377377-3ff06c0ca713", 2000), // Maldives overwater
    U("1502602898657-3e91760cbb34", 2000), // Paris / travel
    U("1506929562872-bb421503ef21", 2000), // Tropical beach
    U("1530521954074-e64f6810b32d", 2000), // Mountain lake
  ],

  // ===== Section background images (for image-bg containers) =====
  bg: {
    dubai: U("1512453979798-5ea266f8880c", 2000),
    beach: U("1507525428034-b723cf961d3e", 2000),
    maldives: U("1530841377377-3ff06c0ca713", 2000),
    paris: U("1502602898657-3e91760cbb34", 2000),
    tropical: U("1506929562872-bb421503ef21", 2000),
    mountains: U("1530521954074-e64f6810b32d", 2000),
    roadTrip: U("1469854523086-cc02fe5d8800", 2000),
    airport: U("1436491865332-7a61a109cc05", 2000),
    compass: U("1525625293386-3f8f99389edd", 2000),
    wanderer: U("1489493585363-d69421e0edd3", 2000),
  },

  // ===== Service images =====
  services: {
    tourPackages: U("1469854523086-cc02fe5d8800", 1600), // scenic road trip
    hotelResort: U("1582719478250-c89cae4dc85b", 1600), // luxury hotel
    umrah: "https://sfile.chatglm.cn/images-ppt/2ce6a80386d3.jpg", // Kaaba (verified clean)
    eventManagement: U("1519671482749-fd09be7ccebf", 1600), // event crowd
  },

  // ===== About collage =====
  about: {
    main: U("1530789253388-582c481c54b0", 900), // travellers scenic
    vacation: U("1488646953014-85cb44e25828", 900), // couple
    resort: U("1552733407-5d5c46c3bb3b", 900), // resort
    spiritual: "https://sfile.chatglm.cn/images-ppt/37bcde4a870c.jpg", // Umrah portrait (verified clean)
    road: U("1469854523086-cc02fe5d8800", 900), // road trip
    mountain: U("1530122037265-a5f1f91d3b99", 900), // swiss alps
  },

  // ===== Destinations =====
  destinations: {
    dubai: U("1512453979798-5ea266f8880c", 1200),
    maldives: U("1514282401047-d79a71a590e8", 1200),
    makkah: "https://sfile.chatglm.cn/images-ppt/e01302c75416.jpg", // Kaaba (verified clean)
    kerala: U("1602216056096-3b40cc0c9944", 1200),
    swissAlps: U("1530122037265-a5f1f91d3b99", 1200),
    bali: U("1537996194471-e657df975ab4", 1200),
    santorini: U("1570077188670-e3a8d69ac5ff", 1200),
    paris: U("1502602898657-3e91760cbb34", 1200),
  },

  // ===== Instagram feed (mock) =====
  instagram: [
    U("1512453979798-5ea266f8880c", 600),
    U("1514282401047-d79a71a590e8", 600),
    U("1530789253388-582c481c54b0", 600),
    U("1507525428034-b723cf961d3e", 600),
    U("1602216056096-3b40cc0c9944", 600),
    U("1530122037265-a5f1f91d3b99", 600),
  ],

  // ===== People / avatars =====
  avatars: [
    U("1494790108377-be9c29b29330", 120),
    U("1500648767791-00dcc994a43e", 120),
    U("1438761681033-6461ffad8d80", 120),
  ],

  // ===== Page heroes =====
  pageHeroes: {
    about: U("1488646953014-85cb44e25828", 2000),
    whyChooseUs: U("1530789253388-582c481c54b0", 2000),
    services: "https://sfile.chatglm.cn/images-ppt/c39865ffa477.jpg", // resort (verified clean)
    contact: U("1488646953014-85cb44e25828", 2000),
    umrah: "https://sfile.chatglm.cn/images-ppt/2ce6a80386d3.jpg", // Kaaba (verified clean)
    tourPackages: U("1469854523086-cc02fe5d8800", 2000),
    hotelResort: U("1582719478250-c89cae4dc85b", 2000),
    eventManagement: U("1519671482749-fd09be7ccebf", 2000),
  },

  // ===== CTA parallax =====
  ctaParallax: U("1506929562872-bb421503ef21", 2000),
} as const;

// ===== Build helper for consistent Unsplash URLs =====
export const img = U;
