import { SignUp } from '@clerk/nextjs'

export default function Page() {
    return (
        <main className="flex min-h-svh items-center justify-center bg-muted/40 px-4 py-10">
            <SignUp
                appearance={{
                    variables: {
                        colorPrimary: "var(--primary)",
                        colorBackground: "var(--card)",
                        colorDanger: "var(--destructive)",
                        borderRadius: "var(--radius)",
                        fontFamily: "var(--font-sans)",
                    },
                    elements: {
                        rootBox: "w-full sm:w-[400px]",
                        cardBox: "w-full shadow-none",
                        card: "w-full rounded-lg border border-border bg-card text-card-foreground shadow-sm",
                        headerTitle: "text-2xl font-semibold tracking-tight text-foreground",
                        headerSubtitle: "text-sm text-muted-foreground",
                        socialButtonsBlockButton:
                            "border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground",
                        socialButtonsBlockButtonText: "font-medium",
                        dividerLine: "bg-border",
                        dividerText: "text-muted-foreground",
                        formFieldLabel: "text-sm font-medium text-foreground",
                        formFieldInput:
                            "border-input bg-background text-foreground placeholder:text-muted-foreground focus:border-ring focus:ring-ring/50",
                        formButtonPrimary:
                            "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
                        footer: "border-border bg-muted/50",
                        footerActionText: "text-muted-foreground",
                        footerActionLink: "font-medium text-primary hover:text-primary/90",
                        identityPreviewText: "text-foreground",
                        identityPreviewEditButton: "text-primary hover:text-primary/90",
                        formResendCodeLink: "text-primary hover:text-primary/90",
                        alertText: "text-destructive",
                    },
                }}
            />
        </main>
    )
}
