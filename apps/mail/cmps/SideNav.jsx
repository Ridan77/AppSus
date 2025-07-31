export function SideNav({ unreadCount, onSetFilterBy, filterBy }) {
    function onClickFolder(folder) {
    console.log(filterBy,folder);
    filterBy.folder = folder;
    onSetFilterBy(filterBy);
  }

  return (
    <div className="sidebar-container">
      <button
        onClick={() => {
          onClickFolder("inbox");
        }}>
        Inbox ({unreadCount})
      </button>
      <button
        onClick={() => {
          onClickFolder("starred");
        }}>
        Starred
      </button>
      <button
        onClick={() => {
          onClickFolder("sent");
        }}>
        Sent
      </button>
      <button
        onClick={() => {
          onClickFolder("draft");
        }}>
        Draft
      </button>
      <button
        onClick={() => {
          onClickFolder("trash");
        }}>
        Trash
      </button>
    </div>
  );
}
