"use client"

import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ConnectionProvider endpoint="https://api.devnet.solana.com">
            <WalletProvider wallets={[]} autoConnect={true}>
                {children}
            </WalletProvider>
        </ConnectionProvider>
    );
}