import {
  PageContainer,
  PageHeader,
  ContentSection,
  FeatureCard,
  FAQCard,
  CTASection,
} from '../../components';

export default function HelpPage() {
  const faqs = [
    {
      question: 'How do I book a property?',
      answer:
        'Browse our properties, select your dates, and click "Book Now". You\'ll be guided through our secure checkout process. Payment is processed securely, and you\'ll receive a confirmation email with all the details.',
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers. All payments are processed securely through our encrypted payment system.',
    },
    {
      question: 'Can I cancel my booking?',
      answer:
        'Cancellation policies vary by property. Most hosts offer flexible cancellation up to 24-48 hours before check-in. You can view the specific cancellation policy on each property listing and in your booking confirmation.',
    },
    {
      question: 'How do I become a host?',
      answer:
        'Getting started as a host is easy! Create an account, click "Add Property" in your dashboard, and provide details about your space. We\'ll review your listing and help you get started with hosting.',
    },
    {
      question: 'Is my booking protected?',
      answer:
        'Yes! All bookings are protected by our Host Guarantee, which covers property damage up to €1M. We also provide 24/7 customer support and secure payment processing for your peace of mind.',
    },
    {
      question: 'How do I contact my host?',
      answer:
        "Once your booking is confirmed, you can message your host directly through our platform. You'll find the messaging feature in your booking details and trip itinerary.",
    },
    {
      question: 'What if I have issues during my stay?',
      answer:
        'Contact us immediately through our 24/7 support line or message system. Our team will work with you and your host to resolve any issues quickly and ensure you have a great stay.',
    },
    {
      question: 'How do I leave a review?',
      answer:
        "After your stay, you'll receive an email invitation to leave a review. You can also access the review form through your account dashboard. Reviews help other travelers and improve our community.",
    },
  ];

  const supportCategories = [
    {
      title: 'For Travelers',
      icon: '🧳',
      topics: [
        { name: 'Booking Help', href: '/properties' },
        { name: 'Payment Issues', href: 'mailto:support@staymatic.com?subject=Payment%20Issue' },
        { name: 'Trip Changes', href: 'mailto:support@staymatic.com?subject=Trip%20Changes' },
        { name: 'Property Questions', href: '/properties' },
      ],
    },
    {
      title: 'For Hosts',
      icon: '🏠',
      topics: [
        { name: 'Listing Management', href: '/host/dashboard' },
        { name: 'Pricing Help', href: '/host/add-property' },
        {
          name: 'Guest Communication',
          href: 'mailto:support@staymatic.com?subject=Guest%20Communication',
        },
        { name: 'Payouts', href: 'mailto:support@staymatic.com?subject=Payouts' },
      ],
    },
    {
      title: 'Account & Safety',
      icon: '🔒',
      topics: [
        { name: 'Account Settings', href: '/login' },
        { name: 'Privacy & Security', href: '/about' },
        {
          name: 'Trust & Safety',
          href: 'mailto:support@staymatic.com?subject=Trust%20and%20Safety',
        },
        {
          name: 'Verification',
          href: 'mailto:support@staymatic.com?subject=Account%20Verification',
        },
      ],
    },
    {
      title: 'Technical Support',
      icon: '💻',
      topics: [
        { name: 'Website Issues', href: 'mailto:support@staymatic.com?subject=Website%20Issue' },
        { name: 'Mobile App', href: 'mailto:support@staymatic.com?subject=Mobile%20App' },
        { name: 'Accessibility', href: 'mailto:support@staymatic.com?subject=Accessibility' },
        { name: 'Browser Support', href: 'mailto:support@staymatic.com?subject=Browser%20Support' },
      ],
    },
  ];

  const contactButtons = [
    { href: 'mailto:support@staymatic.com', text: 'Email Support', variant: 'primary' as const },
    { href: 'tel:+1234567890', text: 'Call Us: +1 (234) 567-890', variant: 'secondary' as const },
  ];

  const resourceLinks = [
    {
      href: '/about',
      title: 'About Staymatic',
      description: 'Learn more about our mission and values',
    },
    {
      href: 'mailto:support@staymatic.com?subject=Community%20Guidelines',
      title: 'Community Guidelines',
      description: 'Guidelines for hosts and guests',
    },
    {
      href: 'mailto:support@staymatic.com?subject=Safety%20Center',
      title: 'Safety Center',
      description: 'Tips for safe and secure stays',
    },
  ];

  return (
    <PageContainer>
      <PageHeader
        title="Help Center"
        subtitle="Find answers to your questions and get the support you need"
      />

      <div className="mx-auto max-w-4xl space-y-12">
        <CTASection
          title="Need Help?"
          description="Our support team is available 24/7 to assist you with any questions or concerns."
          buttons={contactButtons}
        />

        <ContentSection title="Browse by Category">
          <div className="grid gap-6 md:grid-cols-2">
            {supportCategories.map((category, index) => (
              <FeatureCard
                key={index}
                title={category.title}
                className="transition-shadow hover:shadow-md"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-2xl">{category.icon}</span>
                </div>
                <ul className="space-y-2">
                  {category.topics.map((topic, topicIndex) => (
                    <li key={topicIndex}>
                      <a
                        href={topic.href}
                        className="text-blue-600 hover:text-blue-700 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        {topic.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </FeatureCard>
            ))}
          </div>
        </ContentSection>

        <ContentSection title="Frequently Asked Questions">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <FAQCard key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </ContentSection>

        <ContentSection title="Additional Resources">
          <div className="rounded-lg bg-gray-50 p-8 dark:bg-gray-800">
            <div className="grid gap-4 md:grid-cols-3">
              {resourceLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="rounded-lg border border-gray-200 bg-white p-4 text-center transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600"
                >
                  <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">{link.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{link.description}</p>
                </a>
              ))}
            </div>
          </div>
        </ContentSection>
      </div>
    </PageContainer>
  );
}
