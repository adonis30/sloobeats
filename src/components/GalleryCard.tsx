'use client';

import Image from 'next/image';

interface GalleryCardProps {
  imageUrl: string;
  title?: string;
}

export default function GalleryCard({ imageUrl, title }: GalleryCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition">
      <Image
        src={imageUrl}
        alt={title || 'Gallery Image'}
        width={400}
        height={250}
        className="w-full h-60 object-cover group-hover:scale-105 transition-transform"
      />
      {title && (
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2 text-white text-sm">
          {title}
        </div>
      )}
    </div>
  );
}
