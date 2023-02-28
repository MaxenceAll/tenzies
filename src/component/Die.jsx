

function Die(props) {
    return ( 
        <div 
            className={props.isHeld ? "isHeld die-face" : "die-face"}
            onClick={props.holdDice}
        >

            <h2 className="die-num">
                {props.value}
            </h2>


        </div>
     );
}

export default Die;