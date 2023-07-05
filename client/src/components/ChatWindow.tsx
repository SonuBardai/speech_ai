import React, { useEffect, useState } from "react";
import { MessageRender } from "../types/Message";
import { MessageType } from "../types/MessageType";
import ChatBox from "./ChatBox";
import ChatHistory from "./ChatHistory";
import ErrorBox, { ErrorBoxProps } from "./ErrorBox";
import axios, { AxiosError } from "axios";
import { OpenAiResponse } from "../types/OpenAiResponse";

const ChatWindow: React.FC<{
  SERVER_ADDR: string;
  ELEVEN_LABS_API_KEY: string | undefined;
}> = ({ SERVER_ADDR, ELEVEN_LABS_API_KEY }) => {
  const [messages, setMessages] = useState<MessageRender[]>([]);
  const [error, setError] = useState<ErrorBoxProps | null>(null);

  const handleAudioOutput = (audioResponse: ArrayBuffer) => {
    const audioBlob = new Blob([audioResponse], {
      type: "audio/mpeg",
    });
    const url = URL.createObjectURL(audioBlob);
    const audio = new Audio();
    audio.src = url;
    audio.play();
  };

  const speechAI = (text: string, ELEVEN_LABS_API_KEY: string) => {
    const VOICE_ID = "21m00Tcm4TlvDq8ikWAM";
    axios
      .post<ArrayBuffer>(
        `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
        {
          text,
          model_id: "eleven_monolingual_v1",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5,
          },
        },
        {
          headers: {
            accept: "audio/mpeg",
            "xi-api-key": ELEVEN_LABS_API_KEY,
            "Content-Type": "application/json",
          },
          responseType: "arraybuffer",
        }
      )
      .then((res) => {
        const audioResponse = res.data;
        console.log(audioResponse);
        handleAudioOutput(audioResponse);
      })
      .catch((err: AxiosError) => {
        setError({ message: err.message });
      });
  };

  const handleSendMessage = (message: string) => {
    setMessages((messages) => [
      ...messages,
      { user: "Me", message, message_type: MessageType.Text },
    ]);
    axios
      .post<OpenAiResponse>(SERVER_ADDR + "/chat", { message })
      .then((res) => {
        const response = res.data.content;
        if (response) {
          setMessages((messages) => [
            ...messages,
            { user: "AI", message: response, message_type: MessageType.Text },
          ]);
          if (!ELEVEN_LABS_API_KEY) {
            console.error("ELEVEN_LABS_API_KEY not set!");
            return setError({ message: "Can't connect to Eleven labs" });
          }
          speechAI(response, ELEVEN_LABS_API_KEY);
        }
      })
      .catch((err) => {
        console.log(err);
        setError({ message: "Failed to send message to server" });
      });
  };

  return (
    <div className="mt-[80px] my-auto w-[1200px] mx-auto bg-white shadow rounded-md">
      {error && <ErrorBox {...error} />}
      <ChatHistory messages={messages} />
      <ChatBox onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatWindow;
