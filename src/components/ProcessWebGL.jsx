import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import './ProcessWebGL.css'

export default function ProcessWebGL() {
  const mountRef = useRef(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    mount.appendChild(renderer.domElement)

    const uniforms = {
      uTime: { value: 0 },
      uResolution: {
        value: new THREE.Vector2(mount.clientWidth, mount.clientHeight),
      },
      uMouse: {
        value: new THREE.Vector2(0.5, 0.5),
      },
      uAccent: {
        value: new THREE.Color('#bcff00'),
      },
      uGold: {
        value: new THREE.Color('#c9a96e'),
      },
    }

    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      depthTest: false,
      uniforms,
      vertexShader: `
        varying vec2 vUv;

        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;

        varying vec2 vUv;

        uniform float uTime;
        uniform vec2 uResolution;
        uniform vec2 uMouse;
        uniform vec3 uAccent;
        uniform vec3 uGold;

        float circle(vec2 p, vec2 center, float radius, float blur) {
          float d = distance(p, center);
          return smoothstep(radius + blur, radius, d);
        }

        float ring(vec2 p, vec2 center, float radius, float width) {
          float d = abs(distance(p, center) - radius);
          return smoothstep(width, 0.0, d);
        }

        float line(vec2 p, vec2 a, vec2 b, float width) {
          vec2 pa = p - a;
          vec2 ba = b - a;
          float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
          float d = length(pa - ba * h);
          return smoothstep(width, 0.0, d);
        }

        mat2 rotate2d(float a) {
          float s = sin(a);
          float c = cos(a);
          return mat2(c, -s, s, c);
        }

        float scanGrid(vec2 uv) {
          vec2 grid = abs(fract(uv * vec2(18.0, 12.0)) - 0.5);
          float g = min(grid.x, grid.y);
          return smoothstep(0.018, 0.0, g);
        }

        void main() {
          vec2 uv = vUv;
          vec2 p = uv * 2.0 - 1.0;
          p.x *= uResolution.x / uResolution.y;

          float t = uTime;

          vec3 color = vec3(0.0);
          float alpha = 0.0;

          /* Centro del sistema holográfico */
          vec2 center = vec2(0.42, 0.02);

          /* Glow principal */
          float mainGlow = circle(p, center, 0.08, 0.72);
          color += uAccent * mainGlow * 0.12;
          alpha += mainGlow * 0.18;

          /* Anillos HUD */
          float r1 = ring(p, center, 0.28 + sin(t * 0.8) * 0.01, 0.006);
          float r2 = ring(p, center, 0.46 + cos(t * 0.5) * 0.012, 0.004);
          float r3 = ring(p, center, 0.68 + sin(t * 0.35) * 0.014, 0.003);

          vec2 q = p - center;
          float angle = atan(q.y, q.x);

          float dash1 = smoothstep(0.15, 1.0, sin(angle * 10.0 + t * 1.8));
          float dash2 = smoothstep(0.25, 1.0, sin(angle * 16.0 - t * 1.2));
          float dash3 = smoothstep(0.35, 1.0, sin(angle * 22.0 + t * 0.9));

          color += uAccent * r1 * dash1 * 0.55;
          color += uGold * r2 * dash2 * 0.35;
          color += uAccent * r3 * dash3 * 0.22;

          alpha += r1 * dash1 * 0.42;
          alpha += r2 * dash2 * 0.28;
          alpha += r3 * dash3 * 0.18;

          /* Barrido tipo radar */
          vec2 scanDir = rotate2d(t * 0.55) * vec2(1.0, 0.0);
          float scanAngle = dot(normalize(q), scanDir);
          float scan = smoothstep(0.985, 1.0, scanAngle);
          float scanMask = smoothstep(0.75, 0.0, length(q));

          color += uAccent * scan * scanMask * 0.28;
          alpha += scan * scanMask * 0.22;

          /* Líneas internas */
          vec2 a1 = center + rotate2d(t * 0.42) * vec2(0.28, 0.0);
          vec2 a2 = center + rotate2d(t * 0.42 + 2.1) * vec2(0.46, 0.0);
          vec2 a3 = center + rotate2d(t * 0.42 + 4.2) * vec2(0.62, 0.0);

          float l1 = line(p, center, a1, 0.0025);
          float l2 = line(p, center, a2, 0.002);
          float l3 = line(p, center, a3, 0.0018);

          color += uAccent * l1 * 0.28;
          color += uGold * l2 * 0.2;
          color += uAccent * l3 * 0.16;

          alpha += l1 * 0.25 + l2 * 0.18 + l3 * 0.14;

          /* Orbes orbitando */
          for (int i = 0; i < 6; i++) {
            float fi = float(i);
            float radius = 0.28 + fi * 0.075;
            float speed = 0.45 + fi * 0.08;
            float offset = fi * 1.25;

            vec2 orbPos = center + vec2(
              cos(t * speed + offset) * radius,
              sin(t * speed + offset) * radius * 0.72
            );

            float orb = circle(p, orbPos, 0.012, 0.035);
            float orbCore = circle(p, orbPos, 0.004, 0.006);

            color += mix(uAccent, uGold, fi / 6.0) * orb * 0.42;
            color += uAccent * orbCore * 0.8;

            alpha += orb * 0.32 + orbCore * 0.55;
          }

          /* Grid muy sutil */
          float grid = scanGrid(uv);
          float gridFade = smoothstep(0.0, 0.35, uv.x) * smoothstep(1.0, 0.45, uv.x);
          color += uAccent * grid * gridFade * 0.035;
          alpha += grid * gridFade * 0.045;

          /* Glow al mouse */
          vec2 mouse = uMouse * 2.0 - 1.0;
          mouse.x *= uResolution.x / uResolution.y;

          float mouseGlow = circle(p, mouse, 0.025, 0.28);
          color += uAccent * mouseGlow * 0.16;
          alpha += mouseGlow * 0.16;

          /* Fade para que no ensucie bordes */
          float edgeFade = smoothstep(0.0, 0.12, uv.x)
                         * smoothstep(1.0, 0.82, uv.x)
                         * smoothstep(0.0, 0.08, uv.y)
                         * smoothstep(1.0, 0.88, uv.y);

          alpha *= edgeFade;

          gl_FragColor = vec4(color, clamp(alpha, 0.0, 0.48));
        }
      `,
    })

    const geometry = new THREE.PlaneGeometry(2, 2)
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const clock = new THREE.Clock()
    let frameId

    const animate = () => {
      uniforms.uTime.value = clock.getElapsedTime()

      uniforms.uMouse.value.lerp(
        new THREE.Vector2(mouseRef.current.x, mouseRef.current.y),
        0.06,
      )

      renderer.render(scene, camera)
      frameId = requestAnimationFrame(animate)
    }

    animate()

    const onMouseMove = (e) => {
      const rect = mount.getBoundingClientRect()

      mouseRef.current.x = (e.clientX - rect.left) / rect.width
      mouseRef.current.y = 1 - (e.clientY - rect.top) / rect.height
    }

    const resize = () => {
      const width = mount.clientWidth
      const height = mount.clientHeight

      renderer.setSize(width, height)
      uniforms.uResolution.value.set(width, height)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(mount)

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(frameId)
      ro.disconnect()

      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', resize)

      geometry.dispose()
      material.dispose()
      renderer.dispose()

      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={mountRef} className="process-webgl" aria-hidden="true" />
}