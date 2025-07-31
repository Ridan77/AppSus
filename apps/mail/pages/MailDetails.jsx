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
        



        <button onClick={onBack}> 
    <i className="fa-regular fa-circle-xmark"></i>
        </button>
        <h3>Mail:</h3>
        <p>From:{from}</p>
        <p>To:{to}</p>
        <p>Subject: {subject}</p>
        <p>{body}</p>
        <button onClick={onBack}>Delete</button>
      </div>
    </div>
  );
}
