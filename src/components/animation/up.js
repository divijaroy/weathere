import React, { useEffect, useRef } from "react";
import butterflyImage from "./particle_img/butterfly.png";

const CanvasAnimation1 = () => {
  const canvasRef = useRef(null);
  const no_ofpart = 44;
  let parray = [];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const butterfly = new Image();
    butterfly.src = butterflyImage;
 
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() < 0.5 ? -100 : canvas.height + 100;
        this.size = Math.random() * 10 + 5;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
      }

      draw() {
        ctx.drawImage(butterfly, this.x, this.y, this.size, this.size);
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (
          (this.y + this.size < 0 && this.speedY < 0) ||
          (this.y > canvas.height && this.speedY > 0)
        ) {
          this.x = Math.random() * canvas.width;
          this.y = this.speedY < 0 ? canvas.height + 100 : -100;
          this.speedX = Math.random() * 2 - 1;
          this.speedY = Math.random() * 2 - 1;
        }

        if (this.x + this.size < 0 && this.speedX < 0) {
          this.x = canvas.width;
        } else if (this.x > canvas.width && this.speedX > 0) {
          this.x = -this.size;
        }
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

        // eslint-disable-next-line 
}, []);

  return <canvas ref={canvasRef} id="canvasone"></canvas>;
};

export default CanvasAnimation1;
