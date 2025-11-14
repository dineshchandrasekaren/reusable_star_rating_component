import { useState } from "react";
import Star from "./Star";
import PropTypes from "prop-types";
/**
 * A reusable Star Rating component that allows users to rate something between 1 and a specified maximum.
 * It supports custom colors, sizes, and a callback function for handling the rating change.
 * @example
 * <StarRating
        maxRating={5}
        color="#fcc419"
        onSetRating={(rate) => {
          console.log(rate);
        }}
        messages={["😡", "😠", "😐", "🙂", "😊"]}
        className=""
        defaultRating={0}
        size={50}
      />
 * @property {number} [maxRating=5] The maximum number of stars available for rating.
 * @property {string | { textColor: string, starColor: string }} [color="#fcc419"] The color of the stars and text. Can be a single string or an object for separate colors.
 * @property {number} [size=25] The size of the stars in pixels.
 * @property {number} [defaultRating=0] The default rating displayed initially.
 * @property {(rate: number) => void} onSetRating A callback function that is called when a user selects a new rating.
 * @property {string} [className] Optional CSS class name for the main container div.
 * @property {string[]} [messages] Optional array of custom messages corresponding to each rating value. Must have the same length as maxRating.
 */
function StarRating({
  maxRating = 5,
  color = "#fcc419",
  size = 25,
  defaultRating = 0,
  onSetRating,
  className,
  messages = [],
}: {
  color?: string | { textColor: string; starColor: string };
  size?: number;
  messages?: string[];
  defaultRating?: number;
  className?: string;
  onSetRating: (rate: number) => void;
  maxRating: number;
}) {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);
  const containerStyles = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  };
  const starContainerStyles = {
    display: "flex",
  };
  const textStyle = {
    lineHeight: "1",
    margin: "0",
    color: typeof color === "object" ? color.textColor : color,
    fontSize: `${size / 1.5}px`,
  };
  const handleRating = (rate: number) => {
    setRating(rate);
    onSetRating(rate);
  };
  const handleHoverIn = (rate: number) => {
    setTempRating(rate);
  };
  const handleHoverOut = () => {
    setTempRating(0);
  };

  const ratingValue = tempRating ? tempRating : rating;
  return (
    <div style={containerStyles} className={className}>
      <div style={starContainerStyles}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            size={size}
            full={ratingValue >= i + 1}
            color={typeof color === "object" ? color.starColor : color}
            onRate={() => handleRating(i + 1)}
            onHoverIn={() => handleHoverIn(i + 1)}
            onHoverOut={handleHoverOut}
          />
        ))}
      </div>
      <p style={textStyle}>
        {messages.length === maxRating
          ? messages[ratingValue - 1]
          : ratingValue}
      </p>
    </div>
  );
}
StarRating.propTypes = {
  maxRating: PropTypes.number,
  defaultRating: PropTypes.number,
  color: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      textColor: PropTypes.string.isRequired,
      starColor: PropTypes.string.isRequired,
    }),
  ]),
  size: PropTypes.number,
  messages: PropTypes.array,
  className: PropTypes.string,
  onSetRating: PropTypes.func,
};

export default StarRating;
