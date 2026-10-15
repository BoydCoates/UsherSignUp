# Website administration

The public home page is at `/`. Shared schedule links remain at `/s/<publicId>`;
the home page does not list those links. The admin dashboard is at `/admin`.

## Edit the home page

Sign in with an existing admin account and select **Edit home page** in the
dashboard, or open `/admin?edit=homepage`. Edit the welcome text, ministry copy,
serving guidance, and closing banner. Under Usher of the Month, set the name,
month, story, and optional portrait. JPG, PNG, and WebP images up to 8 MB are
accepted. Add a photo description for screen readers. Preview the page, then
select **Save & publish home page**. Changes are stored in Convex and appear on
all devices without a new Vercel deployment. Remove the photo to restore the
portrait placeholder. Upload and save APIs require backend administrator access.

The featured usher defaults to a neutral placeholder; no person is invented.
If two admins edit at once, a stale save is rejected rather than overwriting the
other admin’s work.

## Development

The connected deployment is `sleek-beagle-36`. Keep environment files and
credentials out of Git. The frontend requires `VITE_CONVEX_URL` in Vercel and
`my-website/.env.local`. Run `npm test` and `npm run typecheck` at the repository
root; run `npm run build` in `my-website`.

The recovered schedule backend is documented in `backend-recovered/README.md`.
Do not remove those modules when deploying homepage changes. Run
`npx convex dev --once` against the configured development deployment to update
backend code. Existing signing keys and accounts are preserved.
