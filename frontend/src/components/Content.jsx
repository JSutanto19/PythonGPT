import React from 'react'
import ContentHeader from './ContentHeader'
import Card from './Card'
import QuestionList from './QuestionList'
import '../styles/content.css'
import img1 from '../assets/pic1.jpeg';

//create component above 
//create button above your questions

const teachersData2 = [
  {
    image: img1,
    name: 'John Doe',
    duration: 'What are variables in Python?',
    cost: '100',
  },
  {
    image: img1,
    name: 'John Doe',
    duration: 'How do I use a for loop in Python to iterate over a list?',
    cost: '100',
  },
  {
    image: img1,
    name: 'John Doe',
    duration: 'How many late days do we have for the course homeworks?',
    cost: '100',
  },
];

const Content = () => {
  return (
    <div className='content'>
        <ContentHeader/>
        <Card/>
        {/* add question button */}
        <QuestionList teachersData={teachersData2}/>
    </div>
  )
}

export default Content