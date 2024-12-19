import PropTypes from "prop-types";

const Message = ({ message }) => {
  return (
    <div className={`chat-bubble`}>
      {/* <img
        className="chat-bubble__left"
        src={message.avatar}
        alt="user avatar"
      /> */}
      <div className="chat-bubble__right">
        {/* <p className="user-name">{message.name}</p> */}
        <p className="user-message">{message.text}</p>
      </div>
    </div>
  );
};

Message.propTypes = {
  message: PropTypes.object.isRequired,
};

export default Message;
