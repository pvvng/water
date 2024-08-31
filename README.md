# [물을 붓자](http://water.ap-northeast-2.elasticbeanstalk.com/)

### 개발 기간
2024-08-28 ~ 2024-08-31

### 개발 목적
Websocket, SSE(MongoDB Change Stream) 지식 습득

### 개발 환경
Next.js, MongoDB, socket.io, AWS elastic beanstalk

### 사용 방법
1. 물 붓기 버튼을 눌러 컵에 물을 부을 수 있습니다. (SSE 활용)
2. 댓글을 작성하면 즉각적으로 이를 확인할 수 있습니다. (WS 활용)
3. 웹에 최초로 접속하면 DB에 저장된 댓글과 물 퍼센티지를 확인할 수 있습니다.
4. 물이 다 차면 (100%) 더 이상 물을 부을 수 없습니다.

### 특이 사항
1. Netlify 는 서버리스 플랫폼이어서 WS, SSE가 제대로 동작하지 않는 문제가 있었다. 이를 해결하기 위해 AWS elastic beanstalk로 배포를 진행했습니다.
2. Node.js 서버를 따로 사용하지 않고, Next.js API Route만을 이용하여 백엔드를 구축하였습니다. 
