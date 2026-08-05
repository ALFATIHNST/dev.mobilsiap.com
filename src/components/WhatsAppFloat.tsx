import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface WhatsAppFloatProps {
  message?: string;
}

export default function WhatsAppFloat({ message = 'Halo MobilSiap, saya ingin bertanya tentang mobil' }: WhatsAppFloatProps) {
  const encodedMsg = encodeURIComponent(message);
  return (
    <a
      href={`https://wa.me/6285883027422?text=${encodedMsg}`}
      target="_blank"
      rel="noopener noreferrer"
      className="wa-float"
      aria-label="Chat via WhatsApp"
    >
      <Icon name="ChatBubbleOvalLeftEllipsisIcon" size={26} variant="solid" className="text-white" />
    </a>
  );
}