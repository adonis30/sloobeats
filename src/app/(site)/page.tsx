import LandingPage from '@/components/LandingPage';
import FeaturedEvents from '@/components/FeaturedEvents';
import FeaturedMixes from '@/components/FeaturedMixes';
import AboutSection from '@/components/AboutSection';
import NewsletterSection from '@/components/NewsletterSection';
import Contacts from '@/components/Contacts';

export default function HomePage() {
  return (
    <>
      <LandingPage />
      <FeaturedEvents />
      <FeaturedMixes />
      <AboutSection />
      <Contacts />
      <NewsletterSection />
    </>
  );
}
