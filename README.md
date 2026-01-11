# Algo Viz Lab

정렬/그래프/DP 같은 알고리즘을 **직접 조작하면서** 이해할 수 있도록 만드는 시각화 실험실입니다.

현재는 **버블 정렬(Bubble sort)** 시뮬레이터가 포함되어 있습니다.

## Features

- 버블 정렬 단계별 애니메이션 (compare / swap / sorted)
- `Shuffle`, `Start/Pause`
- `Speed`, `Size` 슬라이더
- 비교/교환 횟수, 현재 딜레이(ms) 표시

## Tech Stack

- Next.js (App Router) + TypeScript
- React
- vanilla-extract (타입 안전 CSS)
- ESLint

## Run Locally

### Requirements

- Node.js 18+ 권장

### Install

```bash
npm install
```

### Dev

```bash
npm run dev
```

브라우저에서 http://localhost:3000 을 열면 정렬 시각화 화면이 뜹니다.

> 참고: `dev`/`build` 스크립트는 `--webpack` 옵션을 사용합니다.
> (vanilla-extract 설정과의 호환을 위해 webpack을 강제합니다.)

## Scripts

- `npm run dev`: 개발 서버
- `npm run build`: 프로덕션 빌드
- `npm run start`: 빌드 결과 실행
- `npm run lint`: 린트

## Project Structure

- `app/page.tsx`: 홈에서 시뮬레이터 렌더
- `app/sort/SortingVisualizer.tsx`: 정렬 시뮬레이터 UI/로직
- `app/sort/sort.css.ts`: vanilla-extract 스타일

## Roadmap (Ideas)

- 다른 정렬 알고리즘 추가 (Selection/Insertion/Merge/Quick/Heap 등)
- Step-by-step(단발 실행) / 되감기 / 코드 하이라이트
- 알고리즘별 시간복잡도/공간복잡도 표시
