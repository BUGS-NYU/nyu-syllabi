# NYU Syllabi

An easy to find, student restricted, repository of NYU syllabi across CAS and Tandon classes that provides the ability to access as well as upload syllabi.

## Development

This uses the Next.js framework with server actions.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Hosting

While the bulk of the website code is in the repository, there are a number of other pieces that keep https://nyusyllabi.com running: Supabase for the database, Cloudflare R2 for the object store, Vercel for hosting, and Cloudflare Zero Trust to verify your NYU student status. A Cloudflare Worker is also used to prevent the Supabase DB from pausing itself. 