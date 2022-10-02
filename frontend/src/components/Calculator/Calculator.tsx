import React, { useState } from "react";
import "./style.css"
import { fetchSave } from "../../api";
import { fetchMemory } from "../../api/getShowRequest";


export const Calculator = () => {
    const [operator, setOperator] = useState("");
    const [currentInput, setCurrentInput] = useState("");
    const [prevInput, setPrevInput] = useState("");
    const [infoMessage, setInfoMessage] = useState("");

    const evaluate = (arr:string[]) =>{
        return eval(arr.join("")); 
    }
    
    const fixDecimalPlaces = (result: string) => {

       let fixedResult = parseFloat(result)
        
       if(fixedResult.toString().includes(".")){

        const splittedResult = fixedResult.toString().split(".")
        const decimals = splittedResult[1];
        
        let numToFix;
        if (decimals.length >= 4) {
            numToFix = 4
        }
        else{
            numToFix = decimals.length
        }
        return fixedResult.toFixed(numToFix);
       }
       else{
        return fixedResult.toString();
       }
    }

    const handleDigitClick = (e : React.MouseEvent<HTMLButtonElement>) => {
        setInfoMessage("");

        const btnValue = e.currentTarget.innerText;
        
        switch (btnValue) {
            case "0":
                if(currentInput.length  === 0)
                {
                    setCurrentInput(btnValue);
                }
                if (currentInput.length > 1 || currentInput[0] !== "0") {
                    setCurrentInput(currentInput + btnValue)
                }
                break;
            case ".":
                if(currentInput.length !== 0 && !currentInput.includes("."))
                {
                    setCurrentInput(currentInput + btnValue);
                }
                break;
            default:
                setCurrentInput(currentInput + btnValue);
                break;
        }

        if(currentInput.length  === 0 && btnValue === "0")
        {
            setCurrentInput(btnValue);
        }
    }
    const handleOperatorClick = (e : React.MouseEvent<HTMLButtonElement>) => {
        setInfoMessage("");
        const btnOperator = e.currentTarget.innerText;
        
        if (currentInput === "" && prevInput === "") {
            setOperator("");
        }
        if(prevInput === ""){
            setOperator(btnOperator);
            setPrevInput(currentInput);
            setCurrentInput("");
        }
        if(prevInput !== ""){
            if (operator !== "") {
                setOperator(btnOperator);
            }
            setPrevInput(fixDecimalPlaces(evaluate([prevInput,operator,currentInput])));
            setOperator(btnOperator);
            setCurrentInput("");
        }
    }

    const handleEvaluateClick = () => {
        setInfoMessage("");
        if (currentInput !== "") {
            setPrevInput(fixDecimalPlaces(evaluate([prevInput,operator,currentInput])));
        }
        else{
            setInfoMessage("You have not added number to the input field!")
        }
        setCurrentInput("");
        setOperator("");
    }

    const handleClearClick = (e : React.MouseEvent<HTMLButtonElement>) => {
        setInfoMessage("");
        setCurrentInput("");
        setPrevInput("");
        setOperator("");
    }

    const handleSaveClick = () =>{

        if (prevInput !== "") {
            setInfoMessage("");
        const body = { prevInput };
        
            fetchSave(body)
            .then((res) => {
                setInfoMessage(res.success);
            })
            .catch ((err) => {
                setInfoMessage(err.message);
            })
        }
        else{
            setInfoMessage(`Only the result field could be saved!
            \nPlease hit = before you start saving!`)
        }
        


    };
    const handleShowClick = () => {
        fetchMemory()
        .then((res) => {
            if(res.number){
                setPrevInput(res.number)
            }
        })
        .catch((err) => {
            setInfoMessage(err.message);
        })
    }
    
    return (
    
        <div className="calc-wrapper">
            <div className="info-box">{infoMessage}</div>
            <div className="calc-grid">
                    <div className="screen">
                        <div className="screen-title">Operation & result</div> 
                        <div className="previous-input">{prevInput} {operator}</div>
                        <div className="screen-title">Input</div> 
                        <div className="current-input">{currentInput}</div>
                    </div>
                    <button onClick={handleClearClick}>Clear</button>
                    <button onClick={handleSaveClick}>Save</button>
                    <button onClick={handleShowClick}>Memory</button>
                    <button onClick={handleOperatorClick}>/</button>
                    <button onClick={handleDigitClick}>7</button>
                    <button onClick={handleDigitClick}>8</button>
                    <button onClick={handleDigitClick}>9</button>
                    <button onClick={handleOperatorClick}>*</button>
                    <button onClick={handleDigitClick}>4</button>
                    <button onClick={handleDigitClick}>5</button>
                    <button onClick={handleDigitClick}>6</button>
                    <button onClick={handleOperatorClick}>+</button>
                    <button onClick={handleDigitClick}>1</button>
                    <button onClick={handleDigitClick}>2</button>
                    <button onClick={handleDigitClick}>3</button>
                    <button onClick={handleOperatorClick}>-</button>
                    <button onClick={handleDigitClick}>0</button>
                    <button onClick={handleDigitClick}>.</button>
                    <button onClick={handleEvaluateClick} className="col-2">=</button>
            </div>
        </div>          
    );
}