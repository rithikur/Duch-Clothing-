import React from 'react';
import { useParams, Link } from 'react-router-dom';

const PAGES = {
  'our-story': {
    title: 'Our Story',
    sections: [
      {
        heading: 'Born in Coimbatore',
        body: `DUCH was founded in 2020 with one simple belief: premium menswear shouldn't cost a premium price. We started from a small workspace near Prasanna Theatre in Coimbatore — two friends frustrated with the gap between quality fabric and honest pricing in the Indian market.\n\nCoimbatore is the textile capital of India, and we leaned into that advantage. By cutting out middlemen and working directly with mill suppliers, we built a brand that delivers garments worth ₹4000 at prices that start at ₹549.`,
      },
      {
        heading: 'What "DUCH" Means',
        body: `DUCH stands for Dressed Under Crafted Heritage — a tribute to the artisans and weavers of Tamil Nadu whose skill underpins every shirt, blazer, and jacket we produce. The name also nods to our founders' roots: a simple word that feels timeless, strong, and understated. Just like our clothes.`,
      },
      {
        heading: 'Our Promise',
        body: `Every piece in our catalog is sourced from certified fabric mills, stitched by skilled tailors earning fair wages, and quality-checked at three stages before shipping. We don't do fast fashion. We do lasting fashion.\n\nWe currently serve over 12,000 customers across India and ship to every pincode. Our return rate is under 4% — because when clothes fit right and feel right, people keep them.`,
      },
      {
        heading: 'What\'s Next',
        body: `We're expanding our range into formal evening wear and premium athleisure in 2025. We're also building a custom tailoring service for shirts and trousers, where you can submit your measurements and get a perfect fit — delivered in 10 days.\n\nThank you for being part of the DUCH journey.`,
      },
    ],
  },
  'terms-and-conditions': {
    title: 'Terms & Conditions',
    lastUpdated: 'April 2025',
    sections: [
      {
        heading: '1. Acceptance of Terms',
        body: `By accessing and using the DUCH Clothing website (duchclothing.in), you agree to be bound by these Terms & Conditions. If you do not agree to these terms, please do not use our website or services.`,
      },
      {
        heading: '2. Products & Pricing',
        body: `All prices on our website are listed in Indian Rupees (₹) and are inclusive of GST unless stated otherwise. We reserve the right to modify prices at any time without prior notice. Product images are for illustrative purposes; actual colours may vary slightly due to display settings.`,
      },
      {
        heading: '3. Orders & Payment',
        body: `Orders are confirmed only upon successful payment. We accept UPI, Net Banking, Credit/Debit Cards, and Cash on Delivery (COD) for orders above ₹499. DUCH reserves the right to cancel any order in cases of pricing errors, stock unavailability, or suspected fraudulent activity.`,
      },
      {
        heading: '4. Intellectual Property',
        body: `All content on this website — including logos, product images, text, and design — is the intellectual property of DUCH Clothing. Unauthorized reproduction, distribution, or commercial use is strictly prohibited and may result in legal action.`,
      },
      {
        heading: '5. Limitation of Liability',
        body: `DUCH Clothing shall not be liable for any indirect, incidental, or consequential damages arising from the use or inability to use our products or services. Our maximum liability in any case is limited to the invoice value of the product in question.`,
      },
      {
        heading: '6. Governing Law',
        body: `These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Coimbatore, Tamil Nadu.`,
      },
    ],
  },
  'privacy-policy': {
    title: 'Privacy Policy',
    lastUpdated: 'April 2025',
    sections: [
      {
        heading: 'Information We Collect',
        body: `We collect information you provide directly to us when placing an order or creating an account: your name, email address, phone number, shipping address, and payment details. We also collect device and usage data automatically — browser type, IP address, and pages visited — to improve our service.`,
      },
      {
        heading: 'How We Use Your Information',
        body: `Your information is used to process orders and payments, send order confirmations and shipping updates, improve our website and product offerings, send promotional communications (only if you've opted in), and prevent fraud and maintain security.`,
      },
      {
        heading: 'Data Sharing',
        body: `We do not sell your personal data to third parties. We share necessary data only with: payment processors (Razorpay), logistics partners (Delhivery, Blue Dart), and analytics services (Google Analytics) — all bound by strict data protection agreements.`,
      },
      {
        heading: 'Cookies',
        body: `We use cookies to maintain your session, remember your cart, and analyse site traffic. You can disable cookies in your browser settings, though some features may not work correctly without them.`,
      },
      {
        heading: 'Your Rights',
        body: `You may request access to, correction of, or deletion of your personal data at any time by emailing info@duchclothing.in. We will respond within 7 business days.`,
      },
      {
        heading: 'Contact',
        body: `For privacy-related queries, contact our Data Officer at info@duchclothing.in or call +91 74181 33373.`,
      },
    ],
  },
  'shipping-policy': {
    title: 'Shipping Policy',
    lastUpdated: 'April 2025',
    sections: [
      {
        heading: 'Delivery Timelines',
        body: `Standard delivery across India takes 3–7 business days. Metro cities (Mumbai, Delhi, Bangalore, Chennai, Hyderabad, Pune) typically receive orders in 2–4 days. Remote and hilly areas may take up to 10 business days.`,
      },
      {
        heading: 'Shipping Charges',
        body: `Free shipping on all orders above ₹999.\nFlat ₹79 shipping on orders between ₹499–₹999.\nCOD handling charge of ₹49 applies to Cash on Delivery orders regardless of order value.`,
      },
      {
        heading: 'Order Processing',
        body: `Orders placed before 2:00 PM IST on business days are processed and dispatched the same day. Orders placed after 2:00 PM or on weekends/public holidays are dispatched the next business day. You'll receive a tracking link via SMS and email once your order ships.`,
      },
      {
        heading: 'Tracking Your Order',
        body: `Once dispatched, you'll receive a tracking ID from our logistics partner. You can track your order on our website under "Track Your Order" or directly on the courier's website. For any issues, contact us at info@duchclothing.in.`,
      },
      {
        heading: 'Undeliverable Packages',
        body: `If a delivery attempt fails 3 times due to an incorrect address or unavailability, the package is returned to our warehouse. We'll contact you to re-schedule delivery; a re-delivery fee may apply.`,
      },
    ],
  },
  'return-and-refund-policy': {
    title: 'Return & Refund Policy',
    lastUpdated: 'April 2025',
    sections: [
      {
        heading: 'Return Window',
        body: `We offer a 7-day return window from the date of delivery. To be eligible, items must be unworn, unwashed, and in original packaging with all tags intact. Sale items and customized/tailored pieces are not eligible for return.`,
      },
      {
        heading: 'How to Initiate a Return',
        body: `Email info@duchclothing.in with your order number, reason for return, and 2–3 clear photos of the product. Our team will respond within 24 hours with a return approval and pickup instructions. Do not send items without prior approval.`,
      },
      {
        heading: 'Refund Process',
        body: `Once we receive and inspect the returned item (usually 2–3 business days after pickup), we'll process your refund:\n\n• Prepaid orders: Full refund to original payment method within 5–7 business days.\n• COD orders: Refund via bank transfer within 5–7 business days (you'll need to provide your account details).`,
      },
      {
        heading: 'Exchanges',
        body: `We currently support size exchanges for the same product. Subject to availability, exchanges are processed within 7–10 business days. If your preferred size is unavailable, a full refund will be issued.`,
      },
      {
        heading: 'Damaged or Incorrect Items',
        body: `If you receive a damaged, defective, or incorrect item, please contact us within 48 hours of delivery with photos. We'll arrange an immediate replacement or full refund at no cost to you — no return required for damaged goods.`,
      },
    ],
  },
  'faq': {
    title: 'Frequently Asked Questions',
    sections: [
      {
        heading: 'Can I change my order after placing it?',
        body: `If your order hasn't been dispatched yet, we can modify it. Contact us immediately at info@duchclothing.in or +91 74181 33373. Once dispatched, modifications aren't possible.`,
      },
      {
        heading: 'How do I find the right size?',
        body: `Each product page includes a size guide button with our measurement chart. If you're between sizes, we recommend sizing up for shirts and sizing true for trousers. Our customer team is also available to help — just WhatsApp us your measurements.`,
      },
      {
        heading: 'Do you offer Cash on Delivery?',
        body: `Yes — COD is available on orders between ₹499 and ₹3000. A handling fee of ₹49 applies. For orders above ₹3000, prepaid payment is required.`,
      },
      {
        heading: 'Are the discount codes stackable?',
        body: `Only one promo code can be applied per order. Codes cannot be combined with other offers, sale items, or bundle discounts.`,
      },
      {
        heading: 'What fabrics do you use?',
        body: `We use a range of fabrics including 100% ring-spun cotton, linen blends, poplin, pique knit, and premium wool blends — all sourced from certified mills in Coimbatore and Tirupur. Fabric details are listed on each product page.`,
      },
      {
        heading: 'How do I care for my DUCH clothes?',
        body: `Most of our garments are machine-washable on a gentle cold cycle. We recommend turning shirts inside out before washing and air drying to maintain shape and color. Blazers and wool pieces should be dry cleaned only.`,
      },
      {
        heading: 'Do you ship internationally?',
        body: `Currently we only ship within India. International shipping is planned for late 2025. Sign up for our newsletter to be notified when it launches.`,
      },
    ],
  },
  'contact-us': {
    title: 'Contact Us',
    sections: [
      {
        heading: 'Customer Support',
        body: `We're available Monday to Saturday, 9:00 AM – 7:00 PM IST.\n\nEmail: info@duchclothing.in\nPhone/WhatsApp: +91 74181 33373\n\nWe aim to respond to all queries within 4 business hours.`,
      },
      {
        heading: 'Order Issues',
        body: `For issues with an existing order (delay, wrong item, damage), please email info@duchclothing.in with your Order ID in the subject line. This helps us prioritize and resolve your issue faster.`,
      },
      {
        heading: 'Business & Wholesale Enquiries',
        body: `Interested in stocking DUCH products or bulk ordering for your organization? Reach out to us at info@duchclothing.in with the subject "Wholesale Enquiry" and we'll connect you with our B2B team.`,
      },
      {
        heading: 'Visit / Return Address',
        body: `Near. Prasanna Theatre,\nKalkuli Thottam,\nKaramathampatti Via,\nCoimbatore — 641659\nTamil Nadu, India`,
      },
    ],
  },
  'track-your-order': {
    title: 'Track Your Order',
    sections: [
      {
        heading: 'How to Track',
        body: `Once your order is dispatched, you'll receive an SMS and email with a tracking ID and courier partner name (typically Delhivery or Blue Dart).\n\nYou can track your shipment directly on the courier's website:\n• Delhivery: www.delhivery.com\n• Blue Dart: www.bluedart.com\n\nEnter your tracking ID to see real-time updates.`,
      },
      {
        heading: 'Haven\'t received your tracking ID?',
        body: `Tracking details are sent within 24 hours of dispatch. If you haven't received them:\n1. Check your spam/junk folder\n2. Ensure your email and phone are correct on your order\n3. Contact us at info@duchclothing.in with your Order ID`,
      },
      {
        heading: 'Order Status Definitions',
        body: `• Order Placed: We've received your order and payment.\n• Processing: Your order is being picked, packed, and quality-checked.\n• Dispatched: Your order is on its way to the courier hub.\n• Out for Delivery: Your order is with the local delivery agent.\n• Delivered: Your package has been handed to you or left at a safe location.`,
      },
    ],
  },
};

export default function InfoPage() {
  const { slug } = useParams();
  const page = PAGES[slug];

  if (!page) {
    return (
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-32 text-center">
        <p className="font-body tracking-widest text-black/40 text-sm mb-6">PAGE NOT FOUND</p>
        <Link to="/" className="font-body text-xs tracking-widest underline opacity-60 hover:opacity-100">
          ← BACK HOME
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-[860px] mx-auto px-6 md:px-12 py-14 pb-24">
      {/* Breadcrumb */}
      <nav className="font-body text-[10px] tracking-[0.25em] text-black/35 mb-10">
        <Link to="/" className="hover:text-duch-black transition-colors">HOME</Link>
        <span className="mx-2">/</span>
        <span className="text-duch-black">{page.title.toUpperCase()}</span>
      </nav>

      {/* Header */}
      <div className="border-b border-black/10 pb-8 mb-12">
        {page.lastUpdated && (
          <p className="font-body text-[10px] tracking-[0.3em] text-black/35 mb-3 uppercase">
            Last Updated: {page.lastUpdated}
          </p>
        )}
        <h1 className="text-4xl md:text-5xl tracking-tight">{page.title.toUpperCase()}</h1>
      </div>

      {/* Sections */}
      <div className="space-y-12">
        {page.sections.map((section, i) => (
          <div key={i} className="grid md:grid-cols-[200px_1fr] gap-6 md:gap-10">
            <h2 className="font-display font-bold text-sm tracking-tight text-duch-black leading-snug pt-1">
              {section.heading}
            </h2>
            <div className="font-body text-sm leading-[1.85] text-black/70 whitespace-pre-line">
              {section.body}
            </div>
          </div>
        ))}
      </div>

      {/* Back to shop CTA */}
      <div className="mt-20 pt-10 border-t border-black/10 flex items-center gap-6">
        <Link to="/shop" className="btn-shimmer inline-flex items-center gap-3 bg-duch-black text-white px-8 py-4 font-body text-xs tracking-[0.2em] hover:bg-gray-800 transition-colors">
          SHOP NOW
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </Link>
        <Link to="/" className="font-body text-xs tracking-widest text-black/50 hover:text-duch-black transition-colors underline">
          ← Back to Home
        </Link>
      </div>
    </article>
  );
}
