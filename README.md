# 🍽️ 점심메뉴 추천기

오늘 뭐 먹을지 고민될 때 사용하는 점심메뉴 추천 앱입니다.

## 📋 기능

- **랜덤 메뉴 추천**: 등록된 메뉴 중에서 랜덤으로 추천
- **메뉴 관리**: 원하는 메뉴 추가/삭제
- **식사 기록**: 먹은 메뉴와 날짜 기록 및 관리  
- **데이터 저장**: 브라우저 로컬스토리지에 자동 저장
- **데스크톱 앱**: Electron을 통한 크로스플랫폼 데스크톱 지원

## 🚀 시작하기

### 요구사항

- Node.js 18 이상
- npm 또는 yarn

### 설치

```bash
# 저장소 클론
git clone <repository-url>
cd lunch-recommender

# 의존성 설치
npm install
```

## ⚠️ macOS 보안 경고 해결

macOS에서 앱 실행 시 "악성 코드가 없음을 확인할 수 없습니다" 경고가 나타날 수 있습니다. 이는 Apple 개발자 인증서로 코드 사인되지 않았기 때문입니다.

### 해결 방법:

**방법 1**: 앱을 **우클릭** → **"열기"** → 경고창에서 **"열기"** 클릭

**방법 2**: 
1. **시스템 환경설정** → **보안 및 개인정보보호** 
2. **일반** 탭에서 **"확인 없이 열기"** 클릭

**방법 3** (터미널):
```bash
sudo xattr -rd com.apple.quarantine /Applications/Luncher.app
```

### 개발 서버 실행

```bash
# 웹 버전 개발 서버
npm run dev
```

브라우저에서 http://localhost:3000 으로 접속

### 데스크톱 앱 실행

```bash
# 데스크톱 앱 개발 모드
npm run electron

# 프로덕션 모드로 실행
npm run electron:build
```

## 🏗️ 빌드

### 웹 버전 빌드

```bash
# 정적 파일 빌드
npm run build

# 정적 내보내기 (Electron용)
npm run export
```

### 데스크톱 앱 배포 파일 생성

```bash
# 모든 플랫폼
npm run dist

# 특정 플랫폼
npm run dist:mac     # macOS
npm run dist:win     # Windows  
npm run dist:linux   # Linux
```

빌드된 파일은 `dist/` 폴더에 생성됩니다.

## 🛠️ 기술 스택

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI**: Tailwind CSS, shadcn/ui, Radix UI
- **Icons**: Lucide React
- **Fonts**: Geist Sans & Mono
- **Desktop**: Electron
- **Build**: electron-builder

## 📁 프로젝트 구조

```
lunch-recommender/
├── app/                    # Next.js 앱 라우터
│   ├── globals.css        # 전역 스타일
│   ├── layout.tsx         # 루트 레이아웃
│   └── page.tsx           # 메인 페이지
├── components/            
│   ├── ui/                # shadcn/ui 컴포넌트들
│   └── theme-provider.tsx # 테마 프로바이더
├── electron/              # Electron 관련 파일
│   └── main.js            # 메인 프로세스
├── lib/
│   └── utils.ts           # 유틸리티 함수
├── public/                # 정적 파일들
├── lunch-recommender.tsx  # 메인 컴포넌트
├── components.json        # shadcn/ui 설정
├── electron-builder.yml   # Electron 빌드 설정
└── next.config.mjs        # Next.js 설정
```

## 🎯 사용법

1. **메뉴 추천받기**
   - "메뉴 추천" 버튼 클릭
   - 랜덤으로 선택된 메뉴 확인
   - "선택 확정" 버튼으로 기록에 저장

2. **메뉴 관리**
   - "메뉴 관리" 버튼 클릭
   - 새로운 메뉴 추가
   - 기존 메뉴 삭제

3. **기록 확인**
   - 메인 화면에서 최근 5개 기록 확인
   - "전체 기록" 버튼으로 모든 기록 보기
   - 기록 수정/삭제 가능

## 🔧 개발

### 코드 스타일

- TypeScript strict 모드
- Next.js 15 App Router 규칙 준수
- shadcn/ui 패턴 사용
- 한국어 UI 라벨 사용

### 린트 실행

```bash
npm run lint
```

## 📝 라이선스

이 프로젝트는 개인 사용을 위한 프로젝트입니다.

## 🤝 기여

버그 리포트나 기능 제안은 이슈로 남겨주세요.