import { generateColorsFromString } from '@/utils';
import { Badge, BadgeProps } from '../ui/badge';

type CustomBadgeProps = BadgeProps & {
  type?: 'default' | 'warning' | 'success' | 'danger' | 'random';
  intensity?: number; // used for random type only for tweaking the result
};

export default function CustomBadge({
  children,
  type,
  intensity,
  ...props
}: CustomBadgeProps) {
  switch (type) {
    case 'default':
      return (
        <Badge variant="secondary" {...props}>
          {children}
        </Badge>
      );
    case 'warning':
      return (
        <Badge
          variant="secondary"
          className="bg-yellow-200 text-yellow-700 hover:bg-yellow-200 hover:text-yellow-700"
          {...props}
        >
          {children}
        </Badge>
      );
    case 'success':
      return (
        <Badge
          variant="secondary"
          className="bg-green-200 text-green-700 hover:bg-green-200 hover:text-green-700"
          {...props}
        >
          {children}
        </Badge>
      );
    case 'danger':
      return (
        <Badge
          variant="secondary"
          className="bg-red-200 text-red-700 hover:bg-red-200 hover:text-red-700"
          {...props}
        >
          {children}
        </Badge>
      );
    case 'random':
      const { shinyColor, vibrantColor } = generateColorsFromString(
        children as string,
        intensity
      );
      return (
        <Badge
          style={{
            backgroundColor: shinyColor,
            color: vibrantColor
          }}
          {...props}
        >
          {children}
        </Badge>
      );
    default:
      return (
        <Badge
          variant="secondary"
          className="bg-sky-200 text-sky-700 hover:bg-sky-200 hover:text-sky-700"
          {...props}
        >
          {children}
        </Badge>
      );
  }
}
