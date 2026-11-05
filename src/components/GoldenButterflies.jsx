import React, { useEffect, useRef } from 'react';

/**
 * GoldenButterflies: High-performance canvas-rendered luminous golden butterflies
 * with realistic wing-flapping, curved flight paths, and glowing stardust trails.
 */
export default function GoldenButterflies({ count = 14, interactive = true }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse / Touch attraction
    let pointer = { x: width / 2, y: height / 2, active: false };
    const handlePointerMove = (e) => {
      const clientX = e.clientX !== undefined ? e.clientX : e.touches?.[0]?.clientX;
      const clientY = e.clientY !== undefined ? e.clientY : e.touches?.[0]?.clientY;
      if (clientX !== undefined && clientY !== undefined) {
        pointer.x = clientX;
        pointer.y = clientY;
        pointer.active = true;
      }
    };
    const handlePointerLeave = () => {
      pointer.active = false;
    };

    if (interactive) {
      window.addEventListener('pointermove', handlePointerMove, { passive: true });
      window.addEventListener('pointerleave', handlePointerLeave, { passive: true });
    }

    // Butterfly Class
    class Butterfly {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        this.x = initial ? Math.random() * width : Math.random() < 0.5 ? -40 : width + 40;
        this.y = initial ? Math.random() * height : Math.random() * height;
        this.size = 10 + Math.random() * 12; // Butterfly size
        this.speed = 0.8 + Math.random() * 1.2;
        this.angle = (Math.random() * Math.PI) / 3 - Math.PI / 6 + (this.x < width / 2 ? 0 : Math.PI);
        this.targetAngle = this.angle;
        this.angularSpeed = 0.03 + Math.random() * 0.03;
        this.flapSpeed = 0.18 + Math.random() * 0.1;
        this.flap = Math.random() * Math.PI * 2;
        this.alpha = 0.65 + Math.random() * 0.35;
        this.wobbleSpeed = 0.02 + Math.random() * 0.03;
        this.wobbleTime = Math.random() * 100;
        this.trail = [];
        this.maxTrail = 6;
      }

      update() {
        this.flap += this.flapSpeed;
        this.wobbleTime += this.wobbleSpeed;

        // Gentle wander or mouse attraction
        if (pointer.active) {
          const dx = pointer.x - this.x;
          const dy = pointer.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 260 && dist > 40) {
            this.targetAngle = Math.atan2(dy, dx) + Math.sin(this.wobbleTime) * 0.4;
          }
        } else {
          this.targetAngle += (Math.random() - 0.5) * 0.1;
        }

        // Smooth steering
        this.angle += (this.targetAngle - this.angle) * this.angularSpeed;

        // Position update
        const vx = Math.cos(this.angle) * this.speed + Math.sin(this.wobbleTime) * 0.6;
        const vy = Math.sin(this.angle) * this.speed * 0.6 - 0.35; // Slight gentle upward drift
        this.x += vx;
        this.y += vy;

        // Record stardust trail
        if (Math.random() < 0.4) {
          this.trail.unshift({
            x: this.x + (Math.random() - 0.5) * 4,
            y: this.y + (Math.random() - 0.5) * 4,
            alpha: this.alpha * 0.7,
            size: Math.random() * 2 + 1,
          });
          if (this.trail.length > this.maxTrail) this.trail.pop();
        }

        // Update trail particles
        for (let i = 0; i < this.trail.length; i++) {
          this.trail[i].alpha *= 0.88;
          this.trail[i].y += 0.2;
        }

        // Wrap or reset if offscreen
        if (this.x < -80 || this.x > width + 80 || this.y < -80 || this.y > height + 80) {
          this.reset(false);
        }
      }

      draw(context) {
        // Draw stardust trail
        for (let p of this.trail) {
          if (p.alpha <= 0.05) continue;
          context.beginPath();
          context.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          context.fillStyle = `rgba(245, 220, 140, ${p.alpha})`;
          context.shadowBlur = 8;
          context.shadowColor = 'rgba(212, 175, 55, 0.8)';
          context.fill();
        }

        // Draw Golden Butterfly
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.angle + Math.PI / 2);

        // Flap factor (-1 to 1) -> width scaling for 3D illusion
        const flapScale = Math.sin(this.flap);
        const wingSpan = this.size;
        const wingWidth = Math.abs(flapScale) * (this.size * 0.9) + 2;

        context.shadowBlur = 14;
        context.shadowColor = 'rgba(235, 195, 80, 0.9)';

        // Left Wing
        context.beginPath();
        context.moveTo(0, 0);
        context.bezierCurveTo(
          -wingWidth * 1.3, -wingSpan * 0.6,
          -wingWidth * 1.5, -wingSpan * 1.2,
          -wingWidth * 0.2, -wingSpan * 1.3
        );
        context.bezierCurveTo(
          -wingWidth * 0.8, -wingSpan * 0.4,
          -wingWidth * 1.2, wingSpan * 0.2,
          0, wingSpan * 0.4
        );
        context.fillStyle = `rgba(235, 195, 80, ${this.alpha * 0.85})`;
        context.fill();

        // Right Wing
        context.beginPath();
        context.moveTo(0, 0);
        context.bezierCurveTo(
          wingWidth * 1.3, -wingSpan * 0.6,
          wingWidth * 1.5, -wingSpan * 1.2,
          wingWidth * 0.2, -wingSpan * 1.3
        );
        context.bezierCurveTo(
          wingWidth * 0.8, -wingSpan * 0.4,
          wingWidth * 1.2, wingSpan * 0.2,
          0, wingSpan * 0.4
        );
        context.fillStyle = `rgba(235, 195, 80, ${this.alpha * 0.85})`;
        context.fill();

        // Inner glowing veins
        context.beginPath();
        context.moveTo(0, -wingSpan * 0.3);
        context.lineTo(-wingWidth * 0.5, -wingSpan * 0.8);
        context.moveTo(0, -wingSpan * 0.3);
        context.lineTo(wingWidth * 0.5, -wingSpan * 0.8);
        context.strokeStyle = `rgba(255, 245, 200, ${this.alpha * 0.9})`;
        context.lineWidth = 1;
        context.stroke();

        // Butterfly Slender Body
        context.beginPath();
        context.ellipse(0, 0, 1.4, wingSpan * 0.45, 0, 0, Math.PI * 2);
        context.fillStyle = `rgba(255, 235, 160, ${this.alpha})`;
        context.fill();

        context.restore();
      }
    }

    // Floating Stardust Ambient Particles
    const dustParticles = Array.from({ length: 28 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.8,
      speedY: 0.15 + Math.random() * 0.3,
      alpha: Math.random() * 0.6 + 0.2,
      pulse: Math.random() * Math.PI,
    }));

    const butterflies = Array.from({ length: count }, () => new Butterfly());

    // Render Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw dust particles
      for (let d of dustParticles) {
        d.y -= d.speedY;
        d.pulse += 0.02;
        if (d.y < -10) {
          d.y = height + 10;
          d.x = Math.random() * width;
        }
        const currentAlpha = (Math.sin(d.pulse) * 0.5 + 0.5) * d.alpha;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 215, 120, ${currentAlpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(212, 175, 55, 0.6)';
        ctx.fill();
      }

      // Draw Butterflies
      for (let b of butterflies) {
        b.update();
        b.draw(ctx);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (interactive) {
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerleave', handlePointerLeave);
      }
    };
  }, [count, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-20 w-full h-full"
    />
  );
}

