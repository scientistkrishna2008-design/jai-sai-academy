import React, { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { MessageSquare } from 'lucide-react';

export default function WhatsAppFloat() {
  const { data } = useContext(DataContext);
  const { whatsappNumber } = data.contact;

  // Cleanup phone number format
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');

  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent("Hello! I am interested in seeking admission / course details from Jai Sai Academy. Please share details.")}`;

  return (
    <a 
      href={whatsappUrl} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="whatsapp-float" 
      title="Chat with us on WhatsApp"
    >
      {/* Lucide icon represents chat beautifully. We'll add custom SVG to match WhatsApp look inside */}
      <svg 
        viewBox="0 0 24 24" 
        width="28" 
        height="28" 
        stroke="currentColor" 
        strokeWidth="0" 
        fill="currentColor"
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.731-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.968C16.368 1.97 13.901 1.03 11.3 1.03 5.866 1.03 1.443 5.4 1.44 10.826c-.001 1.706.452 3.37 1.312 4.832l-.993 3.626 3.73-.974h.001zm10.74-6.495c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      </svg>
    </a>
  );
}
