import './App.css';
import Dice from "./Dice"
import {useState,useEffect} from "react"
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'

function App() {

  const [allDices,setAllDices] = useState(allNewDice())

  const allDicesDisplay = allDices.map( dice => <Dice 
                                                    key={dice.id}
                                                    dice={dice}
                                                    holdDice={holdDice}
                                                    />)
  
  const [tenzies,setTenzies] = useState(false)                                        

  function allNewDice(){
    const arr=[];
    for(let i=0;i<10;i++){
      let randomNumber = Math.ceil(Math.random() * 6)
      arr.push({
        value:randomNumber,
        isHeld: false,
        id: nanoid()
    })
    }
    return arr
  }


  function holdDice(id){
    setAllDices( prevDice=> prevDice.map(dice=>{
      return dice.id===id ? {...dice,isHeld: !dice.isHeld} : dice
    })) 
  }

  function rollDices(){
    if(!tenzies){
      setAllDices( prevDice=> prevDice.map(dice=>{
        return dice.isHeld ? dice : {...dice,value:Math.ceil(Math.random() * 6)}
      }))
    }
    else{
        setTenzies(false)
        setAllDices(allNewDice())
    }
  }

  useEffect(()=>{
    let goalNumber = allDices[0].value
    let flag = true
    for(let i=0;i<10;i++){
      if(!allDices[i].isHeld || allDices[i].value!==goalNumber){
        flag=false
      }
    }

    if(flag){
      setTenzies(true)
    }
  },[allDices])


  return (
    <main>
      { tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='dice-container'>
        {allDicesDisplay}
      </div>
      <button onClick={rollDices} className="roll-btn">{tenzies ? "New Game" : "Rol"}</button>
    </main>
  );
}

export default App; 
