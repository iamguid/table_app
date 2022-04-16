export interface IIconProps {
  style?: React.CSSProperties;
  width?: number;
  height?: number;
  className?: string;
  onClick?: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
}
