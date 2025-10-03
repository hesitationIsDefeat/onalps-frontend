interface CircleIndicatorProps {
  activeIndex: number;
  totalImages: number;
}

export const CircleIndicator: React.FC<CircleIndicatorProps> = ({ activeIndex, totalImages }) => {
  return (
    <div className="absolute bottom-[2rem] left-1/2 transform -translate-x-1/2 flex gap-4">
        {Array.from({ length: totalImages }).map((_, index) => (
          <div
            key={index}
            className={`w-4 h-4 rounded-full ${
              activeIndex === index ? "bg-purple-500" : "bg-gray-400"
            }`}
          />
        ))}
    </div>
  );
};