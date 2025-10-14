'use client';

import GalleryCard from '@/components/GalleryCard';

const galleryImages = [
  { imageUrl: '/images/gallery1.jpg', title: 'Club Night' },
  { imageUrl: '/images/gallery2.jpg', title: 'Festival Stage' },
  { imageUrl: '/images/gallery3.jpg', title: 'DJ Booth' },
  { imageUrl: '/images/gallery4.jpg', title: 'Crowd Vibes' },
  { imageUrl: '/images/gallery5.jpg', title: 'Live Performance' },
];

export default function GalleryPage() {
  return (
    <div className="px-6 py-12 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-green-400 mb-8 text-center">📸 Gallery</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {galleryImages.map((img, idx) => (
          <GalleryCard key={idx} {...img} />
        ))}
      </div>
    </div>
  );
}
