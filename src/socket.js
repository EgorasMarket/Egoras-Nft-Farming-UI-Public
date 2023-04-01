import { io } from "socket.io-client";
import { API_URL } from "./actions/types";

export const socket = io(API_URL);
