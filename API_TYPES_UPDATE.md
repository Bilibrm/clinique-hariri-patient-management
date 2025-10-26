# API Types Update - Documentation

## Changes Made to Match Real API Response

### Type Updates in `types.ts`

#### New Helper Interfaces Added:
```typescript
StatusOption - { value, name, color }
GenderOption - { value, name, color }
BloodTypeOption - { value, name, color }
InsuranceSocietyBranch - { id, name }
```

#### Patient Interface Changes:

| Old Field Name | New Field Name | Type Change |
|---|---|---|
| `fullname` | `fullname` | No change (string) |
| - | `patient_number` | NEW (string) |
| `gender` | `gender` | string → GenderOption object |
| `blood_type` | `blood_type` | string → BloodTypeOption object |
| `status` | `status` | string → StatusOption object |
| - | `next_statuses` | NEW (StatusOption[]) |
| `insurance_society_id` | `insurance_society_branch_id` | Renamed |
| `insurance_society` | `insurance_society_branch` | Renamed + nullable |
| - | `updated_at` | NEW (string) |
| `passport_number` | `passport_number` | string → string \| null |
| `insurance_number` | `insurance_number` | string → string \| null |

### Component Updates

#### 1. PatientDetails.tsx
- ✅ Updated to use `patient.fullname` instead of `patient.fullname`
- ✅ Updated to use `patient.gender.value` for comparisons
- ✅ Updated to use `patient.blood_type.value` for display
- ✅ Updated to use `patient.status.value` for status checks
- ✅ Updated to use `patient.insurance_society_branch` instead of `patient.insurance_society`
- ✅ Added `patient.patient_number` display
- ✅ Handle nullable fields with fallback to '-'

#### 2. PatientList.tsx
- ✅ Updated to use `patient.fullname` instead of `patient.fullname`
- ✅ All list display working with new structure

#### 3. PatientArchive.tsx
- ✅ Updated to use `patient.fullname` instead of `patient.fullname`
- ✅ Display gender, blood type, and status names
- ✅ Updated insurance society reference

### API Response Structure

#### GET /patients/{id} Response:
```json
{
  "status": 1,
  "message": "Success",
  "data": {
    "id": 4,
    "patient_number": "202510194815",
    "fullname": "Patient 4",
    "gender": {
      "value": "male",
      "name": "Male",
      "color": "success"
    },
    "blood_type": {
      "value": "B-",
      "name": "B-",
      "color": "info"
    },
    "birthdate": "1962-10-19",
    "birth_place": "City 4",
    "full_address": "Address 4, Street 4, City 4",
    "avatar": null,
    "insurance_number": null,
    "passport_number": null,
    "phone": "0628182240",
    "status": {
      "value": "inactive",
      "name": "Inactive",
      "color": "danger"
    },
    "next_statuses": [
      {
        "value": "active",
        "name": "Active",
        "color": "success"
      }
    ],
    "external_patient_id": null,
    "insurance_society_branch_id": null,
    "created_at": "2025-10-19T22:18:37.000000Z",
    "updated_at": "2025-10-19T22:18:37.000000Z",
    "insurance_society_branch": null
  }
}
```

### How to Use Nested Objects

#### Gender Display:
```typescript
// For comparison
if (patient.gender.value === 'male') {
  // Display: ذكر
} else {
  // Display: أنثى
}

// For direct display
patient.gender.name // Shows "Male" or "Female"
```

#### Blood Type Display:
```typescript
patient.blood_type.value // "B-", "O+", etc.
patient.blood_type.name  // Same as value
patient.blood_type.color // "info", "success", etc.
```

#### Status Display:
```typescript
patient.status.value // "active", "inactive", "archived"
patient.status.name  // "Active", "Inactive", etc.
patient.status.color // "success", "danger", "warning"
```

#### Status Badge Example:
```typescript
<span className={`badge badge-${patient.status.color}`}>
  {patient.status.name}
</span>
```

### Nullable Fields Handling

Always provide fallback values for nullable fields:

```typescript
<DetailItem 
  label="رقم جواز السفر" 
  value={patient.passport_number || '-'} 
/>

<DetailItem 
  label="رقم التأمين" 
  value={patient.insurance_number || '-'} 
/>

<DetailItem 
  label="الإيمايل" 
  value={patient.email || '-'} 
/>
```

### Environment Variables

Ensure `.env.local` has the correct values:
```env
NEXT_PUBLIC_API_BASE_URL=https://erp-api.cliniquehariri.com/api/v1
NEXT_PUBLIC_API_TOKEN=118|Iz5rNFTyoKSqkjyKcYPkYGEidKSVyaykGex8shduf2115e5b
NEXT_PUBLIC_DOCTOR_ID=1
```

### Testing Checklist

- [x] Patient list displays correctly
- [x] Patient details shows all fields properly
- [x] Gender displays in Arabic correctly
- [x] Blood type shows actual value
- [x] Status displays with correct name
- [x] Nullable fields show '-' when empty
- [x] Patient number displays
- [x] Insurance society branch displays correctly
- [x] Mock data structure matches real API

### Next Steps

When working with forms (create/update), remember:
- Send simple string values for `gender` ('male' or 'female')
- Send simple string values for `blood_type` ('A+', 'B-', etc.)
- Send simple string values for `status` ('active' or 'inactive')
- The API returns the complex objects, but accepts simple values
