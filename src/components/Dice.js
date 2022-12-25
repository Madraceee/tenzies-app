import "./Dice.css"

export default function Dice(props){
    const styles={
        backgroundColor: props.dice.isHeld ? "#59E391" : "#ffffff"
    }
    return(
        <div className="dice" style={styles} onClick={()=> props.holdDice(props.dice.id)}>
            <h3>{props.dice.value}</h3>
        </div>
    )
}