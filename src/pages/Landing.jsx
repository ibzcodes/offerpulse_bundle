import React from 'react';
import { Link } from 'react-router-dom';

export default function Landing() {
  const features = [
    'Real-Time Push Notifications',
    'AI Smart Offer Engine',
    'Instant Setup',
    'Live Dashboard',
    'GDPR Compliant'
  ];

  const steps = [
    { icon: '🔌', title: 'Install with one line of code' },
    { icon: '🔔', title: 'Customers opt-in' },
    { icon: '🤖', title: 'AI sends offers' }
  ];

  const plans = [
    {
      title: 'Starter',
      price: '£49/mo',
      features: ['Up to 2k subs', 'Smart offers', 'Real-time analytics']
    },
    {
      title: 'Pro',
      price: '£99/mo',
      features: ['Up to 10k subs', 'Advanced AI', 'Custom branding']
    }
  ];

  const testimonials = [
    { quote: 'We saw a 23% uplift…', author: 'James, StreetGear' },
    { quote: 'We stopped ads and now just use OfferPulse.', author: 'Maya, GlowSkincare' }
  ];

  return (
    <div className="bg-background text-text">
      {/* Hero */}
      <section className="pt-20 pb-16 text-center bg-gradient-to-br from-primary to-secondary animate-fadeIn">
        <div className="container mx-auto px-4">
        <img src="/offerPulse_logo.png"
        alt="OfferPulse.ai logo"
        className="mx-auto w-48 h-48 mb-6 transform hover:rotate-12 transition duration-700 animate-ping"
/>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-wide drop-shadow-lg">
            Turn browsers into buyers with AI-powered smart offers
          </h1>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            No app needed.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/signup"
              className="bg-gradient-to-r from-primary to-accent text-white rounded-full font-bold py-3 px-10 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition"
            >
              Start Free Trial
            </Link>
            <a
              href="#demo"
              className="bg-secondary text-white rounded-full font-semibold py-3 px-8 shadow hover:shadow-md transform hover:-translate-y-0.5 transition"
            >
              Book a Demo
            </a>
          </div>
        </div>
      </section>

      {/* Why OfferPulse */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-12 animate-fadeIn">
            Why OfferPulse?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 text-center">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-surface p-6 rounded-lg shadow hover:shadow-xl min-h-[160px] flex items-center justify-center transform transition hover:scale-105 animate-fadeIn"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <p className="text-xl font-medium">{f}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-surface">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-12 animate-fadeIn">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center space-y-4 transform transition duration-300 hover:-translate-y-2 hover:scale-105 animate-fadeIn"
                style={{ animationDelay: `${idx * 200}ms` }}
              >
                <div className="text-6xl mb-2">{step.icon}</div>
                <p className="text-lg">{step.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-12 animate-fadeIn">
            Pricing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {plans.map((plan, idx) => (
              <div
                key={idx}
                className={`border-2 rounded-lg p-6 bg-surface transform transition hover:scale-105 hover:shadow-2xl animate-fadeIn
                  ${idx === 1 ? 'border-accent bg-accent/10' : 'border-secondary'}`}
                style={{ animationDelay: `${idx * 200}ms` }}
              >
                <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
                <p className="text-xl mb-4">{plan.price}</p>
                <ul className="mb-4 space-y-2">
                  {plan.features.map((f, j) => (
                    <li key={j}>• {f}</li>
                  ))}
                </ul>
                <Link
                  to="/signup"
                  className="inline-block px-4 py-2 bg-primary rounded text-white hover:bg-primary-hover transition transform hover:scale-105"
                >
                  Choose {plan.title}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-surface">
        <div className="container mx-auto px-4 text-center space-y-8 max-w-3xl mx-auto">
          <h2 className="text-3xl font-semibold mb-12 animate-fadeIn">
            What Founders Are Saying
          </h2>
          {testimonials.map((t, i) => (
            <blockquote
              key={i}
              className="italic text-lg mb-6 animate-fadeIn"
              style={{ animationDelay: `${i * 200}ms` }}
            >
              <p>"{t.quote}"</p>
              <footer className="mt-2">— {t.author}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-br from-secondary to-primary text-white text-center animate-fadeIn">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-4">Ready to Pulse Your Sales?</h2>
          <div className="space-x-4">
            <Link
              to="/signup"
              className="px-6 py-3 bg-primary text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition"
            >
              Start Free Trial
            </Link>
            <a
              href="#demo"
              className="px-6 py-3 bg-secondary text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition"
            >
              Book a Demo
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-background text-center">
        <p className="text-sm">© {new Date().getFullYear()} OfferPulse.ai.</p>
      </footer>
    </div>
  );
}
