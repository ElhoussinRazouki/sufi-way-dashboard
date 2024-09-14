import { Icons } from '@/components/icons';
import { IconProps } from '@radix-ui/react-icons/dist/types';
import { LucideIcon } from 'lucide-react';

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  lucidIcon?: LucideIcon;
  label?: string;
  description?: string;
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

import * as Yup from 'yup';
import { MultimediaType } from './multimedia.types';

export type IconType = LucideIcon | React.ComponentType<IconProps>;

export type Prettify<Obj extends Record<string, any>> = {
  [K in keyof Obj]: Obj[K];
};

export type TReturn<T> = T extends Promise<infer U>
  ? U
  : T extends (...args: any[]) => infer R
  ? R
  : unknown;

// ###### Response types ######
export type PaginatedResponseDto<T> = {
  page: number;
  limit: number;
  total: number;
  data: T[];
};

export const PaginatedResponseDtoSchema = <T extends Yup.Schema<any>>(
  schema: T
) => {
  return Yup.object().shape({
    count: Yup.number().required(),
    page_size: Yup.number().required(),
    results: Yup.array().of(schema).required()
  });
};

export const ListResponseDtoSchema = <T extends Yup.Schema<any>>(schema: T) => {
  return Yup.array().of(schema).optional();
};

export type AttachmentDto = {
  url: string;
  name: string;
  size: number;
  type: string;
};

export const AttachmentDtoSchema = Yup.object().shape({
  url: Yup.string().required(),
  name: Yup.string().required(),
  size: Yup.number().required(),
  type: Yup.string().required()
});

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;

export type ResponseDto<T> = {
  data?: T;
  message?: string;
};

// api related types

export type AttachmentTypes = 'video' | 'image' | 'audio' | 'pdf';
