import { LandingAuthButton } from "./landing-auth-button"

function LandingCta() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 py-20 text-center sm:px-6">
        <h2 className="max-w-2xl font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          Put your next commit on a server today
        </h2>

        <p className="mt-4 max-w-xl text-sm text-muted-foreground sm:text-base">
          Connect a machine, import a repository, and deploy. The first one
          usually takes less than five minutes.
        </p>

        <div className="mt-8">
          <LandingAuthButton size="lg" withIcon />
        </div>
      </div>
    </section>
  )
}

export { LandingCta }
