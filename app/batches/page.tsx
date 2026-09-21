import React from 'react';
import { Metadata } from 'next';
import { getAllBatches } from '@/lib/data/batches';
import { BatchesListClient } from './BatchesListClient';

export const metadata: Metadata = {
  title: 'Engineering Batches & JoSAA Mentorship 2026 — EDPARTH',
  description:
    'Explore PhysicsWallah-grade live preparation and mentorship batches for JEE Main, JEE Advanced, and JoSAA/CSAB seat allotment.',
};

export default function BatchesPage() {
  const batches = getAllBatches();

  return <BatchesListClient batches={batches} />;
}
