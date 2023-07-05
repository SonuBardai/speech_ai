import { MessageRender } from "../types/Message";

const ChatHistory: React.FC<{
  messages: MessageRender[];
}> = ({ messages }) => {
  return (
    <ul className="p-4 h-[400px] overflow-y-auto">
      {messages.map((message, index) => (
        <li
          key={index}
          className={
            message.user === "Me"
              ? "mb-2 text-right"
              : "mb-2 text-left"
          }
        >
          {message.user && (
            <div
              className={
                message.user === "Me"
                  ? "font-bold text-blue-500"
                  : "font-bold text-green-500"
              }
            >
              {message.user}:
            </div>
          )}
          <div
            className={
              message.user === "Me"
                ? "inline-block bg-blue-100 rounded px-2 py-1"
                : "inline-block bg-green-100 rounded px-2 py-1"
            }
          >
            {message.message}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ChatHistory;
