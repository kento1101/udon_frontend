'use client';

import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import './styles.css';

interface Item {
  id: string;
  name: string;
  image: string;
}

const Home: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);

  // APIから全てのアイテムを取得
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('http://localhost:4000/items/all');
        const data = await response.json();
        setItems(data.slice(0, 15)); // 15個の画像に制限
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };
    fetchItems();
  }, []);

  return (
    <div className="home-container">
      <h1>うどんガチャへようこそ！</h1>

      {/* 上部スライド */}
      <div className="sliding-images-wrapper">
        <div className="sliding-images">
          {items.concat(items).map((item, index) => ( // 画像を2回繰り返す
            <div key={index} className="sliding-image-wrapper">
              <Image
                src={item.image}
                alt={item.name}
                width={150}
                height={150}
                className="sliding-image"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="menu-buttons">
        {/* ガチャ画面へのリンク */}
        <Link href="/gacha">
          <div className="menu-item">
            <Image 
              src="/images/icon_udon_gacha.png" 
              alt="ガチャアイコン" 
              width={200} 
              height={230} 
              className="menu-icon"
              style={{ height: '230px', width: '200px' }}  // 高さと幅を明示的に指定
            />
          </div>
          <p>ガチャを引く</p>
        </Link>

        {/* 図鑑画面へのリンク */}
        <Link href="/encyclopedia">
          <div className="menu-item">
            <Image 
              src="/images/icon_menu.png" 
              alt="図鑑アイコン" 
              width={200} 
              height={230} 
              className="menu-icon"
              style={{ height: '230px', width: '200px' }}  // 高さと幅を明示的に指定
            />
          </div>
          <p>図鑑を見る</p>
        </Link>

        {/* 所持うどん一覧画面へのリンク */}
        <Link href="/encyclopedia">
          <div className="menu-item">
            <Image 
              src="/images/eating_udon.png" 
              alt="所持うどん一覧" 
              width={200} 
              height={230} 
              className="menu-icon"
              style={{ height: '230px', width: '200px' }}  // 高さと幅を明示的に指定
            />
          </div>
          <p>所持うどん一覧</p>
        </Link> 
      </div>

      {/* 下部スライド */}
      <div className="sliding-images-wrapper-bottom">
        <div className="sliding-images-bottom">
          {items.concat(items).map((item, index) => ( // 画像を2回繰り返す
            <div key={index} className="sliding-image-wrapper">
              <Image
                src={item.image}
                alt={item.name}
                width={150}
                height={150}
                className="sliding-image"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
