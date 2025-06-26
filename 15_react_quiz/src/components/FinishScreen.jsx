import { useQuiz } from "../contexts/QuizContext";

// const FinishScreen = ({ points, maxPossiblePoints, highscore, dispatch }) => {
const FinishScreen = () => {
  const { points, maxPossiblePoints, highscore, dispatch } = useQuiz();
  
  const percentage = (points / maxPossiblePoints) * 100;

  let emoji;
  if (percentage === 100) emoji = "🥇";
  else if (percentage >= 80) emoji = "🎉";
  else if (percentage >= 50) emoji = "🙃";
  else if (percentage > 0) emoji = "🤨";
  else if (percentage === 0) emoji = "🤦🏽‍♂️";

  return (
    <>
      <p className="result">
        <span>{emoji}</span> You scored <strong>{points}</strong> out of{" "}
        {maxPossiblePoints} ({Math.ceil(percentage)}%)
      </p>
      {/* <p className="highscore">(Highscore: X points)</p> */}
      <p className="highscore">(Highscore: {highscore} points)</p>

      <button
        type="button"
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
};

export default FinishScreen;
