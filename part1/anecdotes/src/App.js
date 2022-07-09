import {useState} from 'react';
function applyToAll(arr, func) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = func(arr[i])
  }
}

// final result:
// <h1>Anecdote of the day</h1>
// random anecdote
// has *n* votes
// button to vote, button to next anecdote (random)
// <h1>Anecdote with most votes</h1>
// if exists: anecdote with most votes
// has *n* votes
// if all zero: <p>No anecdotes have been voted for yet</p>

function App() {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0, 0])
  const [mostVotes, setMostVotes] = useState(0)
  const [mostVotesIndex, setMostVotesIndex] = useState(0)
  const updateVote = () => {
    const newVotes = [...votes]
    newVotes[selected]+=1
    setVotes(newVotes)
    if (newVotes[selected] > mostVotes) {
      setMostVotes(newVotes[selected])
      setMostVotesIndex(selected)
    }
  }
  const nextAnecdote = () => {
    const newSelected = Math.floor(Math.random() * anecdotes.length)
    setSelected(newSelected)
  }
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}<br/>has {votes[selected]} votes</p>
      <button onClick={updateVote}>vote</button>
      <button onClick={nextAnecdote}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <MostVotes anecdote={anecdotes[mostVotesIndex]} votes={mostVotes} />
    </div>
  )
}

function MostVotes({anecdote, votes}) {
  if (votes === 0) {
    return <p>No anecdotes have been voted for yet</p>
  }
  return (
    <div>
      <p>{anecdote}<br/>has {votes} votes</p>
    </div>
  )
}

export default App;
