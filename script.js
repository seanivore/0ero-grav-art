// Main JavaScript for 0ero Gravity Art project

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Three.js scene
    initThreeScene();
    
    // Initialize UI interactions
    initUIInteractions();
    
    // Add animation classes to elements as they enter viewport
    initScrollAnimations();
});

// Three.js Scene Setup
function initThreeScene() {
    // Check if canvas container exists
    const canvasContainer = document.getElementById('canvas-container');
    if (!canvasContainer) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
        75, 
        window.innerWidth / window.innerHeight, 
        0.1, 
        1000
    );
    camera.position.z = 15;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    canvasContainer.appendChild(renderer.domElement);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 10, 10);
    scene.add(directionalLight);
    
    // Bauhaus elements - colors
    const bauhausColors = [
        0xE53935, // red
        0x264653, // blue
        0xE9C46A, // yellow
        0xE76F51, // orange
        0x2A9D8F  // teal
    ];
    
    // Create geometric elements
    const elements = [];
    
    // Create cubes
    for (let i = 0; i < 10; i++) {
        const size = Math.random() * 2 + 0.5;
        const geometry = new THREE.BoxGeometry(size, size, size);
        const material = new THREE.MeshStandardMaterial({
            color: bauhausColors[Math.floor(Math.random() * bauhausColors.length)],
            roughness: 0.7,
            metalness: 0.2
        });
        
        const cube = new THREE.Mesh(geometry, material);
        
        // Random position
        cube.position.x = (Math.random() - 0.5) * 30;
        cube.position.y = (Math.random() - 0.5) * 30;
        cube.position.z = (Math.random() - 0.5) * 30;
        
        // Random rotation
        cube.rotation.x = Math.random() * Math.PI;
        cube.rotation.y = Math.random() * Math.PI;
        
        // Add physics properties
        cube.userData.velocity = {
            x: (Math.random() - 0.5) * 0.02,
            y: (Math.random() - 0.5) * 0.02,
            z: (Math.random() - 0.5) * 0.02
        };
        cube.userData.rotationVelocity = {
            x: (Math.random() - 0.5) * 0.01,
            y: (Math.random() - 0.5) * 0.01,
            z: (Math.random() - 0.5) * 0.01
        };
        
        scene.add(cube);
        elements.push(cube);
    }
    
    // Create spheres
    for (let i = 0; i < 5; i++) {
        const radius = Math.random() * 1.5 + 0.5;
        const geometry = new THREE.SphereGeometry(radius, 32, 32);
        const material = new THREE.MeshStandardMaterial({
            color: bauhausColors[Math.floor(Math.random() * bauhausColors.length)],
            roughness: 0.5,
            metalness: 0.3
        });
        
        const sphere = new THREE.Mesh(geometry, material);
        
        // Random position
        sphere.position.x = (Math.random() - 0.5) * 30;
        sphere.position.y = (Math.random() - 0.5) * 30;
        sphere.position.z = (Math.random() - 0.5) * 30;
        
        // Add physics properties
        sphere.userData.velocity = {
            x: (Math.random() - 0.5) * 0.02,
            y: (Math.random() - 0.5) * 0.02,
            z: (Math.random() - 0.5) * 0.02
        };
        sphere.userData.rotationVelocity = {
            x: (Math.random() - 0.5) * 0.01,
            y: (Math.random() - 0.5) * 0.01,
            z: (Math.random() - 0.5) * 0.01
        };
        
        scene.add(sphere);
        elements.push(sphere);
    }
    
    // Create cylinders (for Bauhaus-style columns)
    for (let i = 0; i < 5; i++) {
        const radius = Math.random() * 0.5 + 0.2;
        const height = Math.random() * 4 + 2;
        const geometry = new THREE.CylinderGeometry(radius, radius, height, 32);
        const material = new THREE.MeshStandardMaterial({
            color: bauhausColors[Math.floor(Math.random() * bauhausColors.length)],
            roughness: 0.6,
            metalness: 0.1
        });
        
        const cylinder = new THREE.Mesh(geometry, material);
        
        // Random position
        cylinder.position.x = (Math.random() - 0.5) * 30;
        cylinder.position.y = (Math.random() - 0.5) * 30;
        cylinder.position.z = (Math.random() - 0.5) * 30;
        
        // Random rotation
        cylinder.rotation.x = Math.random() * Math.PI;
        cylinder.rotation.y = Math.random() * Math.PI;
        
        // Add physics properties
        cylinder.userData.velocity = {
            x: (Math.random() - 0.5) * 0.01,
            y: (Math.random() - 0.5) * 0.01,
            z: (Math.random() - 0.5) * 0.01
        };
        cylinder.userData.rotationVelocity = {
            x: (Math.random() - 0.5) * 0.005,
            y: (Math.random() - 0.5) * 0.005,
            z: (Math.random() - 0.5) * 0.005
        };
        
        scene.add(cylinder);
        elements.push(cylinder);
    }
    
    // Create planes (for Bauhaus-style geometric panels)
    for (let i = 0; i < 8; i++) {
        const width = Math.random() * 3 + 1;
        const height = Math.random() * 3 + 1;
        const geometry = new THREE.PlaneGeometry(width, height);
        const material = new THREE.MeshStandardMaterial({
            color: bauhausColors[Math.floor(Math.random() * bauhausColors.length)],
            roughness: 0.8,
            metalness: 0.1,
            side: THREE.DoubleSide
        });
        
        const plane = new THREE.Mesh(geometry, material);
        
        // Random position
        plane.position.x = (Math.random() - 0.5) * 30;
        plane.position.y = (Math.random() - 0.5) * 30;
        plane.position.z = (Math.random() - 0.5) * 30;
        
        // Random rotation
        plane.rotation.x = Math.random() * Math.PI;
        plane.rotation.y = Math.random() * Math.PI;
        
        // Add physics properties
        plane.userData.velocity = {
            x: (Math.random() - 0.5) * 0.015,
            y: (Math.random() - 0.5) * 0.015,
            z: (Math.random() - 0.5) * 0.015
        };
        plane.userData.rotationVelocity = {
            x: (Math.random() - 0.5) * 0.008,
            y: (Math.random() - 0.5) * 0.008,
            z: (Math.random() - 0.5) * 0.008
        };
        
        scene.add(plane);
        elements.push(plane);
    }
    
    // Mouse interaction
    const mouse = new THREE.Vector2();
    const targetRotation = new THREE.Vector2();
    let isMouseDown = false;
    
    window.addEventListener('mousemove', (event) => {
        // Update mouse position
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        
        // If mouse is down, update target rotation
        if (isMouseDown) {
            targetRotation.x = mouse.y * 0.5;
            targetRotation.y = mouse.x * 0.5;
        }
        
        // Affect elements based on mouse position
        elements.forEach(element => {
            // Calculate distance from mouse (in normalized coordinates)
            const distX = element.position.x / 15 - mouse.x;
            const distY = element.position.y / 15 - mouse.y;
            const distance = Math.sqrt(distX * distX + distY * distY);
            
            // Apply subtle force away from cursor
            if (distance < 0.5) {
                const force = 0.001 / (distance + 0.1);
                element.userData.velocity.x += distX * force;
                element.userData.velocity.y += distY * force;
            }
        });
    });
    
    window.addEventListener('mousedown', () => {
        isMouseDown = true;
    });
    
    window.addEventListener('mouseup', () => {
        isMouseDown = false;
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Update element positions and rotations
        elements.forEach(element => {
            // Update position based on velocity
            element.position.x += element.userData.velocity.x;
            element.position.y += element.userData.velocity.y;
            element.position.z += element.userData.velocity.z;
            
            // Update rotation based on rotation velocity
            element.rotation.x += element.userData.rotationVelocity.x;
            element.rotation.y += element.userData.rotationVelocity.y;
            element.rotation.z += element.userData.rotationVelocity.z;
            
            // Boundary check - if element goes too far, reverse direction
            if (Math.abs(element.position.x) > 15) {
                element.userData.velocity.x *= -1;
            }
            if (Math.abs(element.position.y) > 15) {
                element.userData.velocity.y *= -1;
            }
            if (Math.abs(element.position.z) > 15) {
                element.userData.velocity.z *= -1;
            }
            
            // Apply very slight drag to slow elements over time
            element.userData.velocity.x *= 0.995;
            element.userData.velocity.y *= 0.995;
            element.userData.velocity.z *= 0.995;
        });
        
        // Smoothly rotate scene based on mouse interaction
        scene.rotation.x += (targetRotation.x - scene.rotation.x) * 0.05;
        scene.rotation.y += (targetRotation.y - scene.rotation.y) * 0.05;
        
        renderer.render(scene, camera);
    }
    
    animate();
}

// UI Interactions
function initUIInteractions() {
    // Gallery filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterButtons.length && galleryItems.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Get filter value
                const filter = button.getAttribute('data-filter');
                
                // Show/hide gallery items based on filter
                galleryItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Connect wallet button
    const connectWalletButton = document.getElementById('connect-wallet');
    if (connectWalletButton) {
        connectWalletButton.addEventListener('click', async () => {
            try {
                // Check if Solana is available
                if (window.solana) {
                    connectWalletButton.textContent = 'Connecting...';
                    
                    // Connect to wallet
                    const response = await window.solana.connect();
                    const publicKey = response.publicKey.toString();
                    
                    // Update button text (truncate public key for display)
                    connectWalletButton.textContent = `Connected: ${publicKey.slice(0, 4)}...${publicKey.slice(-4)}`;
                    
                    // You could add additional functionality here, like fetching user's NFTs
                    console.log('Connected to wallet:', publicKey);
                } else {
                    alert('Solana wallet not found! Please install Phantom or another Solana wallet extension.');
                }
            } catch (error) {
                console.error('Error connecting to wallet:', error);
                connectWalletButton.textContent = 'Connect Wallet';
                alert('Failed to connect wallet. Please try again.');
            }
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Get the target section id from the href
            const targetId = link.getAttribute('href');
            
            // Only process if it's an internal link
            if (targetId.startsWith('#')) {
                e.preventDefault();
                
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80, // Offset for fixed header
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    // Get all elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in, .slide-up');
    
    // Create an Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the visible class to trigger the animation
                entry.target.classList.add('visible');
                // Unobserve the element after it's animated
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger when at least 10% of the element is visible
    });
    
    // Observe each element
    animatedElements.forEach(element => {
        observer.observe(element);
    });
} 