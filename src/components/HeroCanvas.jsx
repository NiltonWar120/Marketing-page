import { useEffect } from 'react';

export default function HeroCanvas() {
  useEffect(() => {
    // Initialize particles.js
    window.particlesJS('particles-js', {
      particles: {
        number: {
          value: 150, // Number of particles
          density: {
            enable: true,
            value_area: 900, // Density of the particles
          },
        },
        color: {
          value: '#c8f542', // Color of the particles
        },
        shape: {
          type: 'circle', // Shape of particles
        },
        opacity: {
          value: 0.5, // Opacity of the particles
          random: true,
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0.1,
          },
        },
        size: {
          value: 3, // Size of the particles
          random: true,
          anim: {
            enable: true,
            speed: 200,
            size_min: 0.8,
          },
        },
        move: {
          enable: true,
          speed: 4, // Speed of particles
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
            mode: 'repulse', // Repulsion effect when mouse hovers over particles
          },
          onclick: {
            enable: true,
            mode: 'push', // Push more particles when clicked
          },
        },
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