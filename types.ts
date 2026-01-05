
import React from 'react';

export interface NavItem {
  label: string;
  path: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  status: string;
  completion: number;
  description: string;
  image: string;
}

export interface IndustrySolution {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}
