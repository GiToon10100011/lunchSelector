const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');

const app = express();

// static files 서빙
app.use(express.static(path.join(__dirname, '../.next/static'), {
  setHeaders: (res, path) => {
    if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  }
}));

app.use(express.static(path.join(__dirname, '../public')));

// 모든 경로를 index.html로
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../.next/server/app/index.html'));
});

// 자체 서명 인증서 생성 스크립트 출력
console.log(`
HTTPS 서버를 위한 인증서 생성:

1. 터미널에서 실행:
   openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 30 -nodes -subj "/CN=localhost"

2. 그 다음 서버 시작:
   node scripts/serve-https.js

3. https://localhost:3001 접속 (보안 경고는 "고급" -> "계속 진행")
`);

const PORT = 3001;

// 인증서 파일이 있으면 HTTPS 서버 시작
if (fs.existsSync('cert.pem') && fs.existsSync('key.pem')) {
  const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
  };

  https.createServer(options, app).listen(PORT, () => {
    console.log(`🔒 HTTPS 서버 시작: https://localhost:${PORT}`);
    console.log('PWA 테스트를 위해 보안 경고를 무시하고 접속하세요');
  });
} else {
  console.log('cert.pem과 key.pem 파일이 필요합니다');
}