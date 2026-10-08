/* =========================================================
   YOUR PORTFOLIO CONTENT: edit this file to add your work.

   CATEGORIES = the tabs above the grid. "id" is used below,
   "label" is the text people see.

   ALBUMS = each thumbnail in the grid. Clicking one opens all
   its photos in the dark album viewer.
     title     shown on hover and at the top of the album
     category  must match a category id
     cover     the thumbnail image
     tall      true = thumbnail takes two rows (good for vertical photos)
     photos    every photo in the album, in order

   Replace the picsum.photos placeholder links with your own
   files, e.g. "images/chanel-store/01.jpg".
   ========================================================= */

const CATEGORIES = [
  { id: "interior", label: "Interior & Architecture" },
  { id: "portrait", label: "Portraiture" },
  { id: "events",   label: "Events" },
  { id: "travel",   label: "Landscape & Travel" },
  { id: "bts",      label: "Behind the Scenes" },
];

/* Placeholder helper: delete once all your photos are in. */
const ph = (seed, w, h) => `https://picsum.photos/seed/${seed}/${w}/${h}`;
const placeholderSet = (name, count) =>
  Array.from({ length: count }, (_, i) => {
    const vertical = i % 3 === 1;
    return ph(`${name}-${i}`, vertical ? 900 : 1400, vertical ? 1300 : 930);
  });

const ALBUMS = [
  // ----- Interior & Architecture -----
  { title: "Boutique store opening", category: "interior", cover: ph("int1", 800, 540), photos: placeholderSet("int1", 12) },
  { title: "Hotel lobby",            category: "interior", cover: ph("int2", 800, 540), photos: placeholderSet("int2", 8) },
  { title: "Fashion flagship",       category: "interior", cover: ph("int3", 800, 540), photos: placeholderSet("int3", 9) },
  { title: "Private residence",      category: "interior", cover: ph("int4", 800, 540), photos: placeholderSet("int4", 10) },
  { title: "Restaurant interior",    category: "interior", cover: ph("int5", 800, 540), photos: placeholderSet("int5", 7) },
  { title: "Office headquarters",    category: "interior", cover: ph("int6", 800, 540), photos: placeholderSet("int6", 6) },

  // ----- Portraiture -----
  { title: "Prewedding in the city", category: "portrait", cover: ph("por1", 800, 540),  photos: placeholderSet("por1", 10) },
  { title: "Traditional attire",     category: "portrait", cover: ph("por2", 600, 900), tall: true, photos: placeholderSet("por2", 8) },
  { title: "Couple session",         category: "portrait", cover: ph("por3", 800, 540),  photos: placeholderSet("por3", 9) },
  { title: "Family portraits",       category: "portrait", cover: ph("por4", 800, 540),  photos: placeholderSet("por4", 6) },
  { title: "Studio headshots",       category: "portrait", cover: ph("por5", 800, 540),  photos: placeholderSet("por5", 12) },

  // ----- Events -----
  { title: "Fashion week runway",    category: "events", cover: ph("evt1", 800, 540),  photos: placeholderSet("evt1", 14) },
  { title: "Gala dinner",            category: "events", cover: ph("evt2", 800, 540),  photos: placeholderSet("evt2", 8) },
  { title: "Concert night",          category: "events", cover: ph("evt3", 800, 540),  photos: placeholderSet("evt3", 10) },
  { title: "Bridal show",            category: "events", cover: ph("evt4", 600, 900), tall: true, photos: placeholderSet("evt4", 9) },
  { title: "Product launch",         category: "events", cover: ph("evt5", 800, 540),  photos: placeholderSet("evt5", 7) },

  // ----- Landscape & Travel -----
  { title: "Bali temples",           category: "travel", cover: ph("trv1", 800, 540), photos: placeholderSet("trv1", 8) },
  { title: "Istanbul",               category: "travel", cover: ph("trv2", 800, 540), photos: placeholderSet("trv2", 9) },
  { title: "City at sunrise",        category: "travel", cover: ph("trv3", 800, 540), photos: placeholderSet("trv3", 6) },
  { title: "Island coast",           category: "travel", cover: ph("trv4", 800, 540), photos: placeholderSet("trv4", 7) },
  { title: "Streets of Tokyo",       category: "travel", cover: ph("trv5", 800, 540), photos: placeholderSet("trv5", 10) },

  // ----- Behind the Scenes -----
  { title: "On set",                 category: "bts", cover: ph("bts1", 800, 540), photos: placeholderSet("bts1", 8) },
];
