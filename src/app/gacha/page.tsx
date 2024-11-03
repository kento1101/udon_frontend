'use client'; 

import React, { useState, useEffect } from 'react';
import './styles.css';

// Itemデータの型定義
interface Item {
  id: string;
  name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}


const ApiCaller: React.FC = () => {
  const [data, setData] = useState<Item | null>(null);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [showData, setShowData] = useState(false);
  const [showExplosion, setShowExplosion] = useState(false);
  const [showButton, setShowButton] = useState(true);

  // APIを呼び出す
  const fetchData = async () => {
    setShowData(false);
    setShowButton(false);
    setLoading(true); 
    setCountdown(3);

    try {
      const response = await fetch('http://localhost:4000/items/get');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };


  // カウントダウン処理
  useEffect(() => {
    if (countdown !== null && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1500); // 1秒ごとにカウントを減らす
      return () => clearTimeout(timer); // クリーンアップ
    } else if (countdown === 0 && data) {
      setShowData(true);
      setShowExplosion(true);
      setTimeout(() => {
        setShowExplosion(false);
        setShowButton(true);
      }, 1500);
    }
  }, [countdown, data]); // countdownとdataが変わるたびに呼び出される
  

  return (
    <div className="container">
      <div>
        {countdown !== null && countdown > 0 && (
          <div className="countdown-overlay">
            <h1 key={countdown} className="countdown">{countdown}</h1>
          </div>
        )}

        {showData && data && (
          <div className="data-container">
            <h3><span className="item-name">{data.name}</span>をゲット！</h3>
            {/* 爆発エフェクト */}
            {showExplosion && (
              <div className="explosion"></div>
            )}
            {data.image && <img src={data.image} alt={data.name} className="item-image" />} {/* 拡大アニメーションを適用 */}
          </div>
        )}

         {/* ボタンを爆発エフェクト終了後に表示 */}
         {showButton && (
          <button onClick={fetchData} className="button" >
            ガチャを引く
          </button>
        )}
        {loading && <p>Loading...</p>}
      </div>
    </div>
  );
};

export default ApiCaller;
