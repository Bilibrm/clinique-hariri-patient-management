# Default Avatar Setup Instructions

## Adding the Default Avatar Image

### Step 1: Create the `public` Directory

In your project root directory, create a folder named `public`:

```
clinique-hariri-patient-management/
├── app/
├── components/
├── public/          ← Create this folder
├── services/
└── ...
```

### Step 2: Add the Default Avatar Image

1. Save your default avatar image (the gray placeholder image) as `default-avatar.png`
2. Place it in the `public` folder you just created

The final path should be:
```
clinique-hariri-patient-management/public/default-avatar.png
```

### Step 3: Restart the Development Server (if running)

If your Next.js development server is running, restart it to ensure the public folder is recognized:

```bash
# Stop the server (Ctrl+C)
# Then start it again
npm run dev
```

## How It Works

### Default Avatar Usage

When a patient has no avatar (i.e., `patient.avatar` is `null`), the application will automatically display the default avatar image located at `/default-avatar.png`.

**Code Implementation:**
```typescript
<Image
  src={patient.avatar || '/default-avatar.png'}
  alt={patient.fullname}
  width={112}
  height={112}
  className="h-28 w-28 rounded-lg border-4 border-white bg-white object-cover shadow-lg"
/>
```

### Default Patient Number

When a patient has no patient number (i.e., `patient.patient_number` is empty or null), the application will display `"1234"` as a fallback.

**Code Implementation:**
```typescript
<DetailItem 
  label="رقم المريض" 
  value={patient.patient_number || '1234'} 
/>
```

## Components Updated

The following components now use the default avatar fallback:

1. ✅ **PatientDetails.tsx** - Patient details page
2. ✅ **PatientArchive.tsx** - Patient archive page

## Testing

After adding the image:

1. Navigate to a patient details page
2. If the patient has no avatar in the database, you should see the default gray placeholder image
3. If the patient has no patient number, you should see "1234" displayed

## Alternative: Using a Base64 Image

If you prefer not to use a separate image file, you can also use a base64-encoded image or a data URI directly in the code. However, using a file in the `public` folder is the recommended approach for Next.js applications.

## Next.js Public Folder

The `public` folder in Next.js:
- Serves static files
- Files are accessible from the root URL path (`/`)
- Perfect for images, fonts, and other static assets
- No need to import these files in your code
