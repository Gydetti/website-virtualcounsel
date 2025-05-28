import { cn } from '@/lib/utils';

interface SectionDividerProps {
  className?: string;
  variant?:
    | 'wave'
    | 'curve'
    | 'triangle'
    | 'zigzag'
    | 'clouds'
    | 'mountains'
    | 'flowing-wave'
    | 'double-wave';
  position?: 'top' | 'bottom';
  fill?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  flip?: boolean;
}

export default function SectionDivider({
  className,
  variant = 'wave',
  position = 'bottom',
  fill = 'fill-white',
  size = 'md',
  flip = false,
}: SectionDividerProps) {
  const isTop = position === 'top';

  const heights = {
    sm: 'h-8 md:h-10',
    md: 'h-12 md:h-16',
    lg: 'h-16 md:h-20',
    xl: 'h-20 md:h-24',
  };

  const getPath = () => {
    switch (variant) {
      case 'wave':
        return (
          <path
            d="M0,32L48,37.3C96,43,192,53,288,53.3C384,53,480,43,576,48C672,53,768,75,864,80C960,85,1056,75,1152,64C1248,53,1344,43,1392,37.3L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            fill="currentColor"
            fillOpacity="1"
          />
        );
      case 'flowing-wave':
        return (
          <path
            d="M0,64C80,32,160,96,240,96S400,32,480,32s160,64,240,64s160-32,240-32s160,64,240,64s160-32,240-32v32H0V64z"
            fill="currentColor"
            fillOpacity="1"
          />
        );
      case 'double-wave':
        return (
          <>
            <path
              d="M0,48C80,16,160,80,240,80S400,16,480,16s160,64,240,64s160-32,240-32s160,64,240,64s160-32,240-32v48H0V48z"
              fill="currentColor"
              fillOpacity="0.6"
            />
            <path
              d="M0,64C80,32,160,96,240,96S400,32,480,32s160,64,240,64s160-32,240-32s160,64,240,64s160-32,240-32v32H0V64z"
              fill="currentColor"
              fillOpacity="1"
            />
          </>
        );
      case 'clouds':
        return (
          <path
            d="M0,32C120,10,240,54,360,32C480,10,600,54,720,32C840,10,960,54,1080,32C1200,10,1320,54,1440,32V96H0V32Z"
            fill="currentColor"
            fillOpacity="1"
          />
        );
      case 'mountains':
        return (
          <path
            d="M0,96L240,32L480,64L720,16L960,48L1200,24L1440,40V96H0Z"
            fill="currentColor"
            fillOpacity="1"
          />
        );
      case 'curve':
        return <path d="M0,0L1440,96L1440,0L0,0Z" fill="currentColor" fillOpacity="1" />;
      case 'triangle':
        return <path d="M0,0L720,96L1440,0L1440,0L0,0Z" fill="currentColor" fillOpacity="1" />;
      case 'zigzag':
        return (
          <path
            d="M0,32L120,37.3C240,43,480,53,720,53.3C960,53,1200,43,1320,37.3L1440,32L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"
            fill="currentColor"
            fillOpacity="1"
          />
        );
      default:
        return (
          <path
            d="M0,32L48,37.3C96,43,192,53,288,53.3C384,53,480,43,576,48C672,53,768,75,864,80C960,85,1056,75,1152,64C1248,53,1344,43,1392,37.3L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            fill="currentColor"
            fillOpacity="1"
          />
        );
    }
  };

  return (
    <div
      className={cn(
        'absolute left-0 right-0 w-full overflow-hidden leading-0 z-10',
        isTop ? 'top-0' : 'bottom-0',
        isTop && !flip ? 'rotate-180' : '',
        !isTop && flip ? 'rotate-180' : '',
        className
      )}
    >
      <svg
        aria-hidden="true"
        className={cn('relative block w-full', heights[size], fill)}
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {getPath()}
      </svg>
    </div>
  );
}
