# Wallet Viewer Setup Guide

## Overview
The wallet viewer provides a live view of your donation wallet on the Base network, showing:
- Real-time ETH balance
- $PUDGY token balance (when contract is deployed)
- USD value of holdings
- Recent transaction history
- Auto-refresh every 30 seconds

**Current Wallet Being Tracked:** `0x4C2ca9339ab05C79E92AcE815eBB8CFB36099081`

## Required Setup Steps

### 1. ✅ Wallet Address Configured
The donation wallet address is already configured:
```javascript
const WALLET_ADDRESS = '0x4C2ca9339ab05C79E92AcE815eBB8CFB36099081'; // ✅ Your donation wallet
```

### 2. Get Basescan API Key (Free)
1. Go to [https://basescan.org/apis](https://basescan.org/apis)
2. Register for a free account
3. Create a new API key
4. Replace the placeholder in `donation-tracker.html`:
```javascript
const BASESCAN_API_KEY = 'YourBasescanAPIKey'; // Replace with your actual API key
```

### 3. Add $PUDGY Token Contract (When Deployed)
Once your $PUDGY token is deployed, add the contract address:
```javascript
const PUDGY_TOKEN_CONTRACT = '0x...'; // Replace with $PUDGY token contract address
```

## API Features

### Real-time Data Sources
- **Base RPC**: Direct blockchain queries for ETH balance
- **Basescan API**: Transaction history and fallback balance checking
- **CoinGecko API**: ETH price for USD conversion

### Automatic Features
- **Auto-refresh**: Updates every 30 seconds
- **Error handling**: Graceful fallbacks and user-friendly error messages
- **Mobile responsive**: Works on all devices
- **Copy address**: One-click wallet address copying

## Testing

### Before API Setup (Demo Mode)
The wallet viewer will show placeholder data and setup instructions.

### After API Setup
- Live ETH balance from Base network
- Real transaction history
- Accurate USD value calculations
- Working refresh functionality

## Troubleshooting

### Common Issues
1. **"Error" showing in balance**: Check wallet address format and API key
2. **No transactions loading**: Verify Basescan API key is valid
3. **$PUDGY balance shows "Not available"**: Token contract address not set

### Browser Console
Check browser developer console (F12) for detailed error messages.

## Security Notes
- API keys are only used for read-only blockchain data
- No private keys or sensitive data are required
- All API calls are public blockchain data
- Wallet address is publicly viewable information

## API Rate Limits
- Basescan free tier: 5 calls/second, 100,000 calls/day
- Base RPC: No documented limits for read operations
- CoinGecko: 50 calls/minute (used only for price data)

The auto-refresh is set to 30 seconds to stay well within these limits.
