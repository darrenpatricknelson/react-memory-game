import '../App';
import Cover from '../images/cover.png';

export default function SingleCard({ card, handleChoice, flipped, disabled }) {
  // handle click function
  // we want to update the choice one or choice two state in the app component
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
    // essentially, if disabled is set to false, the click will call the function
    // if it is set to true, the click will do nothing
  };

  return (
    <div className="card">
      {/* we will now use the flipped prop to add dynamic Css to the div */}
      {/* If flipped is true, it will apply one css class else the other */}
      <div className={flipped ? 'flipped' : ''}>
        <img src={card.src} className="front" alt={card.alt} />
        <img
          src={Cover}
          onClick={handleClick}
          className="back"
          alt="Back cover of the card"
        />
      </div>
    </div>
  );
}
