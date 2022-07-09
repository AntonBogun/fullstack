import {useState} from 'react';
function applyToAll(arr, func) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = func(arr[i])
  }
}

// final result:
// <h1>give feedback</h1>
// buttons: good, neutral, bad
// <h1>statistics</h1>
// if none: <p>No feedback given</p>
// if some: table of:
// good, amount
// neutral, amount
// bad, amount
// total, amount
// average, value (1,0,-1 for good, neutral, bad)
// positive, %



function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  // total and average are calculated on the spot
  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
}

// enum for StatisticsLine to handle percentages
const Feedback = {
  VALUE:0,
  PERCENTAGE:1
}

function Statistics({good, neutral, bad}) {
  const total = good + neutral + bad;
  if (total === 0) {
    return <p>No feedback given</p>
  }
  const average = (good - bad) / total;
  const positive = good / total;
  return (
    <table>
      <tbody>
        <StatisticsLine text="good" value={good} type={Feedback.VALUE} />
        <StatisticsLine text="neutral" value={neutral} type={Feedback.VALUE} />
        <StatisticsLine text="bad" value={bad} type={Feedback.VALUE} />
        <StatisticsLine text="total" value={total} type={Feedback.VALUE} />
        <StatisticsLine text="average" value={average} type={Feedback.VALUE} />
        <StatisticsLine text="positive" value={positive*100} type={Feedback.PERCENTAGE} />
      </tbody>
    </table>
  );
}

function StatisticsLine({text, value, type}) {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}{type === Feedback.PERCENTAGE ? ' %' : ''}</td>
    </tr>
  );
}


export default App;
