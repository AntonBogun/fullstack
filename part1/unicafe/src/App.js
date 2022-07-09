import {useState} from 'react';
function applyToAll(arr, func) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = func(arr[i])
  }
}


function App() {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts}/>
      {/* <Testing /> */}
    </div>
  );
}
function Testing() {
  return (
    <div>
      <Timer />
      <Timer2 />
      <Timer3 />
      {/* <Timer4 /> */}
      {/* desync by 1 second every 25 secs, or extremely quickly when not visible */}
    </div>
  );
}

function Timer() {
  const [time, setTime] = useState(0);
  setTimeout(() => setTime(time + 1), 1000);
  return (
    <div>
      <h1>{time}</h1>
    </div>
  );
}
function Timer2() {
  const [time, setTime] = useState(0);
  setTimeout(() => setTime(time + 0.1), 100);
  return (
    <div>
      {/*format time to 1 decimal*/}
      <h1>{time.toFixed(1)}</h1>
    </div>
  );
}
function Timer3() {
  const [time, setTime] = useState(0);
  const [time2, setTime2] = useState(0);//it knows??
  setTimeout(() => {setTime(time + 3); setTime2(time2 + 4)}, 2000);
  return (
    <div>
      <h2>{time}, {time2}</h2>
    </div>
  );
}

//React Hook "useState" is called conditionally. React Hooks must be called in the exact same order in every component render  react-hooks/rules-of-hooks
//now I see how it knows.
// function Timer4() {
//   const [state, setState] = useState(0);
//   if (state === 0) {
//     const [time, setTime] = useState(0);
//     const [time2, setTime2] = useState(0);
//   }else{
//     const [time2, setTime2] = useState(0);
//     const [time, setTime] = useState(0);
//   }
//   setTimeout(() => {setState((state + 1)%2); setTime(time + Math.PI); setTime2(time2 + Math.E)}, 1000);
//   return (
//     <div>
//       {/*format to 3 decimals*/}
//       <h3>{time.toFixed(3)}, {time2.toFixed(3)}</h3>
//     </div>
//   );
// }
{/* <h1>{course}</h1>
<p>
  {part1} {exercises1}
</p>
<p>
  {part2} {exercises2}
</p>
<p>
  {part3} {exercises3}
</p>
<p>Number of exercises {exercises1 + exercises2 + exercises3}</p> */}

function Header(props) {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  );
}

function Content({parts}){
  return (
    <div>
      {parts.map(part => <div key={part.name}><Part part={part.name} exercises={part.exercises} /> </div>)}
      {/* notice the key attribute, which is a unique identifier for each element in an array. */}
    </div>
  );
}

function Part(props) {
  return (
      <p>{props.part} {props.exercises}</p>
  );
}


function Total({parts}) {
  return (
    <div>
      <p>Number of exercises {parts.reduce((carry, part) => carry + part.exercises, 0)}</p>
    </div>
  );
}

export default App;
