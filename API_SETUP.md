# API Integration Setup Guide

## Environment Configuration

### Step 1: Create `.env.local` file

Create a `.env.local` file in the root directory of the project with the following content:

```env
NEXT_PUBLIC_API_BASE_URL=https://erp-api.cliniquehariri.com/api/v1
NEXT_PUBLIC_API_TOKEN=your_actual_bearer_token_here
NEXT_PUBLIC_DOCTOR_ID=1
```

**Important:** Replace `your_actual_bearer_token_here` with your actual bearer token from the API.

### Step 2: Restart the development server

After creating or updating the `.env.local` file, restart your Next.js development server:

```bash
npm run dev
```

## API Endpoints Configured

### 1. Get Patients (List with Pagination)
- **Endpoint:** `GET /patients?paginate=true&doctor_id={DOCTOR_ID}`
- **Parameters:**
  - `page`: Page number (default: 1)
  - `per_page`: Items per page (default: 10)
  - `search`: Search term (optional)
- **Response Structure:**
  ```json
  {
    "status": 1,
    "message": "Success",
    "data": [/* array of patients */],
    "meta": {
      "current_page": 1,
      "per_page": 10,
      "total": 100,
      "last_page": 10
    }
  }
  ```

### 2. Get Patient by ID
- **Endpoint:** `GET /patients/{id}`
- **Response Structure:**
  ```json
  {
    "status": 1,
    "message": "Success",
    "data": {
      "id": 4,
      "fullname": "patient",
      "gender": "male",
      "blood_type": "A+",
      "birthdate": "2025-02-25T00:00:00.000000Z",
      "birth_place": "2025-2-2",
      "full_address": "USA",
      "avatar": "http://...",
      "insurance_number": "000000",
      "passport_number": "ABCDEF",
      "phone": "0795909128",
      "status": "active",
      "external_patient_id": 123456789,
      "insurance_society_id": null,
      "created_at": "2025-07-30T10:51:12.000000Z",
      "updated_at": "2025-07-30T10:51:12.000000Z"
    }
  }
  ```

### 3. Create Patient
- **Endpoint:** `POST /patients`
- **Request Body:** Patient data (Partial<Patient>)

### 4. Update Patient
- **Endpoint:** `PUT /patients/{id}`
- **Request Body:** Patient data (Partial<Patient>)

### 5. Delete Patient
- **Endpoint:** `DELETE /patients/{id}`

## Error Handling

The API client includes comprehensive error handling:

- **401 Unauthorized:** Invalid or expired token
- **403 Forbidden:** Insufficient permissions
- **404 Not Found:** Resource doesn't exist
- **500 Server Error:** Internal server error

All errors are displayed to users via React Hot Toast notifications in Arabic.

## Features Implemented

✅ **Bearer Token Authentication** - Automatically added to all requests
✅ **Error Handling** - User-friendly Arabic error messages
✅ **Loading States** - Spinner components during data fetching
✅ **Data Caching** - SWR provides automatic caching and revalidation
✅ **Optimistic Updates** - Immediate UI updates with background revalidation
✅ **Search & Pagination** - Debounced search with server-side pagination
✅ **CRUD Operations** - Create, Read, Update, Delete for patients

## Components Updated

1. **PatientList.tsx** - Fetches paginated patient list with search
2. **PatientDetails.tsx** - Displays individual patient information
3. **PatientArchive.tsx** - Shows patient archive with medical services
4. **lib/api.ts** - API helper functions with proper typing
5. **services/api.ts** - Axios client with interceptors
6. **services/config.ts** - Environment configuration

## Testing the Integration

1. Ensure your `.env.local` file has the correct bearer token
2. Start the development server
3. Navigate to `/patients` to see the patient list
4. Click on a patient to view details
5. Try searching, pagination, and delete operations

## Troubleshooting

### "لم يتم استلام رد من الخادم" (No response from server)
- Check your internet connection
- Verify the API base URL is correct
- Ensure the API server is running

### "خطأ في المصادقة" (Authentication error)
- Verify your bearer token is correct
- Check if the token has expired
- Ensure the token is properly set in `.env.local`

### "المورد المطلوب غير موجود" (Resource not found)
- Verify the patient ID exists in the database
- Check if the endpoint URL is correct

## Next Steps

- Add form validation for patient creation/update
- Implement image upload for patient avatars
- Add medical services and records CRUD operations
- Implement advanced filtering and sorting
