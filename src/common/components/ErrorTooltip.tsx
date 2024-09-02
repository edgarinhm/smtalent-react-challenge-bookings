import { ReactNode, useRef } from 'react';
import {
  ArrowProperties,
  TooltipAlignment,
  TooltipPlacement,
} from '../types/tooltip';

interface ErrorTooltipProps {
  show: boolean;
  error?: string;
  placement?: TooltipPlacement;
  alignment?: TooltipAlignment;
  children: ReactNode;
}
const ErrorTooltip = ({
  show,
  error,
  placement = 'top',
  alignment = 'center',
  children,
}: ErrorTooltipProps) => {
  const placementStyle = {
    top: 'left-1/2 transform -translate-x-1/2 bottom-full mb-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
    bottom: 'left-1/2 transform -translate-x-1/2 top-full mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
  };
  const arrowRef = useRef<HTMLDivElement>(null);
  const arrowSize = 6;
  const animationDuration = 'duration-500';
  // floating UI
  const fuiPlacement = `${
    alignment === 'center' ? placement : `${placement}-${alignment}`
  }`;

  const staticSide = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right',
  }[fuiPlacement.split('-')[0]] as keyof ArrowProperties;

  return (
    <div
      role="tooltip"
      id="tooltip-id"
      className="relative group flex flex-row items-center flex-1"
    >
      {children}
      {show && error && (
        <div
          className={`absolute ${placementStyle[placement]} group-hover:block text-xs transition-opacity ${animationDuration}  group-hover:opacity-100 rounded bg-red-500 text-white left-1/3 min-w-64 py-2 px-1 z-10
            `}
        >
          {error}
          <div
            ref={arrowRef}
            style={{
              top: '', // TODO:get arrowData.x
              left: '', // TODO:get arrowData.y
              height: `${arrowSize}px`,
              width: `${arrowSize}px`,
              [staticSide]: `-${arrowSize / 2}px`,
            }}
            className={`absolute bg-inherit rotate-45 w-[${arrowSize}px] h-[${arrowSize}px]`}
          />
        </div>
      )}
    </div>
  );
};

export default ErrorTooltip;
