import React, { useState, useEffect } from 'react';
import OtherComponenet from 'RELATIVE_PATH_TO_COMPONENET';

/**
 * This will describe the class you are working on
 * @param {PROP1_TYPE} prop1 the first prop 
 * @param {PROP2_TYPE} prop2 the second prop
 * @param {object} rest notice the ... is how we copy all of the elements from an object to a new one
 */
const Template = ({ prop1, prop2, ...rest }) => {

    // Remember this should have a type in the useState section like useState('');
    // I left it blank just as a template
    const [exampleState, setExampleState] = useState();
    const [exampleArray, setExampleArray] = useState([]);

    /**
     * Runs the first time this component is called
     */
    useEffect(() => {

    }, []);

    /**
     * Runs everytime exampleState OR exampleArray is updated
     * You can put 1, 2, 3... state variables in those brackets
     */
    useEffect(() => {
        // this is how you copy all of the elements of an exampleArray
        let copyOfExampleArray = [...exampleArray];
        // this doesn't have to be a string obviously
        copyOfExampleArray.push("New element");
        setExampleArray(copyOfExampleArray);

        // NOTE! THIS DOESN'T WORK  
        //setExampleArray(exampleArray.push("New element"));

    }, [exampleState, exampleArray]);


    /**
     * This is a template arrow function and is how your functions should be written
     * @param {ARGUMENT TYPE GOES HERE} args this is where the parameters for the function go, obviously add more if needed
     * @returns fill this in if the function returns something
     */
    const templateFunction = (args) => {
        // This is how you update the Example State Variable
        // simply saying exampleState = ... will not actually update the state variable
        setExampleState();
    }

    /**
     * This is a function that handles a button click and how you call it
     * Typically, you call these "handle..."
     * @param {MouseInput<HTMLButtonElement>} event 
     */
    const handleButtonClickFunction = (event) => {
        const buttonValue = event.target.value; // this would be BUTTON_VALUE at this point
    }

    return (
        // In-line styles are written like this, try to avoid them
        <div style={{ display: 'flex' }} className="template-wrapper">

            {`This is how you write a string with a variable inside without using +: ${exampleState}`}

            {/* Use this if you don't have an alternative JSX to render if boolean is false */}
            {true && <div>Some JSX to render when boolean expression is true</div>}

            {/* Use this if you HAVE an alternative JSX to render if boolean is false */}
            {false ? (
                <div>Rendered if boolean expression is true (It isn't right now, it is just hardset to false)</div>
            ) : (
                <div>Rendered if boolean expression is false</div>
            )}

            {/* This is how you call a different component you wrote and pass it a prop exampleProp */}
            <OtherComponenet exampleProp={exampleState} />

            {/* This is how you traverse an array of elements and dynamically display all of them */}
            {/* element is just a variable name for each element, think of this like a restructed for each loop */}
            {exampleArray.map(element => (
                <div>{element}</div>
            ))}

            {/* 
                This is a fairly standard way of calling a React Button function
                it will automatically be passed event 
            */}
            <button onClick={handleButtonClickFunction} value="BUTTON_VALUE">Button Name</button>

            {/* 
                This is the same thing, sometimes you will have to write onClick functions like this.
                If you get a Call Stack Called too many times and it is pointing towards a button that
                is written like the one above, try changing it to this, you don't need to put in the parameters
            */}
            <button onClick={(e) => handleButtonClickFunction(e)}></button>
        </div>
    )
}

export default Template;