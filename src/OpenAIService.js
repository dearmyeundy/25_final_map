// OpenAI API를 사용한 동적 시나리오 생성 서비스

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || '';
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

// 디버깅: 환경 변수 로드 확인
console.log('OpenAI API Key 확인:', {
  hasKey: !!OPENAI_API_KEY,
  keyLength: OPENAI_API_KEY?.length || 0,
  keyPrefix: OPENAI_API_KEY?.substring(0, 7) || '없음',
  envVar: import.meta.env.VITE_OPENAI_API_KEY ? '설정됨' : '설정 안됨'
});

/**
 * OpenAI API를 사용하여 윤리적 딜레마 시나리오 생성
 * @param {number} position - 보드판 위치 (1-20)
 * @returns {Promise<Object>} 시나리오 객체
 */
export async function generateScenarioWithOpenAI(position) {
  if (!OPENAI_API_KEY) {
    console.error('OpenAI API 키가 설정되지 않았습니다.');
    return null;
  }

  const systemPrompt = `당신은 중학교 1학년 학생들을 위한 AI 윤리 교육 보드게임의 시나리오 생성 전문가입니다.
각 시나리오는 다음 형식의 JSON으로 응답해야 합니다:
{
  "title": "시나리오 제목",
  "description": "상황 설명 (2-3문장)",
  "options": [
    {
      "label": "A",
      "text": "선택지 A 설명",
      "feedback": "선택지 A에 대한 피드백 (1-2문장)",
      "stats": {
        "fairness": 숫자,
        "safety": 숫자,
        "privacy": 숫자,
        "tech": 숫자
      },
      "formSummary": "선택지 A 요약"
    },
    {
      "label": "B",
      "text": "선택지 B 설명",
      "feedback": "선택지 B에 대한 피드백 (1-2문장)",
      "stats": {
        "fairness": 숫자,
        "safety": 숫자,
        "privacy": 숫자,
        "tech": 숫자
      },
      "formSummary": "선택지 B 요약"
    }
  ]
}

stats 값은 -10에서 +10 사이의 정수여야 합니다.
시나리오는 AI, 알고리즘, 데이터 프라이버시, 공정성, 기술 윤리와 관련된 현실적인 딜레마여야 합니다.`;

  const userPrompt = `${position}번 칸에 도착한 플레이어를 위한 윤리적 딜레마 시나리오를 생성해주세요.
중학교 1학년 학생들이 이해하기 쉬운 언어로 작성하고, 실제 생활에서 마주칠 수 있는 상황을 다뤄주세요.
반드시 유효한 JSON 형식으로만 응답하고, 다른 설명은 포함하지 마세요.`;

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // 비용 효율적인 모델 사용
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 1000,
        response_format: { type: 'json_object' }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API 오류:', errorData);
      throw new Error(`OpenAI API 오류: ${errorData.error?.message || '알 수 없는 오류'}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // JSON 파싱
    let scenario;
    try {
      scenario = JSON.parse(content);
    } catch (parseError) {
      // JSON 파싱 실패 시 텍스트에서 JSON 추출 시도
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        scenario = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('JSON 파싱 실패');
      }
    }

    // 시나리오 형식 검증 및 변환
    return convertToScenarioFormat(scenario, position);
  } catch (error) {
    console.error('OpenAI 시나리오 생성 실패:', error);
    return null;
  }
}

/**
 * OpenAI 응답을 게임에서 사용하는 시나리오 형식으로 변환
 */
function convertToScenarioFormat(openAIScenario, position) {
  // 기본값 설정
  const defaultStats = {
    fairness: 0,
    safety: 0,
    privacy: 0,
    tech: 0
  };

  return {
    id: position,
    category: 'AI 윤리',
    title: openAIScenario.title || '윤리적 딜레마',
    description: openAIScenario.description || '상황을 선택해주세요.',
    options: (openAIScenario.options || []).map((opt, index) => ({
      label: opt.label || (index === 0 ? 'A' : 'B'),
      text: opt.text || '선택지',
      feedback: opt.feedback || '선택하셨습니다.',
      stats: {
        fairness: opt.stats?.fairness || 0,
        safety: opt.stats?.safety || 0,
        privacy: opt.stats?.privacy || 0,
        tech: opt.stats?.tech || 0,
        responsibility: 0,
        honesty: 0,
        truth: 0,
        openMind: 0,
        order: 0,
        innovation: 0,
        efficiency: 0,
        enjoyment: 0,
        environment: 0
      },
      formSummary: opt.formSummary || `${opt.label || (index === 0 ? 'A' : 'B')} 선택`
    }))
  };
}

/**
 * OpenAI API 키 유효성 검사
 */
export function isOpenAIConfigured() {
  return !!OPENAI_API_KEY && OPENAI_API_KEY.length > 0;
}

