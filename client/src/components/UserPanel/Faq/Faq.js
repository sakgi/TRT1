// import React, { useState } from 'react';
// import './Faq.css'; // Import the styling

// const FAQ = () => {
//   const [selectedCategory, setSelectedCategory] = useState('Software'); // State to track the selected category
//   const [selectedQuestion, setSelectedQuestion] = useState(null); // State to track the selected question

//   const toggleQuestion = (index) => {
//     if (selectedQuestion === index) {
//       setSelectedQuestion(null);
//     } else {
//       setSelectedQuestion(index);
//     }
//   };

//   // FAQ data for each category
//   const faqData = {
//     Software: [
//       'How to Change Password',
//       'How to Change Name and Email Address',
//     ],
//     Hardware: [
//       'How to Change Name and Email Address',
//       'How to Fix Hardware Issues',
//     ],
//   };

//   return (
//     <div className="faq-wrapper">
//       {/* Sidebar */}
//       <div className="faq-nav">
//         <h3>Categories</h3>
//         <p onClick={() => setSelectedCategory('Software')} className={selectedCategory === 'Software' ? 'active-category' : ''}>
//           Software
//         </p>
//         <p onClick={() => setSelectedCategory('Hardware')} className={selectedCategory === 'Hardware' ? 'active-category' : ''}>
//           Hardware
//         </p>
//       </div>

//       {/* FAQ Content */}
//       <div className="faq-details">
//         {faqData[selectedCategory].map((question, i) => (
//           <div key={i} className="faq-item">
//             <div
//               className="faq-query"
//               onClick={() => toggleQuestion(i)}
//             >
//               {question}
//               <span className={selectedQuestion === i ? 'open' : ''}>{selectedQuestion === i ? '−' : '+'}</span>
//             </div>
//             {selectedQuestion === i && (
//               <div className="faq-response">
//                 <p>
//                   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisis facilisi purus dictumst pharetra quisque ex rutrum imperdiet.
//                 </p>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FAQ;

import React, { useState } from 'react';
import './Faq.css'; // Import the styling

const FAQ = () => {
  const [selectedCategory, setSelectedCategory] = useState('Software'); // State to track the selected category
  const [selectedQuestion, setSelectedQuestion] = useState(null); // State to track the selected question

  const toggleQuestion = (index) => {
    if (selectedQuestion === index) {
      setSelectedQuestion(null);
    } else {
      setSelectedQuestion(index);
    }
  };

  // FAQ data for each category
  const faqData = {
    Software: [
      'How to Change Password',
      'How to Change Name and Email Address',
      'How to Change Password',
      'How to Change Name and Email Address',
      'How to Change Password',
      'How to Change Name and Email Address',
      'How to Change Password',
      'How to Change Name and Email Address',
      'How to Change Password',
      'How to Change Name and Email Address',
      'How to Change Password',
      'How to Change Name and Email Address',
      'How to Change Password',
      'How to Change Name and Email Address',
      'How to Change Password',
      'How to Change Name and Email Address',
      'How to Change Password',
      'How to Change Name and Email Address',
      'How to Change Password',
      'How to Change Name and Email Address',
      'How to Change Password',
      'How to Change Name and Email Address',
      'How to Change Password',
      'How to Change Name and Email Address',
    ],
    Hardware: [
      'How to Change Name and Email Address',
      'How to Fix Hardware Issues',
    ],
    Guidelines: [
      'What are the guidelines for submitting a ticket?',
      'How to report issues effectively?',
    ],
    Network: [
      'How to troubleshoot network issues?',
      'What to do if the internet is down?',
    ],
  };

  return (
    <div className="faq-wrapper">
      {/* Sidebar */}
      <div className="faq-nav">
        <h3>Categories</h3>
        <p onClick={() => setSelectedCategory('Guidelines')} className={selectedCategory === 'Guidelines' ? 'active-category' : ''}>
          Guidelines
        </p>
        <p onClick={() => setSelectedCategory('Software')} className={selectedCategory === 'Software' ? 'active-category' : ''}>
          Software
        </p>
        <p onClick={() => setSelectedCategory('Hardware')} className={selectedCategory === 'Hardware' ? 'active-category' : ''}>
          Hardware
        </p>
        <p onClick={() => setSelectedCategory('Network')} className={selectedCategory === 'Network' ? 'active-category' : ''}>
          Network
        </p>
      </div>

      {/* FAQ Content */}
      <div className="faq-details">
        {faqData[selectedCategory].map((question, i) => (
          <div key={i} className="faq-item">
            <div
              className="faq-query"
              onClick={() => toggleQuestion(i)}
            >
              {question}
              <span className={selectedQuestion === i ? 'open' : ''}>{selectedQuestion === i ? '−' : '+'}</span>
            </div>
            {selectedQuestion === i && (
              <div className="faq-response">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisis facilisi purus dictumst pharetra quisque ex rutrum imperdiet.
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
