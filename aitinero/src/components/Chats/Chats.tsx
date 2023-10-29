import React, { useState, useEffect, useRef } from "react";
import "./Chats.scss";
import { useQuery, useMutation, useAction } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { EVENT_STATUS, TABLE_NAME } from '../../../convex/schema';
import { Id } from '../../../convex/_generated/dataModel';

interface Props {
  userResponse: string;
  botResponse: {
    purpose: string;
    message: string;
    options?: string[];
    sender: string;
  };
  sendUserResponse: string;
  optionClick: (ev: React.MouseEvent<HTMLElement>) => void;
  dayarray: {
            date: string;
            events: ({
                _id: Id<"events">;
                _creationTime: number;
                location?: string | undefined;
                description?: string | undefined;
                context?: string | undefined;
                title: string;
                duration: string;
                start_time: string;
                end_time: string;
                status: EVENT_STATUS;
            } | null)[];
        }[] | undefined
}

interface MessagesInfo {
  purpose?: string;
  message: string;
  options?: string[];
  sender: string;
}

interface History {
  role: "user" | "assistant" | "system",
  content: string
}

const Chats: React.FC<Props> = props => {
  const [messages, setMessages] = useState<MessagesInfo[]>([]);
  const [history, setHistory] = useState<History[]>([]);
  const dummyRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const chat = useAction(api.openai.chat)

  // stacking up messages
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          purpose: "introduction",
          message:
            "Hi there! Ask me any questions you'd like.",
          sender: "bot"
        }
      ]);
      setHistory([{
        role: 'assistant',
        content: "Hi there! Ask me any questions you'd like."
      }])
    } else {
      let tempArray = [...messages];
      let messageHistory = [...history];
      tempArray.push({ message: props.sendUserResponse, sender: "user" });
      setMessages(tempArray);
      messageHistory.push({ content: props.sendUserResponse, role: "user" });
      setHistory(messageHistory);

      const getResult = async () => {
        const res = await chat( {messageHistory: history, messageBody: props.sendUserResponse, messageContext: JSON.stringify(props.dayarray)} )
        console.log(res)
        var lastresponse = res[messageHistory.length].content

        console.log(lastresponse)

        if (lastresponse == null) {
          lastresponse = "Sorry, I was unable to understand that."
        }

        let temp2 = [...history];
          temp2.push({content: props.sendUserResponse, role: "user"});
          temp2.push({content: lastresponse, role: "assistant"});
          setHistory(temp2);
          let temp3 = [...messages];
          temp3.push({message: props.sendUserResponse, sender: "user"});
          temp3.push({message: lastresponse, sender: "bot"});
          setMessages(temp3);
      }

      getResult()

      

      //do the send and getting here
      
      
    }
  }, [props.sendUserResponse, props.botResponse]);

  // enable autoscroll after each message
  useEffect(() => {
    if (dummyRef && dummyRef.current && bodyRef && bodyRef.current) {
      bodyRef.current.scrollTo({
        top: dummyRef.current.offsetTop,
        behavior: "smooth"
      });
    }
  }, [messages]);

  return (
    <div className="message-container" ref={bodyRef}>
      {messages.map(chat => (
        <div key={chat.message}>
          <div className={`message ${chat.sender}`}>
            <p>{chat.message}</p>
          </div>
          {chat.options ? (
            <div className="options">
              <div>
                <i className="far fa-hand-pointer"></i>
              </div>
              {chat.options.map(option => (
                <p
                  onClick={e => props.optionClick(e)}
                  data-id={option}
                  key={option}
                >
                  {option}
                </p>
              ))}
            </div>
          ) : null}
          <div ref={dummyRef} className="dummy-div"></div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
