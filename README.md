# Ansh Grover's Portfolio

My very own portfolio website.

## Features

- ⚡️ Blazing fast with Vite
- 🎨 Styled with Tailwind CSS
- 🧩 Modular React components
- 🛠️ TypeScript for type safety
- ✨ Modern UI with shadcn-ui
- 📅 Cal.com booking (Book a Free Call)

## Getting Started

1. **Clone the repository:**
   ```sh
   git clone <YOUR_GIT_URL>
   cd <YOUR_PROJECT_NAME>
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Start the development server:**
   ```sh
   npm run dev
   ```

## Build for Production

```sh
npm run build
```

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn-ui
- lucide-react

---

Feel free to fork, star, or contribute! Don't forget to follow me as well.

## Book a Call (Cal.com)

The site uses a Cal.com **inline** embed for booking calls (see `src/components/BookCall.tsx`). No extra env vars are required—update `calLink` if your event slug changes. Current link: `anshgrover/meeting` (`column_view` layout).

## GitHub Activity Setup

To display the GitHub contribution graph you need to provide the following environment variables:

```env
GRAPHQL_TOKEN=your_personal_access_token
NEXT_PUBLIC_GITHUB_USERNAME=your_github_username # optional, defaults to Anshgrover23
```

- `GRAPHQL_TOKEN` must be a GitHub personal access token with the `read:user` scope (classic tokens work as well). It is used on the server to query the GraphQL API.
- `NEXT_PUBLIC_GITHUB_USERNAME` lets you override the username shown in the activity header while keeping the token private.

## Chatbot Setup

```env
GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_HOST_URL=https://anshgrover.com

```

Uses Gemini 2.5 Flash with portfolio context. Get your key from [Google AI Studio](https://makersuite.google.com/app/apikey).

## Production Deployment

Add these environment variables in your hosting platform (Vercel, Netlify, etc.):

**Required:**

- `GEMINI_API_KEY` - For chatbot functionality
- `GRAPHQL_TOKEN` - For GitHub activity graph
- `NEXT_PUBLIC_HOST_URL` - For Sharing Blog URL

**Optional:**

- `NEXT_PUBLIC_GITHUB_USERNAME` - Override GitHub username (defaults to Anshgrover23)

## Adding Testimonials

Add testimonials from Twitter, Discord, or GitHub in `src/data/testimonials.ts`:

**Twitter:** Copy tweet URL → Use `https://unavatar.io/twitter/username` for image  
**Discord:** Right-click message → Copy message link  
**GitHub:** Click comment timestamp → Copy permalink → Use `https://github.com/username.png` for image
