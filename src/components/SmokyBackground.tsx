import { useEffect, useRef } from 'react';
import './SmokyBackground.css';

export default function SmokyBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Store dimensions for safe access
        let canvasWidth = window.innerWidth;
        let canvasHeight = window.innerHeight;

        // Set canvas size
        const resize = () => {
            canvasWidth = window.innerWidth;
            canvasHeight = window.innerHeight;
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // Particle system for smoky effect
        class Particle {
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;
            opacity: number;
            hue: number;

            constructor() {
                // Concentrate particles more at the bottom and spread horizontally
                this.x = Math.random() * canvasWidth;
                this.y = canvasHeight + Math.random() * 100; // Start closer to bottom
                this.size = Math.random() * 400 + 250; // Larger particles
                this.speedX = (Math.random() - 0.5) * 0.3; // Slower horizontal movement
                this.speedY = -Math.random() * 0.2 - 0.1; // Slower rise
                this.opacity = Math.random() * 0.4 + 0.2; // More visible
                this.hue = 210 + Math.random() * 25; // Blue hues
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Fade out as it rises
                if (this.y < canvasHeight * 0.5) {
                    this.opacity -= 0.0008;
                }

                // Reset particle when it goes off screen or fades out
                if (this.y < -this.size || this.opacity <= 0) {
                    this.x = Math.random() * canvasWidth;
                    this.y = canvasHeight + Math.random() * 100;
                    this.opacity = Math.random() * 0.4 + 0.2;
                }
            }

            draw() {
                const gradient = ctx!.createRadialGradient(
                    this.x, this.y, 0,
                    this.x, this.y, this.size
                );

                gradient.addColorStop(0, `hsla(${this.hue}, 85%, 55%, ${this.opacity})`);
                gradient.addColorStop(0.4, `hsla(${this.hue}, 75%, 45%, ${this.opacity * 0.6})`);
                gradient.addColorStop(1, `hsla(${this.hue}, 65%, 35%, 0)`);

                ctx!.fillStyle = gradient;
                ctx!.fillRect(this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);
            }
        }

        // Create particles - more particles for denser effect
        const particles: Particle[] = [];
        for (let i = 0; i < 20; i++) {
            particles.push(new Particle());
        }

        // Animation loop
        function animate() {
            // Clear with black background
            ctx!.fillStyle = '#000000';
            ctx!.fillRect(0, 0, canvasWidth, canvasHeight);

            // Update and draw particles
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            requestAnimationFrame(animate);
        }

        animate();

        return () => {
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <div className="smoky-background">
            <canvas ref={canvasRef} className="smoky-canvas" />
            <div className="smoky-overlay" />
        </div>
    );
}
