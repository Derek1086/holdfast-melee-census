import axios from "axios";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useState } from "react";

interface AdminProps {
  authenticated: boolean;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminLogin: React.FC<AdminProps> = ({
  authenticated,
  setAuthenticated,
}) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("/api/auth/login", {
        username,
        password,
      });

      if (response.status === 200 && response.data.success) {
        setAuthenticated(true);
        localStorage.setItem("isAuthenticated", "true");
      } else {
        alert("Authentication failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Authentication failed");
    }
  };

  return (
    <Dialog open={!authenticated}>
      <DialogTitle>Admin Login</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ marginBottom: "15px" }}>
          Please enter your username and password to access the admin dashboard.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="username"
          label="Username"
          type="text"
          fullWidth
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          color="secondary"
        />
        <TextField
          margin="dense"
          id="password"
          label="Password"
          type="password"
          fullWidth
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleLogin();
            }
          }}
          color="secondary"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleLogin} color="secondary">
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AdminLogin;
