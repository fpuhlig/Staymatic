import {
  PageContainer,
  PageHeader,
  ContentSection,
  FeatureCard,
  ValueCard,
  CTASection,
} from '../../components';

export default function AboutPage() {
  const offerData = [
    {
      title: 'For Travelers',
      items: [
        'Unique properties in prime locations',
        'Verified hosts and secure bookings',
        '24/7 customer support',
        'Flexible cancellation policies',
        'Local recommendations and insights',
      ],
    },
    {
      title: 'For Hosts',
      items: [
        'Easy property listing and management',
        'Professional photography services',
        'Dynamic pricing optimization',
        'Guest screening and verification',
        'Comprehensive host protection',
      ],
    },
  ];

  const values = [
    {
      icon: '🤝',
      title: 'Trust',
      description:
        'We build trust through verified profiles, secure payments, and transparent communication between hosts and guests.',
    },
    {
      icon: '🌟',
      title: 'Quality',
      description:
        'Every property on our platform meets high standards for cleanliness, safety, and amenities to ensure exceptional stays.',
    },
    {
      icon: '🌍',
      title: 'Community',
      description:
        'We foster a global community of travelers and hosts who share experiences, cultures, and create lasting connections.',
    },
  ];

  const ctaButtons = [
    { href: '/properties', text: 'Browse Properties', variant: 'primary' as const },
    { href: '/host/add-property', text: 'Become a Host', variant: 'secondary' as const },
  ];

  return (
    <PageContainer maxWidth="7xl">
      <PageHeader
        title="About Staymatic"
        subtitle="Connecting travelers with extraordinary places to stay"
      />

      <div className="mx-auto max-w-6xl space-y-12">
        <ContentSection title="Our Mission">
          <p className="mb-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            At Staymatic, we believe that every journey should be extraordinary. Our mission is to
            connect travelers with unique, comfortable, and memorable places to stay, while
            empowering hosts to share their spaces and create meaningful connections.
          </p>
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            We&apos;re not just a booking platform – we&apos;re a community that celebrates the joy
            of travel and the warmth of hospitality.
          </p>
        </ContentSection>

        <ContentSection title="What We Offer">
          <div className="grid gap-8 md:grid-cols-2">
            {offerData.map((offer, index) => (
              <FeatureCard key={index} title={offer.title}>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  {offer.items.map((item, itemIndex) => (
                    <li key={itemIndex}>• {item}</li>
                  ))}
                </ul>
              </FeatureCard>
            ))}
          </div>
        </ContentSection>

        <ContentSection title="Our Story">
          <p className="mb-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            Staymatic was born from a simple idea: travel should be about more than just finding a
            place to sleep. It should be about discovering new cultures, meeting interesting people,
            and creating memories that last a lifetime.
          </p>
          <p className="mb-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            Founded by a team of passionate travelers and technology enthusiasts, we&apos;ve built a
            platform that combines the latest technology with the timeless values of hospitality and
            human connection.
          </p>
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            Today, we&apos;re proud to serve thousands of travelers and hosts around the world,
            facilitating millions of nights of comfortable, memorable stays.
          </p>
        </ContentSection>

        <ContentSection title="Our Values">
          <div className="grid gap-6 md:grid-cols-3">
            {values.map((value, index) => (
              <ValueCard
                key={index}
                icon={value.icon}
                title={value.title}
                description={value.description}
              />
            ))}
          </div>
        </ContentSection>

        <CTASection
          title="Get in Touch"
          description="Have questions or want to learn more? We'd love to hear from you."
          buttons={ctaButtons}
        />
      </div>
    </PageContainer>
  );
}
