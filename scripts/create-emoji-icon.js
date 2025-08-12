const fs = require('fs');
const path = require('path');

// SVG로 이모지 기반 아이콘 생성
function createEmojiIcon() {
  const svg = `<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <!-- 배경 그라데이션 -->
  <defs>
    <radialGradient id="bg" cx="50%" cy="50%" r="50%">
      <stop offset="0%" style="stop-color:#FFE66D"/>
      <stop offset="100%" style="stop-color:#FF6B6B"/>
    </radialGradient>
  </defs>
  
  <!-- 원형 배경 -->
  <circle cx="256" cy="256" r="240" fill="url(#bg)" stroke="#E74C3C" stroke-width="16"/>
  
  <!-- 내부 흰색 원 -->
  <circle cx="256" cy="256" r="200" fill="#FFF" stroke="#DDD" stroke-width="4"/>
  
  <!-- 메인 이모지 영역 -->
  <g transform="translate(256, 256)">
    <!-- 밥공기 -->
    <ellipse cx="-60" cy="20" rx="40" ry="45" fill="#F5DEB3" stroke="#DDD" stroke-width="2"/>
    <ellipse cx="-60" cy="10" rx="40" ry="8" fill="#FFF"/>
    <circle cx="-60" cy="-10" r="30" fill="#FFE4B5"/>
    
    <!-- 반찬들 -->
    <circle cx="20" cy="0" r="25" fill="#FF6347"/>
    <circle cx="60" cy="20" r="20" fill="#32CD32"/>
    <circle cx="40" cy="50" r="15" fill="#FFD700"/>
    
    <!-- 젓가락 -->
    <rect x="-90" y="-50" width="3" height="70" fill="#8B4513" transform="rotate(-15)"/>
    <rect x="-84" y="-50" width="3" height="70" fill="#8B4513" transform="rotate(-15)"/>
    
    <!-- 하트 -->
    <g transform="translate(0, -80) scale(1.2)">
      <path d="M0,10 C0,5 5,0 10,0 C15,0 20,5 20,10 C20,15 10,25 0,30 C-10,25 -20,15 -20,10 C-20,5 -15,0 -10,0 C-5,0 0,5 0,10 Z" fill="#FF69B4"/>
    </g>
    
    <!-- 김치찌개 스팀 -->
    <g opacity="0.7">
      <path d="M-40 -30 Q-35 -40 -40 -50 Q-45 -40 -40 -30" stroke="#87CEEB" stroke-width="3" fill="none"/>
      <path d="M-30 -35 Q-25 -45 -30 -55 Q-35 -45 -30 -35" stroke="#87CEEB" stroke-width="3" fill="none"/>
      <path d="M-50 -25 Q-45 -35 -50 -45 Q-55 -35 -50 -25" stroke="#87CEEB" stroke-width="3" fill="none"/>
    </g>
  </g>
  
  <!-- 접시 -->
  <ellipse cx="256" cy="380" rx="180" ry="25" fill="#F0F0F0"/>
  <ellipse cx="256" cy="375" rx="180" ry="15" fill="#FFF"/>
</svg>`;

  // 파일 저장
  fs.writeFileSync(path.join(__dirname, '../public/luncher-icon.svg'), svg);
  
  // PNG용으로도 복사 (일단 SVG를 PNG 확장자로)
  fs.writeFileSync(path.join(__dirname, '../public/luncher-icon.png'), svg);
  
  console.log('📝 SVG 아이콘을 PNG로 변환하려면 다음 명령어를 실행하세요:');
  console.log('rsvg-convert -w 512 -h 512 public/luncher-icon.svg -o public/luncher-icon-real.png');
  
  console.log('🍽️ 귀여운 음식 아이콘이 생성되었습니다!');
}

createEmojiIcon();