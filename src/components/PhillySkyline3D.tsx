import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Center } from '@react-three/drei';
import { Suspense } from 'react';
import * as THREE from 'three';
import { ThreeMFLoader } from 'three/examples/jsm/loaders/3MFLoader.js';

// Model component
function PhillyModel() {
    const model = useLoader(ThreeMFLoader, '/model/Philadelphia+125mm+Frame.3mf');

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

// Loading fallback
function Loader() {
    return (
        <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#3b82f6" wireframe />
        </mesh>
    );
}

// Scene with lights
function Scene() {
    return (
        <>
            {/* Model */}
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
        <div className="w-full h-full min-h-[400px] rounded-lg overflow-hidden liquid-glass">
            <Canvas shadows dpr={[1, 2]}>
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
