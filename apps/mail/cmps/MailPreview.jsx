export function MailPreview({ mail }) {
  const { from, subject, sentAt, isRead, body } = mail;
  var dateFormatted;

  function onStarClick(ev, mail) {
    ev.stopPropagation();
    console.log(mail.isStared)

  }
  if (sentAt) {
    const date = new Date(sentAt);
    dateFormatted = `${date.getDay()}/
  ${date.getDate()}/${date.getFullYear()}`;
  } else dateFormatted = "";
  return (
    <div className="mail-preview-container">
      <button
        className={mail.isStared ? "stared"+' star-button' : "" +' star-button'} 
        onClick={(ev) => onStarClick(ev, mail)}>
        {" "}
        ⭐
      </button>
      <div className="from-field">{from}</div>
      <div className="subject-field">
        {subject}
        <span>{body}</span>{" "}
      </div>
      <div className="date-field">{dateFormatted}</div>
    </div>
  );
}
