# PBL Medical Education Application

## 개요

이 프로젝트는 의료 교육을 위한 React 기반 웹 애플리케이션입니다. 문제 기반 학습(PBL) 시나리오를 통해 위암 치료 결정에 대한 대화형 케이스 스터디를 제공합니다.

## Cursor에서 실행하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`env.example` 파일을 참고하여 `.env` 파일을 생성하고 필요한 환경 변수를 설정하세요:

```bash
cp env.example .env
```

필요한 환경 변수:
- `DATABASE_URL`: PostgreSQL 데이터베이스 연결 URL
- `SUPABASE_URL`: Supabase 프로젝트 URL (서버용)
- `SUPABASE_ANON_KEY`: Supabase 익명 키 (서버용)
- `VITE_SUPABASE_URL`: Supabase 프로젝트 URL (클라이언트용)
- `VITE_SUPABASE_ANON_KEY`: Supabase 익명 키 (클라이언트용)
- `SESSION_SECRET`: 세션 암호화 키
- `PORT`: 서버 포트 (기본값: 3000)

**중요**: Supabase 키는 이미 `env.example`에 설정되어 있습니다. `.env` 파일을 생성하면 바로 사용할 수 있습니다.

### 3. 데이터베이스 설정

```bash
npm run db:push
```

### 4. 개발 서버 실행

#### 전체 애플리케이션 실행 (권장)
```bash
npm run dev
```

#### 또는 개별 실행
```bash
# 클라이언트만 실행 (포트 5173)
npm run dev:client

# 서버만 실행 (포트 3000)
npm run dev:server
```

### 5. 브라우저에서 접속

- 전체 애플리케이션: http://localhost:3000
- 클라이언트만: http://localhost:5173

## 프로덕션 빌드

```bash
npm run build
npm start
```

## 프로젝트 구조

```
├── client/          # React 프론트엔드
├── server/          # Express 백엔드
├── shared/          # 공유 스키마 및 타입
├── attached_assets/ # 첨부 파일들
└── dist/           # 빌드 출력
```

## 기술 스택

- **프론트엔드**: React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui
- **백엔드**: Node.js, Express, TypeScript
- **데이터베이스**: PostgreSQL, Drizzle ORM
- **스토리지**: Supabase
- **상태 관리**: TanStack Query

## 주요 기능

- 대화형 의료 케이스 스터디
- 다중 선택 질문 및 검증
- 의료 이미지 표시
- 자동 스크롤 기능
- 반응형 디자인 