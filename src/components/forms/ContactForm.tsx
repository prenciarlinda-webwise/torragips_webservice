'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { Button, Input, Textarea, Select } from '@/components/ui';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const t = useTranslations('contact.form');
  const tNav = useTranslations('nav.servicesItems');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const serviceOptions = [
    { value: 'gypsum', label: tNav('gypsum') },
    { value: 'plastering', label: tNav('plastering') },
    { value: 'painting', label: tNav('painting') },
  ];

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // For static export, we'll just simulate success
      // In production, you'd integrate with an email service or form backend
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Form submitted:', data);
      setSubmitStatus('success');
      reset();
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label={t('name')}
        placeholder={t('namePlaceholder')}
        error={errors.name?.message}
        {...register('name')}
      />

      <div className="grid md:grid-cols-2 gap-6">
        <Input
          label={t('email')}
          type="email"
          placeholder={t('emailPlaceholder')}
          error={errors.email?.message}
          {...register('email')}
        />

        <Input
          label={t('phone')}
          type="tel"
          placeholder={t('phonePlaceholder')}
          error={errors.phone?.message}
          {...register('phone')}
        />
      </div>

      <Select
        label={t('service')}
        placeholder={t('selectService')}
        options={serviceOptions}
        error={errors.service?.message}
        {...register('service')}
      />

      <Textarea
        label={t('message')}
        placeholder={t('messagePlaceholder')}
        rows={5}
        error={errors.message?.message}
        {...register('message')}
      />

      {submitStatus === 'success' && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
          {t('successMessage')}
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {t('errorMessage')}
        </div>
      )}

      <Button type="submit" variant="primary" size="lg" isLoading={isSubmitting} className="w-full">
        {isSubmitting ? t('submitting') : t('submit')}
      </Button>
    </form>
  );
}
