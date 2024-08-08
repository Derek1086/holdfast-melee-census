"use client";
import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import MemberItem from "./MemberItem";
import { Player } from "../../../pages/api/playerFetching";
import { Regiment } from "../../../pages/regiments";
import PlayerBio from "../../home/details/player/PlayerBio";
import { getAverageRating } from "../../home/details/ListRenderer";

interface MembersListProps {
  regiment: Regiment | null;
  players: Player[];
  region: string;
  setNumMembers: React.Dispatch<React.SetStateAction<number>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setAverageRating: React.Dispatch<React.SetStateAction<number>>;
  sortedPlayersByRating: Player[];
  ranking: number;
  setRanking: React.Dispatch<React.SetStateAction<number>>;
}

const MembersList: React.FC<MembersListProps> = ({
  regiment,
  players,
  region,
  setNumMembers,
  setLoading,
  setAverageRating,
  sortedPlayersByRating,
  ranking,
  setRanking,
}) => {
  const [members, setMembers] = useState<Player[]>([]);
  const [viewingPlayer, setViewingPlayer] = useState<Player | null>(null);

  useEffect(() => {
    if (viewingPlayer) {
      setRanking(
        sortedPlayersByRating.findIndex(
          (player) => player.id === viewingPlayer.id
        )
      );
    }
  }, [viewingPlayer]);

  useEffect(() => {
    const loadPlayers = () => {
      if (regiment) {
        setLoading(true);
        try {
          const filteredPlayers = players.filter(
            (player) => player.regiment === regiment.tag
          );
          setMembers(filteredPlayers);
          setNumMembers(filteredPlayers.length);
          setAverageRating(getAverageRating(filteredPlayers));
        } catch (error) {
          console.error("Failed to fetch players", error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadPlayers();
  }, [regiment, players, setLoading, setNumMembers, setAverageRating]);

  if (!regiment) {
    return null;
  }

  if (!members || members.length === 0) {
    return (
      <Typography
        variant="subtitle1"
        noWrap
        component="div"
        sx={{ textAlign: "center", marginTop: "15px" }}
      >
        No Players Found
      </Typography>
    );
  }

  return (
    <>
      <PlayerBio
        viewingPlayer={viewingPlayer}
        setViewingPlayer={setViewingPlayer}
        region={region}
        ranking={ranking}
      />
      <div style={{ height: "55vh" }}>
        <List
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            overflow: "auto",
            maxHeight: "100%",
            marginTop: "15px",
          }}
        >
          {members.map((member, index) => (
            <React.Fragment key={member.id}>
              <MemberItem member={member} setViewingPlayer={setViewingPlayer} />
              {index < members.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </div>
    </>
  );
};

export default MembersList;
