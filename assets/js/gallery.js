document.addEventListener('DOMContentLoaded', () => {
    // Sample gallery data - replace with your actual NFT data
    const galleryItems = [
        {
            id: 1,
            title: "Bauhaus Building #1",
            description: "Geometric abstraction of Bauhaus architecture",
            image: "assets/gallery/bauhaus-building-1.jpg",
            category: "bauhaus-buildings",
            animated: true,
            marketplaceLinks: {
                magicEden: "https://magiceden.io/item-details/zero_gravity_bauhaus/item1",
                tensor: "https://www.tensor.trade/item/zero_gravity_bauhaus/item1",
                openSea: "https://opensea.io/assets/solana/zero-gravity-bauhaus/1"
            }
        },
        {
            id: 2,
            title: "Color Play #3",
            description: "Primary colors in geometric harmony",
            image: "assets/gallery/color-play-3.jpg",
            category: "color-play",
            animated: true,
            marketplaceLinks: {
                magicEden: "https://magiceden.io/item-details/zero_gravity_bauhaus/item2",
                tensor: "https://www.tensor.trade/item/zero_gravity_bauhaus/item2",
                openSea: "https://opensea.io/assets/solana/zero-gravity-bauhaus/2"
            }
        },
        {
            id: 3,
            title: "Geometric Abstraction #7",
            description: "Circles and squares in zero gravity",
            image: "assets/gallery/geometric-abstraction-7.jpg",
            category: "geometric-abstraction",
            animated: false,
            marketplaceLinks: {
                magicEden: "https://magiceden.io/item-details/zero_gravity_bauhaus/item3",
                tensor: "https://www.tensor.trade/item/zero_gravity_bauhaus/item3",
                openSea: "https://opensea.io/assets/solana/zero-gravity-bauhaus/3"
            }
        },
        // Add more gallery items as needed
    ];
    
    const galleryGrid = document.querySelector('.gallery-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const mintPreview = document.querySelector('.mint-preview');
    
    // Populate gallery grid
    function populateGallery(items) {
        galleryGrid.innerHTML = '';
        
        items.forEach(item => {
            const galleryItem = document.createElement('div');
            galleryItem.classList.add('gallery-item');
            galleryItem.dataset.category = item.category;
            
            galleryItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="gallery-item-info">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    ${item.animated ? '<span class="animated-badge">Animated</span>' : ''}
                </div>
            `;
            
            galleryItem.addEventListener('click', () => {
                // Update the preview in the marketplace section
                updateMarketplacePreview(item);
                
                // Scroll to marketplace section
                document.getElementById('mint').scrollIntoView({ behavior: 'smooth' });
            });
            
            galleryGrid.appendChild(galleryItem);
        });
    }
    
    // Update marketplace preview with selected NFT
    function updateMarketplacePreview(item) {
        // Update preview image
        mintPreview.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="preview-info">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
        `;
        
        // Update marketplace links
        const marketplaceButtons = document.querySelectorAll('.marketplace-button');
        
        if (marketplaceButtons.length > 0 && item.marketplaceLinks) {
            // Magic Eden
            if (marketplaceButtons[0] && item.marketplaceLinks.magicEden) {
                marketplaceButtons[0].href = item.marketplaceLinks.magicEden;
            }
            
            // Tensor
            if (marketplaceButtons[1] && item.marketplaceLinks.tensor) {
                marketplaceButtons[1].href = item.marketplaceLinks.tensor;
            }
            
            // OpenSea
            if (marketplaceButtons[2] && item.marketplaceLinks.openSea) {
                marketplaceButtons[2].href = item.marketplaceLinks.openSea;
            }
        }
    }
    
    // Filter gallery items
    function filterGallery(category) {
        if (category === 'all') {
            populateGallery(galleryItems);
        } else {
            const filteredItems = galleryItems.filter(item => item.category === category);
            populateGallery(filteredItems);
        }
    }
    
    // Add event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Filter gallery
            const category = button.dataset.filter;
            filterGallery(category);
        });
    });
    
    // Initialize gallery and set default preview
    populateGallery(galleryItems);
    
    // Set initial preview if there are items
    if (galleryItems.length > 0) {
        updateMarketplacePreview(galleryItems[0]);
    }
});
