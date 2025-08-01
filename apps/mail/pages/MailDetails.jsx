import { mailService } from "../services/mail.service.js";

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
            <i class="fa-solid fa-left-long"></i>
          </button>
          <button className="prev-mail">
            <i class="fa-solid fa-backward-step "></i>
          </button>
          <button className="next-mail">
            <i class="fa-solid fa-forward-step "></i>
          </button>
          <button>
            <i class="fa-solid fa-envelope-open "></i>
          </button>
          <button onClick={onBack}>
            <i class="fa-solid fa-trash "></i>
          </button>
        </div>
        <div className="mail-details">
          <h1>{subject}</h1>
          <h5>{from}</h5>
          <h6>To:{to}</h6>
          <p>{body}</p>
          <div className="replay-forward-container" >
            <button className="reply-button">
              <i class="fa-solid fa-reply"></i>Reply
            </button>
            <button className="forward-button">
              <i class="fa-solid fa-share"></i>Forward
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
