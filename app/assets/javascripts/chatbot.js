  function sendMessage() {
    var inputValue = document.getElementById('inputValue').value.trim();
    if (inputValue === '') return;

    var newMessage = {
      role: 'user',
      content: inputValue
    };

    var messagesContainer = document.getElementsByClassName('chatbot-messages')[0];
    var newMessageElement = document.createElement('div');
    newMessageElement.className = 'message message-user';
    newMessageElement.textContent = inputValue;
    messagesContainer.appendChild(newMessageElement);

    document.getElementById('inputValue').value = '';

    axios.post('/api/chatbot', { message: inputValue })
      .then(function(response) {
        var chatbotReply = response.data;

        var newReplyMessage = {
          role: 'chatbot',
          content: chatbotReply
        };

        var newReplyMessageElement = document.createElement('div');
        newReplyMessageElement.className = 'message message-chatbot';
        newReplyMessageElement.textContent = chatbotReply;
        messagesContainer.appendChild(newReplyMessageElement);
      })
      .catch(function(error) {
        console.error(error);
      });
  }

  function toggleChat() {
    var chatbotContainer = document.getElementsByClassName('chatbot-container')[0];
    var chatbotIcon = document.getElementsByClassName('chatbot-icon')[0];

    if (chatbotContainer.classList.contains('open')) {
      chatbotContainer.classList.remove('open');
    } else {
      chatbotContainer.classList.add('open');
    }
  }
    $(document).ready(function() {
      // Smooth scrolling when clicking on the "Rejoignez-Nous" link
      $("#rejoignez-nous-link").click(function(e) {
        e.preventDefault(); // Prevent default link behavior

        // Scroll smoothly to the target element
        $("html, body").animate({
          scrollTop: $("#rejoignez-nous").offset().top
        }, 500); // Adjust the animation speed as needed
      });
    });

    $(document).ready(function() {
      // Smooth scrolling when clicking on the "Rejoignez-Nous" link
      $("#contact-link").click(function(e) {
        e.preventDefault(); // Prevent default link behavior

        // Scroll smoothly to the target element
        $("html, body").animate({
          scrollTop: $("#contacte").offset().top
        }, 500); // Adjust the animation speed as needed
      });
    });

    $(document).ready(function() {
      // Smooth scrolling when clicking on the "Rejoignez-Nous" link
      $("#Nous-services-link").click(function(e) {
        e.preventDefault(); // Prevent default link behavior

        // Scroll smoothly to the target element
        $("html, body").animate({
          scrollTop: $("#Nous-services").offset().top
        }, 500); // Adjust the animation speed as needed
      });
    });
