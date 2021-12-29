#!/usr/bin/env node -r tsm
import { createViteServer } from './vite-server';

async function run() {
  await createViteServer();
}

run();
