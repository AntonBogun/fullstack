{/* Course component:
<h2>{course}</h2>
<p>
  {part_n} {exercises_n}
</p>
...
<p>total of {exercises_sum} exercises</p> */}



function Header(props) {
    return (
      <div>
        <h2>{props.course}</h2>
      </div>
    );
  }
  
  function Content({parts}){
    return (
      <div>
        {parts.map(part => <Part key={part.id} part={part.name} exercises={part.exercises} />)}
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
        <p><b>total of {parts.reduce((carry, part) => carry + part.exercises, 0)} exercises</b></p>
    );
  }
  
  function Course({course}) {
    return (
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    );
  }

export default Course;