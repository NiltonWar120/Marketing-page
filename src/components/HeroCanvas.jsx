import { useEffect } from 'react';

export default function HeroCanvas() {
  useEffect(() => {
    // Initialize particles.js
    window.particlesJS('particles-js', {
      particles: {
        number: {
          value: 150, // numero de partículas
          density: {
            enable: true,
            value_area: 800, // den sidad de partículas en el área
          },
        },
        color: {
          value: '#c8f542', // color de las partículas
        },
        shape: {
          type: 'circle', // forma de las partículas
        },
        opacity: {
          value: 0.5, // opacidad de las partículas
          random: true,
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0.1,
          },
        },
        size: {
          value: 3, // tamaño de las partículas
          random: true,
          anim: {
            enable: true,
            speed: 200,
            size_min: 0.8,
          },
        },
        move: {
          enable: true,
          speed: 5, // velocidad de movimiento de partículas
          direction: 'none',
          random: true,
          straight: false,
          out_mode: 'bounce',
        },
      },
      interactivity: {
        detect_on: 'window',
        events: {
          onhover: {
            enable: true,
            mode: ['repulse'], // Repulsion effect when mouse hovers over particles
          },
          onclick: {
            enable: true,
            mode: 'push', // Push more particles when clicked
          },
        },
        // --- ESTA ES LA SECCIÓN QUE DEBES AGREGAR O MODIFICAR ---
  modes: {
    repulse: {
      distance: 150,      // Reduce este número para un radio más pequeño (ej. 50 o 80)
      duration: 0.4,      // Qué tan rápido regresan las partículas a su sitio
      speed: 1            // La fuerza con la que son empujadas
    }
  }
      },
      retina_detect: true, // Detects retina displays
    });

    return () => {
      // Cleanup particles when the component is unmounted
      window.particlesJS('particles-js', null);
    };
  }, []);

  return (
    <div
      id="particles-js"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        backgroundColor: '#000', // Background color
      }}
    />
  );
}