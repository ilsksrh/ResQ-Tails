import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

import foto1 from './images/MM9753_210812_01985_3x2.jpg.avif';
import foto2 from './images/MM9753_210811_01412_3x2.jpg';
import foto3 from './images/MM9753_210813_02355_3x2.jpg';
import foto4 from './images/MM9753_210811_01695_3x2.jpg.avif';
import foto from './images/MM9753_210813_02386_3x2.jpg'
import paw from './images/paw1.png';
import info1 from './images/edit.png';
import info2 from './images/donate.png';
import info3 from './images/location.png';
import info4 from './images/pawprint.png';
import info5 from './images/history.png';
import info6 from './images/cpu.png';
import stat2 from './images/multiple-users-silhouette.png';
import stat3 from './images/volunteering.png';
import stat1 from './images/pawprint-4.png';
import youtube from './images/youtube.png';



const Main = () => {
    const [fotoIndex, setFotoIndex] = useState(0);
    const fotos = [foto1, foto2, foto3, foto4];

  
    useEffect(() => {
      const interval = setInterval(() => {
        setFotoIndex(prevIndex => (prevIndex + 1) % fotos.length);
      }, 3000);
  
      return () => clearInterval(interval);
    }, [fotos.length]);
  
    
    const currentUser = localStorage.getItem('user');
  
    return (
      <div>
            <div className="d-flex flex-column justify-content-center align-items-center text-white" style={{ height: "800px", backgroundImage: `url(${fotos[fotoIndex]})`, backgroundSize: "cover", backgroundColor: "rgba(0,0,0,0.4)" }}>
                <div className="text-center">
                    <h2>Делайте мир лучше вместе с нами</h2>
                    <div className="mt-3">
                        {currentUser ? (
                            <Link to="/createPost" className="btn btn-success btn-lg">Создать пост</Link>
                        ) : (
                            <Link to='/login' className="btn btn-success btn-lg">Войти</Link>
                        )}
                    </div>
                </div>
            </div>
  
        <div className="d-flex justify-content-center align-items-center bg-light" style={{ height: "500px" }}>
          <div className="w-75 text-center">
            <h3>Что можно делать на ResQ Tails?</h3>
            <div className="d-flex justify-content-around flex-wrap mt-4">
              {[
                { src: info1, text: "Опубликовать пост о пропаже" },
                { src: info2, text: "Делать пожертвования" },
                { src: info3, text: "Наблюдать на карте животного" },
                { src: info4, text: "Приютить животного" },
                { src: info5, text: "Смотреть историю животного" },
                { src: info6, text: "Получить код чипа животного" },
              ].map((info, index) => (
                <div key={index} className="border border-success shadow-sm p-3 mb-4 rounded d-flex align-items-center" style={{ width: "28%" }}>
                  <img src={info.src} height={32} width={32} alt="" />
                  <p className="mb-0 ms-3">{info.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
  
        <div className="d-flex justify-content-center align-items-center" style={{ height: "500px" }}>
          <div className="w-75 d-flex justify-content-between align-items-center">
            <div className="d-flex flex-column justify-content-around" style={{ height: "200px" }}>
              <h3>Как пользоваться нашим сайтом?</h3>
              {["Пройти регистрацию", "Заполнить анкету о своем животном", "Ждать одобрение модератора"].map((step, index) => (
                <div key={index} className="d-flex align-items-center">
                  <div className="bg-success text-white rounded-circle d-flex justify-content-center align-items-center me-3" style={{ height: "25px", width: "25px" }}>{index + 1}</div>
                  <span>{step}</span>
                </div>
              ))}
            </div>
            <div className="bg-dark d-flex justify-content-center align-items-center rounded" style={{ height: "280px", width: "360px" }}>
              <img src={youtube} height={200} style={{ borderRadius: '15%' }} alt="" />
            </div>
          </div>
        </div>
  
        <div className="d-flex justify-content-center align-items-center bg-white" style={{ height: "150px" }}>
          <div className="w-75 d-flex justify-content-between">
            {/* Content can be added here */}
          </div>
        </div>
  
        <div className="d-flex justify-content-center align-items-center text-white" style={{ height: "600px", backgroundAttachment: "fixed", backgroundImage: `url(${foto})`, backgroundSize: "cover" }}>
          <div className="w-100 h-100 d-flex justify-content-around align-items-center bg-dark bg-opacity-50">
            {[
              { src: stat1, number: 3609, text: "Pets Adopted" },
              { src: stat2, number: 14847, text: "People are registered" },
              { src: stat3, number: 1771, text: "Volunteer Hours" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-success rounded-circle d-flex justify-content-center align-items-center" style={{ height: "180px", width: "180px" }}>
                  <img src={stat.src} height={100} width={100} alt="" />
                </div>
                <div className="display-3">{stat.number}</div>
                <div className="h5">{stat.text}</div>
              </div>
            ))}
          </div>
        </div>
  
        <div className="d-flex justify-content-center align-items-center" style={{ height: "600px" }}>
          <div className="loader">
            <i className="fas fa-paw paw-1"><img src={paw} height={40} width={40} alt="" /></i>
            <i className="fas fa-paw paw-2"><img src={paw} height={40} width={40} alt="" /></i>
            <i className="fas fa-paw paw-3"><img src={paw} height={40} width={40} alt="" /></i>
          </div>
        </div>
      </div>
    );
  };
  
  export default Main;