# Clinique Hariri - Patient Management System (Next.js Refactor)

This project is a refactored version of the Clinique Hariri Patient Management System, migrated to a modern, production-ready stack using Next.js 13+ with the App Router.

## Features

- **Modern Architecture**: Built with Next.js App Router for optimal performance and scalability.
- **Full CRUD for Patients**: View, add, edit, and delete patient records.
- **API Driven**: All data is fetched from a live API, configured via environment variables.
- **Advanced UI**: Includes searching, pagination, and sorting for the patient list.
- **Enhanced UX**: Smooth animations with Framer Motion and non-intrusive notifications with React Hot Toast.
- **RTL Support**: Full right-to-left language support, configurable via the UI.
- **Theming**: Light and Dark mode support.
- **Responsive & Accessible**: Designed to work across all devices with a focus on accessibility.

## Tech Stack

- **Framework**: Next.js 13+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Animations**: Framer Motion
- **Data Fetching**: SWR
- **API Client**: Axios
- **Notifications**: React Hot Toast
- **Linting & Formatting**: ESLint, Prettier

---

## Getting Started

### Prerequisites

- Node.js (v18.x or later)
- npm, yarn, or pnpm

### 1. Clone the repository

```bash
git clone <repository-url>
cd <repository-directory>
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root of the project by copying the example file:

```bash
cp .env.local.example .env.local
```

Now, open `.env.local` and add the base URL for your API endpoint:

```
NEXT_PUBLIC_API_BASE_URL=https://your-api-endpoint.com/api
```

### 4. Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## Testing Checklist

To ensure the application is working correctly, please verify the following:

- **Patient List Page (`/patients`)**:
  - [ ] The page loads without errors.
  - [ ] A loading spinner is visible while data is being fetched.
  - [ ] The patient table correctly displays data from the API.
  - [ ] Searching for a patient by name filters the table results in real-time.
  - [ ] Pagination controls appear if there are more patients than the page limit and are functional.
  - [ ] Clicking the "Add New Patient" button navigates to the `/patients/new` page.
  - [ ] Clicking the delete icon on a patient row opens a confirmation modal.
  - [ ] Confirming deletion removes the patient and shows a success toast.

- **Add/Edit Patient Page (`/patients/new`, `/patients/[id]/edit`)**:
  - [ ] The form loads with empty fields (for new) or pre-filled data (for edit).
  - [ ] Submitting the form with valid data successfully creates/updates a patient and shows a success toast.
  - [ ] An error toast is displayed if the API request fails.

- **Global Features**:
  - [ ] Toggling the theme (light/dark mode) works correctly across all pages.
  - [ ] Success and error toasts appear in the correct position (top-right for LTR, top-left for RTL) for all relevant actions.
  - [ ] Page transitions are animated smoothly with Framer Motion.
  - [ ] The application is fully responsive and usable on mobile screen sizes.
