import apiClient from "./config";
import type { ISession, ISessionStatus, IResults, ILeaderboard } from "../models/session";

const getSession = async (): Promise<ISession> => {
  const response = await apiClient.get<ISession>("/session");
  return response.data;
};

const joinSession = async () => {
  const response = await apiClient.post("/session/join");
  return response.data;
};

const sessionStatus = async (): Promise<ISessionStatus> => {
  const response = await apiClient.get<ISessionStatus>("/session/status");
  return response.data;
};

const pickNumber = async (pick: number) => {
  const response = await apiClient.post("/session/pick", { pick });
  return response.data;
};

const getResults = async (): Promise<IResults> => {
  const response = await apiClient.get<IResults>("/session/completed-results");
  return response.data;
};

const leaveSession = async () => {
  const response = await apiClient.post("/session/leave");
  return response.data;
};

const getLeaderboard = async (): Promise<ILeaderboard> => {
  const response = await apiClient.get<ILeaderboard>("/session/leaderboard");
  return response.data;
};

export { getSession, joinSession, sessionStatus, pickNumber, getResults, leaveSession, getLeaderboard };