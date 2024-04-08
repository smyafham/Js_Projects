import React, { useState } from 'react';
import './index.css';

function App() {
  // state
  const [weight, setWeight] = useState('');
  const [heightInches, setHeightInches] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [bmi, setBmi] = useState('');
  const [message, setMessage] = useState('');
  const [containerBackgroundColor, setContainerBackgroundColor] = useState('');

  const calcBmi = (event) => {
    event.preventDefault();

    if (weight === '' || heightInches === '' || age === '' || gender === '') {
      alert('Please enter all fields');
    } else {
      const heightSquared = Math.pow(parseInt(heightInches), 2);
      const bmi = (weight * 2.20462 / heightSquared) * 703; // BMI calculation formula
      setBmi(bmi.toFixed(1));

      // Logic for message and container background color
      if (bmi < 18.5) {
        setMessage('You are underweight');
        setContainerBackgroundColor('red');
      } else if (bmi >= 18.5 && bmi < 25) {
        setMessage('You are healthy');
        setContainerBackgroundColor('green');
      } else {
        setMessage('You are overweight');
        setContainerBackgroundColor('red');
      }
    }
  };

  // Calculate recommended protein intake based on BMI, age, and gender
  const calculateProteinIntake = () => {
    let proteinIntake = 0;
    if (bmi < 18.5) {
      proteinIntake = 2.2 * weight; // Base recommendation for underweight individuals
    } else if (bmi >= 18.5 && bmi < 25) {
      proteinIntake = 2 * weight; // Base recommendation for healthy weight individuals
    } else {
      proteinIntake = 1.8 * weight; // Base recommendation for overweight individuals
    }

    // Adjust protein intake based on age and gender
    if (age >= 18) {
      if (gender === 'male') {
        proteinIntake += 20; // Additional recommendation for adult males
      } else if (gender === 'female') {
        proteinIntake += 15; // Additional recommendation for adult females
      }
    }

    return proteinIntake.toFixed(1);
  };

  const reload = () => {
    window.location.reload();
  };

  return (
    <div className="app">
      <div className="container" style={{ backgroundColor: containerBackgroundColor }}>
        <h2 className="center">BMI Calculator</h2>
        <form onSubmit={calcBmi}>
          <div>
            <label>Weight (Kgs)</label>
            <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
          </div>
          <div>
            <label>Height (Inches)</label>
            <input type="number" value={heightInches} onChange={(e) => setHeightInches(e.target.value)} />
          </div>
          <div>
            <label>Age</label>
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
          </div>
          <div>
            <label>Gender</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <button className="btn" type="submit">
              Submit
            </button>
            <button className="btn btn-outline" onClick={reload} type="button">
              Reload
            </button>
          </div>
        </form>

        <div className="center">
          <h3>Your BMI is: {bmi}</h3>
          <p>{message}</p>
          <p>Recommended Protein Intake: {calculateProteinIntake()} grams per day</p>
        </div>
      </div>
    </div>
  );
}

export default App;
