import { Icons } from '@/components/icons';

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
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

import { IconProps } from "@radix-ui/react-icons/dist/types"
import { LucideIcon } from "lucide-react"
import * as Yup from "yup"

export type IconType = LucideIcon | React.ComponentType<IconProps>

export type Prettify<Obj extends Record<string, any>> = { [K in keyof Obj]: Obj[K] }

export type TReturn<T> =
  T extends Promise<infer U> ? U : T extends (...args: any[]) => infer R ? R : unknown



// ###### Response types ######
export type PaginatedResponseDto<T> = {
  count: number
  page_size: number
  results: T[]
}

export const PaginatedResponseDtoSchema = <T extends Yup.Schema<any>>(schema: T) => {
  return Yup.object().shape({
    count: Yup.number().required(),
    page_size: Yup.number().required(),
    results: Yup.array().of(schema).required(),
  })
}

export const ListResponseDtoSchema = <T extends Yup.Schema<any>>(schema: T) => {
  return Yup.array().of(schema).optional()
}

export type AttachmentDto = {
  id: string
  name: string
  file: string
  size: number
  tag: string
  link: string
  updated: string
  created: string
}

export type AttachmentPayloadDto = Partial<
  Omit<AttachmentDto, "id" | "created" | "updated" | "file" | "link">
>

export const AttachmentDtoSchema = Yup.object().shape({
  id: Yup.string().required(),
  name: Yup.string().required(),
  file: Yup.string().required(),
  size: Yup.number().required(),
  tag: Yup.string().optional(),
  link: Yup.string().required(),
  updated: Yup.string().required(),
  created: Yup.string().required(),
})


export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;

