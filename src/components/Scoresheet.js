export default function Rules({ hideScore, won, loss, result, endGame }) {
  return (
    <div className="overlay">
      <div className="container">
        <h1> Scoresheet </h1>
        <h3>{result}</h3>
        <p>{/* Add result of previous game here */}</p>
        <ol>
          <li>Won: {won}</li>
          <li>Lost: {loss}</li>
        </ol>
        <button className="hideRuleButton" onClick={hideScore}>
          Play again
        </button>
        <button className="hideRuleButton" onClick={endGame}>
          Quit
        </button>
      </div>
    </div>
  );
}
