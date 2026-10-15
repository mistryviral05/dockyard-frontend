## Rules

- do not use em dashes in any code
- do not create your own untile not tell by me
- do not delete anything alwyas use current folder strucre
- find best libraries and used it industry standard based
- always follow in code strucre industry standered
- any new decision you take first take of my permissions always
- always follow OOPS conscept in the code
- Plesae not explain everythin in deep alwyas explain in point and throught the point
- do not confuse always ask about work
- do not give jargons
- do not use em-dashes

# Response style

| Rule                | Meaning                                               |
| ------------------- | ----------------------------------------------------- |
| No over-explain     | Get to the point. Skip extra background.              |
| Simple words        | Use easy words. Avoid heavy jargon.                   |
| Hinglish in chat    | Chat replies use a Hindi + English mix.               |
| English in the repo | Every file in the repo stays in English.              |
| No long paragraphs  | Break the answer into short pieces.                   |
| Points and tables   | Use bullets or tables.                                |
| Proper spacing      | Leave space between lines. Do not pack text together. |
| Crisp               | Say only what is needed.                              |
| No em-dashes        | Do not use an em-dash. Use a comma or a period.       |

Apply this to every response: code, explanation, and discussion.





<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

Also for the design you have to follow the standerd global.css pattern and tailwind css colors and for the components like button , dialog etc... you have to go `/src/shared/components/ui/` use this thing 



<!-- END:nextjs-agent-rules -->

# Project Structure Standard (MANDATORY)

This is the structure this project follows. **Never break it. Never invent a new folder pattern.**
Every new file must land in one of the buckets below. If you think something doesn't fit, put it
in the closest existing bucket — do not create a parallel structure.

```
src/
├── app/                    # Next.js routes ONLY (page.tsx, layout.tsx, route handlers)
│   ├── (auth)/             # route groups for layout separation
│   ├── (dashboard)/
│   │   ├── apps/
│   │   │   ├── _components/    # components used ONLY by this route
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   └── apps/new/
│       ├── _components/
│       ├── import/
│       │   ├── _components/
│       │   └── page.tsx
│       └── layout.tsx
├── features/               # domain logic per feature (service + queries + types)
│   ├── github/
│   └── workspace/
├── shared/                 # reusable across 2+ features/routes
│   ├── components/
│   │   ├── ui/             # base primitives (button, dialog, input...) — shadcn style
│   │   ├── myui/           # our own custom primitives (spinner, badge, nav-tabs...)
│   │   └── navbar/         # shared composite components, grouped by folder
│   ├── lib/                # api-client, utils
│   └── types/              # shared response/DTO types
├── store/                  # zustand global stores (useXStore.ts)
├── providers/              # React context / app-level wrappers
└── config/                 # env + client config
```

## Rules

### 1. One component = one file
Never put two components in the same file. Never define a sub-component inline at the bottom of a
page. Split it out into its own file inside the correct `_components/` folder.

### 2. `app/` holds routes, not logic
`page.tsx` and `layout.tsx` stay thin — they compose components and nothing more. Example:

```tsx
// src/app/apps/new/import/page.tsx
import ImportPage from "./_components/import-page";

export default function Page() {
  return <ImportPage />;
}
```

All markup, state, and handlers live in `_components/`.

### 3. `_components/` = route-private components
If a component is used by **only one route**, it goes in that route's `_components/` folder.
The leading underscore keeps it out of the router. Nested routes get their own `_components/`
(e.g. `apps/new/_components/` and `apps/new/import/_components/` are separate).

### 4. Promote to `shared/` only when reused
The moment a component is needed by a second route/feature, move it to
`src/shared/components/`. Do not import across `_components/` folders — that is a signal it
should be promoted.

- `shared/components/ui/` — base primitives. **Always check here first** for button, dialog,
  input, select, card, tabs, tooltip, etc. Never hand-roll one of these.
- `shared/components/myui/` — our custom primitives that aren't part of the ui kit.
- `shared/components/<group>/` — shared composite components, one folder per group, with their
  schemas colocated (e.g. `navbar/create-wsp-schema.ts`).

### 5. Feature folder = service + queries + types
Every backend domain gets `src/features/<feature>/` with exactly these three files:

```
features/github/
├── github-service.ts     # raw API calls, class + singleton export
├── useGithubQueries.ts   # react-query hooks, class + singleton export
└── types.ts              # feature-owned types
```

**Service** — a class with a private `base` path, methods calling `useApiStore.getState().requestGet/requestPost`:

```ts
class GithubService {
  private base: string = "/v1/github";

  getInstallations() {
    return useApiStore.getState().requestGet<GeneralData<GithubInstallation[]>>(
      this.base + "/installations"
    );
  }
}
export const githubService = new GithubService();
```

**Queries** — a class wrapping react-query, gated on `isApiReady`, unwrapping with `select`:

```ts
class GithubQueries {
  useGetInstallations() {
    const isApiReady = useApiStore((state) => state.isApiReady);
    return useQuery({
      queryKey: ["github-installations"],
      queryFn: githubService.getInstallations.bind(githubService),
      enabled: isApiReady,
      select: (data: GeneralData<GithubInstallation[]>) => data?.data || [],
    });
  }
}
export const githubQueries = new GithubQueries();
```

Components **never** call a service or axios directly — they only use the `*Queries` hooks.
All HTTP goes through `shared/lib/api-client.ts` via `store/useApiStore.ts` (which attaches the
Clerk token). Response shapes come from `shared/types/responses.ts` (`GeneralData<T>`,
`GeneralMessage`).

### 6. Zustand for global/persisted state
Server state → react-query (`features/*/use*Queries.ts`). Client state → `src/store/`.

- One store per file, named `useXStore.ts` (e.g. `useWorkspaceStore.ts`, `useApiStore.ts`).
- Persisted stores use `persist` + `createJSONStorage(() => localStorage)` + `partialize`, with
  `skipHydration: true` and a `hasHydrated` flag; rehydration is triggered from a client
  component in `src/providers/` (see `hydrate-workspace.tsx`).
- Local, single-component state stays `useState` — do not add a store for it.

### 7. Providers
Anything wrapping the tree (Clerk, react-query, snackbar, store hydration) goes in
`src/providers/` as its own file and is composed in `src/app/layout.tsx`.

### 8. Naming
- Files: `kebab-case.tsx` / `kebab-case.ts` (`account-switcher.tsx`, `github-service.ts`).
  Exception: zustand stores and query hooks keep their hook name (`useWorkspaceStore.ts`,
  `useGithubQueries.ts`).
- Components: `PascalCase`. Hooks: `useCamelCase`. Singletons: `camelCase`.
- Types live next to what they describe: `features/<f>/types.ts` for feature types,
  `shared/types/` for cross-cutting ones.

### 9. Imports
Always use the `@/` alias (`@/shared/components/ui/button`), never deep relative paths like
`../../../`. Relative imports are fine only inside the same `_components/` or feature folder.

### 10. Styling
Follow `src/app/globals.css` tokens and Tailwind semantic colors (`bg-background`,
`text-muted-foreground`, `border-border`) — no hardcoded hex or raw palette colors.
Compose class names with `cn()` from `@/shared/lib/utils`.

The app ships dark only. `:root` and `.dark` resolve to the same palette, so never add a
light variant or a `dark:` prefixed class. Surface colors are fixed and must not be
restyled while doing other work:

- rail / sidebar → `bg-sidebar` (`#0c0a09`), same as the page canvas
- content panel → `bg-panel` (`#151311`), flat, no gradient or wash over it
- cards inside the panel → `bg-sidebar` or `bg-card`, with a `border-border/50` hairline

Depth comes from the shadow tokens in `globals.css` (`shadow-raised`, `shadow-card`,
`shadow-float`, `shadow-float-hover`) plus a thin `border-white/10` top edge and a
`bg-linear-to-b from-white/4` sheen — not from glows or colored shadows. The yellow
`primary` is reserved for meaning (active nav, focus ring, status, stack marks); primary
buttons stay white.

### 11. Decorative SVG
Line art is how surfaces get texture, since the colors are fixed.

- Marks live in `shared/components/myui/` as their own component (`stack-icon.tsx`,
  `panel-pattern.tsx`), never inlined into a card or a page.
- Draw on a 24 grid, `fill="none"`, `stroke="currentColor"`, `strokeWidth="1.5"`, round
  caps and joins. Color is inherited, never set on the svg.
- Every decorative svg gets `aria-hidden` and, when it sits over content,
  `pointer-events-none`.
- Background art is absolutely positioned behind the content at very low opacity
  (`opacity-[0.045]`-ish) and fades out with a `maskImage` radial gradient. It adds line
  work only — it must never change the surface color underneath it.
- Project cards carry the stack mark twice: once in the raised tile, once blown up and
  nearly invisible on the card face. Adding a stack to `PROJECT_STACKS` means adding its
  mark to `stackPaths` in `stack-icon.tsx`.

## Checklist before writing any file

1. Is this a route? → `app/.../page.tsx`, thin.
2. Is this UI for one route? → that route's `_components/`, one component per file.
3. Is it reused? → `shared/components/` (check `ui/` first before building anything).
4. Is it an API call? → `features/<feature>/` service + queries + types.
5. Is it global client state? → `store/useXStore.ts`.
6. Is it app-level wrapping? → `providers/`.
