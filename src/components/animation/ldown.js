 
import React, { useEffect, useRef } from "react";
import breezeImage from "./particle_img/bree1.png";

const CanvasAnimation3 = () => {
  const canvasRef = useRef(null);
  const numParticles = 28;
  let particles = [];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const breeze = new Image();
    breeze.src = breezeImage;
 
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width; 
        this.y = Math.random() * canvas.height;  
        this.size = Math.random() * 1.65+ 1;
        this.speed = Math.random() * 0.7 + 0.60;
        this.width = this.size * 5;
      }

      draw() {
        ctx.drawImage(breeze, this.x - this.size / 2, this.y - this.size / 2, this.width, this.size);
      }

      update() {
        if (this.x - this.size > canvas.width) {
          this.x = Math.random() * -canvas.width; 
          this.y = Math.random() * canvas.height;
          this.size = Math.random() * 1.65+ 1;
          this.speed = Math.random() * 0.7 + 0.60;
        }
        this.x += this.speed;
      }
    }

    const initializeParticles = () => {
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
      }
    };

    initializeParticles();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        particle.draw();
        particle.update();
      });
      requestAnimationFrame(animate);
    };

    animate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <canvas ref={canvasRef} id="canvasone"></canvas>;
};

export default CanvasAnimation3;
