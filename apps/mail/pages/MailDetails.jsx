import { mailService } from "../services/mail.service.js";
import {
  showErrorMsg,
  showSuccessMsg,
} from "../../../services/event-bus.service.js";

const { useParams, useNavigate, Link } = ReactRouterDOM;

const { useState, useEffect } = React;

export function MailDetails() {
  const [mail, setMail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();
  console.log("in details");
  useEffect(() => {
    loadMail();
  }, [params.mailId]);

  function loadMail() {
    setIsLoading(true);
    mailService
      .get(params.mailId)
      .then((mail) => setMail(mail))
      .catch((err) => console.log("err:", err))
      .finally(() => setIsLoading(false));
  }

  function onRemoveMail(mail) {
    mailService.moveToTrash(mail).then(() => {
      showSuccessMsg("Email moved to Trash");
      navigate("/mail");
    });
  }

  function onBack() {
    navigate("/mail");
  }

  if (isLoading) return <div className="loader">Loading...</div>;
  const { subject, body, sentAt, from, to } = mail;

  return (
    <div>
      <div className="details-container">
        <div className="action-buttons">
          <button onClick={onBack}>
            <i className="fa-solid fa-left-long"></i>
          </button>

          <button className="prev-mail">
            <Link to={`/mail/${mail.prevMailId}`}>
              <i className="fa-solid fa-backward-step "></i>
            </Link>
          </button>

          <button className="next-mail">
            <Link to={`/mail/${mail.nextMailId}`}>
              <i className="fa-solid fa-forward-step "></i>
            </Link>
          </button>

          <button>
            <Link to={`/note/?subject=${subject}&body=${body}`}>
              <i className="fa-solid fa-arrow-up-right-from-square"></i>
            </Link>
          </button>
          <button onClick={() => onRemoveMail(mail)}>
            <i className="fa-solid fa-trash "></i>
          </button>
        </div>
        <div className="mail-details">
          <h1>{subject}</h1>
          <h5>{from}</h5>
          <h6>To:{to}</h6>
          <p>{body}</p>
          <div className="replay-forward-container">
            <button className="reply-button">
              <i className="fa-solid fa-reply"></i>Reply
            </button>
            <button className="forward-button">
              <i className="fa-solid fa-share"></i>Forward
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
