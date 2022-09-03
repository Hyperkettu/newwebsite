import { WeightTrackerServer } from './weight-tracker-server';
import { Routes } from './routes';

const server = new WeightTrackerServer();
const app = server.getApp();
const route = new Routes(app, server.getMySqlManager());
route.getRoutes();

export { app };