export const carerProfileSample = {
  id: 1,
  payment_range: '$20 - $30 per hour',
  availability: { monday: '9:00-17:00', tuesday: '9:00-17:00' }, // Example JSON structure
  qualifications: 'Certified Nurse, CPR Certified',
  residency_status: 'Permanent Resident',
  years_of_experience: 5,
  speciality: 'Elderly Care',
  motivation_letter:
    'I am passionate about providing the best care for the elderly.',
  test_score: 85,
  is_active: true,
  worked_hours: 1200,
  description:
    'Experienced caregiver with a focus on elderly care and special needs.',
  completed_services: 150,
  birth_date: '1985-03-22',
  gender: 'Female',
  postal_code: '12345',
  colony: 'Sunset Colony',
  state: 'California',
  nationality: 'American',
  marital_status: 'Single',
  is_approved: true,
  CURP: 'JDOE850322HCA',
  RFC: 'JDOE850322XXX',
  NSS: '123456789',
  has_driving_license: true,
  license_type: 'Class C',
  reviewed: true,
  favoriteCarers: [], // Example empty array for relationships
  carerReviews: [], // Example empty array for relationships
  User: null, // Assuming no related User for now
  applicationRequest: [], // Example empty array for relationships
  createdAt: new Date(), // Current date
  updatedAt: new Date(), // Auto-updated date
};

export const createCarerProfileDtoSample = {
  name: 'Jane Doe',
  email: 'janedoe@example.com',
  password: 'securepassword123',
  payment_range: '$20 - $30 per hour',
  availability: 'Monday to Friday, 9:00 AM - 5:00 PM',
  qualifications: 'Certified Nurse, CPR Certified',
  address: '1234 Elm Street, Springfield',
  works_on_weekend: true,
  residency_status: 'Permanent Resident',
  years_of_experience: 5,
  birth_date: '1985-03-22',
  gender: 'Female',
  postal_code: '12345',
  colony: 'Sunset Colony',
  state: 'California',
  nationality: 'American',
  marital_status: 'Single',
  CURP: 'JDOE850322HCA',
  RFC: 'JDOE850322XXX',
  NSS: '123456789',
  speciality: 'Elderly Care',
  motivation_letter:
    'I am passionate about providing the best care for the elderly.',
  test_score: 85,
  has_driving_license: true,
  description:
    'Experienced caregiver with a focus on elderly care and special needs.',
};
