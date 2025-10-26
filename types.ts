
// ===========================================================================
// API Response Types
// ===========================================================================

export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface PaginatedApiResponse<T> {
  status: number;
  message: string;
  data: T[];
  meta: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
  };
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
}

// ===========================================================================
// Model-specific Types
// ===========================================================================

export interface StatusOption {
  value: string;
  name: string;
  color: string;
}

export interface GenderOption {
  value: 'male' | 'female';
  name: string;
  color: string;
}

export interface BloodTypeOption {
  value: string;
  name: string;
  color: string;
}

export interface InsuranceSocietyBranch {
  id: number;
  name: string;
}

export interface Patient {
  id: number;
  patient_number: string;
  fullname: string;
  gender: GenderOption;
  blood_type: BloodTypeOption;
  birthdate: string;
  birth_place: string;
  full_address: string;
  avatar: string | null;
  insurance_number: string | null;
  passport_number: string | null;
  phone: string;
  status: StatusOption;
  next_statuses: StatusOption[];
  external_patient_id: string | null;
  insurance_society_branch_id: number | null;
  created_at: string;
  updated_at: string;
  insurance_society_branch: InsuranceSocietyBranch | null;
}

export type PatientCreate = Omit<Patient, 'id' | 'patient_number' | 'gender' | 'blood_type' | 'status' | 'next_statuses' | 'created_at' | 'updated_at' | 'insurance_society_branch'> & {
    gender: 'male' | 'female';
    blood_type: string;
    status: 'active' | 'inactive' | 'archived';
};


export interface MedicalService {
  id: string;
  doctor: string;
  analysisNumber: string;
  status: 'مسودة' | 'مكتمل';
  date: string;
  time: string;
}

export interface MedicalRecord {
  id: string;
  type: 'استشارة طبية' | 'تشخيص' | 'وصفة طبية';
  title: string;
  doctor: string;
  date: string;
  time: string;
  details: string;
}
