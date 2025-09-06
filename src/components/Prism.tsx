import { useEffect, useRef } from "react";

// Minimal OGL-based shader animation that reacts to cursor and time.
// Keeps types loose to avoid build/type issues.
export default function Prism(props: {
  animationType?: "rotate" | "pulse";
  timeScale?: number;
  height?: number;
  baseWidth?: number;
  scale?: number;
  hueShift?: number;
  colorFrequency?: number;
  noise?: number;
  glow?: number;
}) {
  const {
    animationType = "rotate",
    timeScale = 0.5,
    height = 3.5,
    baseWidth = 5.5,
    scale = 3.6,
    hueShift = 0,
    colorFrequency = 1,
    noise = 0.5,
    glow = 1,
  } = props;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const destroyRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const container = containerRef.current!;
    const canvas = canvasRef.current!;
    let raf = 0;

    // Lazy import to reduce initial bundle and avoid SSR pitfalls
    let ogl: any;
    let renderer: any;
    let gl: WebGLRenderingContext | WebGL2RenderingContext | null = null;
    let program: any;
    let mesh: any;
    let triangle: any;
    let start = performance.now();
    const mouse = { x: 0.5, y: 0.5 };

    const vertex = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    // Fullscreen fragment shader with subtle blue gradients, noise, and cursor-reactive glow
    const fragment = `
      precision highp float;

      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform float u_time;
      uniform float u_hueShift;
      uniform float u_colorFreq;
      uniform float u_noise;
      uniform float u_glow;
      uniform float u_height;
      uniform float u_baseWidth;
      uniform float u_scale;
      uniform int u_mode;

      // Hash & noise helpers
      float hash(vec2 p) {
        p = vec2( dot(p, vec2(127.1,311.7)),
                  dot(p, vec2(269.5,183.3)) );
        return -1.0 + 2.0*fract(sin(dot(p, p))*43758.5453123);
      }

      float noise2d(in vec2 p){
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f*f*(3.0-2.0*f);
        return mix(
          mix( hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x ),
          mix( hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x ),
          u.y
        );
      }

      vec3 oklch_to_oklab(vec3 c) {
        float L = c.x;
        float a = c.y * cos(c.z);
        float b = c.y * sin(c.z);
        return vec3(L, a, b);
      }

      // Approximate oklab to sRGB
      vec3 oklab_to_srgb(vec3 c) {
        float l = c.x + 0.3963377774*c.y + 0.2158037573*c.z;
        float m = c.x - 0.1055613458*c.y - 0.0638541728*c.z;
        float s = c.x - 0.0894841775*c.y - 1.2914855480*c.z;

        l = l*l*l;
        m = m*m*m;
        s = s*s*s;

        return mat3(
          4.0767416621, -3.3077115913,  0.2309699292,
         -1.2684380046,  2.6097574011, -0.3413193965,
         -0.0041960863, -0.7034186147,  1.7076147010
        ) * vec3(l,m,s);
      }

      vec3 bluePalette(float t, float hueShift) {
        // Base cool blues in OKLCH, modulated by t and hue shift
        float L = 0.62 + 0.18 * sin(t * 0.5);
        float C = 0.10 + 0.06 * cos(t * 0.8);
        float H = radians(240.0 + hueShift); // around blue
        return clamp(oklab_to_srgb(oklch_to_oklab(vec3(L, C, H))), 0.0, 1.0);
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        vec2 p = (uv - 0.5) * vec2(u_resolution.x/u_resolution.y, 1.0);

        // Animated bands/flow
        float t = u_time;
        float n = noise2d(p * (2.0 + u_colorFreq*2.0) + t*0.1);
        float flow = sin((p.y * u_height + t * 0.8) + n * u_noise * 2.5);

        // Cursor glow
        float d = distance(uv, u_mouse);
        float glow = u_glow * 0.35 / (d * 8.0 + 0.02);

        // Optional mode transform
        if (u_mode == 0) {
          p *= mat2(cos(t*0.1), -sin(t*0.1), sin(t*0.1), cos(t*0.1));
        }

        float band = smoothstep(0.0, 0.6, flow);
        vec3 base = bluePalette(t + band * 2.0, u_hueShift);
        vec3 col = base;

        // Accentuate with gradient and glow
        col += glow * vec3(0.2, 0.35, 0.6);

        // Vignette
        float vig = smoothstep(1.1, u_scale, length(p) + 0.2);
        col *= vig;

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    function onMouseMove(e: MouseEvent) {
      const rect = (canvas as HTMLCanvasElement).getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) / rect.width;
      mouse.y = 1.0 - (e.clientY - rect.top) / rect.height;
    }

    async function init() {
      const mod = await import("ogl");
      ogl = mod as any;

      renderer = new ogl.Renderer({ dpr: Math.min(2, window.devicePixelRatio || 1), canvas });
      gl = renderer.gl;
      gl?.clearColor(0, 0, 0, 0);

      const triangleGeo = new ogl.Triangle(gl);
      triangle = triangleGeo;

      program = new ogl.Program(gl, {
        vertex,
        fragment,
        uniforms: {
          u_time: { value: 0 },
          u_resolution: { value: [canvas.width, canvas.height] },
          u_mouse: { value: [0.5, 0.5] },
          u_hueShift: { value: hueShift },
          u_colorFreq: { value: colorFrequency },
          u_noise: { value: noise },
          u_glow: { value: glow },
          u_height: { value: height },
          u_baseWidth: { value: baseWidth },
          u_scale: { value: scale },
          u_mode: { value: animationType === "rotate" ? 0 : 1 },
        },
      });

      mesh = new ogl.Mesh(gl, { geometry: triangle, program });

      function resize() {
        const { clientWidth, clientHeight } = container;
        renderer.setSize(clientWidth, clientHeight);
        program.uniforms.u_resolution.value = [gl!.canvas.width, gl!.canvas.height];
      }
      resize();

      window.addEventListener("resize", resize);
      window.addEventListener("mousemove", onMouseMove, { passive: true });

      const loop = () => {
        const t = (performance.now() - start) / 1000 * timeScale;
        program.uniforms.u_time.value = t;
        program.uniforms.u_mouse.value = [mouse.x, mouse.y];

        renderer.render({ scene: mesh });
        raf = requestAnimationFrame(loop);
      };
      loop();

      destroyRef.current = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", resize);
        window.removeEventListener("mousemove", onMouseMove);
        // Best-effort cleanup
        try {
          gl && gl.getExtension && gl.getExtension("WEBGL_lose_context")?.loseContext();
        } catch {}
      };
    }

    init();

    return () => {
      destroyRef.current?.();
    };
  }, [animationType, timeScale, height, baseWidth, scale, hueShift, colorFrequency, noise, glow]);

  return (
    <div ref={containerRef} style={{ position: "absolute", inset: 0 }}>
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
    </div>
  );
}
