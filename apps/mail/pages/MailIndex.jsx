import { mailService } from "../services/mail.service.js";
import {
  showErrorMsg,
  showSuccessMsg,
} from "../../../services/event-bus.service.js";
import { utilService } from "../../../services/util.service.js";
import { MailList } from "../cmps/MailList.jsx";
import { MailFilter } from "../cmps/MailFilter.jsx";
import { SideNav } from "../cmps/SideNav.jsx";

const { useState, useEffect } = React;
const { Link, useSearchParams, Outlet } = ReactRouterDOM;

export function MailIndex() {
  const [mails, setMails] = useState(null);
  const [isReadStatus, setIsReadStatus] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterBy, setFilterBy] = useState(
    mailService.getFilterFromSearchParams(searchParams)
  );

  useEffect(() => {
    setSearchParams(utilService.getTruthyValues(filterBy));
    loadMails();
  }, [filterBy, isReadStatus]);

  function loadMails() {
    mailService
      .query(filterBy)
      .then((mails) => {
        setMails(mails);
      })
      .catch((err) => {
        console.log("err:", err);
        showErrorMsg("Cannot get cars!");
      });
  }

  function onRemoveMail(mail) {
    if (mail.removedAt) removeMail(mail.id);
    else {
      mailService.moveToTrash(mail).then((newMail) => {
        showSuccessMsg('Email moved to Trash')
        onUpdateMail(newMail);
      });
    }
  }

  function onUpdateMail(newMail) {
    const idx = mails.findIndex((item) => item.id === newMail.id);
    if (idx !== -1) {
      setMails((prevMails) =>
        prevMails.filter((mail) => mail.id !== newMail.id)
      );
    } else setMails((prevMails) => [...prevMails, newMail]);
  }

  function removeMail(mailId) {
    mailService
      .remove(mailId)
      .then(() => {
        setMails((prevMails) => prevMails.filter((mail) => mail.id !== mailId));
        showSuccessMsg(`Mail (${mailId}) deleted successfully from trash!`);
      })
      .catch((err) => {
        console.log("Problem deleting mail:", err);
        showErrorMsg("Problem deleting mail!");
      });
  }

  function onSetFilterBy(filterByToEdit) {
    setFilterBy({ ...filterByToEdit });
  }
  function onToggleReadState(mail) {
    const newMail = { ...mail, isRead: !mail.isRead };
    mailService.save(newMail).then(() => setIsReadStatus(!isReadStatus));
  }
  function onToggleStarState(mail) {
    const newMail = { ...mail, isStared: !mail.isStared };
    mailService.save(newMail).then(() => setIsReadStatus(!isReadStatus));
  }

  function getCountUnreadMails() {
    if (!mails) return;
    const numOfUnreadMails = mails.reduce((acc, item) => {
      return (acc += item.isRead ? 0 : 1);
    }, 0);
    return numOfUnreadMails;
  }

  if (!mails) return <div className="loader">Loading...</div>;
  return (
    <section className="mail-index">
      <section className="newmail-filter-container">
        <button>
          <Link to="/mail/edit">Compose</Link>
        </button>
        <MailFilter onSetFilterBy={onSetFilterBy} filterBy={filterBy} />
      </section>
      <section className="list-sidenav-container">
        <nav className="folder-container">
          <SideNav
            unreadCount={getCountUnreadMails()}
            onSetFilterBy={onSetFilterBy}
            filterBy={filterBy}></SideNav>
        </nav>
        <section className="list-container">
          <MailList
            onRemoveMail={onRemoveMail}
            onToggleReadState={onToggleReadState}
            onToggleStarState={onToggleStarState}
            mails={mails}
          />
        </section>
      </section>
      <Outlet context={{onUpdateMail}}/>
    </section>
  );
}
