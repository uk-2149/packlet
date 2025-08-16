import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

function Airdrop() {
 
    const wallet = useWallet();
    const { connection } = useConnection()
    
    async function sendAirdropToUser() {
        if (!wallet.publicKey) {
            alert("Wallet not connected!");
            return;
        }
        await connection.requestAirdrop(wallet.publicKey, 1 * LAMPORTS_PER_SOL);
        alert("airdropped 1 sol");
    }
    
  return (
    <div>
        <button onClick={sendAirdropToUser} className='px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105'>Airdrop 1 Sol</button>
    </div>
  )
}

export default Airdrop