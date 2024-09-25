import img1 from '../assets/ans1.jpeg'
import img2 from '../assets/ans2.jpeg'

const Chat_History = [
    {
      type: "msg",
      message: "What are variables in python?",
      incoming: false,
      outgoing: true,
    },
    {
      type: "msg",
      subtype: "img",
      message: "In Python, variables are symbolic names that reference or point to data stored in memory. They are used to hold values or information that may change during the execution of a program. A variable in Python is created by assigning a value to it using the assignment operator `=`. Python is dynamically typed, which means you do not need to declare the type of the variable when you create it. Python figures out the variable type based on the value assigned to it. Variables can store different types of data, such as numbers, strings, lists, dictionaries, functions, and more. They are case-sensitive and should start with a letter or underscore. The relevant timestamps are in 3:21 and 4:18 in Lecture 4",
      img: [img1],
      img2: [img2],
      incoming: true,
      outgoing: false,
    },
  ];

  export{Chat_History}