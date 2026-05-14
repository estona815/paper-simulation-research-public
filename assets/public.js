async function loadDemoData() {
  const response = await fetch("./data/public_demo.json", { cache: "no-store" });
  if (!response.ok) throw new Error("공개 데모 데이터를 불러오지 못했습니다.");
  return response.json();
}

const readinessLabels = {
  READY_FOR_PAPER_SIMULATION: "페이퍼 시뮬레이션 공개 데모 준비 완료",
};

const sampleGradeLabels = {
  insufficient: "표본 부족",
  adequate: "해석 가능",
  strong: "충분",
};

const calibrationLabels = {
  not_ready: "보정 전",
  review_only: "수동 검토",
  ready_for_review: "검토 가능",
};

const riskLabels = {
  LOW: "낮음",
  MEDIUM: "중간",
  HIGH: "높음",
};

function formatDateTime(value) {
  return new Date(value).toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function statusLabel(status) {
  if (status === "PASS") return "통과";
  if (status === "WARN") return "주의";
  if (status === "FAIL") return "실패";
  return status;
}

function metric(label, value, tone = "") {
  return `<article class="metric-card"><span>${label}</span><strong class="${tone}">${value}</strong></article>`;
}

function list(items) {
  return items.map((item) => `<li>${item}</li>`).join("");
}

function smallList(items) {
  return `<div class="small-list">${items.map((item) => `<span>${item}</span>`).join("")}</div>`;
}

function render(data) {
  document.querySelector("#generated").textContent = `생성 시각 ${formatDateTime(data.generated_at)}`;
  document.querySelector("#release-status").textContent = readinessLabels[data.release_readiness.overall_status] ?? data.release_readiness.overall_status;
  document.querySelector("#release-score").textContent = String(data.release_readiness.release_readiness_score);
  document.querySelector("#summary-grid").innerHTML = [
    metric("페이퍼 누적 시나리오 결과", `${data.validation.paper_total_return_pct.toFixed(2)}%`),
    metric("시뮬레이션 방향 일치", `${data.validation.positive_outcome_rate_pct.toFixed(2)}%`),
    metric("최대 낙폭", `${data.validation.max_drawdown.toFixed(2)}`, "negative"),
    metric("표본 등급", sampleGradeLabels[data.validation.sample_grade] ?? data.validation.sample_grade, "watch"),
    metric("점수 보정", calibrationLabels[data.validation.calibration_readiness] ?? data.validation.calibration_readiness, "watch"),
    metric("선택 편향", riskLabels[data.validation.selection_bias_risk] ?? data.validation.selection_bias_risk, "negative"),
  ].join("");

  document.querySelector("#rank-grid").innerHTML = data.candidates.map((candidate) => `
    <article class="rank-card">
      <div class="panel-title"><span>${candidate.rank}위</span><strong>${candidate.recommendation_label}</strong></div>
      <h3>${candidate.ticker}</h3>
      <p>${candidate.company_name} · ${candidate.sector}</p>
      <div class="rank-stats">
        <div><span>종합 점수</span><strong>${candidate.total_score.toFixed(1)}</strong></div>
        <div><span>하방 위험</span><strong>${candidate.downside_risk_score.toFixed(0)}</strong></div>
        <div><span>모의 노출</span><strong>${candidate.mock_allocation_pct.toFixed(2)}%</strong></div>
        <div><span>모의 위험예산</span><strong>${candidate.mock_risk_budget_pct.toFixed(2)}%</strong></div>
      </div>
      <p class="muted">AI는 이 시나리오를 요약하고 위험과 가정을 설명합니다. 결과는 가정 기반입니다.</p>
      <p class="good">${candidate.simulation_size_label} · ${candidate.observation_intensity}</p>
      ${smallList(candidate.why_ranked)}
    </article>
  `).join("");

  document.querySelector("#candidate-table").innerHTML = data.candidates.map((candidate) => `
    <tr>
      <td>#${candidate.rank}</td>
      <td><b>${candidate.ticker}</b><small>${candidate.company_name}</small></td>
      <td>${candidate.total_score.toFixed(1)}</td>
      <td>${candidate.downside_risk_score.toFixed(0)}</td>
      <td>${candidate.data_confidence_score.toFixed(0)}</td>
      <td>${candidate.mock_allocation_pct.toFixed(2)}%<small>${candidate.simulation_size_label}</small></td>
      <td>${candidate.recommendation_label}</td>
    </tr>
  `).join("");

  document.querySelector("#audit-checks").innerHTML = data.release_readiness.checks.map((check) => `
    <div class="check">
      <div class="panel-title"><strong>${check.label}</strong><span class="${check.status === "PASS" ? "good" : "bad"}">${statusLabel(check.status)}</span></div>
      <p>${check.detail}</p>
    </div>
  `).join("");

  document.querySelector("#allowed-claims").innerHTML = list(data.monetization.allowed_claims);
  document.querySelector("#prohibited-claims").innerHTML = list(data.monetization.prohibited_claims);
  document.querySelector("#offer-ideas").innerHTML = list(data.monetization.offer_ideas);
  document.querySelector("#pricing-grid").innerHTML = data.monetization.pricing_plans.map((plan) => `
    <article class="panel pricing-card">
      <div class="panel-title">
        <h3>${plan.name}</h3>
        <strong>${plan.price_label}</strong>
      </div>
      <p>${plan.summary}</p>
      <ul class="claim-list">${list(plan.features)}</ul>
      <small>${plan.disclaimer}</small>
    </article>
  `).join("");
  document.querySelector("#faq-grid").innerHTML = data.monetization.faq.map((item) => `
    <article class="panel faq-card">
      <h3>${item.question}</h3>
      <p>${item.answer}</p>
    </article>
  `).join("");
  document.querySelector("#removed-claims").innerHTML = list(data.monetization.removed_risky_claims);
  document.querySelector("#risk-mitigation-grid").innerHTML = data.risk_mitigation.map((item) => `
    <article class="panel risk-card">
      <div class="panel-title">
        <h3>${item.title}</h3>
        <strong>${item.status}</strong>
      </div>
      <p>${item.risk}</p>
      <small>${item.response}</small>
    </article>
  `).join("");
}

loadDemoData()
  .then(render)
  .catch((error) => {
    document.body.insertAdjacentHTML("afterbegin", `<div class="panel bad">${error.message}</div>`);
  });
