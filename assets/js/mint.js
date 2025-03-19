document.addEventListener('DOMContentLoaded', () => {
    // Get elements
    const mintButton = document.getElementById('mint-button');
    const nftSelection = document.getElementById('nft-selection');
    const mintStatus = document.getElementById('mint-status');
    
    // Sample NFT metadata - replace with your actual metadata
    const nftMetadata = {
        1: {
            name: "Bauhaus Building #1",
            symbol: "BAUHAUS",
            description: "Geometric abstraction of Bauhaus architecture in zero gravity",
            seller_fee_basis_points: 500, // 5%
            external_url: "https://yourdomain.com/nft/1",
            attributes: [
                {
                    trait_type: "Category",
                    value: "Bauhaus Buildings"
                },
                {
                    trait_type: "Animation",
                    value: "Yes"
                }
            ],
            collection: {
                name: "Zero Gravity Bauhaus",
                family: "Bauhaus NFTs"
            },
            properties: {
                files: [
                    {
                        uri: "assets/gallery/bauhaus-building-1.jpg",
                        type: "image/jpeg"
                    }
                ],
                category: "image",
                creators: [
                    {
                        address: "YOUR_WALLET_ADDRESS", // Replace with your wallet address
                        share: 100
                    }
                ]
            }
        },
        // Add more NFT metadata as needed
    };
    
    // Mint NFT function
    async function mintNFT(nftId) {
        // Check if wallet is connected
        const walletAddress = window.walletFunctions.getWalletAddress();
        if (!walletAddress) {
            updateStatus('error', 'Please connect your wallet first');
            return;
        }
        
        // Check if NFT is selected
        if (!nftId) {
            updateStatus('error', 'Please select an NFT to mint');
            return;
        }
        
        // Get NFT metadata
        const metadata = nftMetadata[nftId];
        if (!metadata) {
            updateStatus('error', 'NFT metadata not found');
            return;
        }
        
        updateStatus('loading', 'Preparing to mint NFT...');
        
        try {
            // In a real implementation, you would:
            // 1. Upload the image to Arweave or IPFS
            // 2. Upload the metadata to Arweave or IPFS
            // 3. Call the Solana program to mint the NFT
            
            // For this template, we'll simulate the minting process
            await simulateMinting();
            
            updateStatus('success', 'NFT minting process completed successfully');
        } catch (err) {
            console.error("Error minting NFT:", err);
            updateStatus('error', 'An error occurred while minting the NFT');
        }
    }
});
