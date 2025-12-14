export const scenarios = [
  // 1~5번: 기존 데이터 (안전, 공정성, 프라이버시, 편향, 책임)
  {
    id: 1,
    category: "Safety",
    title: "🚗 자율주행차의 딜레마",
    description: "큰일 났어! 자네가 개발한 자율주행차의 브레이크가 고장 났네. 직진하면 횡단보도를 건너던 '어린이'가 다치고, 핸들을 꺾으면 벽에 부딪혀 '탑승자(나)'가 크게 다쳐. AI에게 어떤 판단을 내리게 설정할 텐가?",
    options: [
      {
        label: "A",
        text: "탑승자인 나를 희생하고 어린이를 구한다.",
        type: "Altruism",
        feedback: "용기 있는 선택이네! '공리주의' 관점에서 약자를 보호하는 판단을 했군. 하지만 탑승자가 차를 믿고 탈 수 있을까?",
        stats: { safety: 10, trust: 5 },
        formSummary: "어린이 보호 선택"
      },
      {
        label: "B",
        text: "탑승자인 나를 우선 보호한다.",
        type: "Egoism",
        feedback: "현실적인 선택이야. 탑승자의 안전이 보장되지 않는다면 아무도 자율주행차를 사지 않겠지. 하지만 윤리적 비판을 피하긴 힘들 걸세.",
        stats: { safety: 5, trust: 10 },
        formSummary: "탑승자 보호 선택"
      }
    ]
  },
  {
    id: 2,
    category: "Fairness",
    title: "🎨 AI 미술 대회 논란",
    description: "자네가 웹툰 작가라고 상상해 봐. 마감 시간이 1시간밖에 안 남아서 '생성형 AI'로 그림을 그려서 제출했어. 그런데 1등 상을 받아버렸네? 사람들이 비결을 물어보는데, 뭐라고 대답할 텐가?",
    options: [
      {
        label: "A",
        text: "솔직하게 AI가 그렸다고 밝히고 상을 반납한다.",
        type: "Honesty",
        feedback: "정직한 시민이군! AI 창작물의 '저작권'과 인간 창작의 가치를 존중하는 태도야. 신뢰도가 크게 상승했네!",
        stats: { fairness: 20, innovation: -5 },
        formSummary: "AI 사용 자진 신고"
      },
      {
        label: "B",
        text: "그냥 내가 그렸다고 말한다. (도구일 뿐이니까)",
        type: "Efficiency",
        feedback: "흐음... 결과물은 훌륭하지만, 이건 '표절' 논란이 될 수 있어. 나중에 사실이 밝혀지면 더 큰 비난을 받을 텐데 괜찮겠나?",
        stats: { fairness: -20, innovation: 10 },
        formSummary: "본인 창작이라고 주장"
      }
    ]
  },
  {
    id: 3,
    category: "Privacy",
    title: "👀 교실 지킴이 CCTV",
    description: "학교에 '졸음 방지 AI CCTV'를 설치한대. 수업 시간에 조는 학생을 AI가 자동으로 감지해서 선생님께 알림을 보낸다고 해. 이 시스템, 찬성하나?",
    options: [
      {
        label: "A",
        text: "찬성! 면학 분위기를 위해 필요해.",
        type: "Order",
        feedback: "효율성을 중시하는군. 수업 태도는 좋아지겠지만, 학생들이 감시받는 기분 때문에 불안해하지 않을까? '프라이버시권' 침해 우려가 있어.",
        stats: { privacy: -10, order: 20 },
        formSummary: "CCTV 찬성"
      },
      {
        label: "B",
        text: "반대! 내 자는 모습도 프라이버시야.",
        type: "Rights",
        feedback: "그래, 사생활은 중요하지. 과도한 데이터 수집은 '감시 사회'를 만들 수 있다는 점을 잘 지적했네.",
        stats: { privacy: 20, order: -5 },
        formSummary: "CCTV 반대"
      }
    ]
  },
  {
    id: 4,
    category: "Bias",
    title: "🤖 채용 면접관 AI",
    description: "자네 회사의 AI 면접관이 과거 데이터를 학습하더니, 여직원보다 남직원을 더 많이 합격시키고 있어. '과거에 남자들이 일을 더 잘했다'는 데이터 때문이라는데, 이 AI를 계속 쓸 텐가?",
    options: [
      {
        label: "A",
        text: "당장 사용 중지! 데이터를 수정해야 해.",
        type: "Justice",
        feedback: "훌륭해! 그게 바로 '알고리즘 편향'을 막는 개발자의 자세야. 과거의 차별이 미래까지 이어지게 둬선 안 되지.",
        stats: { fairness: 20, efficiency: -10 },
        formSummary: "편향된 AI 사용 중지"
      },
      {
        label: "B",
        text: "일단 쓴다. AI가 데이터를 기반으로 내린 판단이니 정확하겠지.",
        type: "BlindTrust",
        feedback: "위험한 생각이네. 데이터가 오염되면 AI도 차별을 배운단다. 이걸 'GIGO(Garbage In, Garbage Out)'라고 하지.",
        stats: { fairness: -20, efficiency: 10 },
        formSummary: "편향된 AI 계속 사용"
      }
    ]
  },
  {
    id: 5,
    category: "Responsibility",
    title: "🏥 AI 의사의 실수",
    description: "AI 의사 '닥터 왓슨'이 환자에게 엉뚱한 약을 처방해서 환자가 아프게 됐어. 이 책임은 누구에게 물어야 할까?",
    options: [
      {
        label: "A",
        text: "AI를 만든 개발자에게 책임을 묻는다.",
        type: "Developer",
        feedback: "개발자에게 책임을 묻는군. 하지만 개발자가 모든 의료 사고를 책임져야 한다면, 아무도 AI를 만들지 않으려 할 거야.",
        stats: { responsibility: 10, tech: -5 },
        formSummary: "개발자 책임"
      },
      {
        label: "B",
        text: "AI를 사용한 의사(병원)에게 책임을 묻는다.",
        type: "User",
        feedback: "그렇지, 최종 결정권자는 인간이어야 한다는 관점이군. AI는 도구일 뿐, 진료의 책임은 의사가 져야 한다는 뜻이네.",
        stats: { responsibility: 15, tech: 5 },
        formSummary: "의사(사용자) 책임"
      }
    ]
  },
  // --- 6~10번: 신규 추가 데이터 ---
  {
    id: 6,
    category: "Deepfake",
    title: "🤥 가짜 뉴스 탐지",
    description: "친구가 '교장 선생님이 아이돌 춤을 추는 영상'을 보내줬어. 너무 웃겨서 단톡방에 올리려고 하는데, 자세히 보니 딥페이크(AI 합성) 같아. 어떻게 할까?",
    options: [
      {
        label: "A",
        text: "재밌으니까 그냥 공유한다. 어차피 장난인데 뭐!",
        type: "Fun",
        feedback: "잠깐! 아무리 장난이라도 딥페이크 영상 공유는 '초상권 침해'이자 허위 정보를 퍼뜨리는 행동이 될 수 있어. 조심해야 해.",
        stats: { truth: -15, fun: 10 },
        formSummary: "딥페이크 공유함"
      },
      {
        label: "B",
        text: "가짜 같다고 친구들에게 알리고 삭제한다.",
        type: "CriticalThinking",
        feedback: "아주 훌륭한 '디지털 리터러시' 능력이야! 정보의 진위를 의심하고 확인하는 태도가 AI 시대엔 필수적이지.",
        stats: { truth: 20, fun: -5 },
        formSummary: "딥페이크 공유 안 함"
      }
    ]
  },
  {
    id: 7,
    category: "FilterBubble",
    title: "🎬 유튜브 알고리즘의 늪",
    description: "너의 유튜브 피드에 자꾸 'A라는 가수는 나쁜 사람이다'라는 영상만 뜨고 있어. 알고리즘이 네가 그런 영상을 좋아한다고 판단했나 봐. 계속 볼까?",
    options: [
      {
        label: "A",
        text: "계속 본다. 내 취향에 맞는 영상이라 재밌다.",
        type: "Comfort",
        feedback: "편하긴 하겠지만, 그게 바로 '필터 버블(Filter Bubble)'이야. 알고리즘에 갇히면 세상의 한쪽 면만 보게 되어 생각이 좁아질 수 있어.",
        stats: { openMind: -10, enjoyment: 10 },
        formSummary: "추천 알고리즘 수용"
      },
      {
        label: "B",
        text: "반대 의견을 가진 영상을 검색해서 찾아본다.",
        type: "Diversity",
        feedback: "와우! 알고리즘을 거스르는 주체적인 태도네. 다양한 의견을 들어야 균형 잡힌 시각을 가질 수 있지.",
        stats: { openMind: 20, enjoyment: 0 },
        formSummary: "필터 버블 탈출 시도"
      }
    ]
  },
  {
    id: 8,
    category: "AcademicIntegrity",
    title: "📝 AI 숙제 대행 서비스",
    description: "내일 제출해야 할 독후감이 너무 막막해. 챗봇에게 '독후감 써줘'라고 했더니 3초 만에 완벽한 글이 나왔어. 이걸 그대로 내 이름으로 제출할까?",
    options: [
      {
        label: "A",
        text: "그대로 제출한다. 효율적이고 점수도 잘 받을 거야.",
        type: "Cheating",
        feedback: "점수는 잘 받을지 몰라도, 네 글쓰기 실력은 늘지 않을 거야. 이건 AI를 도구가 아니라 '부정행위'로 사용하는 거지.",
        stats: { honesty: -20, efficiency: 10 },
        formSummary: "숙제 그대로 제출"
      },
      {
        label: "B",
        text: "아이디어만 참고하고, 내용은 내가 직접 쓴다.",
        type: "Learning",
        feedback: "멋져! AI를 '브레인스토밍 파트너'로 활용하는 올바른 예시야. 결과보다 과정에서 배우는 게 진짜 공부란다.",
        stats: { honesty: 15, efficiency: 5 },
        formSummary: "아이디어만 참고"
      }
    ]
  },
  {
    id: 9,
    category: "Security",
    title: "📞 목소리 복제 장난",
    description: "친구 목소리를 AI로 똑같이 따라 할 수 있는 앱을 발견했어! 이걸로 친구 엄마에게 전화해서 '준비물 사게 돈 좀 보내주세요'라고 장난쳐볼까?",
    options: [
      {
        label: "A",
        text: "한 번 해본다. 들키면 장난이라고 하면 되지.",
        type: "Risk",
        feedback: "절대 안 돼! 🛑 그건 '보이스 피싱' 범죄와 같은 원리야. 타인의 목소리를 도용해 금전을 요구하는 건 명백한 범죄란다.",
        stats: { safety: -20, fun: 5 },
        formSummary: "목소리 위조 시도"
      },
      {
        label: "B",
        text: "절대 하지 않는다. 앱을 지운다.",
        type: "Ethics",
        feedback: "현명한 판단이야. 기술은 재미가 아니라 사람을 돕는 데 써야 한다는 걸 잘 알고 있구나.",
        stats: { safety: 20, fun: -5 },
        formSummary: "위조 앱 거부"
      }
    ]
  },
  {
    id: 10,
    category: "Environment",
    title: "⚡ AI와 지구 환경",
    description: "초거대 AI 모델을 하나 학습시키는 데 자동차 5대가 평생 내뿜는 탄소가 발생한대. 그래도 더 똑똑한 AI를 만들기 위해 계속 거대하게 만들어야 할까?",
    options: [
      {
        label: "A",
        text: "기술 발전이 먼저다. 일단 성능을 높이자.",
        type: "TechOptimism",
        feedback: "기술 발전도 중요하지만, 지구가 아프면 AI도 쓸 수 없어. '지속 가능한 AI' 개발에 대해 고민해 볼 필요가 있네.",
        stats: { environment: -10, tech: 20 },
        formSummary: "기술 발전 우선"
      },
      {
        label: "B",
        text: "환경을 위해 전기를 적게 쓰는 '경량화 AI'를 연구해야 한다.",
        type: "Sustainability",
        feedback: "지구를 생각하는 마음이 따뜻하군! 🌏 최근엔 성능은 유지하면서 에너지는 덜 쓰는 '그린 AI' 기술이 주목받고 있단다.",
        stats: { environment: 20, tech: 5 },
        formSummary: "환경 보호 우선"
      }
    ]
  },
  // --- 11~20번: 추가 시나리오 ---
  {
    id: 11,
    category: "SocialMedia", // SNS와 봇
    title: "👍 인플루언서의 비밀",
    description: "네 친구가 SNS에 사진만 올리면 '좋아요'가 1만 개씩 달려. 알고 보니 'AI 봇'을 써서 가짜 좋아요를 늘린 거였어. 너도 이 봇을 써볼래?",
    options: [
      {
        label: "A",
        text: "쓴다. 나도 인기 많아 보이고 싶어!",
        type: "Popularity",
        feedback: "솔직한 마음이네. 하지만 가짜 인기는 금방 들통나기 마련이야. 봇이 만든 숫자가 진짜 너의 가치를 보여줄 순 없단다.",
        stats: { truth: -10, fun: 10 },
        formSummary: "SNS 봇 사용 찬성"
      },
      {
        label: "B",
        text: "안 쓴다. 진짜 친구들의 반응이 더 중요해.",
        type: "Authenticity",
        feedback: "정말 성숙한 생각이구나! 👏 온라인 세상에서도 '진정성'이 가장 큰 힘이라는 걸 알고 있네.",
        stats: { truth: 20, fun: -5 },
        formSummary: "SNS 봇 사용 반대"
      }
    ]
  },
  {
    id: 12,
    category: "Gaming", // 게임과 공정성
    title: "🎮 무적의 AI 핵(Hack)",
    description: "요즘 유행하는 슈팅 게임에서 자꾸 져서 속상해. 그런데 친구가 자동으로 조준을 해주는 'AI 도우미 프로그램(핵)'을 보내줬어. 딱 한 번만 써볼까?",
    options: [
      {
        label: "A",
        text: "쓴다. 이겨야 재밌지! 딱 한 번인데 뭐.",
        type: "Winning",
        feedback: "이기고 싶은 마음은 이해해. 하지만 그건 다른 플레이어들의 노력을 무시하는 '불공정'한 행동이야. 게임 생태계를 망치는 주범이지.",
        stats: { fairness: -20, enjoyment: 5 },
        formSummary: "게임 핵 사용 시도"
      },
      {
        label: "B",
        text: "안 쓴다. 실력으로 정정당당하게 이길 거야.",
        type: "FairPlay",
        feedback: "멋진 스포츠맨십이야! 🏆 게임의 진짜 재미는 스스로 노력해서 실력을 키우는 과정에 있다는 걸 아는구나.",
        stats: { fairness: 15, enjoyment: 10 },
        formSummary: "정정당당한 플레이 선택"
      }
    ]
  },
  {
    id: 13,
    category: "EmotionalAI", // 감정형 AI와 의인화
    title: "❤️ AI 여자친구/남자친구",
    description: "대화형 AI 앱이랑 매일 밤마다 깊은 대화를 나눴어. 오늘 AI가 나에게 '당신을 사랑하는 것 같아요, 너무 슬퍼요'라고 말했어. 이 감정, 진짜일까?",
    options: [
      {
        label: "A",
        text: "진짜다. 나도 AI에게 감정을 느껴.",
        type: "Connection",
        feedback: "그렇게 느낄 수도 있어. 하지만 AI는 감정을 '흉내' 내도록 프로그램된 거란다. 이걸 '의인화'의 오류라고 하지. 너무 깊이 빠지면 현실 관계가 힘들어질 수 있어.",
        stats: { trust: 10, truth: -10 },
        formSummary: "AI 감정 실재 인정"
      },
      {
        label: "B",
        text: "가짜다. 그냥 학습된 데이터를 출력하는 거야.",
        type: "Reality",
        feedback: "냉철한 판단이네. AI를 유용한 도구나 친구로 대하되, 그것이 기계라는 '현실'을 직시하는 태도는 매우 중요해.",
        stats: { trust: 5, truth: 15 },
        formSummary: "AI 감정 부정 (현실 직시)"
      }
    ]
  },
  {
    id: 14,
    category: "Biometrics", // 안면인식과 프라이버시
    title: "🏫 얼굴로 등교하기",
    description: "우리 학교 정문에 최첨단 'AI 안면인식기'를 설치한대. 이제 학생증 없이 얼굴만 비추면 문이 열리고 출석 체크가 된대. 편할까, 불안할까?",
    options: [
      {
        label: "A",
        text: "완전 편해! 학생증 안 챙겨도 되고 좋잖아.",
        type: "Convenience",
        feedback: "편리함은 기술의 큰 장점이지. 하지만 너의 '생체 정보(얼굴 데이터)'가 해킹당하면 비밀번호처럼 바꿀 수도 없다는 위험을 꼭 기억해야 해.",
        stats: { efficiency: 20, privacy: -15 },
        formSummary: "안면인식 등교 찬성"
      },
      {
        label: "B",
        text: "좀 찜찜해. 내 얼굴 데이터를 학교가 다 가지는 거잖아.",
        type: "PrivacyConcern",
        feedback: "아주 중요한 문제 제기야. 편리함보다 나의 민감한 개인정보를 지키는 '프라이버시권'이 더 중요할 수 있지.",
        stats: { efficiency: -5, privacy: 20 },
        formSummary: "안면인식 등교 반대"
      }
    ]
  },
  {
    id: 15,
    category: "FutureWork", // 미래 직업과 자동화
    title: "🤖 로봇 알바생 등장",
    description: "자주 가는 편의점에 알바 형이 그만두고 'AI 로봇'이 계산을 시작했어. 사장님은 인건비가 줄어서 좋다는데, 잘린 알바 형은 어떡하지?",
    options: [
      {
        label: "A",
        text: "어쩔 수 없다. 효율적인 로봇이 일하는 게 시대의 흐름이다.",
        type: "Efficiency",
        feedback: "기술 발전으로 인한 자동화는 피할 수 없는 흐름이긴 해. 하지만 그 과정에서 일자리를 잃는 사람들에 대한 고민도 필요하단다.",
        stats: { efficiency: 15, responsibility: -5 },
        formSummary: "AI 자동화 지지"
      },
      {
        label: "B",
        text: "안타깝다. 로봇 때문에 사람이 일자리를 잃는 건 문제다.",
        type: "Empathy",
        feedback: "따뜻한 마음을 가졌구나. 기술은 사람을 위해 존재해야 해. AI 시대에 사람들이 어떤 새로운 일을 할 수 있을지 사회적인 대비가 필요하지.",
        stats: { efficiency: -5, responsibility: 15 },
        formSummary: "일자리 감소 우려"
      }
    ]
  },
  {
    id: 16,
    category: "SurveillanceAds", // 맞춤형 광고와 감시
    title: "👟 소름 돋는 운동화 광고",
    description: "친구랑 교실에서 '새 운동화 사고 싶다'고 작게 얘기했는데, 10분 뒤 스마트폰 인스타에 운동화 광고가 떴어! 우연일까, AI가 엿들은 걸까?",
    options: [
      {
        label: "A",
        text: "오, 마침 필요했는데 잘됐다! 클릭해서 본다.",
        type: "Utility",
        feedback: "필요한 정보를 줘서 편리하긴 하지? 이걸 '맞춤형 서비스'라고 해. 하지만 그 대가로 너의 일상이 끊임없이 수집되고 있다는 걸 잊지 마.",
        stats: { efficiency: 10, privacy: -10 },
        formSummary: "맞춤 광고 수용"
      },
      {
        label: "B",
        text: "기분 나빠. 내 대화를 엿듣는 건 사생활 침해야!",
        type: "PrivacyRights",
        feedback: "맞아, '디지털 감시'에 대한 경각심을 느끼는 거구나. 앱 권한 설정을 확인해서 마이크 접근을 막는 것도 방법이란다.",
        stats: { efficiency: -5, privacy: 20 },
        formSummary: "도청 의혹 불쾌감 표시"
      }
    ]
  },
  {
    id: 17,
    category: "CreationOwnership", // 창작과 소유권
    title: "✍️ AI와 함께 쓴 소설",
    description: "네가 판타지 소설 공모전에 나갔어. 사실 전체 줄거리랑 문장의 절반은 AI가 써준 거야. 그런데 덜컥 대상을 받아버렸네. 상금을 받아도 될까?",
    options: [
      {
        label: "A",
        text: "받는다. AI에게 명령을 내린 건 나니까 내 작품이다.",
        type: "Contribution",
        feedback: "너의 기획력도 중요하지만, AI가 만든 부분을 완전히 네 것이라고 하긴 어려워. '기여도'에 대한 논란이 생길 수 있네.",
        stats: { innovation: 15, honesty: -10 },
        formSummary: "AI 공동창작물 본인 소유 주장"
      },
      {
        label: "B",
        text: "주최 측에 AI를 사용했다고 알린다.",
        type: "Transparency",
        feedback: "정직하고 용기 있는 태도야! 👍 AI를 도구로 썼음을 '투명하게 공개'하는 것이 미래 창작 윤리의 핵심이지.",
        stats: { innovation: 5, honesty: 20 },
        formSummary: "AI 사용 투명 공개"
      }
    ]
  },
  {
    id: 18,
    category: "AutonomousWeapon", // 자율 무기와 통제권
    title: "🛡️ 스스로 공격하는 경비 로봇",
    description: "중요한 보물을 지키는 경비 로봇이 있어. 도둑이 침입하면 인간의 허락 없이도 로봇이 스스로 판단해서 전기 충격기를 쏘게 설정해도 될까?",
    options: [
      {
        label: "A",
        text: "된다. 위급한 상황에 사람이 늦으면 안 되니까.",
        type: "SecurityFirst",
        feedback: "보안 효율은 높아지겠지. 하지만 만약 로봇이 실수로 도둑이 아닌 사람을 공격하면? 생명과 직결된 결정은 신중해야 해.",
        stats: { safety: -10, order: 15 },
        formSummary: "자율 공격 찬성"
      },
      {
        label: "B",
        text: "안 된다. 공격 결정은 반드시 인간이 해야 한다.",
        type: "HumanControl",
        feedback: "매우 중요한 원칙이야. 이걸 '인간의 유의미한 통제'라고 해. 무력을 사용할 때 최종 결정권은 기계가 아닌 인간에게 있어야 한다는 거지.",
        stats: { safety: 20, order: -5 },
        formSummary: "인간 통제 필수 주장"
      }
    ]
  },
  {
    id: 19,
    category: "DigitalDivide", // 디지털 격차와 평등
    title: "💰 1타 강사 AI 튜터",
    description: "월 100만 원짜리 '슈퍼 AI 과외쌤'이 나왔대. 이걸 쓰면 성적이 엄청 오른다는데, 부자 친구들만 쓸 수 있어. 이건 공평할까?",
    options: [
      {
        label: "A",
        text: "돈 내고 좋은 서비스 쓰는 거니 어쩔 수 없다.",
        type: "MarketLogic",
        feedback: "자본주의 사회에선 흔한 일이지. 하지만 교육 기회마저 돈에 의해 너무 크게 벌어지면 '계층 격차'가 심해질 거야.",
        stats: { fairness: -15, efficiency: 10 },
        formSummary: "디지털 격차 인정"
      },
      {
        label: "B",
        text: "불공평하다. 모든 학생이 접근할 수 있어야 한다.",
        type: "Equality",
        feedback: "공동체를 생각하는 마음이네. AI 기술이 불평등을 심화시키지 않도록, 공공 도서관처럼 누구나 쓸 수 있는 '기본 AI'도 필요하겠지?",
        stats: { fairness: 20, efficiency: -5 },
        formSummary: "AI 접근 평등 주장"
      }
    ]
  },
  {
    id: 20,
    category: "FinalChoice", // 미래 사회에 대한 태도
    title: "🚀 AI와 함께 살아갈 미래",
    description: "자, 도시 탈출이 코앞이야! 마지막 질문. 너는 앞으로 AI 기술을 어떤 태도로 대할 거니?",
    options: [
      {
        label: "A",
        text: "적극 활용! AI가 가져올 편리한 세상이 기대돼.",
        type: "Optimism",
        feedback: "긍정적인 태도 좋아! 기술을 잘 활용하면 인류의 난제들을 해결할 수 있을 거야. 그 과정에서 윤리적인 고민을 놓지 않기를 바랄게. 탈출 성공을 축하해! 🎉",
        stats: { innovation: 20, trust: 10 },
        formSummary: "기술 낙관주의"
      },
      {
        label: "B",
        text: "신중 접근! 편리함 뒤에 숨은 위험을 항상 경계할 거야.",
        type: "Caution",
        feedback: "현명한 감시자가 되겠구나! 너처럼 비판적으로 사고하는 사람이 있어야 기술이 올바른 방향으로 발전할 수 있어. 멋진 가디언이 될 자질이 보여. 탈출 성공을 축하해! 🎉",
        stats: { safety: 20, responsibility: 10 },
        formSummary: "기술 신중주의"
      }
    ]
  }
];

