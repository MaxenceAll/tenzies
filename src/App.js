import './App.css';
import Die from './component/Die';
import { useEffect, useState } from 'react';
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'

function App() {

  const [dice, setDice] = useState( allNewDice() );
  const [tenzies, setTenzies] = useState(false);


  // useEffect(() => {
  //   console.log("Dice State changed") 
    
  //   checkWinner();
  // }, [dice])
  
  // function checkWinner() {
  //   let compteur = 0;

  //   for (let j = 1 ; j <= 6 ; j++ )
  //   {
  //     for (let i = 0 ; i < dice.length ; i++ ){
  //       if (dice[i].isHeld && dice[i].value === j){
  //         compteur++;
  //       }
  //     }
  //   }
  //   if (compteur===10){
  //     setTenzies(true)
  //     console.log("You won!");
  //   }else{
  //     console.log("not yet won");
  //   }
  // }

  useEffect(() => {
      const allHeld = dice.every( (die) => die.isHeld);
      // console.log(allHeld);
      const firstValue = dice[0].value;
      const allSameValue = dice.every ( (die) => die.value === firstValue);
      // console.log(allSameValue);
      (allHeld && allSameValue) ? setTenzies(true) : setTenzies(false)

  }, [dice])
  


  function allNewDice()
  {
      const result = [];
        for (let i = 0; i < 10; i++)
        {
          result.push(generateNewDie());
        }
        // console.log(result);
        return result;
  }

  function generateNewDie(){
    return {
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
      id: nanoid()
    }           
  } 
  
  const diceElements = dice.map(die=> 
          <Die 
            value={die.value} 
            key={die.id} 
            isHeld={die.isHeld}
            id={die.id}
            holdDice={() => holdDice(die.id)}
          />)      

  function rollDice(){
    if (!tenzies){
      
      setDice(oldDice => oldDice.map( (die) => {
          return die.isHeld ? die : generateNewDie()
  
      }))

    }
    else 
    {
      setTenzies(false);
      setDice(allNewDice());
    }

    
  }

  function holdDice (id){
      // console.log(id);

      setDice(oldDice => oldDice.map( (die)=>{
          return die.id === id 
            ? {...die, isHeld: !die.isHeld}
            : die
      } ))

  }

  return (
    
    <main>
      {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className='dice-container'>

          {diceElements}

          <button className="roll-dice" onClick={rollDice}>
            {tenzies ? "New Game" : "Roll"}
          </button>

        </div>
    </main>
  );
}

export default App;
