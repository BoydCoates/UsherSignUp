# Website administration

The public home page is at `/`. Shared schedule links remain at `/s/<publicId>`;
the home page does not list those links. The admin dashboard is at `/admin`.

## Edit the home page

Sign in with an existing admin account and select **Edit home page** in the
dashboard. This opens `/?edit=homepage` on the actual home page, with text boxes
in place. Existing `/admin?edit=homepage` bookmarks redirect there after sign-in.
Every home-page text area is editable,
including the header, navigation, buttons, section labels, photo placeholders,
ministry copy, address, and footer. Under Usher of the Month, set the name,
month, story, and optional portrait. JPG, PNG, and WebP images up to 8 MB are
accepted. Add a photo description for screen readers. Preview the page, then
select **Save & publish** in the sticky toolbar. Use **Preview** to hide the text
boxes without losing the draft. Save keeps you on the page so you can continue
editing; **Back to admin** asks before discarding unsaved changes. Changes are
stored in Convex and appear on
all devices without a new Vercel deployment. Remove the photo to restore the
portrait placeholder. Upload and save APIs require backend administrator access.

The featured usher defaults to a neutral placeholder; no person is invented.
If two admins edit at once, a stale save is rejected rather than overwriting the
other admin’s work.

## Development

The connected deployment is `sleek-beagle-36`. Keep environment files and
credentials out of Git. The frontend requires `VITE_CONVEX_URL` in Vercel and
`my-website/.env.local`. Run `npm test` and `npm run typecheck` at the repository
root; run `npm test` and `npm run build` in `my-website` for the inline editor.

The recovered schedule backend is documented in `backend-recovered/README.md`.
Do not remove those modules when deploying homepage changes. Run
`npx convex dev --once` against the configured development deployment to update
backend code. Existing signing keys and accounts are preserved.
