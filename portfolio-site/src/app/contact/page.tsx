import type { Metadata } from 'next';
import ContactContent from '@/components/contact/ContactContent';
import PageLayout from '@/components/layout/PageLayout';

export const metadata: Metadata = {
  title: 'Contact | Jeremiah Manzano',
  description: 'Get in touch with Jeremiah Manzano for After Effects and Videography services',
};

export default function ContactPage() {
  return (
    <PageLayout>
      <ContactContent />
    </PageLayout>
  );
}