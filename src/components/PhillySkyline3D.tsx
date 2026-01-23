import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Center, Html } from '@react-three/drei';
import { Suspense, useState } from 'react';
import * as THREE from 'three';
import { ThreeMFLoader } from 'three/examples/jsm/loaders/3MFLoader.js';

// Loading component with progress
function Loader() {
    return (
        <Html center>
            <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm text-muted-foreground">Loading Philadelphia Skyline...</p>
            </div>
        </Html>
    );
}

// Error boundary component
function ErrorFallback() {
    return (
        <Html center>
            <div className="text-center">
                <p className="text-sm text-red-500">Failed to load 3D model</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-2 px-4 py-2 bg-primary text-primary-foreground rounded text-sm"
                >
                    Retry
                </button>
            </div>
        </Html>
    );
}

// Model component with error handling
function PhillyModel() {
    const [error, setError] = useState(false);

    let model;
    try {
        model = useLoader(ThreeMFLoader, '/model/Philadelphia+125mm+Frame.3mf');
    } catch (err) {
        setError(true);
        console.error('Error loading 3D model:', err);
        return <ErrorFallback />;
    }

    if (error) {
        return <ErrorFallback />;
    }

    // Get only the first object (the skyline, not the frame)
    const skyline = model.children && model.children.length > 0 ? model.children[0] : model;

    // Apply dark grey tint while preserving original material properties
    if (skyline) {
        skyline.traverse((child: any) => {
            if (child.isMesh && child.material) {
                // Clone the original material to preserve all properties
                const originalMaterial = child.material;
                child.material = originalMaterial.clone();
                // Apply dark grey color while keeping other properties
                child.material.color = new THREE.Color('#848990ff');
            }
        });
    }

    return (
        <Center>
            <primitive
                object={skyline}
                scale={0.2}
                rotation={[-Math.PI / 2, 0, 0]}
            />
        </Center>
    );
}

// Scene with lights
function Scene() {
    return (
        <>
            {/* Model with Suspense */}
            <Suspense fallback={<Loader />}>
                <PhillyModel />
            </Suspense>

            {/* Lights */}
            <ambientLight intensity={0.6} />
            <directionalLight
                position={[10, 15, 5]}
                intensity={1.5}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
            />
            <directionalLight position={[-10, 10, -5]} intensity={0.5} color="#60a5fa" />
            <pointLight position={[0, 10, 0]} intensity={0.8} color="#3b82f6" />
            <pointLight position={[5, 5, 5]} intensity={0.4} color="#2563eb" />
        </>
    );
}

// Main component
export default function PhillySkyline3D() {
    return (
        <div className="w-full h-full min-h-[400px] rounded-lg overflow-hidden liquid-glass relative">
            <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, alpha: false }}>
                <PerspectiveCamera makeDefault position={[0, 1, 10]} fov={50} />
                <Scene />
                <OrbitControls
                    enableZoom={true}
                    enablePan={false}
                    minDistance={6}
                    maxDistance={25}
                    minPolarAngle={0}
                    maxPolarAngle={Math.PI / 2}
                    autoRotate
                    autoRotateSpeed={1.5}
                    target={[0, 0, 0]}
                />
            </Canvas>
        </div>
    );
}
