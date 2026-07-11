# Test Site with Contact Form (Vercel + Resend)

## What's in this project
- `index.html` — the site, including a Contact Us form
- `api/contact.js` — a Vercel serverless function that emails you form submissions via Resend
- `package.json` — declares the `resend` dependency
- `.env.example` — documents the environment variables you need to set

## One-time setup

### 1. Create a free Resend account
Go to https://resend.com, sign up, and grab an API key from the API Keys page.
It'll look like `re_xxxxxxxxxxxxxxxxxxxxxxxxxxxx`.

### 2. Deploy this project to Vercel
- Push this folder to a GitHub repo, then import it in Vercel (Add New → Project), **or**
- Drag and drop the folder onto Vercel's "Add New Project" screen.

Vercel will auto-detect `api/contact.js` as a serverless function — no extra config needed.

### 3. Add environment variables in Vercel
In your Vercel project: **Settings → Environment Variables**, add:

| Key | Value |
|---|---|
| `RESEND_API_KEY` | your Resend API key |
| `CONTACT_EMAIL_TO` | the email address you want submissions sent to |

Redeploy after adding these (Vercel prompts you to).

### 4. Test it
Visit your deployed site, fill out the form, and submit. You should get an email within seconds.

## Notes
- Emails are sent from `onboarding@resend.dev` by default. This works immediately with no setup, but if you want to send from your own domain (e.g. `contact@yourcompany.com`), verify a domain in Resend's dashboard and update the `from` field in `api/contact.js`.
- The Resend free tier includes 100 emails/day and 3,000/month, which is plenty for a contact form.
- All form fields are validated both in the browser and on the server, so submissions can't bypass validation just by disabling JavaScript.
