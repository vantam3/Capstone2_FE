import React, { ReactNode } from "react";

interface CardCommonProps {
  children: ReactNode;
  bg_color?: string;
  border_color?: string;
}

function CardCommon({ children, bg_color, border_color }: CardCommonProps) {
  return (
    <div
      className={`w-full p-6 bg-[${bg_color}] border border-[${border_color}] rounded-[16px] shadow-sm`}
    >
      {children}
    </div>
  );
}

export default CardCommon;
