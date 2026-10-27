export interface StudioService {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  deliverables: string[];
  idealFor: string;
  estimatedTimeline: string;
}

export const STUDIO_SERVICES: StudioService[] = [
  {
    id: 'full-service',
    number: '01',
    title: 'Full-Service Interior Design',
    shortDesc: 'From concept development to final styling, we coordinate the design process to create a cohesive and considered home.',
    fullDesc: 'A comprehensive, end-to-end design experience tailored for whole-home renovations, new builds, or major residential updates. We oversee every phase—from space planning and architectural joinery drawings to custom procurement, contractor coordination, and white-glove installation.',
    deliverables: [
      'Comprehensive spatial layouts & 3D visualization concepts',
      'Architectural millwork, lighting & electrical plans',
      'Curated furniture, textile, and lighting specification schedules',
      'Trade purchasing management, freight handling & on-site styling'
    ],
    idealFor: 'Homeowners undertaking renovations or new residential construction desiring a single dedicated team.',
    estimatedTimeline: '8 – 16 weeks design phase (plus construction/procurement)'
  },
  {
    id: 'space-planning',
    number: '02',
    title: 'Space Planning & Architectural Flow',
    shortDesc: 'Improve the flow, functionality, and proportions of your interior with layouts tailored to your daily routines.',
    fullDesc: 'We re-evaluate how your home functions from the ground up. By analyzing circulation paths, natural daylight orientation, and storage requirements, we resolve awkward transitions and optimize spatial volume for daily ease.',
    deliverables: [
      'Detailed scale floor plans with optimized furniture placement',
      'Circulation flow & architectural sightline assessments',
      'Built-in cabinetry & storage volume schematics',
      'Window treatment & natural light optimization guidelines'
    ],
    idealFor: 'Clients feeling constrained by their existing layout or preparing for structural renovations.',
    estimatedTimeline: '3 – 5 weeks'
  },
  {
    id: 'material-selection',
    number: '03',
    title: 'Material & Finish Selection',
    shortDesc: 'Bring your space together through carefully selected timber, stone, textiles, lighting, and complementary finishes.',
    fullDesc: 'Materiality gives a room its tactile soul. We curate a cohesive finishes palette—pairing warm timbers, honed natural stones, lime washes, tactile linens, and metal hardware—to ensure unity across every connected room.',
    deliverables: [
      'Physical tactile sample board presentation (wood, stone, tile, fabrics)',
      'Comprehensive material specification schedule with trade vendor links',
      'Paint, lime wash, and plaster finish color specifications',
      'Hardware, plumbing fixture & architectural trim selections'
    ],
    idealFor: 'Homeowners working with contractors who require a refined interior materials package.',
    estimatedTimeline: '4 – 6 weeks'
  },
  {
    id: 'interior-styling',
    number: '04',
    title: 'Custom Furnishing & Interior Styling',
    shortDesc: 'Complete your interior with furniture, artwork, accessories, and finishing details that feel personal and balanced.',
    fullDesc: 'For rooms that have their architectural envelope in place but lack warmth, layer, and character. We curate bespoke furniture pieces, vintage and contemporary artwork, tactile rugs, ceramics, and botanicals that feel lived-in and layered.',
    deliverables: [
      'Room-by-room furniture and lighting selection proposals',
      'Custom upholstery fabric sourcing & cushion tailoring',
      'Art curation, framing coordination & gallery wall direction',
      'White-glove delivery coordination & full final interior styling day'
    ],
    idealFor: 'Homes needing furnishing, layering, and decorative finishing to achieve an editorial feel.',
    estimatedTimeline: '4 – 8 weeks'
  },
  {
    id: 'design-consultation',
    number: '05',
    title: 'Initial Design Consultation',
    shortDesc: 'Get expert guidance, practical recommendations, and a clearer direction for your next interior project.',
    fullDesc: 'An intensive, focused working session where we explore your home’s potential. Whether you need a second opinion on renovation drawings, paint palette guidance, or advice on prioritising your renovation budget, you will leave with clear actionable direction.',
    deliverables: [
      '90-minute in-person walkthrough or comprehensive virtual call',
      'Written Consultation Action Plan summarizing recommendations',
      'Curated moodboard & preliminary color palette suggestion',
      'Recommended vendor & artisan resource list'
    ],
    idealFor: 'Homeowners looking for high-impact direction before committing to a larger design engagement.',
    estimatedTimeline: 'Single session with delivery of Action Plan in 5 business days'
  }
];
