import dotenv from 'dotenv'

dotenv.config();

import { ReinforcerApp } from "./app";

const app = new ReinforcerApp();

app.start();
