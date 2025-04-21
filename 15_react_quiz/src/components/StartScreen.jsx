const StartScreen = ({ numQuestions }) => {
  return (
    <div className="start">
      <h2>Welcome to the React Quiz!</h2>
      <h3>{numQuestions} questions to test React mastery</h3>
      <button type="button" className="btn btn-ui">
        Let's start
      </button>
    </div>
  );
};

export default StartScreen;
