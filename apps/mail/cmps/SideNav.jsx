export function SideNav({ unreadCount, onSetFilterBy, filterBy }) {
    function onClickFolder(folder) {
    filterBy.folder = folder;
    onSetFilterBy(filterBy);
  }
const folder=filterBy.folder
  return (
    <div className="sidebar-container">
      <button className={folder==='inbox' ? 'selected-folder' : ''}
        onClick={() => {
          onClickFolder("inbox");
        }}>
        Inbox ({unreadCount})
      </button>
      <button className={folder==='starred' ? 'selected-folder' : ''}
        onClick={() => {
          onClickFolder("starred");
        }}>
        Starred
      </button>
      <button className={folder==='sent' ? 'selected-folder' : ''}
        onClick={() => {
          onClickFolder("sent");
        }}>
        Sent
      </button>
      <button className={folder==='draft' ? 'selected-folder' : ''}
        onClick={() => {
          onClickFolder("draft");
        }}>
        Draft
      </button>
      <button className={folder==='trash' ? 'selected-folder' : ''}
        onClick={() => {
          onClickFolder("trash");
        }}>
        Trash
      </button>
    </div>
  );
}
