import React from 'react';

interface RevealProps {
  children: React.ReactNode;
  width?: 'fit-content' | '100%';
  delay?: number;
  fill?: boolean;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'blur';
}

export const Reveal = ({ children, width = '100%' }: RevealProps) => (
  <div style={{ width }}>{children}</div>
);
