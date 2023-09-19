// "use client";

import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Home() {
  const [chats, setChats] = useState([]);

  const getChat = () => {
    axios.get('https://backend-iot-gps-tracker-production.up.railway.app?limit=5')
      .then(response => {
        setChats(response.data.data);
      })
      .catch(error => {
        console.error("Error : ", error);
      });
  }

  useEffect(() => {
    getChat();
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-100 gap-4">
      {/* alert */}
      <div className="bg-red-200 p-6 text-base text-center">
        Hello!! This backend application is not availaible since: <b>11 August 2023</b>.
      </div>
      <div className="flex justify-center items-center h-screen px-5 bg-gray-100">
        <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex justify-between bg-gray-200 p-4">
            <h2 className="text-lg font-semibold text-gray-800">Live Location - GPS Tracker</h2>
          </div>
          <div className="px-4 py-4 overflow-y-auto">
            {chats.map((chat, index) => {
              if (chat.username === "System") {
                const utcDateTime = chat.created_at;
                const date = new Date(utcDateTime);
                const localTime = date.toLocaleString();
                return (
                  <div className="flex items-start mb-3" key={index}>
                    <div className="ml-3">
                      <p className="text-gray-900 mb-2">{chat.username}</p>
                      <p className="rounded-lg flex justify-end mb-1">
                        <a target="_blank" className="bg-blue-200 text-gray-800 p-2 rounded font-semibold hover:text-gray-600 focus:text-gray-500" href={chat.message}>
                          {chat.message}
                        </a>
                      </p>
                      <p className="text-xs text-gray-500">{localTime}</p>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div className="flex items-start mb-4 justify-end" key={index}>
                    <div className="mr-3">
                      <p className="text-gray-600">{chat.username}</p>
                      <p className="rounded-lg flex justify-end">
                        <a target="_blank" className="bg-blue-200 text-gray-800 p-2 rounded font-semibold hover:text-gray-900 hover:underline" href={chat.message}>
                          {chat.message}
                        </a>
                      </p>
                    </div>
                  </div>
                );
              }
            })}
          </div>
          <p className="text-right text-xs text-gray-500 m-2">
            Develop by:
            <span className="text-gray-700 ml-1">
              <a target="_blank" href="https://about.anandahisanah.dev">
                @anandahisanah
              </a>
            </span>
          </p>
        </div>
      </div>
    </div>
  );

}