"use client";

import { useMemo, useState } from "react";

type Currency = "USD" | "ZiG";
type ServiceKey = "deep" | "office" | "move" | "carpet";

const WHATSAPP_E164 = "263776247189";

const SERVICES: Array<{ key: ServiceKey; title: string; desc: string }> = [
  {
    key: "deep",
    title: "Deep Cleaning",
    desc: "A top-to-bottom reset for kitchens, bathrooms, floors, and hard-to-reach areas.",
  },
  {
    key: "office",
    title: "Office Cleaning",
    desc: "Reliable scheduled cleaning that keeps your workspace spotless and client-ready.",
  },
  {
    key: "move",
    title: "Move-In/Move-Out",
    desc: "Pristine handovers for inspections, landlords, and new beginnings.",
  },
  {
    key: "carpet",
    title: "Carpet & Upholstery",
    desc: "Fresh, deodorized fabrics with a visible lift in color and cleanliness.",
  },
];

function buildWhatsAppLink(message: string) {
  return `https://wa.me/${WHATSAPP_E164}?text=${encodeURIComponent(message)}`;
}

function formatMoney(amount: number, currency: Currency) {
  const rounded = Math.round(amount * 100) / 100;
  return currency === "USD" ? `$${rounded.toFixed(2)}` : `ZiG ${rounded.toFixed(2)}`;
}

function IconCheck(props: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className={props.className}>
      <path
        fillRule="evenodd"
        d="M16.704 5.29a1 1 0 0 1 .006 1.414l-7.2 7.25a1 1 0 0 1-1.424-.004L3.29 9.154a1 1 0 0 1 1.415-1.414l3.085 3.086 6.49-6.537a1 1 0 0 1 1.424 0Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function Badge(props: { children: React.ReactNode; tone?: "blue" | "red" | "gray" }) {
  const tone = props.tone ?? "gray";
  const cls =
    tone === "blue"
      ? "bg-[var(--color-brand-blue)]/10 text-[var(--color-brand-blue)] ring-[var(--color-brand-blue)]/20"
      : tone === "red"
        ? "bg-[var(--color-action-red)]/10 text-[var(--color-action-red)] ring-[var(--color-action-red)]/20"
        : "bg-zinc-900/5 text-zinc-700 ring-zinc-900/10";
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 ${cls}`}>
      {props.children}
    </span>
  );
}

function SectionHeading(props: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {props.eyebrow ? (
        <div className="mb-3 flex items-center justify-center">
          <Badge tone="blue">{props.eyebrow}</Badge>
        </div>
      ) : null}
      <h2 className="text-balance text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
        {props.title}
      </h2>
      {props.subtitle ? (
        <p className="mt-3 text-pretty text-base leading-7 text-zinc-600 sm:text-lg">
          {props.subtitle}
        </p>
      ) : null}
    </div>
  );
}

function BeforeAfterSlider() {
  const [pct, setPct] = useState(55);
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="relative overflow-hidden rounded-xl border border-zinc-200">
        <div className="relative h-64 sm:h-80">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(239,68,68,0.14),transparent_45%),linear-gradient(180deg,#fafafa,#ffffff)]" />
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
          >
            <div className="h-full w-full bg-[radial-gradient(circle_at_25%_25%,rgba(29,78,216,0.18),transparent_45%),linear-gradient(180deg,#ffffff,#f4f4f5)]" />
          </div>

          <div className="absolute left-4 top-4 flex gap-2">
            <Badge tone="gray">Before</Badge>
            <Badge tone="blue">After</Badge>
          </div>

          <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pct}%` }}>
            <div className="h-full w-[2px] bg-[var(--color-action-red)]" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white px-3 py-2 text-xs font-semibold text-zinc-900 shadow ring-1 ring-zinc-200">
              Drag
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <label className="flex items-center justify-between text-sm text-zinc-600">
          <span>See the transformation</span>
          <span className="tabular-nums">{pct}%</span>
        </label>
        <input
          className="mt-2 w-full accent-[var(--color-action-red)]"
          type="range"
          min={15}
          max={85}
          value={pct}
          onChange={(e) => setPct(Number(e.target.value))}
          aria-label="Before and after slider"
        />
      </div>
    </div>
  );
}

export default function Home() {
  const [currency, setCurrency] = useState<Currency>("USD");
  const [service, setService] = useState<ServiceKey>("deep");
  const [bedroomsOrSize, setBedroomsOrSize] = useState(2);
  const [propertySize, setPropertySize] = useState<"Small" | "Medium" | "Large">("Medium");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const quoteUsd = useMemo(() => {
    const baseByService: Record<ServiceKey, number> = {
      deep: 45,
      office: 55,
      move: 60,
      carpet: 35,
    };
    const multiplierBySize: Record<typeof propertySize, number> = {
      Small: 1,
      Medium: 1.35,
      Large: 1.8,
    };
    const sliderFactor = 1 + Math.max(0, bedroomsOrSize - 1) * 0.18;
    return baseByService[service] * multiplierBySize[propertySize] * sliderFactor;
  }, [bedroomsOrSize, propertySize, service]);

  const z2uRate = 13.0;
  const quote = currency === "USD" ? quoteUsd : quoteUsd * z2uRate;

  const quoteMessage = useMemo(() => {
    const s = SERVICES.find((x) => x.key === service)?.title ?? "Cleaning";
    return `Hi Unique Cleaning Services! I’d like a quote.%0A%0AService: ${s}%0AProperty size: ${propertySize}%0AEstimate: ${formatMoney(
      quote,
      currency,
    )}%0A%0AName: ${name || ""}%0APhone: ${phone || ""}`;
  }, [currency, name, phone, propertySize, quote, service]);

  const heroWhatsApp = buildWhatsAppLink(
    "Hi Unique Cleaning Services! I’d like a free quote for cleaning in Harare.",
  );

  const leadWhatsApp = buildWhatsAppLink(quoteMessage);

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <a
        href={buildWhatsAppLink("Hi! I’d like to speak with an expert about cleaning services in Harare.")}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-md border border-blue-500 bg-white px-4 py-2.5 text-sm font-medium text-blue-500 shadow-sm hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label="Chat with an Expert on WhatsApp"
      >
        <span className="h-2 w-2 rounded-full bg-white" />
        Chat with an Expert
      </a>

      <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-blue-500 text-white">
              <IconCheck className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold">Unique Cleaning Services</div>
              <div className="text-xs text-zinc-600">Harare • Residential & Commercial</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge tone="red">10% OFF First Booking</Badge>
            <a
              href="#quote"
              className="hidden rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600 sm:inline-block"
            >
              Get a Free Quote
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(29,78,216,0.18),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(239,68,68,0.14),transparent_40%)] bg-linear-to-r from-zinc-50 to-white" />
          </div>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="blue">Harare CBD & Surrounds</Badge>
                <Badge>Eco-friendly options</Badge>
                <Badge>Same-week availability</Badge>
              </div>

              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
                Harare's Most Trusted Cleaning Experts.
              </h1>
              <p className="mt-4 text-lg leading-8 text-zinc-600">
                From sparkling offices to pristine homes, we handle the mess so you don't have to. Get
                <span className="font-semibold text-zinc-900"> 10% OFF</span> your first booking!
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#quote"
                  className="w-full rounded-md border border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium text-zinc-900 hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2"
                >
                  Get a Free Quote Now
                </a>
                <a
                  href={heroWhatsApp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full rounded-md border border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium text-zinc-900 hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2"
                >
                  WhatsApp Us
                </a>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
                  <div className="text-sm font-semibold">Trained Staff</div>
                  <div className="mt-1 text-sm text-zinc-600">Friendly teams that respect your space.</div>
                </div>
                <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
                  <div className="text-sm font-semibold">Eco-friendly Products</div>
                  <div className="mt-1 text-sm text-zinc-600">Safe for families, pets, and offices.</div>
                </div>
                <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
                  <div className="text-sm font-semibold">100% Guarantee</div>
                  <div className="mt-1 text-sm text-zinc-600">We'll fix anything you're not happy with.</div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-[linear-gradient(120deg,rgba(29,78,216,0.10),rgba(239,68,68,0.06))]">
                <div className="h-full w-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.9),transparent_55%),radial-gradient(circle_at_80%_40%,rgba(255,255,255,0.65),transparent_55%)]" />
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <div className="text-sm text-zinc-600">
                  Hero image placeholder: add a bright Harare office or modern living room photo.
                </div>
                <Badge tone="blue">Sparkling clean</Badge>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-zinc-200 bg-white py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionHeading
              eyebrow="Services"
              title="Cleaning tailored to your home or business"
              subtitle="Choose what you need today. We’ll bring the team, tools, and the ‘wow’ finish."
            />

            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {SERVICES.map((s) => (
                <div key={s.key} className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="text-base font-semibold">{s.title}</div>
                    <Badge tone="blue">Learn More</Badge>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-zinc-600">{s.desc}</p>
                  <button
                    type="button"
                    onClick={() => {
                      setService(s.key);
                      const el = document.getElementById("quote");
                      el?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="mt-4 w-full rounded-md border border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium text-zinc-900 hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2"
                  >
                    Select {s.title}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-zinc-200 bg-zinc-50 py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionHeading
              eyebrow="Proof"
              title="See the difference"
              subtitle="Use the slider to visualize the kind of ‘sparkling clean’ results our teams deliver."
            />

            <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-center">
              <BeforeAfterSlider />
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="blue">Police Cleared Staff</Badge>
                  <Badge tone="blue">Fully Insured</Badge>
                  <Badge tone="blue">COVID-19 Compliant</Badge>
                </div>
                <h3 className="mt-4 text-xl font-semibold">Trust, safety, and consistency</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  When you book a home or office clean, you want a reliable team you can welcome with confidence.
                  Our process is designed to be professional from first message to final check.
                </p>
                <ul className="mt-4 space-y-3 text-sm text-zinc-700">
                  <li className="flex gap-2">
                    <IconCheck className="mt-0.5 h-5 w-5 text-blue-500" />
                    Clear arrival windows and quick communication.
                  </li>
                  <li className="flex gap-2">
                    <IconCheck className="mt-0.5 h-5 w-5 text-blue-500" />
                    Quality checklist on every job.
                  </li>
                  <li className="flex gap-2">
                    <IconCheck className="mt-0.5 h-5 w-5 text-blue-500" />
                    Satisfaction follow-up for repeatable results.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="quote" className="border-t border-zinc-200 bg-white py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionHeading
              eyebrow="Instant Quote"
              title="Get a ballpark price in seconds"
              subtitle="Select your service and size. You can WhatsApp this estimate to a real person immediately."
            />

            <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-sm text-zinc-600">Estimated total</div>
                    <div className="mt-1 text-3xl font-semibold text-zinc-900">
                      {formatMoney(quote, currency)}
                    </div>
                    <div className="mt-1 text-xs text-zinc-500">
                      Ballpark only. Final price depends on condition, access, and extras.
                    </div>
                  </div>

                  <div className="flex items-center gap-2 rounded-full bg-zinc-100 p-1">
                    <button
                      type="button"
                      onClick={() => setCurrency("USD")}
                      className={`rounded-full px-3 py-1 text-sm font-semibold ${
                        currency === "USD" ? "bg-white shadow ring-1 ring-zinc-200" : "text-zinc-600"
                      }`}
                    >
                      USD
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrency("ZiG")}
                      className={`rounded-full px-3 py-1 text-sm font-semibold ${
                        currency === "ZiG" ? "bg-white shadow ring-1 ring-zinc-200" : "text-zinc-600"
                      }`}
                    >
                      ZiG
                    </button>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className="block">
                    <div className="text-sm font-medium text-zinc-900">Service</div>
                    <select
                      className="mt-2 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm"
                      value={service}
                      onChange={(e) => setService(e.target.value as ServiceKey)}
                    >
                      {SERVICES.map((s) => (
                        <option key={s.key} value={s.key}>
                          {s.title}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="block">
                    <div className="text-sm font-medium text-zinc-900">Property Size</div>
                    <select
                      className="mt-2 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm"
                      value={propertySize}
                      onChange={(e) => setPropertySize(e.target.value as typeof propertySize)}
                    >
                      <option value="Small">Small</option>
                      <option value="Medium">Medium</option>
                      <option value="Large">Large</option>
                    </select>
                  </label>
                </div>

                <div className="mt-5">
                  <label className="flex items-center justify-between text-sm">
                    <span className="font-medium text-zinc-900">Bedrooms / Size Scale</span>
                    <span className="tabular-nums">{bedroomsOrSize}</span>
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={6}
                    value={bedroomsOrSize}
                    onChange={(e) => setBedroomsOrSize(Number(e.target.value))}
                    className="mt-2 w-full accent-red-500"
                    aria-label="Bedrooms or size scale"
                  />
                </div>

                <div className="mt-6 rounded-xl bg-zinc-50 p-4">
                  <div className="text-sm font-semibold text-zinc-900">Send this estimate to WhatsApp</div>
                  <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm"
                    />
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone / WhatsApp"
                      className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm"
                    />
                  </div>
                  <a
                    href={leadWhatsApp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 w-full rounded-md border border-blue-500 bg-blue-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-600"
                  >
                    WhatsApp This Quote
                  </a>
                  <div className="mt-2 text-xs text-zinc-500">Rate used for ZiG is a placeholder (edit in code).</div>
                </div>
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-2">
                  <Badge tone="red">Direct Booking</Badge>
                  <Badge tone="blue">3 Steps</Badge>
                </div>
                <h3 className="mt-4 text-xl font-semibold">Book in one minute</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  Fill in the details below and click “Get My Free Quote”. We’ll confirm availability and finalize pricing.
                </p>

                <form
                  className="mt-6 space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    window.open(
                      buildWhatsAppLink(
                        `Hi Unique Cleaning Services! Please book me in.%0A%0AService: ${
                          SERVICES.find((x) => x.key === service)?.title
                        }%0AProperty size: ${propertySize}%0AName: ${name || ""}%0APhone: ${
                          phone || ""
                        }%0AEmail: ${email || ""}`,
                      ),
                      "_blank",
                      "noopener,noreferrer",
                    );
                  }}
                >
                  <div className="rounded-xl border border-zinc-200 p-4">
                    <div className="text-sm font-semibold">1) Select Service</div>
                    <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {SERVICES.map((s) => (
                        <label
                          key={s.key}
                          className={`flex cursor-pointer items-start gap-3 rounded-md border p-3 text-sm ${
                            service === s.key
                              ? "border-blue-200 bg-blue-50"
                              : "border-zinc-200 bg-white hover:bg-zinc-50"
                          }`}
                        >
                          <input
                            type="radio"
                            name="service"
                            value={s.key}
                            checked={service === s.key}
                            onChange={() => setService(s.key)}
                            className="mt-1"
                          />
                          <span>
                            <span className="font-semibold text-zinc-900">{s.title}</span>
                            <span className="mt-1 block text-zinc-600">{s.desc}</span>
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl border border-zinc-200 p-4">
                    <div className="text-sm font-semibold">2) Property Size</div>
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      {(["Small", "Medium", "Large"] as const).map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setPropertySize(s)}
                          className={`rounded-md px-3 py-2 text-sm font-semibold ${
                            propertySize === s
                              ? "bg-blue-500 text-white"
                              : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl border border-zinc-200 p-4">
                    <div className="text-sm font-semibold">3) Contact Details</div>
                    <div className="mt-3 grid grid-cols-1 gap-3">
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Full name"
                        className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm"
                        required
                      />
                      <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Phone / WhatsApp"
                        className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm"
                        required
                      />
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email (optional)"
                        className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm"
                      />
                    </div>
                    <button
                      type="submit"
                      className="mt-4 w-full rounded-md border border-red-500 bg-red-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-600"
                    >
                      Get My Free Quote
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-zinc-200 bg-zinc-50 py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionHeading
              eyebrow="Reviews"
              title="Local clients love the results"
              subtitle="Replace these with real Google/Facebook reviews and add a verified badge image when available."
            />

            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Tariro M.",
                  text: "Our office in the CBD has never looked better. Professional team and super fast.",
                },
                {
                  name: "Kudzai N.",
                  text: "Booked a deep clean for my home — spotless bathrooms and the kitchen is shining.",
                },
                {
                  name: "Melissa R.",
                  text: "Move-out clean was perfect. Landlord inspection passed with zero issues.",
                },
              ].map((t) => (
                <div key={t.name} className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">{t.name}</div>
                    <Badge tone="blue">5.0 ★★★★★</Badge>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-zinc-600">“{t.text}”</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-zinc-200 bg-white py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionHeading
              eyebrow="Gallery"
              title="This week’s transformations"
              subtitle="Swap these placeholders with real Harare job photos for maximum trust."
            />
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square overflow-hidden rounded-2xl border border-zinc-200 bg-[linear-gradient(120deg,rgba(29,78,216,0.10),rgba(239,68,68,0.06))]"
                >
                  <div className="h-full w-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.85),transparent_55%)]" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-zinc-200 bg-zinc-50 py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionHeading
              eyebrow="Find Us"
              title="Harare CBD"
              subtitle="Indian Mall Shop No. X (update the shop number when confirmed)."
            />

            <div className="mt-10 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
              <iframe
                title="Unique Cleaning Services Map"
                className="h-80 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=Harare%20CBD%20Indian%20Mall&output=embed"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="text-base font-semibold">Unique Cleaning Services</div>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                Professional residential & commercial cleaning in Harare.
              </p>
              <a
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-blue-500 bg-blue-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-600 transition-colors duration-200"
                href={heroWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.966-.273-.099-.471-.148-.67.15-.197.295-.771.961-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.39-1.485-.888-.795-1.484-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.136-.135.298-.354.446-.52.149-.173.198-.298.298-.5.1-.21.049-.371-.025-.52-.075-.15-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.508a.7.7 0 0 0-.509.198l-.01.006c-.17.18-.669.654-.669 1.512 0 .858.7 1.809 1.25 2.5l.01.01c.64.7 2.38 2.49 5.31 3.285.714.197 1.27.18 1.71.107.52-.075 1.67-.68 1.9-1.3.23-.62.23-1.14.16-1.34l-.01-.02c-.14-.21-.57-.17-1.2-.07m-7.29 8.01c-3.87 0-7.01-3.12-7.01-6.99 0-3.87 3.14-7.01 7.01-7.01 1.87 0 3.64.73 4.96 2.04 1.32 1.32 2.05 3.09 2.05 4.97 0 3.87-3.13 6.99-7.01 6.99m0-16.5c-5.24 0-9.5 4.26-9.5 9.5 0 1.12.2 2.23.6 3.28.06.16.08.34.01.5l-1.36 4.23c-.09.27.02.57.25.74.12.09.26.14.4.14.15 0 .29-.05.41-.14l4.23-1.36c.15-.05.34-.05.5.01 1.04.4 2.15.6 3.26.6 5.24 0 9.5-4.26 9.5-9.5 0-2.52-1-4.9-2.81-6.69-1.8-1.8-4.18-2.81-6.69-2.81z" />
                </svg>
                WhatsApp +263 776 247 189
              </a>
            </div>

            <div>
              <div className="text-sm font-semibold">Quick Links</div>
              <div className="mt-3 space-y-2 text-sm">
                <a
                  className="block font-medium text-blue-500 hover:text-blue-700"
                  href="#quote"
                >
                  Quote & Booking
                </a>
              </div>
            </div>

            <div>
              <div className="text-sm font-semibold">Payment Options</div>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge>EcoCash</Badge>
                <Badge>InnBucks</Badge>
                <Badge>Zipit</Badge>
              </div>
              <p className="mt-3 text-xs text-zinc-500">Add official logos in the footer when available.</p>
            </div>

            <div>
              <div className="text-sm font-semibold">Service Area</div>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                Harare CBD • Avondale • Borrowdale • Highlands • Eastlea • and surrounding areas.
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-2 border-t border-zinc-200 pt-6 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
            <div> 2023 Unique Cleaning Services. All rights reserved.</div>
            <div className="flex items-center gap-2">
              <Badge tone="blue">Verified by Google</Badge>
              <Badge tone="blue">Facebook Reviews</Badge>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
