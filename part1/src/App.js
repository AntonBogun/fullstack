
function applyToAll(arr, func) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = func(arr[i])
  }
}


function App() {
  const course = 'Half Stack application development'
  const parts = [
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
  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts}/>
    </div>
  );
}
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
      {parts.map(part => <Part part={part.name} exercises={part.exercises} />)}
    </div>
  );
}

function Part(props) {
  return (
    <div>
      <p>{props.part} {props.exercises}</p>
    </div>
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
