// TitleList.tsx
import React from "react";

interface TitleListProps {
  titles: string[];
  onTitleClick: (title: string) => void;
}

const TitleList: React.FC<TitleListProps> = ({ titles, onTitleClick }) => (
  <div className="respuestaPlugin">
    {titles.map((title, index) => (
      <h4
        className="titulos dark:hover:bg-[#121212]"
        key={index}
        onClick={() => onTitleClick(title)}
      >
        {title}
      </h4>
    ))}
  </div>
);

export default TitleList;