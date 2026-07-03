INSERT INTO suite_types (
  name, slug, short_description, description, price_per_night, quantity,
  max_guests, bed_type, size, status, featured
) VALUES
  (
    'Deluxe Garden Suite',
    'deluxe-garden-suite',
    'A calm garden-facing suite with warm finishes and generous natural light.',
    'Designed for restful stays, the Deluxe Garden Suite pairs soft textures with a private lounge area and views toward the property garden.',
    185.00,
    5,
    2,
    'King',
    '48 sqm',
    'active',
    true
  ),
  (
    'Executive Suite',
    'executive-suite',
    'A polished suite for business travelers and longer luxury stays.',
    'The Executive Suite includes a separate sitting area, refined work space, premium linens, and elevated in-room amenities.',
    275.00,
    3,
    3,
    'King + Sofa Bed',
    '68 sqm',
    'active',
    true
  ),
  (
    'Presidential Suite',
    'presidential-suite',
    'The signature suite with expansive living space and personalized service.',
    'A statement residence for special stays, private hosting, and guests who want the most complete SUITES experience.',
    520.00,
    1,
    4,
    'King',
    '120 sqm',
    'active',
    true
  )
ON CONFLICT (slug) DO NOTHING;

INSERT INTO amenities (name, slug, description, icon, category) VALUES
  ('High-Speed Wi-Fi', 'high-speed-wifi', 'Reliable connectivity throughout the property.', 'wifi', 'Comfort'),
  ('Private Lounge', 'private-lounge', 'A refined sitting area for relaxing or hosting.', 'sofa', 'Suite'),
  ('Concierge Support', 'concierge-support', 'Personal assistance for transport, dining, and local requests.', 'bell', 'Service'),
  ('Breakfast Service', 'breakfast-service', 'Morning service available for suite guests.', 'coffee', 'Dining')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO suite_amenities (suite_type_id, amenity_id)
SELECT st.id, a.id
FROM suite_types st
CROSS JOIN amenities a
WHERE st.slug IN ('deluxe-garden-suite', 'executive-suite', 'presidential-suite')
ON CONFLICT (suite_type_id, amenity_id) DO NOTHING;

INSERT INTO experiences (title, slug, description, category, image_url, price, status) VALUES
  ('Private Rooftop Dining', 'private-rooftop-dining', 'An intimate dining experience arranged for special evenings.', 'Dining', '/images/experiences/rooftop-dining.jpg', 150.00, 'active'),
  ('Liberian Cultural Tour', 'liberian-cultural-tour', 'A guided local experience curated around culture, markets, and heritage.', 'Culture', '/images/experiences/cultural-tour.jpg', 95.00, 'active'),
  ('Wellness Morning', 'wellness-morning', 'A calm wellness session with refreshments and light movement.', 'Wellness', '/images/experiences/wellness.jpg', 75.00, 'active')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO gallery_images (title, image_url, alt_text, category, sort_order) VALUES
  ('Emerald Suite Interior', '/images/gallery/emerald-suite.jpg', 'Luxury suite interior with emerald accents', 'Suites', 1),
  ('Gold Lounge Detail', '/images/gallery/gold-lounge.jpg', 'Warm lounge detail with gold-toned styling', 'Interiors', 2),
  ('Garden Arrival', '/images/gallery/garden-arrival.jpg', 'Garden arrival path at The SUITES', 'Property', 3)
ON CONFLICT DO NOTHING;

INSERT INTO settings (key, value) VALUES
  ('payment_mode', '"deposit"'),
  ('deposit_percentage', '30'),
  ('hotel_email', '"info@theSuitesLiberia.com"')
ON CONFLICT (key) DO NOTHING;
