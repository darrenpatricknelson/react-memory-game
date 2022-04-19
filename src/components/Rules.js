export default function Rules({ hideRules }) {
  return (
    <div className="overlay">
      <div className="container">
        <h1> Rules of the game </h1>
        <p>Aim of the game: match all the animals before the game limit</p>
        <ol>
          <li>
            Click on the 'new game' button to shuffle the cards and start a new
            game.
          </li>
          <li>
            On each turn, a player turns over any two cards (one at a time) and
            if the cards match, they stay faced up (for instance, two lions).
          </li>
          <li>
            When a player turns over two cards that do not match, those cards
            are turned face down again (in the same position). Each turn counts
            as a move.
          </li>
          <li>The trick is to remember where the pairs are.</li>
          <li>The objective is to match the cards in less than 12 moves.</li>
        </ol>
        <p>Goodluck and may the odds be ever in your favor!</p>
        <button className="hideRuleButton" onClick={hideRules}>
          Let's play!
        </button>
      </div>
    </div>
  );
}
