# Backoffice App

This is a Backoffice application built with [Next.js](https://nextjs.org) and [Supabase](https://supabase.com).

## Features

- **Authentication**: Secure login with Supabase Auth.
- **Dashboard**: View shared accounts and quick links.
- **Premium Design**: Glassmorphism UI with dark mode and smooth animations.

## Getting Started

1. **Environment Setup**

   Create a `.env.local` file in the root directory and add your Supabase credentials:

   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Run the Development Server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `src/app/page.tsx`: Login page.
- `src/app/dashboard/page.tsx`: Main dashboard with accounts and links.
- `src/app/globals.css`: Global styles and design system variables.
- `src/lib/supabaseClient.ts`: Supabase client configuration.

## Customization

To update the mock data, edit `src/app/dashboard/page.tsx`.
To change the design system, edit `src/app/globals.css`.

