document.addEventListener('DOMContentLoaded', () => {
    // Check if Phantom wallet is installed
    const isPhantomInstalled = window.solana && window.solana.isPhantom;
    
    // Get wallet button
    const connectWalletButton = document.getElementById('connect-wallet');
    
    // Wallet state
    let walletAddress = null;
    
    // Connect wallet function
    async function connectWallet() {
        if (!isPhantomInstalled) {
            alert("Phantom wallet is not installed. Please install it from https://phantom.app/");
            window.open("https://phantom.app/", "_blank");
            return;
        }
        
        try {
            const resp = await window.solana.connect();
            walletAddress = resp.publicKey.toString();
            
            // Update button text
            connectWalletButton.textContent = `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}`;
            
            // Dispatch event for other components
            window.dispatchEvent(new CustomEvent('walletConnected', {
                detail: { address: walletAddress }
            }));
            
            return walletAddress;
        } catch (err) {
            console.error("Error connecting to wallet:", err);
            alert("Failed to connect wallet: " + err.message);
        }
    }
    
    // Disconnect wallet function
    async function disconnectWallet() {
        if (isPhantomInstalled) {
            await window.solana.disconnect();
            walletAddress = null;
            
            // Update button text
            connectWalletButton.textContent = "Connect Wallet";
            
            // Dispatch event for other components
            window.dispatchEvent(new CustomEvent('walletDisconnected'));
        }
    }
    
    // Add event listener to connect button
    connectWalletButton.addEventListener('click', async () => {
        if (walletAddress) {
            await disconnectWallet();
        } else {
            await connectWallet();
        }
    });
    
    // Check if wallet is already connected
    if (isPhantomInstalled) {
        window.solana.on('connect', () => {
            walletAddress = window.solana.publicKey.toString();
            connectWalletButton.textContent = `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}`;
            
            window.dispatchEvent(new CustomEvent('walletConnected', {
                detail: { address: walletAddress }
            }));
        });
        
        window.solana.on('disconnect', () => {
            walletAddress = null;
            connectWalletButton.textContent = "Connect Wallet";
            
            window.dispatchEvent(new CustomEvent('walletDisconnected'));
        });
        
        // Auto-connect if already authorized
        if (window.solana.isConnected) {
            walletAddress = window.solana.publicKey.toString();
            connectWalletButton.textContent = `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}`;
        }
    }
    
    // Expose wallet functions globally
    window.walletFunctions = {
        connectWallet,
        disconnectWallet,
        getWalletAddress: () => walletAddress
    };
});
