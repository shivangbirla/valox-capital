import { Mail, Phone, MapPin } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Section, Eyebrow } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { LeadForm } from "@/components/LeadForm";
import { COMPANY } from "@/lib/constants";

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

const details = [
  {
    icon: Mail,
    label: "Email",
    value: COMPANY.email,
    href: `mailto:${COMPANY.email}`,
  },
  {
    icon: Phone,
    label: "Phone / WhatsApp",
    value: COMPANY.phoneDisplay,
    href: `tel:${COMPANY.phoneDisplay.replace(/\s/g, "")}`,
  },
  {
    icon: MapPin,
    label: "Office",
    value: COMPANY.address,
    href: COMPANY.mapsEmbed.replace("&output=embed", ""),
  },
];

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact · Valox Capital"
        description="Get in touch with Valox Capital — email capital.valox@gmail.com, call or WhatsApp +91 78498 70734, or visit our office in Bangalore."
      />

      <section className="border-b border-border">
        <div className="container py-16 sm:py-20">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>Contact</Eyebrow>
              <h1
                className="mt-4 font-display font-semibold leading-[1.06] tracking-tight"
                style={{ fontSize: "clamp(2.25rem, 5vw, 3.5rem)" }}
              >
                Let&apos;s talk.
              </h1>
              <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
                Whether you&apos;re ready to invest or just exploring, we&apos;re happy to answer
                your questions. Reach out however suits you best.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <Section className="!pt-14">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Left: details + WhatsApp + map */}
          <Reveal>
            <div className="space-y-4">
              {details.map((d) => (
                <a
                  key={d.label}
                  href={d.href}
                  target={d.icon === MapPin ? "_blank" : undefined}
                  rel={d.icon === MapPin ? "noopener noreferrer" : undefined}
                  className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40 dark:bg-card/60 dark:backdrop-blur"
                >
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
                    <d.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {d.label}
                    </p>
                    <p className="mt-1 font-medium">{d.value}</p>
                  </div>
                </a>
              ))}

              <a
                href={COMPANY.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-[#25D366] px-5 py-3.5 font-medium text-white transition-transform hover:scale-[1.01] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <WhatsAppGlyph className="h-5 w-5" />
                Message us on WhatsApp
              </a>

              <div className="overflow-hidden rounded-2xl border border-border">
                <iframe
                  title="Valox Capital office location"
                  src={COMPANY.mapsEmbed}
                  className="h-[300px] w-full"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </Reveal>

          {/* Right: form */}
          <Reveal delay={0.05}>
            <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 dark:bg-card/60 dark:backdrop-blur">
              <h2 className="font-display text-2xl font-semibold">Send a message</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Fill in the form and we&apos;ll get back to you.
              </p>
              <div className="mt-6">
                <LeadForm />
              </div>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
