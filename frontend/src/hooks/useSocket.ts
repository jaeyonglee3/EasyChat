// import { useEffect, useState } from 'react';
// import io from 'socket.io-client';

// const SOCKET_SERVER_URL = 'http://localhost:3001';

// export const useSocket = () => {
//   const socket = io(SOCKET_SERVER_URL);
//   socket.connect();

//   useEffect(() => {
//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   return socket;
// };

import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_SERVER_URL = 'http://localhost:3001';

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket>(io(SOCKET_SERVER_URL));
  socket.connect();
  console.log('Socket connected:', socket.connected);

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return socket;
};

