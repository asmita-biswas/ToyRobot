import { useRef, useState } from "react";
import './ToyRobot.css';
function ToyRobot() {
    const boxes = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
    const [positions,setPositions] = useState([...boxes]);
    const [error,setError] = useState(false);
    const [showMoveError, setShowMoveError] = useState(false);
    const [showCommand,setShowCommand] = useState(false);
    const [showReport,setShowReport] = useState(false);
    const [coordinate, setCoordinate] = useState({x:-1,y:-1});
    const [direction, setDirection] = useState('');
    const xrefValue = useRef();
    const yrefValue = useRef();
    const dirValue = useRef();
    
    function handleSubmit(event) {
        let x = parseInt(xrefValue.current.value);
        let y = parseInt(yrefValue.current.value);
        event.preventDefault();
        if(!x || !y || !dirValue.current || x>4 || x<0 ||y>4 || y<0){
            setError(true)
        }
        else{
            setError(false)
            setCoordinate({x:x,y:y})
            handlePositionUpdate(x,y);
            setShowCommand(true);
            setDirection(dirValue.current)
        }        
    }

    const handlePositionUpdate = (x,y) => {
        let updatedBoxes = [...boxes];
        updatedBoxes[x][y]=1;
        setPositions(updatedBoxes);
        setCoordinate({x:x,y:y})
    }

    function handleChange(event){
        setError(false);
        const {name,value} = event.target;
        dirValue.current = value;
    }

    function handleCommand(type){
        if(type === 'report'){
            setShowReport(true)
        }
        else if(type === 'left'){
            directionUpdateToLeft()
        }
        else if(type === 'right'){
            directionUpdateToRight()
        }
        else{
            moveRobot();
        }
    }

    const moveRobot =  () =>{
        let {x,y} = coordinate;
        if((x === 0 && direction==='NORTH') || (x===4 && direction === 'SOUTH') || (y===0 && direction==='WEST') || (y===4 && direction ==='EAST')){
            setShowMoveError(true)
        }
        else{
            setShowMoveError(false)
            if(direction === 'NORTH') {x=x-1}
            else if(direction === 'SOUTH') {x = x+1}
            else if(direction === 'EAST') {y=y+1}
            else if(direction === 'WEST') {y=y-1}
            handlePositionUpdate(x,y);           
        }
    }

    const directionUpdateToRight = () => {
        if(direction === 'EAST'){
            setDirection('SOUTH')
        }
        else if(direction === 'NORTH'){
            setDirection('EAST')
        }
        else if(direction === 'WEST'){
            setDirection('NORTH')
        }
        else{
            setDirection('WEST')
        }
    }

    const directionUpdateToLeft = () => {
        if(direction === 'EAST'){
            setDirection('NORTH')
        }
        else if(direction === 'NORTH'){
            setDirection('WEST')
        }
        else if(direction === 'WEST'){
            setDirection('SOUTH')
        }
        else{
            setDirection('EAST')
        }
    }

    const getDirectionIndicator = () => {
        switch (direction) {
          case 'NORTH':
            return '↑';
          case 'SOUTH':
            return '↓';
          case 'EAST':
            return '→';
          case 'WEST':
            return '←';
          default:
            return '';
        }
    }

    return (
        <div className="parentDiv">
            <div className="inputDiv">
                <div>
                <form className="formDiv" onSubmit={handleSubmit}>
                    <h4>Place The Robot On The Table:</h4>
                    <label>
                        <p>X coordinate(0-4):  <input className="inputField" name="xref" ref={xrefValue} type="text"  /></p>

                    </label>
                    <label>
                        <p>Y coordinate(0-4): <input className="inputField" name="yref" ref={yrefValue} type="text"  /></p>
                    </label>
                    <br />
                    <div>
                        <label>Direction: </label><br />
                        <input 
                            type="radio" 
                            id="north" 
                            name="direction" 
                            value="NORTH" 
                            onChange={handleChange} />
                        <label htmlFor="north">NORTH</label><br />
                        <input 
                            type="radio" 
                            id="south" 
                            name="direction" 
                            value="SOUTH" 
                            onChange={handleChange} 
                        />
                        <label htmlFor="south">SOUTH</label><br />
                        <input 
                            type="radio" 
                            id="east" 
                            name="direction" 
                            value="EAST" 
                            
                            onChange={handleChange} />
                        <label htmlFor="east">EAST</label><br />
                        <input 
                            type="radio" 
                            id="west" 
                            name="direction"  
                            value="WEST" 
                            
                            onChange={handleChange} />
                        <label htmlFor="west">WEST</label><br />
                    </div>
                    {error && <div className="errorDiv">Invalid Input values</div>}
                    <button type="submit" className=" submitButton">Place</button>
                </form>
                </div>
                <div className="command">
                    {showCommand && 
                    <>
                        <h4>Select your command:</h4>
                        <button className="commandButton" onClick={()=>handleCommand('move')}>Move</button>
                        <button className="commandButton" onClick={()=>handleCommand('left')}>Left </button>
                        <button className="commandButton" onClick={()=>handleCommand('right')}>Right</button>
                        <button className="commandButton" onClick={()=>handleCommand('report')}>Report</button>
                    </>}
                </div>
                <div className="command report">
                    {showReport && <><h4>REPORT:</h4>
                    <div>Position x: {coordinate.x}</div>
                    <span>Position y: {coordinate.y}</span>
                    <span>Direction: {direction}</span></>}
                </div>
            </div>
            <div className="tableDiv">
                <div>
                    {positions.map((row, rIndex) => {
                        return (
                            <div className="tableDivXaxis" key={rIndex}>
                                {row.map((col, cIndex) => { return (<div className={`squareDiv ${col === 1 ? 'robot' : ''}`} key={rIndex + ' ' + cIndex}>
                                    {col === 1 && getDirectionIndicator()}
                                </div>) })}
                            </div>)
                    })}
                </div>
                {showMoveError && <div className="moveErrorDiv"><h1>Cannot Move Ahead!!!</h1></div>}
            </div>
        </div>
    );
}

export default ToyRobot;
