import './message.css';

export type MessageProps = {
  message: string;
};

export function Message({ message }: MessageProps) {
  return <div className="message">{message}</div>;
}
