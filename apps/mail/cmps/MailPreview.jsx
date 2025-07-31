export function MailPreview({ mail }) {
  const { from, subject, sentAt, isRead } = mail;
  const date = new Date(sentAt);
  const dateFormatted = `${date.getDay()}/
  ${date.getDate()}/${date.getFullYear()}`;

  return (
    <div className="mail-preview-container">
        <div className="from-field">{from}</div>
        <div className="subject-field">{subject}</div>
      <div className="date-field">{dateFormatted}</div>
    </div>
  );
}
