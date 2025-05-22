'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { useEffect, useRef } from 'react';

import { siteConfig } from '@/lib/siteConfig';
import { cn } from '@/lib/utils';

// Pattern variants for the component
const patternVariants = cva('relative overflow-hidden', {
  variants: {
    pattern: {
      none: '',
      dots: '',
      grid: '',
      waves: '',
      noise: '',
      triangles: '',
      hexagons: '',
      crosshatch: '',
    },
    opacity: {
      subtle: 'opacity-5',
      light: 'opacity-10',
      medium: 'opacity-20',
      pronounced: 'opacity-30',
    },
    color: {
      primary: 'text-primary',
      secondary: 'text-secondary',
      accent: 'text-accent',
      neutral: 'text-neutral-foreground',
      white: 'text-white',
      dark: 'text-neutral-text',
    },
    animated: {
      true: '',
      false: '',
    },
  },
  defaultVariants: {
    pattern: 'dots',
    opacity: 'subtle',
    color: 'primary',
    animated: false,
  },
});

export interface BackgroundPatternProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>,
    VariantProps<typeof patternVariants> {
  /** Size in pixels of a single pattern unit */
  patternSize?: number;
  /** Animation speed in ms for a full animation cycle */
  animationSpeed?: number;
}

export function BackgroundPattern({
  className,
  pattern,
  opacity,
  color,
  animated,
  patternSize = 30,
  animationSpeed = 10000,
  ...props
}: BackgroundPatternProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Get pattern style from site config, cast to valid variant
  const configPattern =
    (siteConfig.theme.visualStyle?.patternStyle as VariantProps<
      typeof patternVariants
    >['pattern']) || 'dots';
  const configOpacity = siteConfig.theme.visualStyle?.patternOpacity || 0.05;

  // Map into the valid pattern variant union
  const mappedPattern: VariantProps<typeof patternVariants>['pattern'] = pattern ?? configPattern;

  // Map config opacity (0-1) to opacity variant
  const mappedOpacity =
    opacity ||
    (configOpacity <= 0.08
      ? 'subtle'
      : configOpacity <= 0.15
        ? 'light'
        : configOpacity <= 0.25
          ? 'medium'
          : 'pronounced');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions to match parent
    const resizeObserver = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      canvas.width = width;
      canvas.height = height;
      drawPattern();
    });

    resizeObserver.observe(canvas.parentElement || document.body);

    // Get actual color from current style
    const computedColor = window.getComputedStyle(canvas).color;

    // Draw pattern based on selected type
    function drawPattern() {
      if (!ctx || !canvas) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Set base settings
      ctx.strokeStyle = computedColor;
      ctx.fillStyle = computedColor;

      // Different pattern drawing implementations

      switch (mappedPattern) {
        case 'dots':
          drawDots(ctx, canvas.width, canvas.height, patternSize);
          break;
        case 'grid':
          drawGrid(ctx, canvas.width, canvas.height, patternSize);
          break;
        case 'waves':
          drawWaves(ctx, canvas.width, canvas.height, patternSize);
          break;
        case 'noise':
          drawNoise(ctx, canvas.width, canvas.height, patternSize);
          break;
        case 'triangles':
          drawTriangles(ctx, canvas.width, canvas.height, patternSize);
          break;
        case 'hexagons':
          drawHexagons(ctx, canvas.width, canvas.height, patternSize);
          break;
        case 'crosshatch':
          drawCrosshatch(ctx, canvas.width, canvas.height, patternSize);
          break;
        default:
          break;
      }
    }

    let animationFrame: number;
    let startTime: number;

    // Animation loop
    function animate(timestamp: number) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      // Redraw with animation parameters
      if (canvas && ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const phase = (elapsed % animationSpeed) / animationSpeed;

        if (mappedPattern === 'waves') {
          drawWaves(ctx, canvas.width, canvas.height, patternSize, phase);
        } else if (mappedPattern === 'dots') {
          drawDots(ctx, canvas.width, canvas.height, patternSize, phase);
        } else {
          drawPattern(); // Default animation-less fallback
        }
      }

      animationFrame = requestAnimationFrame(animate);
    }

    // Start animation or single draw
    if (animated) {
      animationFrame = requestAnimationFrame(animate);
    } else {
      drawPattern();
    }

    // Cleanup
    return () => {
      resizeObserver.disconnect();
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [mappedPattern, patternSize, animated, animationSpeed]);

  return (
    <div
      className={cn(
        patternVariants({ pattern: mappedPattern, opacity: mappedOpacity, color, animated }),
        className
      )}
      aria-hidden="true"
      {...props}
    >
      <canvas ref={canvasRef} className="absolute inset-0 size-full" />
    </div>
  );
}

// Drawing functions
function drawDots(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  size: number,
  phase = 0
) {
  const dotSize = size / 5;
  const spacing = size;

  ctx.beginPath();

  for (let x = spacing; x < width; x += spacing) {
    for (let y = spacing; y < height; y += spacing) {
      // Animate size if phase is provided
      const actualSize = phase
        ? dotSize * (1 + 0.2 * Math.sin(phase * Math.PI * 2 + (x + y) / 100))
        : dotSize;

      ctx.moveTo(x, y);
      ctx.arc(x, y, actualSize, 0, Math.PI * 2);
    }
  }

  ctx.fill();
}

function drawGrid(ctx: CanvasRenderingContext2D, width: number, height: number, size: number) {
  const spacing = size;
  ctx.beginPath();
  ctx.lineWidth = 0.5;

  // Vertical lines
  for (let x = spacing; x < width; x += spacing) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
  }

  // Horizontal lines
  for (let y = spacing; y < height; y += spacing) {
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
  }

  ctx.stroke();
}

function drawWaves(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  size: number,
  phase = 0
) {
  const amplitude = size / 2;
  const frequency = 0.05;

  ctx.beginPath();
  ctx.lineWidth = 1;

  // Draw multiple waves
  for (let waveOffset = 0; waveOffset < height; waveOffset += size * 2) {
    ctx.moveTo(0, waveOffset);

    for (let x = 0; x < width; x += 2) {
      // Create wave pattern with animation phase
      const y = waveOffset + amplitude * Math.sin(x * frequency + (phase || 0) * Math.PI * 2);
      ctx.lineTo(x, y);
    }
  }

  ctx.stroke();
}

function drawNoise(ctx: CanvasRenderingContext2D, width: number, height: number, size: number) {
  const dotSize = 0.5;
  const density = Math.max(1, Math.floor(size / 5));

  for (let x = 0; x < width; x += density) {
    for (let y = 0; y < height; y += density) {
      // Random opacity for noise effect
      if (Math.random() > 0.8) {
        ctx.fillRect(x, y, dotSize, dotSize);
      }
    }
  }
}

function drawTriangles(ctx: CanvasRenderingContext2D, width: number, height: number, size: number) {
  const spacing = size;
  ctx.beginPath();

  for (let x = 0; x < width; x += spacing) {
    for (let y = 0; y < height; y += spacing) {
      // Alternate triangle orientation
      if ((x / spacing + y / spacing) % 2 === 0) {
        ctx.moveTo(x, y);
        ctx.lineTo(x + spacing, y);
        ctx.lineTo(x + spacing / 2, y + spacing);
        ctx.lineTo(x, y);
      } else {
        ctx.moveTo(x, y + spacing);
        ctx.lineTo(x + spacing, y + spacing);
        ctx.lineTo(x + spacing / 2, y);
        ctx.lineTo(x, y + spacing);
      }
    }
  }

  ctx.stroke();
}

function drawHexagons(ctx: CanvasRenderingContext2D, width: number, height: number, size: number) {
  const radius = size / 2;
  const spacing = radius * 1.73205; // sqrt(3)

  ctx.beginPath();

  for (let y = 0; y < height + spacing * 2; y += spacing * 2) {
    for (let x = 0; x < width + radius * 2; x += radius * 3) {
      drawHexagon(ctx, x, y, radius);
      drawHexagon(ctx, x + radius * 1.5, y + spacing, radius);
    }
  }

  ctx.stroke();
}

function drawHexagon(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number) {
  ctx.moveTo(x + radius, y);

  for (let i = 1; i <= 6; i++) {
    const angle = (i * Math.PI) / 3;
    const pointX = x + radius * Math.cos(angle);
    const pointY = y + radius * Math.sin(angle);
    ctx.lineTo(pointX, pointY);
  }
}

function drawCrosshatch(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  size: number
) {
  const spacing = size;
  ctx.lineWidth = 0.5;
  ctx.beginPath();

  // Diagonal lines (positive slope)
  for (let x = -height; x < width; x += spacing) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x + height, height);
  }

  // Diagonal lines (negative slope)
  for (let x = 0; x < width + height; x += spacing) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x - height, height);
  }

  ctx.stroke();
}
