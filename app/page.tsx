import { redirect } from 'next/navigation';

export default function HomePage() {
  // The main page of the application is the patient list.
  // We redirect here immediately.
  redirect('/patients');
}
