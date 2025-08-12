# 🍽️ 점심메뉴 추천기

오늘 뭐 먹을지 고민될 때 사용하는 크로스플랫폼 점심메뉴 추천 앱입니다.

**📱 웹/모바일 PWA** | **🖥️ 데스크톱 앱** | **☁️ Vercel 배포**

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Electron](https://img.shields.io/badge/Electron-37-lightgrey?style=flat-square&logo=electron)
![PWA](https://img.shields.io/badge/PWA-Ready-purple?style=flat-square)

## ✨ 주요 기능

### 🎯 핵심 기능
- **🎲 랜덤 메뉴 추천**: 등록된 메뉴 중에서 랜덤으로 추천
- **📝 메뉴 관리**: 원하는 메뉴 추가/삭제/편집
- **📊 식사 기록**: 먹은 메뉴와 날짜 기록 및 관리
- **💾 데이터 저장**: 로컬스토리지에 자동 저장 (오프라인 지원)

### 🌟 플랫폼 지원
- **📱 PWA (Progressive Web App)**: 모바일 브라우저에서 앱처럼 설치 가능
- **🖥️ Electron 데스크톱 앱**: Windows, macOS, Linux 지원
- **🌐 웹 브라우저**: 모든 모던 브라우저에서 접근 가능
- **☁️ Vercel 배포**: 언제 어디서나 접근 가능

## 🚀 빠른 시작

### 💻 로컬 개발

```bash
# 저장소 클론
git clone <repository-url>
cd lunch-recommender

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

### 📱 PWA 모바일 앱 설치

1. **웹사이트 접속**: 모바일 브라우저에서 앱 접속
2. **설치 버튼**: 화면의 "앱 설치" 버튼 클릭
3. **홈 화면 추가**: 브라우저 메뉴 → "홈 화면에 추가"
4. **앱 실행**: 홈 화면 아이콘으로 네이티브 앱처럼 실행

### 🖥️ 데스크톱 앱 실행

```bash
# 개발 모드 (웹 + Electron)
npm run electron

# 프로덕션 모드
npm run electron:build
```

## 🏗️ 빌드 & 배포

### 🌐 웹 배포 (Vercel)

```bash
# Vercel용 빌드
npm run build:vercel

# 또는 일반 빌드
npm run build
```

### 📦 데스크톱 앱 배포 파일 생성

```bash
# 모든 플랫폼
npm run dist

# 플랫폼별 빌드
npm run dist:mac     # macOS (.dmg)
npm run dist:win     # Windows (.exe, .msi)  
npm run dist:linux   # Linux (.AppImage)
```

빌드된 파일은 `dist/` 폴더에 생성됩니다.

### 📱 Electron용 정적 파일 빌드

```bash
# Electron용 static export
npm run export
```

## ⚠️ macOS 보안 경고 해결

macOS에서 앱 실행 시 보안 경고가 나타날 수 있습니다. (Apple 개발자 인증서 미적용)

### 해결 방법:

**방법 1** (권장): 앱을 **우클릭** → **"열기"** → 경고창에서 **"열기"** 클릭

**방법 2**: 시스템 환경설정 → 보안 및 개인정보보호 → "확인 없이 열기" 클릭

**방법 3** (터미널):
```bash
# 검역 속성 제거
xattr -dr com.apple.quarantine "/Applications/점심메뉴 추천기.app"
```

## 🛠️ 기술 스택

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: React 19, TypeScript 5
- **Styling**: Tailwind CSS 4, shadcn/ui
- **Icons**: Lucide React
- **Fonts**: Geist Sans & Mono

### Desktop & Mobile
- **Desktop**: Electron 37
- **Build Tool**: electron-builder
- **PWA**: Service Worker, Web App Manifest
- **Cross-platform**: Windows, macOS, Linux, iOS, Android

### Development
- **Package Manager**: npm
- **Linting**: ESLint, TypeScript
- **Deployment**: Vercel (web), electron-builder (desktop)

## 📁 프로젝트 구조

```
lunch-recommender/
├── 📁 app/                    # Next.js App Router
│   ├── globals.css           # 전역 스타일
│   ├── layout.tsx           # 루트 레이아웃 + PWA 메타태그
│   └── page.tsx             # 메인 페이지
├── 📁 components/           
│   ├── ui/                  # shadcn/ui 컴포넌트들
│   └── theme-provider.tsx   # 테마 프로바이더
├── 📁 electron/             # Electron 설정
│   └── main.js              # 메인 프로세스
├── 📁 hooks/                # React 훅들
│   ├── use-mobile.ts        # 모바일 감지
│   ├── use-toast.ts         # 토스트 알림
│   └── use-pwa.ts           # PWA 설치 관리
├── 📁 lib/
│   └── utils.ts             # 유틸리티 함수
├── 📁 public/               # 정적 파일들
│   ├── manifest.json        # PWA 매니페스트
│   ├── sw.js               # Service Worker
│   └── *.svg, *.png        # 아이콘들
├── 📁 scripts/              # 빌드 스크립트
│   ├── fix-paths.js         # Electron용 경로 수정
│   └── generate-icons.js    # 아이콘 생성
├── 🍽️ lunch-recommender.tsx  # 메인 앱 컴포넌트
├── ⚙️ components.json        # shadcn/ui 설정
├── ⚙️ electron-builder.yml   # Electron 빌드 설정
├── ⚙️ next.config.mjs        # Next.js 설정
└── 📚 CLAUDE.md             # 개발 가이드
```

## 🎯 사용법

### 1. 메뉴 추천받기 🎲
- "메뉴 추천" 버튼 클릭
- 랜덤으로 선택된 메뉴 확인
- "선택 확정" 버튼으로 기록에 저장

### 2. 메뉴 관리 ⚙️
- "메뉴 관리" 버튼 클릭
- 새로운 메뉴 추가
- 기존 메뉴 삭제
- 실시간 메뉴 개수 표시

### 3. 기록 확인 📊
- 메인 화면에서 최근 5개 기록 확인
- "전체 기록" 버튼으로 모든 기록 보기
- 기록 수정/삭제 가능
- 날짜별 정렬

### 4. PWA 설치 📱 (모바일)
- 웹사이트 접속 후 "앱 설치" 버튼 표시
- 설치 후 네이티브 앱처럼 사용
- 오프라인에서도 기본 기능 동작

## 🔧 개발 가이드

### 개발 명령어

```bash
# 개발 서버 (웹)
npm run dev

# Electron 개발 모드
npm run electron

# 린트 검사
npm run lint

# 타입 검사
npm run build

# PWA 테스트 (HTTPS 필요)
npm run build && npm run start
```

### 코드 스타일

- **TypeScript Strict 모드** 사용
- **Next.js 15 App Router** 규칙 준수
- **shadcn/ui 패턴** 사용
- **한국어 UI** 라벨 사용
- **반응형 디자인** (모바일 퍼스트)

### 환경 변수

```bash
# .env.local
NEXT_PUBLIC_STATIC_EXPORT=true  # Electron 빌드시에만 true
```

## 🚀 배포

### Vercel 배포
1. Vercel에 레포지토리 연결
2. Build Command: `npm run build:vercel`
3. Output Directory: `.next`
4. 자동 배포 완료

### 데스크톱 앱 배포
1. `npm run dist` 실행
2. `dist/` 폴더의 설치 파일 배포
3. GitHub Releases 또는 직접 배포

## 🌟 PWA 기능

- ✅ **설치 가능**: 홈 화면에 앱 아이콘 추가
- ✅ **오프라인 지원**: Service Worker 캐싱
- ✅ **네이티브 경험**: 전체화면, 스플래시 스크린
- ✅ **반응형 디자인**: 모든 화면 크기 지원
- ✅ **메타데이터 최적화**: SEO, 소셜 미디어 최적화

## 📊 브라우저 지원

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ 모바일 브라우저 (iOS Safari, Chrome Mobile)

## 🐛 알려진 이슈

- macOS에서 첫 실행시 보안 경고 (해결방법 상단 참조)
- iOS Safari에서 PWA 설치 제약 (iOS 한계)

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 개인 사용을 위한 프로젝트입니다.

## 📞 지원

- 🐛 **버그 리포트**: GitHub Issues
- 💡 **기능 제안**: GitHub Issues
- 📧 **기타 문의**: 개발자에게 직접 연락

---

<div align="center">

**🍽️ 오늘도 맛있는 점심 되세요! 🍽️**

Made with ❤️ using Next.js, React, and Electron

</div>