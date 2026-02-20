import { app } from './app.mjs';

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const MAX_PORT = 3100;

function startServer(port = DEFAULT_PORT) {
  const server = app.listen(port, () => {
    console.log(
      `Server runnign on http://localhost:${port} in ${process.env.NODE_ENV} mode`
    );
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      const nextPort = port + 1;
      if (nextPort <= MAX_PORT) startServer(nextPort);
    } else {
      console.error('Server error:', err);
    }
  });
}

startServer();
