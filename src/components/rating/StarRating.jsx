const StarRating = ({ rating, textSm = false }) => {
  const stars = [];
  const paserRating = Math.round(rating);
  for (let i = 0; i < 5; i++) {
    if (i < paserRating) {
      stars.push(
        <i
          key={i}
          className={`fa-sharp fa-solid fa-star ${
            textSm ? "text-xs" : "text-base"
          }  text-[#faaf00]`}
        ></i>
      );
    } else {
      stars.push(
        <span
          key={i}
          className={`${textSm ? "text-xl" : "text-2xl"}  text-[#faaf00]`}
        >
          ☆
        </span>
      );
    }
  }
  return <>{stars}</>;
};

export default StarRating;
