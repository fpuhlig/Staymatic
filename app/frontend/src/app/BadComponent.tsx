import React from 'react';

const TestComponent=({name,age}:{name:string;age:number})=>{
    const [count,setCount]=React.useState(0);
    
    const handleClick=()=>{
        setCount(count+1);
        console.log("Button clicked!");
    };
    
    return(
        <div className="test-component">
                    h1>Hello {name}!</h1>
                    <p>You are {age} years old.</p>
            <button onClick={handleClick}>
                Clicked {count} times
                    </button>
            <h1>Hello</h1>
        </div>
    );
};

export default TestComponent; 