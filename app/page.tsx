"use client";

import { generateMnemonic } from "bip39";
import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair, PublicKey } from "@solana/web3.js";
import nacl from "tweetnacl";
import { Wallet, HDNodeWallet } from "ethers";
import Footer from "@/components/Footer";

export default function Home() {
  const [mnemonic, setMnemonic] = useState("");
  const [showPhrase, setShowPhrase] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [publicKeys, setPublicKeys] = useState<PublicKey[]>([]);
  const [addresses, setAddresses] = useState<string[]>([]);
  const [showSolanaWallets, setShowSolanaWallets] = useState<boolean>(false);
  const [showEthereumWallets, setShowEthereumWallets] =
    useState<boolean>(false);

  const handleCopy = (s: string) => {
    navigator.clipboard.writeText(s);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1800);
  };

  const handleShowPhrase = () => {
    setShowPhrase(!showPhrase);
  };

  const handleSolanaWallet = async () => {
    const seed = await mnemonicToSeed(mnemonic);
    const path = `m/44'/501'/${currentIndex}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keyPair = Keypair.fromSecretKey(secret);
    setCurrentIndex(currentIndex + 1);
    setPublicKeys([...publicKeys, keyPair.publicKey]);
  };

  const handleEthereumWallet = async () => {
    const seed = await mnemonicToSeed(mnemonic);
    const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
    const hdNode = HDNodeWallet.fromSeed(seed);
    const child = hdNode.derivePath(derivationPath);
    const privateKey = child.privateKey;
    const wallet = new Wallet(privateKey);
    setCurrentIndex(currentIndex + 1);
    setAddresses([...addresses, wallet.address]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="bg-gradient-to-br from-gray-900 to-black text-gray-100 p-6 font-sans flex-grow">
        {!mnemonic && (
          <button
            onClick={async () => {
              const mn = await generateMnemonic();
              setMnemonic(mn);
            }}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            Generate a New Wallet
          </button>
        )}
        {mnemonic && (
          <>
            <div className="border border-gray-800 rounded-xl p-6 shadow-2xl bg-gray-800 mb-6">
              <div
                onClick={handleShowPhrase}
                className="cursor-pointer p-4 mb-4 font-bold text-3xl text-white w-full hover:text-blue-400 transition-colors duration-200 flex justify-between"
              >
                Your Secret Phrase{" "}
                <div className="text-right">{showPhrase ? "▲" : "▼"}</div>
              </div>
              {showPhrase && (
                <div
                  onClick={() => handleCopy(mnemonic)}
                  className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 bg-gray-800 p-6 cursor-pointer hover:bg-gray-850 transition-colors duration-200"
                  title="Click to copy mnemonic"
                >
                  {mnemonic.split(" ").map((word, idx) => (
                    <span
                      key={idx}
                      className="inline-block bg-gray-900 border border-gray-600 rounded-lg px-6 py-4 font-medium text-xl text-white shadow-sm hover:bg-gray-600 transition-colors duration-200"
                    >
                      {word}
                    </span>
                  ))}
                  <p className="text-sm text-gray-400 mt-3 ml-2">
                    Click anywhere to copy to clipboard
                  </p>
                </div>
              )}
            </div>

            {/* Add Wallet */}
            <div className="text-white text-xl font-semibold mb-6">
              <div className="relative flex justify-center sm:justify-start">
                <button
                  className="px-6 py-3 rounded-lg bg-[#0476D0] border border-gray-600 hover:bg-[#5698cc] transition-colors duration-200 focus:outline-none cursor-pointer"
                  onClick={() => setShowDropdown((prev) => !prev)}
                >
                  Add Wallet
                </button>

                {showDropdown && (
                  <div
                    className={`
          absolute 
          mt-15 w-48 
          bg-gray-800 border border-gray-700 
          rounded-lg shadow-xl z-50 
          mb-2
          left-1/2 -translate-x-1/2 
          sm:left-0 sm:translate-x-0
        `}
                  >
                    <div
                      className="block w-full px-4 py-2 hover:bg-gray-700 text-white cursor-pointer"
                      onClick={() => {
                        setShowDropdown(false);
                        handleSolanaWallet();
                      }}
                    >
                      Solana
                    </div>
                    <div
                      className="block w-full px-4 py-2 hover:bg-gray-700 text-white cursor-pointer"
                      onClick={() => {
                        setShowDropdown(false);
                        handleEthereumWallet();
                      }}
                    >
                      Ethereum
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Solana Wallets */}
            <div className="mb-6">
              <button
                onClick={() => setShowSolanaWallets((prev) => !prev)}
                className="w-full px-6 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white font-semibold hover:bg-gray-600 transition-all duration-200 flex justify-between items-center text-2xl"
              >
                Solana Wallets
                <span>{showSolanaWallets ? "▼" : "▶"}</span>
              </button>
              {showSolanaWallets && (
                <div className="mt-4 space-y-3">
                  {publicKeys.length === 0 && (
                    <p className="text-gray-500">
                      No Solana wallets found. Click "Add Wallet" to create one.
                    </p>
                  )}
                  {publicKeys.map((p, index) => (
                    <div
                      key={index}
                      className="bg-gray-800 border border-gray-700 rounded-tl-3xl rounded-tr-3xl rounded-b-2xl shadow-md hover:bg-gray-850 transition-colors duration-200"
                    >
                      <div className="text-xl font-bold text-white mb-2 p-6">
                        Sol Wallet {index + 1}
                      </div>
                      <div className="border-t-2 rounded-3xl p-6">
                        <div className="mb-2 font-bold text-gray-100">
                          Public Key
                        </div>
                        <span
                          className="text-gray-300 cursor-pointer max-w-full overflow-hidden text-ellipsis whitespace-nowrap block"
                          onClick={() => handleCopy(p.toBase58())}
                          title={p.toBase58()}
                        >
                          {p.toBase58()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Ethereum Wallets */}
            <div className="mb-6">
              <button
                onClick={() => setShowEthereumWallets((prev) => !prev)}
                className="w-full px-6 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white font-semibold hover:bg-gray-600 transition-all duration-200 flex justify-between items-center text-2xl"
              >
                Ethereum Wallets
                <span>{showEthereumWallets ? "▼" : "▶"}</span>
              </button>
              {showEthereumWallets && (
                <div className="mt-4 space-y-3">
                  {addresses.length === 0 && (
                    <p className="text-gray-500">
                      No Ethereum wallets found. Click "Add Wallet" to create
                      one.
                    </p>
                  )}
                  {addresses.map((address, index) => (
                    <div
                      key={index}
                      className="bg-gray-800 border border-gray-700 rounded-tl-3xl rounded-tr-3xl rounded-b-2xl shadow-md hover:bg-gray-850 transition-colors duration-200"
                    >
                      <div className="text-xl font-bold text-white mb-2 p-6">
                        Eth Wallet {index + 1}
                      </div>
                      <div className="border-t-2 rounded-3xl p-6">
                        <div className="mb-2 font-bold text-gray-100">
                          Public Address
                        </div>
                        <span
                          className="text-gray-300 cursor-pointer max-w-full overflow-hidden text-ellipsis whitespace-nowrap block"
                          onClick={() => handleCopy(address)}
                          title={address}
                        >
                          {address}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {showToast && (
              <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-gray-700 text-white px-6 py-3 rounded-lg shadow-xl font-semibold text-lg z-50 animate-fadeInOut border border-gray-600 opacity-95">
                Copied
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
