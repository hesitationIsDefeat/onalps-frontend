import React from "react";
import { LoadingColor, LoadingType } from "../enums/Loading";

interface LoadingIndicatorProps {
  type?: LoadingType;
  color?: LoadingColor;
  size?: number;
}

const colorMap: Record<LoadingColor, string> = {
  [LoadingColor.PRIMARY]: "border-blue-500 text-blue-500 bg-blue-500",
  [LoadingColor.SECONDARY]: "border-purple-500 text-purple-500 bg-purple-500",
  [LoadingColor.WHITE]: "border-white text-white bg-white",
  [LoadingColor.BLACK]: "border-black text-black bg-black",
};

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  type = LoadingType.SPINNER,
  color = LoadingColor.PRIMARY,
  size = 24,
}) => {
  const colorClass = colorMap[color];
  const dimension = { width: size, height: size };

  return (
    <div style={dimension}>
      {/* 🔵 Spinner */}
      {type === LoadingType.SPINNER && (
        <div
          role="status"
          aria-label="Loading"
          className={`animate-spin rounded-full border-2 border-t-transparent ${colorClass}`}
          style={dimension}
        />
      )}

      {/* 🔵 Dynamic Spinner (thicker + pulse) */}
      {type === LoadingType.DYNAMIC_SPINNER && (
        <div
          role="status"
          aria-label="Loading"
          className={`animate-spin rounded-full border-4 border-t-transparent ${colorClass}`}
          style={dimension}
        />
      )}

      {/* 🔵 Dots Loader */}
      {type === LoadingType.DOTS && (
        <div className="flex items-center justify-center gap-2" role="status" aria-label="Loading">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`rounded-full ${colorClass} animate-bounce`}
              style={{
                width: size / 3,
                height: size / 3,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
