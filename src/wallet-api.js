// wallet-api.js - Real Base Network API Integration for $PUDGY Donation Wallet
// Wallet: 0x4C2ca9339ab05C79E92AcE815eBB8CFB36099081
class WalletViewer {
    constructor(walletAddress = '0x4C2ca9339ab05C79E92AcE815eBB8CFB36099081') {
        this.walletAddress = walletAddress;
        this.baseRPCUrl = 'https://mainnet.base.org';
        this.basescanAPIUrl = 'https://api.basescan.org/api';
        this.basescanAPIKey = 'YourBasescanAPIKey'; // Replace with actual API key
        this.refreshInterval = null;
    }

    async getETHBalance() {
        try {
            // Method 1: Using Base RPC directly
            const response = await fetch(this.baseRPCUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    jsonrpc: '2.0',
                    method: 'eth_getBalance',
                    params: [this.walletAddress, 'latest'],
                    id: 1
                })
            });

            const data = await response.json();
            
            if (data.result) {
                // Convert from wei to ETH
                const balanceWei = BigInt(data.result);
                const balanceETH = Number(balanceWei) / Math.pow(10, 18);
                return balanceETH.toFixed(6);
            }
            
            throw new Error('Failed to get balance');
        } catch (error) {
            console.error('Error getting ETH balance:', error);
            // Fallback to Basescan API
            return this.getETHBalanceFromBasescan();
        }
    }

    async getETHBalanceFromBasescan() {
        try {
            const url = `${this.basescanAPIUrl}?module=account&action=balance&address=${this.walletAddress}&tag=latest&apikey=${this.basescanAPIKey}`;
            const response = await fetch(url);
            const data = await response.json();
            
            if (data.status === '1' && data.result) {
                const balanceWei = BigInt(data.result);
                const balanceETH = Number(balanceWei) / Math.pow(10, 18);
                return balanceETH.toFixed(6);
            }
            
            throw new Error('Basescan API error');
        } catch (error) {
            console.error('Error getting ETH balance from Basescan:', error);
            return 'Error';
        }
    }

    async getTokenBalance(tokenContractAddress) {
        try {
            // ERC-20 balanceOf function call
            const data = '0x70a08231000000000000000000000000' + this.walletAddress.slice(2).padStart(64, '0');
            
            const response = await fetch(this.baseRPCUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    jsonrpc: '2.0',
                    method: 'eth_call',
                    params: [{
                        to: tokenContractAddress,
                        data: data
                    }, 'latest'],
                    id: 1
                })
            });

            const result = await response.json();
            
            if (result.result && result.result !== '0x') {
                const balance = BigInt(result.result);
                // Assuming 18 decimals for most tokens
                const balanceFormatted = Number(balance) / Math.pow(10, 18);
                return balanceFormatted.toLocaleString();
            }
            
            return '0';
        } catch (error) {
            console.error('Error getting token balance:', error);
            return 'Error';
        }
    }

    async getTransactions() {
        try {
            const url = `${this.basescanAPIUrl}?module=account&action=txlist&address=${this.walletAddress}&startblock=0&endblock=99999999&sort=desc&page=1&offset=10&apikey=${this.basescanAPIKey}`;
            const response = await fetch(url);
            const data = await response.json();
            
            if (data.status === '1' && data.result) {
                return data.result.map(tx => ({
                    hash: tx.hash,
                    amount: (Number(tx.value) / Math.pow(10, 18)).toFixed(6),
                    type: tx.to.toLowerCase() === this.walletAddress.toLowerCase() ? 'incoming' : 'outgoing',
                    timestamp: this.formatTimestamp(tx.timeStamp),
                    from: tx.from,
                    to: tx.to,
                    gasUsed: tx.gasUsed,
                    gasPrice: tx.gasPrice
                }));
            }
            
            return [];
        } catch (error) {
            console.error('Error getting transactions:', error);
            return [];
        }
    }

    formatTimestamp(timestamp) {
        const date = new Date(timestamp * 1000);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins} minutes ago`;
        if (diffHours < 24) return `${diffHours} hours ago`;
        if (diffDays < 30) return `${diffDays} days ago`;
        
        return date.toLocaleDateString();
    }

    async getETHPrice() {
        try {
            // Get ETH price from a free API
            const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
            const data = await response.json();
            return data.ethereum.usd;
        } catch (error) {
            console.error('Error getting ETH price:', error);
            return 2000; // Fallback price
        }
    }

    async getAllData() {
        try {
            const [ethBalance, transactions, ethPrice] = await Promise.all([
                this.getETHBalance(),
                this.getTransactions(),
                this.getETHPrice()
            ]);

            const usdValue = (parseFloat(ethBalance) * ethPrice).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD'
            });

            return {
                ethBalance,
                transactions,
                usdValue,
                transactionCount: transactions.length.toString()
            };
        } catch (error) {
            console.error('Error getting all data:', error);
            throw error;
        }
    }
}

// Export for use in HTML
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WalletViewer;
}
