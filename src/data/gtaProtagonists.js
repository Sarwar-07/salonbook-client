export const GTA_PROTAGONISTS = [
  {
    id: 'lucia',
    name: 'Lucia Caminos',
    game: 'GTA VI',
    location: 'Vice City',
    eraBadge: 'GTA VI • Vice City',
    eraGroup: 'GTA VI',
    signatureLook: 'Ocean Drive Silk Blowout & Gloss',
    category: 'Hair',
    searchQuery: 'Balayage',
    accentColor: '#FF2E93',
    barberNote:
      'High-gloss tropical botanical serum finish tailored for South Beach humidity and sunset cruising on Ocean Drive.',
    portraitVariant: 'lucia',
  },
  {
    id: 'jason',
    name: 'Jason Duval',
    game: 'GTA VI',
    location: 'Leonida Keys',
    eraBadge: 'GTA VI • Leonida Keys',
    eraGroup: 'GTA VI',
    signatureLook: 'Coastal Textured Crop & Beard Trim',
    category: 'Hair',
    searchQuery: 'Cut',
    accentColor: '#00F0FF',
    barberNote:
      'Matte clay sea-salt crop paired with razor-shaped jawline contours built for open highway throttle.',
    portraitVariant: 'jason',
  },
  {
    id: 'tommy',
    name: 'Tommy Vercetti',
    game: 'GTA: Vice City',
    location: '1986',
    eraBadge: 'GTA: Vice City • 1986',
    eraGroup: 'Classics',
    signatureLook: 'Starfish Island Slick-Back & Hot Towel Shave',
    category: 'Hair',
    searchQuery: 'Scalp',
    accentColor: '#00F0FF',
    barberNote:
      'The definitive 1980s Starfish Island kingpin pomade finish with tea-tree hot towel blade precision.',
    portraitVariant: 'tommy',
  },
  {
    id: 'cj',
    name: 'Carl "CJ" Johnson',
    game: 'GTA: San Andreas',
    location: 'Grove St',
    eraBadge: 'GTA: San Andreas • Grove St',
    eraGroup: 'Classics',
    signatureLook: 'Grove Street Crisp Taper Fade & Line-Up',
    category: 'Hair',
    searchQuery: 'Cut',
    accentColor: '#FF7A00',
    barberNote:
      'Laser-straight geometric front line-up and zero-gap taper fade straight out of the legendary Reece Barber Shop.',
    portraitVariant: 'cj',
  },
  {
    id: 'michael',
    name: 'Michael De Santa',
    game: 'GTA V',
    location: 'Vinewood',
    eraBadge: 'GTA V • Vinewood',
    eraGroup: 'GTA V',
    signatureLook: 'Vinewood Executive Scissor Cut & Charcoal Facial',
    category: 'Skin',
    searchQuery: 'Charcoal',
    accentColor: '#00F0FF',
    barberNote:
      'Discreet silver-temple scissor tailoring combined with an active volcanic charcoal purifying mask.',
    portraitVariant: 'michael',
  },
  {
    id: 'franklin',
    name: 'Franklin Clinton',
    game: 'GTA V',
    location: 'Los Santos',
    eraBadge: 'GTA V • Los Santos',
    eraGroup: 'GTA V',
    signatureLook: 'Mirror-Finish Razor Fade & Beard Sculpt',
    category: 'Hair',
    searchQuery: 'Keratin',
    accentColor: '#FF7A00',
    barberNote:
      'High skin fade with keratin conditioning wash and aromatic cedarwood beard oil sculpting.',
    portraitVariant: 'franklin',
  },
  {
    id: 'trevor',
    name: 'Trevor Philips',
    game: 'GTA V',
    location: 'Blaine County',
    eraBadge: 'GTA V • Blaine County',
    eraGroup: 'GTA V',
    signatureLook: 'Sandy Shores Wild Restyle & Deep Tissue Recovery',
    category: 'Spa',
    searchQuery: 'Stone',
    accentColor: '#FF2E93',
    barberNote:
      'Heavy-duty heated volcanic basalt stones and eucalyptus detox steam to revive the roughest desert wanderer.',
    portraitVariant: 'trevor',
  },
  {
    id: 'niko',
    name: 'Niko Bellic',
    game: 'GTA IV',
    location: 'Hove Beach',
    eraBadge: 'GTA IV • Liberty City',
    eraGroup: 'Classics',
    signatureLook: 'Hove Beach Precision Buzz & Purifying Facial',
    category: 'Skin',
    searchQuery: 'HydraGlow',
    accentColor: '#00F0FF',
    barberNote:
      'Clean #2 guard uniform buzz with winterized barrier-repair cold cream treatment against Atlantic harbor winds.',
    portraitVariant: 'niko',
  },
  {
    id: 'claude',
    name: 'Claude',
    game: 'GTA III',
    location: 'Portland',
    eraBadge: 'GTA III • Liberty City',
    eraGroup: 'Classics',
    signatureLook: 'Portland Matte Crop & Express Detox',
    category: 'Spa',
    searchQuery: 'Detox',
    accentColor: '#FF7A00',
    barberNote:
      'Silent, utilitarian dark matte scissor crop with rapid peppermint scalp revival therapy.',
    portraitVariant: 'claude',
  },
];

export function getMatchingProtagonist(service) {
  if (!service) return null;
  const name = (service.serviceName || '').toLowerCase();
  const desc = (service.description || '').toLowerCase();
  const text = `${name} ${desc}`;
  const cat = (service.category || '').toLowerCase();

  // Check specific query matches
  for (const p of GTA_PROTAGONISTS) {
    if (text.includes(p.searchQuery.toLowerCase())) {
      return p;
    }
  }

  // Fallback by category
  if (cat.includes('hair')) return GTA_PROTAGONISTS[0]; // Lucia
  if (cat.includes('skin')) return GTA_PROTAGONISTS[4]; // Michael
  if (cat.includes('spa')) return GTA_PROTAGONISTS[6]; // Trevor
  if (cat.includes('makeup')) return GTA_PROTAGONISTS[0]; // Lucia
  if (cat.includes('nail')) return GTA_PROTAGONISTS[2]; // Tommy

  return GTA_PROTAGONISTS[0];
}

