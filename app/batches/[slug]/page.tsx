import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBatchBySlug, getAllBatches } from '@/lib/data/batches';
import { BatchOverviewClient } from './BatchOverviewClient';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const batches = getAllBatches();
  return batches.map(batch => ({
    slug: batch.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const batch = getBatchBySlug(params.slug);
  if (!batch) {
    return {
      title: 'Batch Not Found — EDPARTH',
    };
  }

  return {
    title: `${batch.title} — EDPARTH JEE Prep & Mentorship`,
    description: batch.tagline,
    openGraph: {
      title: batch.title,
      description: batch.tagline,
    },
  };
}

export default function BatchOverviewPage({ params }: Props) {
  const batch = getBatchBySlug(params.slug);

  if (!batch) {
    notFound();
  }

  return <BatchOverviewClient batch={batch} />;
}
