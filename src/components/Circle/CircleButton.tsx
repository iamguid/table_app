import './CircleButton.css';

interface ICircleButtonProps {
  size: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const CircleButton: React.FC<ICircleButtonProps> = ({ size, children, style, onClick }) => {
  return <div className="circle-button" onClick={onClick} style={{
    width: size,
    height: size,
    ...style
  }}>{children}</div>;
}
