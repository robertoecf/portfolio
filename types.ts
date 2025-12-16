import React from 'react';

export enum UserRole {
  USER = 'user',
  MODEL = 'model'
}

export interface ChatMessage {
  id: string;
  role: UserRole;
  text: string;
  timestamp: number;
}

export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string[];
}

export interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}
