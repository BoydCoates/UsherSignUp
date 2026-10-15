# Preserved live scheduling backend

These JavaScript modules were retrieved from the authenticated source export of
the existing `sleek-beagle-36` deployment. The deployed schedule functions were
missing from Git. They are retained here so future deployments do not remove
scheduling, templates, rosters, shared links, or cancellation behavior.

The modules are the deployed bundles, with unavailable source-map comments
removed. `convex/admin.ts`, `convex/public.ts`, `convex/http.ts`, and
`convex/provision.ts` expose the existing entry points. This directory is outside
`convex/` so its files do not become duplicate public API entry points.

The readable schema in `convex/schema.ts` preserves the deployed fields and
indexes and adds the `homepage` table. New homepage functions live in
`convex/homepage.ts`. Authentication keeps the existing admin-only sign-in
restriction in `convex/auth.ts`.
