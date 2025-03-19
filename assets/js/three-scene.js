// Three.js scene for zero-gravity Bauhaus elements
document.addEventListener('DOMContentLoaded', () => {
    // Get the canvas element
    const canvas = document.getElementById('bauhaus-canvas');
    
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 15;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 10, 10);
    scene.add(directionalLight);
    
    // Bauhaus colors
    const colors = [
        0xE53935, // red
        0x2196F3, // blue
        0xFFC107, // yellow
        0xFFFFFF, // white
        0x000000  // black
    ];
    
    // Create Bauhaus geometric shapes
    const shapes = [];
    
    // Function to create a random Bauhaus shape
    function createBauhausShape() {
        const shapeType = Math.floor(Math.random() * 3); // 0: cube, 1: sphere, 2: cylinder
        const color = colors[Math.floor(Math.random() * colors.length)];
        const material = new THREE.MeshStandardMaterial({ color: color });
        
        let geometry, mesh;
        
        switch(shapeType) {
            case 0: // Cube
                geometry = new THREE.BoxGeometry(2, 2, 2);
                mesh = new THREE.Mesh(geometry, material);
                break;
            case 1: // Sphere
                geometry = new THREE.SphereGeometry(1, 32, 32);
                mesh = new THREE.Mesh(geometry, material);
                break;
            case 2: // Cylinder
                geometry = new THREE.CylinderGeometry(1, 1, 2, 32);
                mesh = new THREE.Mesh(geometry, material);
                break;
        }
        
        // Random position
        mesh.position.x = (Math.random() - 0.5) * 20;
        mesh.position.y = (Math.random() - 0.5) * 20;
        mesh.position.z = (Math.random() - 0.5) * 10;
        
        // Random rotation
        mesh.rotation.x = Math.random() * Math.PI;
        mesh.rotation.y = Math.random() * Math.PI;
        
        // Random velocity for animation
        mesh.userData.velocity = {
            x: (Math.random() - 0.5) * 0.02,
            y: (Math.random() - 0.5) * 0.02,
            z: (Math.random() - 0.5) * 0.02,
            rotationX: (Math.random() - 0.5) * 0.01,
            rotationY: (Math.random() - 0.5) * 0.01
        };
        
        scene.add(mesh);
        shapes.push(mesh);
        
        return mesh;
    }
    
    // Create initial shapes
    for (let i = 0; i < 20; i++) {
        createBauhausShape();
    }
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Update shape positions and rotations
        shapes.forEach(shape => {
            // Update position
            shape.position.x += shape.userData.velocity.x;
            shape.position.y += shape.userData.velocity.y;
            shape.position.z += shape.userData.velocity.z;
            
            // Update rotation
            shape.rotation.x += shape.userData.velocity.rotationX;
            shape.rotation.y += shape.userData.velocity.rotationY;
            
            // Boundary check and bounce
            if (Math.abs(shape.position.x) > 15) {
                shape.userData.velocity.x *= -1;
            }
            if (Math.abs(shape.position.y) > 15) {
                shape.userData.velocity.y *= -1;
            }
            if (Math.abs(shape.position.z) > 10) {
                shape.userData.velocity.z *= -1;
            }
        });
        
        // Rotate camera slightly for more dynamic view
        camera.position.x = Math.sin(Date.now() * 0.0001) * 3;
        camera.position.y = Math.cos(Date.now() * 0.0001) * 3;
        camera.lookAt(0, 0, 0);
        
        renderer.render(scene, camera);
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    // Start animation
    animate();
});
