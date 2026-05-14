# GPT 검수용 진행 현황

## 1. 프로젝트 목적

이 프로젝트는 미국주식 후보를 실거래가 아니라 페이퍼 트레이딩 / 시뮬레이션 기준으로 랭킹하고, 후보 선정 이유와 하방 위험, 시장 국면, 데이터 신뢰도, 검증 지표를 함께 보여주는 리스크 우선 리서치 대시보드입니다.

목표는 수익 보장이 아니라 다음을 검증하는 것입니다.

- 어떤 후보가 왜 랭킹되었는가
- 랭킹이 실제 페이퍼 평가에서 일관성이 있는가
- 손실 회피 능력이 개선되고 있는가
- 시장 국면에 따라 신뢰도를 조절하고 있는가
- 점수 구성 요소가 과최적화되지 않았는가

## 2. 절대 안전 원칙

이 프로젝트는 실거래 자동매매 시스템이 아닙니다.

절대 만들면 안 되는 것:

- 실제 Buy 버튼
- 실제 Sell 버튼
- 실제 Trade 버튼
- Execute / Order / Place Order 버튼
- 실계좌 연결
- live broker endpoint
- 실제 주문 실행
- 자동매매 실행
- broker API key 하드코딩
- 수익 보장, 확정 수익, 무위험 수익 문구

허용되는 것:

- paper candidate ranking
- simulation candidate
- paper observation
- mock exposure plan
- evaluation record
- paper journal
- score calibration suggestion
- simulation report

## 3. 현재 구현된 백엔드

- FastAPI 백엔드
- SQLite 기반 로컬 DB
- 스캐너 / 랭킹 엔진
- balanced scoring profile
- downside risk score
- market regime overlay
- research score provider stub 구조
- candidate snapshots 저장
- daily report generator
- 2~3 day evaluation mode 확장
- win rate, average return, median return, volatility, max drawdown, risk-adjusted return 등 평가 지표
- hit rate by rank, rank decay, rule performance, validation quality 구조
- recommendation / risk / research / trade result explainer
- read-only 중심 dashboard / scanner / ticker / journal / report / evaluation / settings API
- Paper Trading Only Lock API
- public API safety audit
- 실거래형 route 제거 또는 차단
- paper broker adapter는 실제 fill 요청을 거부하도록 잠금

## 4. 현재 구현된 프론트엔드

- React + TypeScript 구조
- dark fintech dashboard
- 페이지 구조:
  - dashboard
  - scanner
  - ticker detail
  - journal
  - reports
  - evaluation
  - settings / safety
- Rank 1/2/3 카드
- scanner table
- ticker detail 설명 패널
- paper journal
- daily report
- evaluation report
- settings safety audit
- mock fallback data
- no-build preview HTML
- 실거래처럼 보이는 버튼과 문구 제거

## 5. 공개 웹 구현

공개 웹은 GitHub Pages에 올릴 수 있는 정적 사이트로 분리했습니다.

공개 배포물에 포함되는 파일:

- index.html
- assets/public.css
- assets/public.js
- data/public_demo.json
- review.html
- gpt_review_packet.md

공개 웹의 특징:

- 한국어 UI
- 후보 랭킹 카드
- 검증 지표 요약
- 안전 점검 결과
- 수익화 가능 포지셔닝
- GPT 검수용 진행 현황
- 백엔드, DB, API 키, broker 연결 없음
- 실거래 주문 실행 없음

## 6. 검증 결과

최근 확인된 검증:

- Backend pytest: 23 passed
- 공개 HTML 응답: 200 OK
- 공개 JSON 파싱: json_ok
- API 키 노출 스캔: 실제 키 없음
- DB 파일: .gitignore로 제외
- node_modules: .gitignore로 제외
- .env: .gitignore로 제외
- 공개 페이지에 Buy / Sell / Trade / Execute / Order 버튼 없음
- 공개 페이지에 broker 연결 없음
- 공개 페이지에 수익 보장 문구 없음

## 7. 남은 리스크와 한계

- 현재 공개 후보 데이터는 데모이며 실제 성과 우위를 증명하지 않습니다.
- 표본 수가 부족할 때 성과 지표를 해석하면 안 됩니다.
- 선택 편향, lookahead bias, 과최적화 위험을 계속 점검해야 합니다.
- 프론트엔드 정식 Vite build는 로컬 Node/Rollup 환경 문제로 별도 확인이 필요합니다.
- 공개 웹은 정적 사이트로 유지해야 하며, 백엔드 서버와 DB를 인터넷에 직접 노출하면 안 됩니다.
- 수익화 문구는 리서치 도구, 교육 자료, 페이퍼 검증 자료 범위 안에서만 사용해야 합니다.

## 8. GPT 검수 요청

아래 관점으로 검수해 주세요.

1. 이 프로젝트가 실거래 자동매매처럼 보이는 표현이나 기능을 포함하는가?
2. Buy / Sell / Trade / Execute / Order / broker / live trading 관련 위험 표현이 남아 있는가?
3. 수익 보장, 무위험 수익, 확정 수익처럼 오해될 수 있는 문구가 있는가?
4. paper trading / simulation / mock / evaluation 전용이라는 점이 충분히 명확한가?
5. 일반 사용자가 이해하기 쉬운 한국어 UX인가?
6. 리스크, 표본 부족, 편향, 과최적화 위험을 충분히 드러내는가?
7. 공개 웹에 올려도 민감 정보나 실제 주문 기능 노출 문제가 없는가?

## 9. 결론

현재 상태는 실거래 자동매매 봇이 아니라, 미국주식 후보를 리스크 우선으로 검증하는 공개 가능한 페이퍼 시뮬레이션 리서치 대시보드입니다.

다만 실제 성과를 주장하려면 장기간의 페이퍼 검증 기록, 충분한 표본 수, walk-forward 평가, 편향 통제, 반복 가능한 리포트가 더 필요합니다.
