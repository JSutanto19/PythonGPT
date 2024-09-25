import '../styles/teacherList.css';
// import img1 from '../assets/pic1.jpeg';
import { BiChat } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

const QuestionList = ({teachersData, mode}) => {
  const [teachers, setTeachers] = useState(teachersData); // State to manage teachers list
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState('title');
  

  const sortTeachers = (order) => {
    if (order === 'date') {
      // Example sorting (needs real date or timestamp)
      setTeachers([...teachersData].sort((a, b) => a.duration.length - b.duration.length)); // Dummy sort condition
    } else {
      // Default sort by name
      setTeachers([...teachersData].sort((a, b) => a.name.localeCompare(b.name)));
    }
  };

  const handleSortChange = (event) => {
    const newSortOrder = event.target.value;
    setSortOrder(newSortOrder);
    sortTeachers(newSortOrder);
  };

  
  const answerClick = (questionStr) => {
    navigate('/forum', { state: { question: questionStr } });
  };

  return (
    <div className='teacher--list'>
      <div className="list--header">
         {mode !== 'class'? <h2>Your Questions</h2>:<h2 style={{fontWeight:'bold', fontSize:20}}>Class Questions</h2>}
          <select value={sortOrder} onChange={handleSortChange}>
              <option value='title'>Title</option>
              <option value='date'>Latest</option>
          </select>
      </div>
      <div className="list--container">
          {teachersData.map((item, index) => (
              <div className='list' key={index}>
                  <div className='teacher--detail'>
                      <img src={item.image} alt={item.name}/>
                      <h2>{item.name}</h2>
                  </div>
                  <span className='duration--text'>{item.duration}</span>
                  <button className='answer-button' onClick={() => answerClick(item.duration)}>
                      Answer <BiChat style={{ marginLeft: '5px', fontSize: '20px' }} />
                  </button>
              </div>
          ))}
      </div>
    </div>
  );
};

export default QuestionList;


