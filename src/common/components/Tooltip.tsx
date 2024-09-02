import { ReactNode } from 'react';
import { TooltipPlacement } from '../types/tooltip';

interface TooltipProps {
  text: string;
  placement: TooltipPlacement;
  imageSrc?: string;
  children: ReactNode;
}
const Tooltip = ({
  children,
  text,
  imageSrc,
  placement = 'top',
}: TooltipProps) => {
  const placementStyle = {
    top: 'left-1/2 transform -translate-x-1/2 bottom-full mb-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
    bottom: 'left-1/2 transform -translate-x-1/2 top-full mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
  };
  return (
    <div role="tooltip" id="tooltip-id" className="relative group">
      {children}
      {!imageSrc && (
        <div
          className={`absolute ${placementStyle[placement]} hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 z-10 transition-opacity duration-300 opacity-0 group-hover:opacity-100`}
        >
          {text}
        </div>
      )}
      {imageSrc && (
        <img
          src={imageSrc}
          alt="tooltip"
          className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:block"
        />
      )}
    </div>
  );
};

export default Tooltip;
