import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleShowUsers = () => {
    const storedUsers = JSON.parse(localStorage.getItem("formData")) || [];
    setUsers(storedUsers);
    setShowUsers(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMenuOpen = (event, user) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const handleViewUser = () => {
    navigate("/", { state: { user: selectedUser, isEditable: false } });
    handleMenuClose();
  };

  const handleEditUser = () => {
    navigate("/", { state: { user: selectedUser, isEditable: true } });
    handleMenuClose();
  };

  const handleDeleteUser = () => {
    const updatedUsers = users.filter((user) => user !== selectedUser);
    setUsers(updatedUsers);
    localStorage.setItem("formData", JSON.stringify(updatedUsers));
    alert(`${selectedUser.name} has been deleted.`);
    handleMenuClose();
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  }

  return (
    <div className="nav-section">
      <nav className="nav-bar">
        <div className="logo">
          <i className="bi bi-list menu-icon" onClick={toggleSidebar}></i>
          <h3>Cashapona</h3>
        </div>
        <ul className="nav-links">
          <li onClick={() => navigate("/")}>Home</li>
          <li>About</li>
          <li>Contact</li>
          <li onClick={() => navigate("/addCart")}>Add Cart</li>
          <li onClick={() => navigate("/task")}>Task</li>
        </ul>
        <div className="profile-section">
          <div className="profile">
            <span>Profile</span>
            <i className="bi bi-person-fill"></i>
          </div>
          {/* <button onClick={handleLogout} >Logout</button> */}
        </div>
      </nav>

      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <h4>Menu</h4>
          <i className="bi bi-x-lg close-icon" onClick={toggleSidebar}></i>
        </div>
        <ul className="sidebar-menu">
          <li onClick={handleShowUsers}>Users</li>
          <li>Settings</li>
          <li>Help</li>
        </ul>
      </div>

      {showUsers && (
        <div className={`users-table ${isOpen ? "shifted" : ""}`}>
          <h2>Users Data</h2>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone No</TableCell>
                  <TableCell>University</TableCell>
                  <TableCell>College</TableCell>
                  <TableCell>Graduation Year</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user, index) => (
                    <TableRow key={index}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>{user.university}</TableCell>
                      <TableCell>{user.college}</TableCell>
                      <TableCell>{user.graduationYear}</TableCell>
                      <TableCell>
                        <IconButton onClick={(event) => handleMenuOpen(event, user)}>
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          anchorEl={anchorEl}
                          open={Boolean(anchorEl)}
                          onClose={handleMenuClose}
                        >
                          <MenuItem onClick={handleViewUser}>View</MenuItem>
                          <MenuItem onClick={handleEditUser}>Edit</MenuItem>
                          <MenuItem onClick={handleDeleteUser}>Delete</MenuItem>
                        </Menu>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      )}
    </div>
  );
}

export default Nav;
