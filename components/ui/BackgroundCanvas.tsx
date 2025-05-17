'use client';
import { siteConfig } from '@/lib/siteConfig';
import { useEffect, useRef } from 'react';

export default function BackgroundCanvas() {
  // Supported types: "none" | "gradient" | "particles" | "parallax" | "noise" | "wave" | "image"
  const { animatedBackgroundType, backgroundImageUrl } = siteConfig.features;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (animatedBackgroundType === 'none') return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const width = canvas.width;
    const height = canvas.height;
    let animationId: number;
    let scrollOffset = 0;

    // Preload background image for 'image' type
    let bgImage: HTMLImageElement | null = null;
    if (animatedBackgroundType === 'image' && backgroundImageUrl) {
      bgImage = new Image();
      bgImage.src = backgroundImageUrl;
    }

    // Particle system data
    type Particle = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      color: string;
    };
    const particles: Particle[] = [];
    if (animatedBackgroundType === 'particles') {
      const count = 80;
      for (let i = 0; i < count; i++) {
        const r = 1 + Math.random() * 3;
        const x = Math.random() * width;
        const y = Math.random() * height;
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.2 + Math.random() * 0.3;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          r,
          color: `hsla(${Math.random() * 360}, 60%, 70%, 0.6)`,
        });
      }
    }
    // Parallax shapes data
    type Shape = {
      x: number;
      y0: number;
      r: number;
      factor: number;
      color: string;
    };
    const shapes: Shape[] = [];
    const onScroll = () => {
      scrollOffset = window.scrollY;
    };
    if (animatedBackgroundType === 'parallax') {
      window.addEventListener('scroll', onScroll);
      const count = 10;
      for (let i = 0; i < count; i++) {
        const r = 20 + Math.random() * 60;
        const x = Math.random() * width;
        const y0 = Math.random() * height;
        const factor = ((i + 1) / count) * 0.3;
        shapes.push({
          x,
          y0,
          r,
          factor,
          color: `hsla(${Math.random() * 360}, 40%, 80%, 0.3)`,
        });
      }
    }

    function draw() {
      if (!ctx) return;
      // Image background draws over everything
      if (animatedBackgroundType === 'image' && bgImage) {
        if (bgImage.complete) ctx.drawImage(bgImage, 0, 0, width, height);
        animationId = requestAnimationFrame(draw);
        return;
      }
      // Noise effect (random grain overlay)
      if (animatedBackgroundType === 'noise') {
        const imgData = ctx.createImageData(width, height);
        const d = imgData.data;
        for (let i = 0; i < d.length; i += 4) {
          const v = Math.random() * 255;
          d[i] = d[i + 1] = d[i + 2] = v;
          d[i + 3] = 20;
        }
        ctx.putImageData(imgData, 0, 0);
        animationId = requestAnimationFrame(draw);
        return;
      }
      // Wave effect (sinusoidal band)
      if (animatedBackgroundType === 'wave') {
        const t = Date.now() * 0.002;
        const amp = height * 0.1;
        ctx.fillStyle = `hsla(${(Date.now() / 20) % 360}, 50%, 50%, 0.3)`;
        ctx.beginPath();
        ctx.moveTo(0, height);
        for (let x = 0; x <= width; x += 10) {
          const y = height / 2 + Math.sin(x * 0.02 + t) * amp;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fill();
        animationId = requestAnimationFrame(draw);
        return;
      }
      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Gradient background
      if (animatedBackgroundType === 'gradient') {
        const grad = ctx.createRadialGradient(
          width / 2,
          height / 2,
          0,
          width / 2,
          height / 2,
          width
        );
        grad.addColorStop(0, `hsla(${(Date.now() / 20) % 360}, 50%, 50%, 0.3)`);
        grad.addColorStop(1, `hsla(${(((Date.now() / 20) % 360) + 60) % 360}, 50%, 50%, 0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }
      // Particle animation
      if (animatedBackgroundType === 'particles') {
        for (const p of particles) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < -p.r) p.x = width + p.r;
          if (p.x > width + p.r) p.x = -p.r;
          if (p.y < -p.r) p.y = height + p.r;
          if (p.y > height + p.r) p.y = -p.r;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
          ctx.fillStyle = p.color;
          ctx.fill();
        }
      }
      // Parallax shapes
      if (animatedBackgroundType === 'parallax') {
        for (const s of shapes) {
          const y = ((s.y0 + scrollOffset * s.factor) % (height + s.r)) - s.r;
          ctx.beginPath();
          ctx.arc(s.x, y, s.r, 0, 2 * Math.PI);
          ctx.fillStyle = s.color;
          ctx.fill();
        }
      }
      // Loop
      animationId = requestAnimationFrame(draw);
    }

    // Kick off
    draw();
    return () => {
      cancelAnimationFrame(animationId);
      if (animatedBackgroundType === 'parallax') window.removeEventListener('scroll', onScroll);
    };
  }, [animatedBackgroundType, backgroundImageUrl]);

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10 w-full h-full" />;
}
