import { NavItem } from '@/types';
import {
  BookA,
  CircleHelp,
  LibraryBig,
  Newspaper,
  Settings
} from 'lucide-react';

export type User = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
};

export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string; // Consider using a proper date type if possible
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude?: number; // Optional field
  latitude?: number; // Optional field
  job: string;
  profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
};

export const navItems: NavItem[] = [
  {
    title: 'لوحة التحكم',
    href: '/dashboard',
    icon: 'dashboard',
    label: 'لوحة التحكم'
  },
  {
    title: 'مكتبة الوسائط',
    href: '/dashboard/multimedia',
    lucidIcon: LibraryBig,
    label: 'مكتبة الوسائط'
  },
  {
    title: 'المؤلفون',
    href: '/dashboard/authors',
    lucidIcon: BookA,
    label: 'المؤلفون'
  },
  {
    title: 'الأسئلة المتكررة',
    href: '/dashboard/frequent-questions',
    lucidIcon: CircleHelp,
    label: 'الأسئلة المتكررة'
  },
  {
    title: 'الأخبار',
    href: '/dashboard/news',
    lucidIcon: Newspaper,
    label: 'الأخبار'
  },
  {
    title: 'الإعدادات',
    href: '/dashboard/settings',
    lucidIcon: Settings,
    label: 'الإعدادات'
  }
];

export const MULTIMEDIA_TYPES = ['video', 'audio', 'pdf'] as const;
export const ADKAR_ADIA_TYPES = ['adkar', 'doaa'] as const;

export const RANDOM_COLORS = [
  {
    name: 'Slate',
    '200': 'rgb(226, 232, 240)',
    '600': 'rgb(71, 85, 105)'
  },
  {
    name: 'Emerald',
    '200': 'rgb(167, 243, 208)',
    '600': 'rgb(5, 150, 105)'
  },
  {
    name: 'Fuchsia',
    '200': 'rgb(245, 208, 254)',
    '600': 'rgb(192, 38, 211)'
  },
  {
    name: 'Teal',
    '200': 'rgb(153, 246, 228)',
    '600': 'rgb(13, 148, 136)'
  },
  {
    name: 'Rose',
    '200': 'rgb(254, 205, 211)',
    '600': 'rgb(225, 29, 72)'
  },
  {
    name: 'Yellow',
    '200': 'rgb(254, 240, 138)',
    '600': 'rgb(202, 138, 4)'
  },
  {
    name: 'Indigo',
    '200': 'rgb(199, 210, 254)',
    '600': 'rgb(67, 56, 202)'
  },
  {
    name: 'Orange',
    '200': 'rgb(254, 215, 170)',
    '600': 'rgb(234, 88, 12)'
  },
  {
    name: 'Sky',
    '200': 'rgb(186, 230, 253)',
    '600': 'rgb(2, 132, 199)'
  },
  {
    name: 'Lime',
    '200': 'rgb(217, 249, 157)',
    '600': 'rgb(77, 124, 15)'
  },
  {
    name: 'Violet',
    '200': 'rgb(221, 214, 254)',
    '600': 'rgb(109, 40, 217)'
  },
  {
    name: 'Red',
    '200': 'rgb(254, 202, 202)',
    '600': 'rgb(220, 38, 38)'
  },
  {
    name: 'Cyan',
    '200': 'rgb(165, 243, 252)',
    '600': 'rgb(8, 145, 178)'
  },
  {
    name: 'Purple',
    '200': 'rgb(233, 213, 255)',
    '600': 'rgb(124, 58, 237)'
  },
  {
    name: 'Pink',
    '200': 'rgb(251, 207, 232)',
    '600': 'rgb(219, 39, 119)'
  },
  {
    name: 'Amber',
    '200': 'rgb(253, 230, 138)',
    '600': 'rgb(202, 138, 4)'
  },
  {
    name: 'Coral',
    '200': 'rgb(252, 192, 191)',
    '600': 'rgb(244, 63, 94)'
  },
  {
    name: 'Blue',
    '200': 'rgb(191, 219, 254)',
    '600': 'rgb(29, 78, 216)'
  },
  {
    name: 'Peach',
    '200': 'rgb(254, 215, 215)',
    '600': 'rgb(237, 100, 166)'
  }
];
