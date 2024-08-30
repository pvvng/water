import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "@/types/ws";
import { Server as ServerIO } from "socket.io";
import { Server as NetServer } from "http";

// Next.js가 요청 본문을 자동으로 파싱하지 않도록 지정
export const config = {
    api: {
        bodyParser: false,
    },
};

export default async (req: NextApiRequest, res: NextApiResponseServerIO) => {
    // socket.io 서버가 존재하지 않으면 새롭게 생성
    if (!res.socket.server.io) {

      console.log("New Socket.io server building...");

      // res.socket.server 를 Node.js HTTP 서버로 타입 변환
      // socket.io 서버와 HTTP 서버 통합을 위해 사용
      const httpServer: NetServer = res.socket.server as any;

      // 새로운 ServerIO 인스턴스 생성, 기존 HTTP 서버를 websocket 서버로 설정
      // path는 클라이언트, 서버 간의 ws 연결을 위한 경로 지정. 
      // 클라이언트는 이 경로를 통해 ws 서버에 연결함
      const io = new ServerIO(httpServer, {
          path: "/api/ws/connect",
      });

      // 생성한 Socket.IO 서버를 res.socket.server의 io 속성에 저장
      // 이는 나중에 다른 API Route에서 서버가 이미 생성된 것을 확인할 수 있도록 하기 위한 것
      res.socket.server.io = io;
    }
  // 클라이언트에게 응답을 완료
  res.end();
};