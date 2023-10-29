import React, { useState } from "react";
import Chats from "../Chats/Chats";
import "./Chatbot.scss";
import { EVENT_STATUS, TABLE_NAME } from '../../../convex/schema';
import { Id } from '../../../convex/_generated/dataModel';

interface ResponseBotObject {
  purpose: string;
  message: string;
  options?: string[];
  sender: string;
}

interface Props {
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

const Chatbot: React.FC<Props> = ({dayarray}) => {
  const [userResponse, setUserResponse] = useState<string>("");
  const [step, setStep] = useState<number>(0);
  const [botResponse, setBotResponse] = useState<ResponseBotObject>({
    purpose: "",
    message: "",
    sender: "bot"
  });
  const [sendUserResponse, setSendUserResponse] = useState<string>("");

  // setting next step when there's response and option click
  const setNextStep = (response: string) => {
    setStep(prevState => prevState + 1);
    setSendUserResponse(response);
    //let res = analyzeNextSteps(step, response);
    //setBotResponse({ ...res, sender: "bot" });
    setUserResponse("");
  };

  const optionClick = (e: React.MouseEvent<HTMLElement>) => {
    let option = e.currentTarget.dataset.id;
    if (option) {
      setNextStep(option);
    }
  };

  // event handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserResponse(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNextStep(userResponse);
  };

  return (
    <div className="chat-container">
      <Chats
        userResponse={userResponse}
        botResponse={botResponse}
        sendUserResponse={sendUserResponse}
        optionClick={optionClick}
        dayarray = {dayarray}
      />
      <form onSubmit={e => handleSubmit(e)} className="form-container">
        <input
          onChange={e => handleInputChange(e)}
          value={userResponse}
        ></input>
        <button>
          <p className="far fa-paper-plane">Send</p>
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
