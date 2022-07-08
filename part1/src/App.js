
function App() {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  return (
    <div>
      <Header course={course} />
      <Content name={part1} num={exercises1}/>
      <Content name={part2} num={exercises2}/>
      <Content name={part3} num={exercises3}/>
      <Total num={exercises1 + exercises2 + exercises3}/>
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

function Content(props) {
  return (
    <div>
      <p>{props.name} {props.num}</p>
    </div>
  );
}

function Total(props) {
  return (
    <div>
      <p>Number of exercises {props.num}</p>
    </div>
  );
}

export default App;
