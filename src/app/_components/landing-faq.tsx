import { LandingSectionHeading } from "./landing-section-heading"
import { LandingFaqItem } from "./landing-faq-item"
import { LandingReveal } from "./landing-reveal"

const questions = [
  {
    question: "What is Dockyard?",
    answer:
      "A deployment platform that builds your GitHub repository into a container and runs it on servers you already own, with the build logs streamed back to your browser.",
  },
  {
    question: "Do I need my own server?",
    answer:
      "Yes. Dockyard does not host anything for you. You install an agent on a machine you control, and every deployment lands there.",
  },
  {
    question: "What does it cost?",
    answer:
      "Nothing today. Dockyard is in early access, so every feature is open with no plan to pick and no limits to work around.",
  },
  {
    question: "Which projects can I deploy?",
    answer:
      "Anything that builds into a container. Node, Python, Go, PHP, and static sites all work the same way.",
  },
  {
    question: "How do the live logs work?",
    answer:
      "The agent streams each build step to the platform as it runs, so the deployment page updates while the build is still going.",
  },
  {
    question: "Can I use it with a private repository?",
    answer:
      "Yes. You authorise the GitHub app once and pick which repositories it can read.",
  },
  {
    question: "What happens when a build fails?",
    answer:
      "The deployment stops and keeps its logs, with the failing step highlighted. The version that was already running stays untouched.",
  },
]

function LandingFaq() {
  return (
    <section id="faq" className="border-y border-border/50 bg-panel">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <LandingReveal>
          <LandingSectionHeading
            eyebrow="FAQ"
            title="Frequently asked questions"
            description="Something else on your mind? Write to us and we will get back to you."
          />
        </LandingReveal>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
          {questions.map((item, index) => (
            <LandingReveal
              key={item.question}
              delay={(index % 2) * 0.06}
              className="h-full"
            >
              <LandingFaqItem
                question={item.question}
                answer={item.answer}
              />
            </LandingReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export { LandingFaq }
