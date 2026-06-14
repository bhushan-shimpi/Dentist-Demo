import HeroSection from '../components/home/HeroSection';
import StatsSection from '../components/home/StatsSection';
import ServicesPreview from '../components/home/ServicesPreview';
import DoctorSection from '../components/home/DoctorSection';
import WhyChooseUs from '../components/home/WhyChooseUs';
import TreatmentProcess from '../components/home/TreatmentProcess';
import TestimonialsCarousel from '../components/home/TestimonialsCarousel';
import GalleryPreview from '../components/home/GalleryPreview';
import FAQSection from '../components/home/FAQSection';
import ContactCTA from '../components/home/ContactCTA';

export default function Home() {
  return (
    <>
      <title>DentaCare Pro — Premium Dental Clinic in Pune</title>
      <HeroSection />
      <StatsSection />
      <ServicesPreview />
      <DoctorSection />
      <WhyChooseUs />
      <TreatmentProcess />
      <TestimonialsCarousel />
      <GalleryPreview />
      <FAQSection />
      <ContactCTA />
    </>
  );
}
