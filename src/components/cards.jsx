import React from "react";
import "./card.css";
import {  timeTOLocal } from "./climatedata";
import { FaArrowUp, FaArrowDown, FaWind } from "react-icons/fa";
import { BiHappy } from "react-icons/bi";
import { MdCompress, MdOutlineWaterDrop } from "react-icons/md";

const Information = ({ weather, units }) => {
  const tUnit = units === "metric" ? "°C" : "°F";
  const wUnit = units === "metric" ? "m/s" : "m/h";

  const cards = [
    {
      id: 1,
      icon: <FaArrowUp />,
      title: "sunrise",
      data:   timeTOLocal(weather.sunrise, weather.timezone, "hh:mm a"),
      unit: " ",
    },
    {
      id: 2,
      icon: <FaArrowDown />,
      title: "sunset",
      data:   timeTOLocal(weather.sunset, weather.timezone, "hh:mm a"),
      unit: " ",
    },
    {
      id: 3,
      icon: <BiHappy />,
      title: "feels like",
      data: weather.feels_like.toFixed(),
      unit: tUnit,
    },
    {
      id: 4,
      icon: <MdCompress />,
      title: "pressure",
      data: weather.pressure,
      unit: "hPa",
    },
    {
      id: 5,
      icon: <MdOutlineWaterDrop />,
      title: "humidity",
      data: weather.humidity,
      unit: "%",
    },
    {
      id: 6,
      icon: <FaWind />,
      title: "wind speed",
      data: weather.speed.toFixed(),
      unit: wUnit,

    },
  ];
   

   return (
    <div className="section sectionInfomation">
      {cards.map(({ id, icon, title, data, unit }) => (
        <div key={id} className="card">
          <div className="informationCard-icon">
            {icon}
            <small>{title}</small>
          </div>
          <h2>{`${data} ${unit}`}</h2>
        </div>
      ))}
    </div>
  );
};

export default Information;
