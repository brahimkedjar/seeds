import { useEffect, useState } from 'react';
import React from 'react';
import avatarIcon from '../img/avatar.jpg';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';



const useStyles = makeStyles({
  chatbotContainer: {
    position: 'fixed',
    bottom: 60,
    right: 20,
    width: 300,
    height: 400,
    border: '1px solid #ccc',
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    transition: 'transform 0.3s ease',
    transform: 'translateX(100%)',
    '&.open': {
      transform: 'translateX(0)',
      opacity: 0,
    animation: '$fadeIn 1s ease-in-out forwards',
    },
  },
  chatbotMessages: {
    flex: 1,
    padding: 16,
    overflow: 'auto',
  },
  chatbotInput: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '10px',
  },
  input: {
    flex: '1',
    padding: '8px',
    border: 'none',
    borderRadius: '4px',
    marginRight: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    outline: 'none',
  },
  sendButton: {
    backgroundColor: '#4caf50',
    color: 'white',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    outline: 'none',
  },
  chatbotIcon: {
    position: 'fixed',
    bottom: 10,
    right: 20,
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: '50%',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0,
    animation: '$fadeIn 1s ease-in-out forwards',
  },
  chatbotIconImg: {
    borderRadius:"30px",
    maxWidth: '100%',
    maxHeight: '100%',
    opacity: 0,
    animation: '$fadeIn 1s ease-in-out forwards',
  },
  '@keyframes fadeIn': {
    '0%': {
      opacity: 0,
    },
    '100%': {
      opacity: 1,
    },
  },
  message: {
    // Styles for the chatbot messages
    backgroundColor: '#fff',
    padding: '10px 20px',
    borderRadius: '10px',
    marginBottom: '10px',
  },
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    height: '100vh',
    display: 'flex', // Adjustments for the left navbar
    alignItems: 'flex-start', // Aligns the profile with the navbar
  },
  profile: {
    display: 'flex',
    flexWrap: 'wrap',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0px 0px 40px rgba(0, 0, 0, 0.3)',
    backgroundColor: '#fff',
    flex: '1', // Takes remaining space next to the navbar
    marginLeft: '20px', // Creates space between navbar and profile
  },
  image: {
    width: '40%',
    height: '400px',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    '& img': {
      borderRadius: '30px',
      maxWidth: '100%',
      maxHeight: '100%',
      borderRadius: '20px',
      objectFit: 'cover',
      boxShadow: '0px 0px 40px rgba(0, 0, 0, 0.3)',
      transition: 'transform 0.5s ease-in-out',
    },
    '&:hover img': {
      transform: 'scale(1.1)',
    },
  },
  info: {
    width: '60%',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
    '& h2': {
      margin: '0 0 20px',
      fontSize: '2.3rem',
      fontWeight: '600',
      color: '#333',
      textTransform: 'uppercase',
      textShadow: '2px 2px 0px rgba(0, 0, 0, 0.1)',
    },
    '& div': {
      marginBottom: '10px',
      color: '#555',
      fontSize: '1.2rem',
      lineHeight: '1.5',
      '& .label': {
        fontWeight: 'bold',
        color: '#888',
        marginRight: '10px',
      },
    },
  },
  buttoncontainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '20px',
  },
  modify: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#70a5d7',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    borderRadius: '50px',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    '&:hover': {
      backgroundColor: '#537b8a',
    },
  },
  delete: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff6f69',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    borderRadius: '50px',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in',
    marginLeft: '10px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    '&:hover': {
      backgroundColor: '#c94c4c',
    },
  },
  '@media only screen and (max-width:768px)': {
    profile: {
    flexDirection: 'column',
    alignItems: 'center',
    },
    image: {
    width: '100%',
    height: 'auto',
    },
    info: {
    width: '100%',
    textAlign: 'center',
    },
  }
}
)





function DoctorAccount(props) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const sendMessage = async () => {
    if (inputValue.trim() === '') return;

    const newMessage = {
      role: 'user',
      content: inputValue
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputValue('');

    // Check if the message is related to healthcare
    const isHealthcareQuestion = checkIfHealthcareQuestion(inputValue); // Implement this function

    if (isHealthcareQuestion) {
      try {
        const response = await axios.post('/api/chatbot', { message: inputValue });
        const chatbotReply = response.data;

        const newReplyMessage = {
          role: 'chatbot',
          content: chatbotReply
        };

        setMessages((prevMessages) => [...prevMessages, newReplyMessage]);
      } catch (error) {
        // Handle error
      }
    } else {
      // Handle non-healthcare questions differently
      // For example, display a message saying the chatbot only responds to healthcare questions
      const nonHealthcareReplyMessage = {
        role: 'chatbot',
        content: "I'm sorry, but I can only answer healthcare-related questions."
      };

      setMessages((prevMessages) => [...prevMessages, nonHealthcareReplyMessage]);
    }
  };
  /*const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const sendMessage = async () => {
    if (inputValue.trim() === '') return;

    const newMessage = {
      role: 'user',
      content: inputValue
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputValue('');

    try {
      const response = await axios.post('/api/chatbot', { message: inputValue });
      const chatbotReply = response.data;

      const newReplyMessage = {
        role: 'chatbot',
        content: chatbotReply
      };

      setMessages((prevMessages) => [...prevMessages, newReplyMessage]);
    } catch (error) {
    }
  };*/
  const checkIfHealthcareQuestion = (message) => {
    // List of healthcare-related keywords or phrases
    const healthcareKeywords = [
      'health',
      'healthcare',
      'medical',
      'medicine',
      'doctor',
      'physician',
      'nurse',
      'hospital',
      'clinic',
      'pharmacy',
      'surgery',
      'diagnosis',
      'treatment',
      'symptom',
      'disease',
      'condition',
      'vaccine',
      'prescription',
      'medication',
      'emergency',
      'injury',
      'rehabilitation',
      'wellness',
      'nutrition',
      'mental health',
      'therapy',
      'cancer',
      'cardiology',
      'dermatology',
      'pediatrics',
      'obstetrics',
      'gynecology',
      'orthopedics',
      'urology',
      'neurology',
      'ophthalmology',
      'otolaryngology',
      'radiology',
      'allergy',
      'asthma',
      'diabetes',
      'hypertension',
      'cholesterol',
      'stroke',
      'heart',
      'lungs',
      'kidney',
      'liver',
      'digestive',
      'immune',
      'skeletal',
      'muscular',
      'skin',
      'eyes',
      'ears',
      'nose',
      'throat',
      'x-ray',
      'ultrasound',
      'mri',
      'ct scan',
      'blood test',
      'vital signs',
      'appointment',
      'insurance',
      'coverage',
      'claim',
      'policy',
      'benefits',
      'emergency contact',
      'first aid'
    ];
    // Convert the message to lowercase for case-insensitive matching
    const lowercaseMessage = message.toLowerCase();

    // Check if any of the healthcare keywords are present in the message
    const isHealthcareQuestion = healthcareKeywords.some(keyword => lowercaseMessage.includes(keyword));

    return isHealthcareQuestion;
  };
  const { doctorData } = props;
  const saveImageToBackend = async () => {
    const url = 'http://localhost:3000/api/v1/user_images_web';
    const userId = doctorData.doctor_data.id;

    // Create a FormData object and append the image file and user ID to it
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('user_id', userId.toString());

    // Send the request and handle the response
    try {
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200 || response.status === 201) {
        const responseBody = response.data;
        const userImageId = responseBody.id;
        localStorage.setItem('user_image_id', userImageId);
        setImageUrl(responseBody.image_url);
        localStorage.setItem(`doctor_image_${userId}`, responseBody.image_url);
      } else {
      }
    } catch (error) {
    }
  };

  // Inside your React component
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
    saveImageToBackend();
  };


  const classes = useStyles();

  const [editable, setEditable] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    specialite: doctorData.doctor_data.specialite,
    address: doctorData.doctor_data.address,
    phone_number: doctorData.doctor_data.phone_number,
  });

  useEffect(() => {
  }, [doctorData]);

  const handleModify = () => {
    setEditable(true);
  };

  const handleSave = () => {
    setEditable(false);
    // TODO: Update the fields with the updatedData
  };

  if (!doctorData) {
    return <div>Loading...</div>;
  }
  const [isChatOpen, setIsChatOpen] = useState(false);

  const openChat = () => {
    setIsChatOpen(true);
  };

  const closeChat = () => {
    setIsChatOpen(false);
  };


  return (
    <div className={classes.container}>
    <div className={classes.profile}>
    <div className={classes.image}>
          <img
            src={doctorData.image_url || avatarIcon}
            alt="doctor"
            onClick={() => document.getElementById('fileInput').click()}
            style={{ cursor: 'pointer' }}
          />
        </div>
        <input
          type="file"
          id="fileInput"
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
        <div className={classes.info}>
          <h2>Dr. {doctorData.doctor_data.name}</h2>
          <div>
            <span className={classes.label}>Spécialité:</span> {editable ? (
              <input
                type="text"
                value={updatedData.specialite}
                onChange={(e) =>
                  setUpdatedData({ ...updatedData, specialite: e.target.value })
                }
              />
            ) : (
              doctorData.doctor_data.specialite
            )}
          </div>
          <div>
            <span className={classes.label}>Address:</span> {editable ? (
              <input
                type="text"
                value={updatedData.address}
                onChange={(e) =>
                  setUpdatedData({ ...updatedData, address: e.target.value })
                }
              />
            ) : (
              doctorData.doctor_data.address
            )}
          </div>
          <div>
            <span className={classes.label}>numéro clinique:</span> {editable ? (
              <input
                type="text"
                value={updatedData.phone_number}
                onChange={(e) =>
                  setUpdatedData({ ...updatedData, phone_number: e.target.value })
                }
              />
            ) : (
              doctorData.doctor_data.phone_number
            )}
          </div>
          <div className={classes.buttoncontainer}>
            <button className={classes.modify} onClick={editable ? handleSave : handleModify}>
              {editable ? 'Sauvgader' : 'Modifier'}
            </button>
          </div>
        </div>
      </div>
      <div className={`${classes.chatbotContainer} ${isChatOpen ? 'open' : ''}`}>
        <div className={classes.chatbotMessages}>
          {messages.map((message, index) => (
            <div key={index} className={`message message-${message.role} ${classes.message} ${message.role === 'user' ? classes.userMessage : ''}`}>
              {message.content}
            </div>
          ))}
        </div>
        <div className={classes.chatbotInput}>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            className={classes.input}
            placeholder="Type a message..."
          />
          <button onClick={sendMessage} className={classes.sendButton}>Send</button>
        </div>
      </div>
      <div className={classes.chatbotIcon} onClick={isChatOpen ? closeChat : openChat}>
        <img
          src="https://www.techopedia.com/wp-content/uploads/2023/03/6e13a6b3-28b6-454a-bef3-92d3d5529007.jpeg"
          alt="Chatbot"
          className={classes.chatbotIconImg}
        />
      </div>
    </div>

  );
}

export default DoctorAccount;
