import React, { useEffect, useRef } from "react";
import raindropImage from "./particle_img/raindrop.png";

const CanvasAnimation = () => {
  const canvasRef = useRef(null);
  const no_ofpart = 1200;
  let parray = [];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const rain = new Image();
    rain.src = raindropImage;
     class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * -canvas.height; 
        this.size = Math.random() * 10 + 5;
        this.speed = Math.random() * 10 + 3;
      }

      draw() {
        ctx.drawImage(rain, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
      }

      update() {
        if (this.y - this.size > canvas.height) {
          this.y = Math.random() * -canvas.height; 
          this.x = Math.random() * canvas.width;
          this.size = Math.random() * 10+ 5;
          this.speed = Math.random() * 10 + 3;
        }
        this.y += this.speed;
      }
    }

    const init = () => {
      for (let i = 0; i < no_ofpart; i++) {
        parray.push(new Particle());
      }
    };

    init();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      parray.forEach((particle) => {
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

export default CanvasAnimation;
 