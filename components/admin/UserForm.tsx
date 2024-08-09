import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Player } from "../../pages/api/playerFetching";
import Button from "@mui/material/Button";
import {
  NAREGIONS,
  EUREGIONS,
} from "../home/details/location/LocationRenderer";
import { NAREGIMENTS, EUREGIMENTS } from "../regiments/RegimentRegistry";
import { UpdatedData } from "../../pages/admin";

export const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

interface UserFormProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addPlayer: (newPlayer: Player, region: string) => void;
  editPlayer: (
    playerId: string,
    updatedData: UpdatedData,
    region: string
  ) => void;
  editingPlayer: Player | null;
  setEditingPlayer: React.Dispatch<React.SetStateAction<Player | null>>;
  currRegion: string;
}

const UserForm: React.FC<UserFormProps> = ({
  open,
  setOpen,
  addPlayer,
  editPlayer,
  editingPlayer,
  setEditingPlayer,
  currRegion,
}) => {
  const [region, setRegion] = useState("NA");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [regiment, setRegiment] = useState("");
  const [city, setCity] = useState("");
  const [stateCountry, setStateCountry] = useState("");
  const [bio, setBio] = useState("");
  const [rating, setRating] = useState("");

  const [errors, setErrors] = useState({
    region: false,
    id: false,
    name: false,
    regiment: false,
    stateCountry: false,
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    // Check if required fields are valid
    const isValid =
      region.trim() !== "" &&
      id.trim() !== "" &&
      name.trim() !== "" &&
      regiment.trim() !== "" &&
      stateCountry.trim() !== "";

    setIsButtonDisabled(!isValid);
  }, [region, id, name, regiment, stateCountry]);

  useEffect(() => {
    if (editingPlayer) {
      setRegion(currRegion);
      setId(editingPlayer.id);
      setName(editingPlayer.name);
      setRegiment(editingPlayer.regiment);
      setCity(editingPlayer.city || "");
      setStateCountry(editingPlayer.state || "");
      setBio(editingPlayer.bio || "");
      setRating(editingPlayer.rating || "");
    } else {
      resetForm(); // Reset form when editingPlayer is null
    }
  }, [editingPlayer]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Reset errors
    setErrors({
      region: !region,
      id: !id,
      name: !name,
      regiment: !regiment,
      stateCountry: !stateCountry,
    });

    // Check for errors
    if (!region || !id || !name || !regiment || !stateCountry) {
      return;
    }

    if (editingPlayer) {
      const updatedData: UpdatedData = {
        name,
        regiment,
        city,
        state: stateCountry,
        bio,
        rating,
      };

      editPlayer(id, updatedData, region);
    } else {
      const newPlayer: Player = {
        id,
        name,
        regiment,
        city,
        state: stateCountry,
        bio,
        rating,
      };

      addPlayer(newPlayer, region);
    }
    closeForm();
  };

  const resetForm = () => {
    setRegion("NA");
    setId("");
    setName("");
    setRegiment("");
    setCity("");
    setStateCountry("");
    setBio("");
    setRating("");
    setErrors({
      region: false,
      id: false,
      name: false,
      regiment: false,
      stateCountry: false,
    });
    setOpen(false);
  };

  const closeForm = () => {
    resetForm();
    setEditingPlayer(null);
  };

  return (
    <Modal
      open={open}
      onClose={() => closeForm()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Card sx={{ ...modalStyle, position: "relative" }}>
        <div style={{ position: "absolute", top: 4, right: 4 }}>
          <IconButton aria-label="close" onClick={() => closeForm()}>
            <CloseIcon />
          </IconButton>
        </div>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ marginTop: "15px" }}
        >
          {editingPlayer
            ? `Editing Player: ${editingPlayer.name}`
            : "Create Player"}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "grid",
            marginTop: "15px",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 2,
            "& .MuiTextField-root": { width: "100%" },
          }}
          noValidate
          autoComplete="off"
        >
          <FormControl required sx={{ minWidth: 120 }}>
            <Select
              id="region"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              error={errors.region}
              displayEmpty
              color="secondary"
              disabled={editingPlayer ? true : false}
            >
              <MenuItem value="NA">NA</MenuItem>
              <MenuItem value="EU">EU</MenuItem>
            </Select>
            {errors.region && (
              <Typography color="error" variant="caption">
                Region is required.
              </Typography>
            )}
          </FormControl>
          <TextField
            required
            id="id"
            label="ID"
            placeholder="ID"
            color="secondary"
            value={id}
            onChange={(e) => setId(e.target.value)}
            error={errors.id}
            helperText={errors.id ? "ID is required." : ""}
            disabled={editingPlayer ? true : false}
          />
          <TextField
            required
            id="name"
            label="Name"
            placeholder="Name"
            color="secondary"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name}
            helperText={errors.name ? "Name is required." : ""}
          />
          <FormControl required sx={{ minWidth: 120 }}>
            {region === "NA" && (
              <Select
                id="regiment"
                value={regiment}
                onChange={(e) => setRegiment(e.target.value)}
                error={errors.regiment}
                displayEmpty
                color="secondary"
              >
                <MenuItem value="">None</MenuItem>
                {NAREGIMENTS.map((regiment) => (
                  <MenuItem key={regiment.name} value={regiment.tag}>
                    {regiment.tag}
                  </MenuItem>
                ))}
              </Select>
            )}
            {region === "EU" && (
              <Select
                id="regiment"
                value={regiment}
                onChange={(e) => setRegiment(e.target.value)}
                error={errors.regiment}
                displayEmpty
                color="secondary"
              >
                <MenuItem value="">None</MenuItem>
                {EUREGIMENTS.map((regiment) => (
                  <MenuItem key={regiment.name} value={regiment.tag}>
                    {regiment.tag}
                  </MenuItem>
                ))}
              </Select>
            )}
            {errors.regiment && (
              <Typography color="error" variant="caption">
                Regiment is required.
              </Typography>
            )}
          </FormControl>
          <TextField
            id="city"
            label="City"
            placeholder="City"
            color="secondary"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          {region === "NA" ? (
            <Select
              id="state"
              value={stateCountry}
              onChange={(e) => setStateCountry(e.target.value)}
              error={errors.stateCountry}
              displayEmpty
              color="secondary"
            >
              {NAREGIONS.map(([state, abbreviation]) => (
                <MenuItem key={state} value={abbreviation}>
                  {state} ({abbreviation})
                </MenuItem>
              ))}
            </Select>
          ) : (
            <Select
              id="state"
              value={stateCountry}
              onChange={(e) => setStateCountry(e.target.value)}
              error={errors.stateCountry}
              displayEmpty
              color="secondary"
            >
              {EUREGIONS.map(([state, abbreviation]) => (
                <MenuItem key={state} value={abbreviation}>
                  {state} ({abbreviation})
                </MenuItem>
              ))}
            </Select>
          )}
          <TextField
            id="bio"
            label="Bio"
            placeholder="Bio"
            color="secondary"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <TextField
            id="rating"
            label="Rating"
            placeholder="Rating"
            color="secondary"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
          <Box
            sx={{
              gridColumn: "span 2",
              display: "flex",
              justifyContent: "center",
              mt: 2,
            }}
          >
            <div className="flex gap-4 justify-center items-center">
              <Button
                variant="contained"
                color="secondary"
                onClick={() => closeForm()}
                size="large"
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                size="large"
                disabled={isButtonDisabled} // Disable button based on validation
              >
                {editingPlayer ? "Update" : "Add Player"}
              </Button>
            </div>
          </Box>
        </Box>
      </Card>
    </Modal>
  );
};

export default UserForm;
