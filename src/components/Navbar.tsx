import React, { useState, useEffect, useRef } from 'react';

const Navbar: React.FC = () => {
  const [exchangeRates, setExchangeRates] = useState<{ [key: string]: number }>({
    USD: 1,
    PHP: 48.38, 
    EUR: 0.91, 
    GBP: 0.77,
    JPY: 116.30, 
    AUD: 1.29,
    CAD: 1.25,
    CHF: 0.92,
    CNY: 6.47,
    HKD: 7.77,
    INR: 74.73,
    KRW: 1128.54,
    MXN: 20.20,
    NZD: 1.37,
    RUB: 73.67,
    SGD: 1.34,
  });

  const styleRef = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    styleRef.current = document.createElement('style');
    document.head.appendChild(styleRef.current);
    const sheet = styleRef.current.sheet as CSSStyleSheet;
    sheet.insertRule(`
      @keyframes marquee {
        0% {
          transform: translateX(100%);
        }
        100% {
          transform: translateX(-100%);
        }
      }
    `);
    return () => {
      if (styleRef.current) {
        document.head.removeChild(styleRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setExchangeRates((prevRates) => ({
        ...prevRates,
        USD: 1,
        PHP: 48.38 + Math.random() * 0.1 - 0.05, 
        EUR: 0.91 + Math.random() * 0.1 - 0.05,
        GBP: 0.77 + Math.random() * 0.1 - 0.05,
        JPY: 116.30 + Math.random() * 2 - 1,
        AUD: 1.29 + Math.random() * 0.1 - 0.05,
        CAD: 1.25 + Math.random() * 0.1 - 0.05,
        CHF: 0.92 + Math.random() * 0.1 - 0.05,
        CNY: 6.47 + Math.random() * 0.1 - 0.05,
        HKD: 7.77 + Math.random() * 0.1 - 0.05,
        INR: 74.73 + Math.random() * 0.1 - 0.05,
        KRW: 1128.54 + Math.random() * 0.1 - 0.05,
        MXN: 20.20 + Math.random() * 0.1 - 0.05,
        NZD: 1.37 + Math.random() * 0.1 - 0.05,
        RUB: 73.67 + Math.random() * 0.1 - 0.05,
        SGD: 1.34 + Math.random() * 0.1 - 0.05,
      }));
    }, 5000); 

    return () => clearInterval(interval);
  }, []); 

  return (
    <nav className="overflow-hidden bg-gray-100 rounded-lg shadow-md">
      <ul className="flex p-0 m-0 space-x-4 list-none" style={{ animation: 'marquee 15s linear infinite' }}>
        {Object.entries(exchangeRates).map(([currency, value]) => (
          <li key={currency} className="flex items-center space-x-2 text-gray-800">
            <span className="font-semibold uppercase">{currency}:</span>
            <span>{value.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;