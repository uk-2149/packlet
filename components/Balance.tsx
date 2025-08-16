import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState } from "react";

export function Balance() {
    const { connection } = useConnection();
    const wallet = useWallet();
    const [balance, setBalance] = useState<number>(0);

    async function getBalance() { 
        if (wallet.publicKey) {

            const balance = await connection.getBalance(wallet.publicKey);
            const balanceInSol = balance / LAMPORTS_PER_SOL;
            setBalance(balanceInSol);
        }
    }
    
    getBalance();

    return <div>
        <p>SOL Balance: {balance}</p>
    </div>
}