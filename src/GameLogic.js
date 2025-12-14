// 시나리오 데이터는 scenarios.js에서 import
import { scenarios } from './scenarios';
export { scenarios };

// 주사위 굴리기
export function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

// 칸 번호에 해당하는 시나리오 찾기
export function getScenarioByPosition(position) {
  return scenarios.find(s => s.id === position);
}

// 새로운 stats를 차트 형식(Fairness, Safety, Privacy, Tech)으로 변환
export function convertStatsToChartFormat(stats) {
  return {
    Fairness: (stats.fairness || 0) + (stats.responsibility || 0) + (stats.honesty || 0) + (stats.truth || 0) + (stats.openMind || 0),
    Safety: (stats.safety || 0) + (stats.order || 0),
    Privacy: (stats.privacy || 0),
    Tech: (stats.tech || 0) + (stats.innovation || 0) + (stats.efficiency || 0) + (stats.enjoyment || 0) - (stats.environment || 0) * 0.5
  };
}

// Google Forms 전송 (실제 URL은 나중에 설정)
export async function submitToGoogleForm(data) {
  // Google Forms의 pre-filled URL 형식
  // 실제 사용 시 Google Forms의 응답 URL로 변경 필요
  const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSeKKO5metNED09QWl1ZAyJ5yQH_2rxV3UOeRdHpvGJyJ52WOg/formResponse';
  
  try {
    const formData = new FormData();
    formData.append('entry.242846716', data.name); // 실제 entry ID로 변경 필요
    formData.append('entry.80489811', data.topic);
    formData.append('entry.1027213654', data.choice);
    formData.append('entry.2043882597', data.feedback);
    
    await fetch(formUrl, {
      method: 'POST',
      mode: 'no-cors',
      body: formData
    });
    
    return true;
  } catch (error) {
    console.error('Google Forms 전송 실패:', error);
    return false;
  }
}

// 게임 데이터 저장 함수
export async function saveGameData(data) {
  // Google Forms의 응답 URL (실제 URL로 변경 필요)
  const formUrl = 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse';
  
  try {
    const formData = new FormData();
    formData.append('entry.11111', data.name); // 이름
    formData.append('entry.22222', data.tendency); // 성향
    formData.append('entry.33333', data.records); // 기록
    formData.append('entry.44444', data.totalScore.toString()); // 점수
    
    await fetch(formUrl, {
      method: 'POST',
      mode: 'no-cors',
      body: formData
    });
    
    return true;
  } catch (error) {
    console.error('게임 데이터 저장 실패:', error);
    return false;
  }
}

