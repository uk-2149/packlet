export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-100 py-4 px-6 flex justify-between items-center border-t border-gray-800 w-full">
      <div className="text-lg font-medium px-4">
        Created by Utkal
      </div>
      <div className="flex space-x-4">
        <a href="https://github.com" target="_blank" rel="noopener noreferrer">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.7c-2.78.61-3.37-1.34-3.37-1.34-.46-1.16-1.12-1.47-1.12-1.47-.91-.62.07-.61.07-.61 1.01.07 1.54 1.04 1.54 1.04.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.26.1-2.63 0 0 .84-.27 2.75 1.03A9.56 9.56 0 0112 6.8c.85.004 1.71.11 2.52.33 1.91-1.3 2.75-1.03 2.75-1.03.55 1.37.2 2.38.1 2.63.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.93.68 1.88v2.78c0 .27.18.58.69.48A10.01 10.01 0 0022 12c0-5.52-4.48-10-10-10z"/>
          </svg>
        </a>
        <a href="https://x.com" target="_blank" rel="noopener noreferrer">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.024-3.037-1.852-3.037-1.852 0-2.136 1.445-2.136 2.939v5.667H9.351V9.5h3.414v1.561h.048c.476-.9 1.636-1.852 3.365-1.852 3.6 0 4.269 2.368 4.269 5.445v6.798zM5.337 7.433c-1.144 0-2.063-.93-2.063-2.077 0-1.147.919-2.077 2.063-2.077 1.147 0 2.077.93 2.077 2.077 0 1.147-.93 2.077-2.077 2.077zM7.119 20.452H3.553V9.5h3.566v10.952zM22.225 0H1.771C.792 0 0 .792 0 1.771v20.458C0 23.208.792 24 1.771 24h20.454c.979 0 1.771-.792 1.771-1.771V1.771C24 .792 23.208 0 22.225 0z"/>
          </svg>
        </a>
      </div>
    </footer>
  );
}
