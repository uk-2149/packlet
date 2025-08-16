"use client";

import { generateMnemonic } from "bip39";
import { useState } from "react";
import Footer from "@/components/Footer";
import NewWallet from "@/components/NewWallet";
import { WalletDisconnectButton, WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Balance } from '../components/Balance';
import Airdrop from '../components/Airdrop';
import '@solana/wallet-adapter-react-ui/styles.css';

export default function Home() {
  const [mnemonic, setMnemonic] = useState("");

  return (
    <div className="min-h-screen flex flex-col">
      <main className="bg-gradient-to-br from-gray-900 to-black text-gray-100 p-6 font-sans flex flex-grow flex-col justify-start items-stretch">
        {!mnemonic && (
          <>
          <button
            onClick={async () => {
              const mn = await generateMnemonic();
              setMnemonic(mn);
            }}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 w-[300px] m-auto mb-0"
          >
            Generate a New Wallet
          </button>
          </>
        )}

        <div className="w-full">
          {mnemonic && <NewWallet mnemonic={mnemonic} />}
        </div>

        {!mnemonic && (
          <>
        <div className="m-auto mt-5 flex flex-col justify-center items-center">
          <WalletModalProvider>
            <WalletMultiButton />
            {/* <WalletDisconnectButton /> */}
          </WalletModalProvider>
          <div className="mt-5 mx-auto">
            <Balance />
          </div>
          <div className="mt-3 mx-auto">
            <Airdrop />
          </div>
        </div>
        </>
      )}

      </main>
      <Footer />
    </div>
  );
}
