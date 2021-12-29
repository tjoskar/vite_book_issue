import { createServer } from "vite";
import react from "@vitejs/plugin-react";
import { relative } from 'path';
import express from "express";
import { join } from "path/posix";

export async function createViteServer() {
  const server = await createServer({
    configFile: false,
    root: process.cwd(),
    server: {
      port: 3000,
      middlewareMode: 'ssr',
    },
    plugins: [react()],
    clearScreen: false,
  });

  const app = express();
  app.use(server.middlewares);
  app.use("*", async (req, res) => {
    const url = req.originalUrl;
    const scriptPath = relative(process.cwd(), join(__dirname, '../webapp/index.tsx'));
    const html = await server.transformIndexHtml(url, htmlContent(scriptPath));
    res.status(200).set({ "Content-Type": "text/html" }).end(html);
  });
  app.listen(3000);

  console.log("Visit http://localhost:3000");
}

const htmlContent = (scriptPath: string) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Test</title>
  </head>

  <body>
    <div id="app"></div>
    <script type="module" src="${scriptPath}"></script>
  </body>
</html>
`;
