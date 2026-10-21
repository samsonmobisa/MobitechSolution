import Link from 'next/link';
import { ContactForm } from '@/components/contact-form';

const services = [
  {
    title: 'Mobile App Development',
    description: 'Custom Android, iOS, and cross-platform products designed for speed, conversion, and retention.',
    icon: '📱'
  },
  {
    title: 'Web Presence & SaaS',
    description: 'Elegant websites and SaaS dashboards that help you sell faster and serve customers better.',
    icon: '💻'
  },
  {
    title: 'Cybersecurity & Compliance',
    description: 'Security architecture, audits, and risk reduction strategies for businesses modernizing digitally.',
    icon: '🛡️'
  },
  {
    title: 'Support & Growth Ops',
    description: 'Performance tracking, maintenance, and feature roadmaps to keep your digital products growing.',
    icon: '📈'
  }
];

const stats = [
  { value: '50+', label: 'Projects launched' },
  { value: '30+', label: 'Business partners' },
  { value: '5+', label: 'Years of experience' }
];

const process = [
  'Discovery and strategy workshop',
  'Design system and product blueprint',
  'Development, QA, and launch',
  'Optimization and long-term support'
];

const testimonials = [
  { quote: 'Mobitech brought structure, speed, and clarity to our digital transformation. The collaboration was outstanding.', name: 'Aisha Njeri', role: 'Operations Lead, Greenline Retail' },
  { quote: 'Our mobile experience feels premium and performs fast. The team understood our goals and delivered a product our customers love.', name: 'Brian Otieno', role: 'Founder, YomaPay' }
];

export default function HomePage() {
  return (
    <main className="bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-black tracking-tight text-slate-900">
            Mobitech Solution
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 md:flex">
            <a href="#services" className="transition hover:text-blue-600">Services</a>
            <a href="#about" className="transition hover:text-blue-600">About</a>
            <a href="#process" className="transition hover:text-blue-600">Process</a>
            <a href="#contact" className="transition hover:text-blue-600">Contact</a>
          </nav>
          <a
            href="#contact"
            className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
          >
            Book a call
          </a>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.18),_transparent_45%)]" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
          <div>
            <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
              Modern digital partner
            </span>
            <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
              Build a smarter digital business with confidence.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-slate-600">
              We design and deliver digital products, mobile experiences, and secure systems that help growing businesses move faster and earn trust.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#contact" className="rounded-full bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700">
                Get started
              </a>
              <a href="#services" className="rounded-full border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-100">
                Explore services
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
            <div className="rounded-2xl bg-slate-950 p-6 text-white">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-300">Business momentum</p>
                <span className="rounded-full bg-emerald-400/20 px-2 py-1 text-xs font-medium text-emerald-300">+42% growth</span>
              </div>
              <div className="mt-8 space-y-4">
                <div>
                  <p className="text-4xl font-black">42%</p>
                  <p className="text-sm text-slate-300">Increase in customer engagement after launch</p>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                  <div className="h-full w-[75%] rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
                </div>
                <div className="grid grid-cols-3 gap-4 text-center text-sm text-slate-300">
                  <div>
                    <p className="text-xl font-bold text-white">24/7</p>
                    <p>support</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-white">3x</p>
                    <p>faster rolls</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-white">99.9%</p>
                    <p>uptime goals</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-8">
        <div className="grid gap-6 md:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
              <p className="text-3xl font-black text-blue-600">{stat.value}</p>
              <p className="mt-2 text-sm text-slate-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="services" className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Services</p>
          <h2 className="mt-3 text-3xl font-black text-slate-950 md:text-4xl">Built for growth, trust, and speed.</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <article key={service.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl">{service.icon}</div>
              <h3 className="text-xl font-bold text-slate-900">{service.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className="bg-slate-900 py-20 text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">About us</p>
            <h2 className="mt-3 text-3xl font-black md:text-4xl">We turn technology into real business outcomes.</h2>
          </div>
          <div className="space-y-5 text-slate-300">
            <p>
              Mobitech Solution helps companies modernize their digital presence through strategy, software, mobile-first design, and long-term optimization.
            </p>
            <p>
              Whether you need a new customer portal, a sharper brand presence, or a secure platform for growth, we build with performance and usability at the center.
            </p>
          </div>
        </div>
      </section>

      <section id="process" className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Process</p>
          <h2 className="mt-3 text-3xl font-black text-slate-950 md:text-4xl">A clear path from idea to launch.</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {process.map((step, index) => (
            <div key={step} className="rounded-3xl border border-slate-200 bg-white p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
                0{index + 1}
              </div>
              <p className="text-base font-semibold text-slate-800">{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Testimonials</p>
            <h2 className="mt-3 text-3xl font-black text-slate-950 md:text-4xl">Trusted by leaders who value momentum.</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {testimonials.map((testimonial) => (
              <blockquote key={testimonial.name} className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
                <p className="text-lg leading-8 text-slate-700">“{testimonial.quote}”</p>
                <footer className="mt-6">
                  <p className="font-bold text-slate-900">{testimonial.name}</p>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-blue-600 py-20 text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">Contact</p>
            <h2 className="mt-3 text-3xl font-black md:text-4xl">Let’s build your next digital advantage.</h2>
            <p className="mt-5 max-w-lg text-blue-100">
              Share your idea, business challenge, or growth goal and we’ll help you map the right digital solution.
            </p>
            <div className="mt-8 space-y-4 text-sm text-blue-100">
              <p>Email: hello@mobitechsolution.com</p>
              <p>Phone: +254 712 345 678</p>
              <p>Based in Nairobi, serving businesses worldwide.</p>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 px-6 py-8 text-sm text-slate-600 md:flex-row md:items-center">
          <p>© 2024 Mobitech Solution. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/admin" className="hover:text-blue-600">Admin</Link>
            <a href="#services" className="hover:text-blue-600">Services</a>
            <a href="#contact" className="hover:text-blue-600">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
