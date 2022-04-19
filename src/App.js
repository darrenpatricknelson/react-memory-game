import { useState, useEffect } from 'react';
import './App.css';
// components
import SingleCard from './components/SingleCard';
import Rules from './components/Rules';
import Scoresheet from './components/Scoresheet';

// images for the cards
import Cat from './images/cat.png';
import Dog from './images/dog.png';
import Frog from './images/frog.png';
import Lion from './images/lion.png';
import Monkey from './images/monkey.png';
import Rabbit from './images/rabbit.png';

// object that hosues all the cards
const cardImages = [
  {
    src: Cat,
    matched: false,
    alt: 'Image of a cat'
  },
  {
    src: Dog,
    matched: false,
    alt: 'Image of a dog'
  },
  {
    src: Frog,
    matched: false,
    alt: 'Image of a frog'
  },
  {
    src: Lion,
    matched: false,
    alt: 'Image of a lion'
  },
  {
    src: Monkey,
    matched: false,
    alt: 'Image of a monkey'
  },
  {
    src: Rabbit,
    matched: false,
    alt: 'Image of a rabbit'
  }
];

function App() {
  // storing the state in the cards state
  const [cards, setCards] = useState([]);
  // counting the amount of times the uses clicks a card during a game
  const [turns, setTurns] = useState(0);

  // adding the clicking of cards
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  // add a disabled state
  const [disabled, setDisabled] = useState(false);

  // a state for the rules
  const [showingRules, setShowingRules] = useState(false);

  // a state for the scoresheet + win and loss state
  const [showingScore, setShowingScore] = useState(false);
  const [won, setWon] = useState(0);
  const [loss, setLoss] = useState(0);
  // also adding a result message that will display on the score sheet and clearly inform the user whether they have won or lost
  const [result, setResult] = useState('');

  // shuffle cards
  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    // setting the state
    setCards(shuffleCards);
    setTurns(0);
  };

  // handle a choice
  // pass this function as a prop to the singleCard component
  const handleChoice = (card) => {
    // check if choice one has a value
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    // basically, if choiceOne comes back as true (it has a value), then the setChoiceTwo function will run.
    // However, if choiceOne comes back false (null, as we have set it to null above), then the setChoiceOne function will run
  };

  // comapre the 2 selected cards
  useEffect(
    () => {
      // check if we have a value for choiceOne and choiceTwo
      if (choiceOne && choiceTwo) {
        // set disabled to be true
        setDisabled(true);
        if (choiceOne.src === choiceTwo.src) {
          // if the cards match, use the setCards function to update the state
          //  we going to change teh matched state (which is false in the object) to true
          setCards((prevCards) => {
            // we going to use the map function to map a new array with the two cards (choiceOne and Choice two) with values for matched to equal true
            // we want to check: Does the cards source equal to the source of the one they selected
            return prevCards.map((card) => {
              // the card is the itterable value and we want to check it against the card chosen by the user
              // Since the src of choiceOne is equal to choiceTwo, we can use either of the two
              if (card.src === choiceOne.src) {
                // we want to return a new object of the card
                // so we use the spread operator
                // but we want to change the matched value to true!
                return { ...card, matched: true };
              } else {
                // we need to add an else clause because if they don't match
                // we want to return the object as if
                // we don't want to change anything
                return card;
              }
            });
            // essentially, two cards will have the same source as the one the user selected in game
            // those two cards matched value will be change to true
          });
          resetTurn();
        } else {
          setTimeout(() => resetTurn(), 1000);
        }
      }
    },
    // these are dependencies
    // the useEffect function will run whenever a dependency is updated
    // So essentially this function will run everytime a dependency is updated!
    [choiceOne, choiceTwo]
  );

  // this checkState function checks where the all the matched keys of the card are set to true
  // focus on this!!!!
  // We need this to bring up the score sheet once the game is done
  useEffect(() => {
    // I'm creating an arary filled with the matched value of the object created by the shuffleCards function
    const matched = cards.map((card) => card.matched);

    // Testing the array created above
    // check the length and if every value is equal to true
    if (matched.length && matched.every((v) => v === true)) {
      // if criteria is met, the score sheet component is showed
      setShowingScore(true);

      // the rules of the game is to check whether the palyer can beat the gamne in less than 12 moves
      // (which is pretty easy)
      if (turns < 13) {
        // if true, the won state will increase and a message telling the user they won will display
        setWon((prevScore) => prevScore + 1);
        setResult(
          'Congratulations! You have matched the cards in less than 12 moves. You are a winner!'
        );
      } else {
        // if false, the loss state will increase and a message telling the user they lost will display
        setLoss((prevScore) => prevScore + 1);
        setResult(
          'Ah Shucks! It seems you could not complete the game in less than 12 moves. The game has bested you. Try again.'
        );
      }
    }
  }, [cards, turns]);

  // reset choices and increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    // set disabled to false
    setDisabled(false);
  };

  // Start a new game automatically
  useEffect(() => {
    // the shuffleCards function starts a new game
    shuffleCards();
    // reset the choices
    setChoiceOne(null);
    setChoiceTwo(null);
  }, []);

  // functions to show and hide the rules
  const showRules = () => {
    setShowingRules(true);
  };

  const hideRules = () => {
    setShowingRules(false); // changes state - hiding rules
    shuffleCards(); // shuffle cards - starts a new game
    setChoiceOne(null); // emties the choices so that there are no games being continued
    setChoiceTwo(null);
  };

  // fucntions to hide the score sheet
  const hideScore = () => {
    setShowingScore(false); // changes state - hiding the scoresheet
    shuffleCards(); // shuffle cards - starts a new game
    setChoiceOne(null); // emties the choices so that there are no games being continued
    setChoiceTwo(null);
  };

  // function to end the game and reset all states
  const endGame = () => {
    // changes all states to their defaults
    setCards([]);
    setTurns(0);
    setChoiceOne(null);
    setChoiceTwo(null);
    // setShowingScore(false);
    setWon(0);
    setLoss(0);
    setResult('Click the "Play again" button to start a new game');
  };

  return (
    <div className="App">
      <h1>Magic match</h1>
      <button onClick={shuffleCards}>New game</button>
      <button onClick={showRules}>Rules</button>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            card={card}
            key={card.id}
            handleChoice={handleChoice}
            //  we need to send a prop through to flipp the child prop
            // There will be 3 scenarios:
            // scene 1: does the card match choiceOne
            // scene 2: does the card match choiceTwo
            // scene 3: is the cards matched value set to true
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            // we need to add a disabled prop to the card so that when the user clicks a card
            // The user cannot keep click on other cards simultaneously
            disabled={disabled}
          />
        ))}
      </div>

      {/* A hidden div with the rules */}
      {showingRules ? <Rules hideRules={hideRules} /> : ''}

      {/* A hidden div with the scoresheet */}
      {showingScore ? (
        <Scoresheet
          hideScore={hideScore}
          won={won}
          loss={loss}
          result={result}
          endGame={endGame}
        />
      ) : (
        ''
      )}

      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
