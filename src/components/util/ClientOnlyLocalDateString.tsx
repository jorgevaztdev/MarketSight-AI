
"use client";

import { useState, useEffect } from 'react';

interface ClientOnlyLocalDateStringProps {
  isoDateString: string;
  options?: Intl.DateTimeFormatOptions;
  className?: string;
}

const ClientOnlyLocalDateString: React.FC<ClientOnlyLocalDateStringProps> = ({ isoDateString, options, className }) => {
  const [formattedDate, setFormattedDate] = useState<string | null>(null);

  useEffect(() => {
    // This runs only on the client after hydration
    setFormattedDate(new Date(isoDateString).toLocaleDateString(undefined, options));
  }, [isoDateString, options]);

  if (formattedDate === null) {
    // Render the YYYY-MM-DD part of the ISO string for server-render and initial client-render
    // This ensures consistency before hydration.
    return <span className={className}>{isoDateString.substring(0, 10)}</span>;
  }

  return <span className={className}>{formattedDate}</span>;
};

export default ClientOnlyLocalDateString;
