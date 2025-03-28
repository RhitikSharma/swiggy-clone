// LiveChat.js

import React, { useEffect } from "react";
import "./LiveChat.css"; // Add your custom styles for the live chat button

const LiveChat = () => {
  useEffect(() => {
    // Ensure that the Dialogflow Messenger script is loaded
    const script = document.createElement("script");
    script.src = "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="live-chat">
      <df-messenger
        chat-title="SwiggyChatBot"
        agent-id="2040a2a1-00e6-42b3-9b55-79bf17df654f"
        language-code="en"
      ></df-messenger>
    </div>
  );
};

export default LiveChat;
