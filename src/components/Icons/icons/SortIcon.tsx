import React from "react";
import { IIconProps } from "../IIconProps";

export const SortIcon: React.FC<IIconProps> = (props) => (
  <svg {...props} viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="0.353553" y1="0.646447" x2="4.35355" y2="4.64645" stroke="currentColor"/>
    <line x1="3.64645" y1="4.64645" x2="7.64645" y2="0.646447" stroke="currentColor"/>
  </svg>
)
