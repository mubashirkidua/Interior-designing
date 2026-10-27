export interface Project {
  id: string;
  title: string;
  displayLocation: string;
  category: 'Living & Dining' | 'Full Residence' | 'Retreats';
  style: string;
  summary: string;
  mainImage: string;
  detailImages: string[];
  scope: string;
  squareFeet: string;
  year: string;
  narrative: string;
  materials: { name: string; type: string }[];
  keyFeatures: string[];
}

export const FEATURED_PROJECTS: Project[] = [
  {
    id: 'brookside-willow',
    title: 'Brookside Family Home',
    displayLocation: '7283 Fluton St. South Richmond Hill FL 11418',
    category: 'Full Residence',
    style: 'Warm Contemporary',
    summary: 'A welcoming family home built around natural textures, comfortable proportions, and a relaxed neutral palette.',
    mainImage: '/src/assets/images/project_willow_residence_1792528337504.jpg',
    detailImages: [
      '/src/assets/images/project_willow_residence_1792528337504.jpg',
      '/src/assets/images/hero_architectural_detail_1792528336146.jpg',
      '/src/assets/images/consultation_lounge_chairs_1792528338761.jpg'
    ],
    scope: 'Full Interior Architecture & Custom Furnishing',
    squareFeet: '3,450 sq ft',
    year: '2025',
    narrative: 'Designed for a young family seeking a tranquil haven from busy schedules. We paired plush oatmeal linen upholstery with muted terracotta and caramel accents, anchoring the space with blonde oak cabinetry, wool bouclé rugs, and warm southern light.',
    materials: [
      { name: 'Belgian Slub Linen', type: 'Upholstery' },
      { name: 'Blonde White Oak', type: 'Millwork & Tables' },
      { name: 'Muted Terracotta', type: 'Textile Accents' },
      { name: 'Raw Handcrafted Ceramic', type: 'Lighting & Decor' },
      { name: 'Unbleached New Zealand Wool', type: 'Floor Covering' }
    ],
    keyFeatures: [
      'Low-maintenance natural fiber textiles for everyday family living',
      'Custom floor-to-ceiling white oak library shelving with display niches',
      'Concealed acoustic wall panels behind warm plaster textures',
      'Direct visual connection to the garden and native foliage'
    ]
  },
  {
    id: 'laurel-garden-linden',
    title: 'Laurel Garden Residence',
    displayLocation: '7283 Fluton St. South Richmond Hill FL 11418',
    category: 'Living & Dining',
    style: 'Contemporary Natural',
    summary: 'A welcoming family home built around natural textures, comfortable proportions, and a relaxed neutral palette.',
    mainImage: '/src/assets/images/project_linden_house_1792528337700.jpg',
    detailImages: [
      '/src/assets/images/project_linden_house_1792528337700.jpg',
      '/src/assets/images/hero_double_height_living_1792528335195.jpg',
      '/src/assets/images/hero_architectural_detail_1792528336146.jpg'
    ],
    scope: 'Open-Concept Living, Dining & Garden Integration',
    squareFeet: '3,450 sq ft',
    year: '2025',
    narrative: 'A spacious architectural living and dining environment centered on continuous sightlines out to private mature trees. An organic woven rattan pendant lantern provides a sculptural focal point, harmonizing with wide-plank oak floors and cream bouclé seating.',
    materials: [
      { name: 'Wide-Plank White Oak', type: 'Flooring & Beams' },
      { name: 'Roman Travertine', type: 'Cocktail & Fireplace Plinths' },
      { name: 'Natural Woven Rattan', type: 'Sculptural Lighting' },
      { name: 'Cream Bouclé & Cotton', type: 'Modular Sectional' },
      { name: 'Rough-Hewn Limestone', type: 'Feature Accent Wall' }
    ],
    keyFeatures: [
      'Double-height ceiling volume with passive thermal ventilation',
      'Custom 10-seater solid timber dining table crafted from fallen coastal oak',
      'Seamless transition from interior lounge to stone garden terrace',
      'Integrated minimalist gas fireplace with floating travertine hearth'
    ]
  },
  {
    id: 'pineview-solace',
    title: 'Pineview Modern Retreat',
    displayLocation: '7283 Fluton St. South Richmond Hill FL 11418',
    category: 'Retreats',
    style: 'Modern Organic',
    summary: 'A welcoming family home built around natural textures, comfortable proportions, and a relaxed neutral palette.',
    mainImage: '/src/assets/images/project_solace_retreat_1792528338769.jpg',
    detailImages: [
      '/src/assets/images/project_solace_retreat_1792528338769.jpg',
      '/src/assets/images/consultation_lounge_chairs_1792528338761.jpg',
      '/src/assets/images/hero_architectural_detail_1792528336146.jpg'
    ],
    scope: 'Full Residence Transformation & Art Curation',
    squareFeet: '3,450 sq ft',
    year: '2026',
    narrative: 'Created as an intentional sanctuary away from urban noise. The space uses soft limestone plaster walls, sculptural low-profile seating, and raw-edge travertine coffee tables to create a monastic yet warm atmosphere of understated luxury.',
    materials: [
      { name: 'Hand-Troweled Lime Plaster', type: 'Wall Surfaces' },
      { name: 'Raw-Edge Travertine', type: 'Center Table' },
      { name: 'Dark Smoked Walnut', type: 'Sculpted Accent Chairs' },
      { name: 'Heavy Slub Linen', type: 'Deep Low-Profile Sofa' },
      { name: 'Aged Brass & Bronze', type: 'Hardware & Accents' }
    ],
    keyFeatures: [
      'Monochromatic palette calibrated with varying organic surface textures',
      'Curated large-scale tactile canvas artwork commissioned for the space',
      'Architectural steel-framed glazing overlooking private courtyard bamboo',
      'Concealed ambient cove lighting highlighting wall plaster grain'
    ]
  },
  {
    id: 'highline-penthouse',
    title: 'The Highline Penthouse',
    displayLocation: '7283 Fluton St. South Richmond Hill FL 11418',
    category: 'Living & Dining',
    style: 'Urban Minimalist',
    summary: 'A welcoming family home built around natural textures, comfortable proportions, and a relaxed neutral palette.',
    mainImage: '/src/assets/images/project_highline_penthouse_1792567664696.jpg',
    detailImages: [
      '/src/assets/images/project_highline_penthouse_1792567664696.jpg',
      '/src/assets/images/hero_double_height_living_1792528335195.jpg',
      '/src/assets/images/consultation_lounge_chairs_1792528338761.jpg'
    ],
    scope: 'Full Penthouse Architecture & Furniture Curation',
    squareFeet: '3,450 sq ft',
    year: '2025',
    narrative: 'A metropolitan sky residence elevated through monolithic stone textures and warm caramel leather. We balanced the soaring concrete envelope with floor-to-ceiling travertine cladding, low-slung seating, and custom blackened steel elements.',
    materials: [
      { name: 'Honed Roman Travertine', type: 'Full-Height Walls' },
      { name: 'Caramel Saddle Leather', type: 'Modular Sectional' },
      { name: 'Blackened Patinated Steel', type: 'Cocktail Table & Stairs' },
      { name: 'Textured Wool Berber', type: 'Custom Rug' },
      { name: 'Fumed American Walnut', type: 'Architectural Joinery' }
    ],
    keyFeatures: [
      '22-foot double-height glass volume with automated linen drapery',
      'Monolithic floating travertine gas fireplace hearth',
      'Suspended architectural steel mezzanine overlooking skyline',
      'Curated contemporary abstract canvas on raw plaster backdrop'
    ]
  },
  {
    id: 'coastal-villa',
    title: 'Oakwood Coastal Villa',
    displayLocation: '7283 Fluton St. South Richmond Hill FL 11418',
    category: 'Full Residence',
    style: 'Warm Coastal',
    summary: 'A welcoming family home built around natural textures, comfortable proportions, and a relaxed neutral palette.',
    mainImage: '/src/assets/images/project_coastal_villa_1792567665247.jpg',
    detailImages: [
      '/src/assets/images/project_coastal_villa_1792567665247.jpg',
      '/src/assets/images/hero_architectural_detail_1792528336146.jpg',
      '/src/assets/images/project_willow_residence_1792528337504.jpg'
    ],
    scope: 'New-Build Coastal Residence Interior Design',
    squareFeet: '3,450 sq ft',
    year: '2026',
    narrative: 'Rooted in the calm cadence of the Pacific coastline. Sloping exposed timber trusses and lime-washed walls establish an airy, grounded pavilion where indoor lounge life opens completely to coastal sea views.',
    materials: [
      { name: 'Bleached Coastal Oak', type: 'Ceiling Trusses & Floors' },
      { name: 'Rough Hewn Travertine', type: 'Cocktail Plinth' },
      { name: 'Washed Oat Linen', type: 'Deep Slipcover Sofa' },
      { name: 'Saddle Leather & Teak', type: 'Accent Armchairs' },
      { name: 'Antique Terracotta Ceramic', type: 'Planters & Vessel Art' }
    ],
    keyFeatures: [
      'Pitched open-rafter ceilings maximizing ocean daylight and cross-breeze',
      'Multi-slide panoramic glass doors disappearing into pocket walls',
      'Custom rough-hewn stone coffee table weighing 450 lbs',
      'Integrated recessed oak display shelving with curated coastal pottery'
    ]
  },
  {
    id: 'kyoto-pavilion',
    title: 'Kyoto House & Tea Pavilion',
    displayLocation: '7283 Fluton St. South Richmond Hill FL 11418',
    category: 'Retreats',
    style: 'Japandi Minimalist',
    summary: 'A welcoming family home built around natural textures, comfortable proportions, and a relaxed neutral palette.',
    mainImage: '/src/assets/images/project_kyoto_pavilion_1792567666379.jpg',
    detailImages: [
      '/src/assets/images/project_kyoto_pavilion_1792567666379.jpg',
      '/src/assets/images/project_solace_retreat_1792528338769.jpg',
      '/src/assets/images/hero_architectural_detail_1792528336146.jpg'
    ],
    scope: 'Architectural Interior Renovation & Tea Room',
    squareFeet: '3,450 sq ft',
    year: '2026',
    narrative: 'A secluded mountain sanctuary informed by Japanese tea house traditions and modern Alpine architecture. Yakisugi charred cedar walls enclose sunken tatami lounge zones framed by mist-shrouded pine forests.',
    materials: [
      { name: 'Yakisugi Charred Cedar', type: 'Wall Cladding' },
      { name: 'Natural Washi Paper', type: 'Sculptural Lantern' },
      { name: 'Live-Edge Hinoki Wood', type: 'Tea Table' },
      { name: 'Low-Slung Heavy Linen', type: 'Floor Chairs (Zaisu)' },
      { name: 'Raw Handcrafted Cast Iron', type: 'Tetsubin & Accents' }
    ],
    keyFeatures: [
      'Frameless corner glass framing old-growth evergreen forest',
      'Low eye-level furniture arrangement encouraging mindfulness',
      'Sculptural paper acoustic pendant casting warm 2200K ambient glow',
      'Underfloor radiant stone heating throughout living pavilion'
    ]
  }
];
