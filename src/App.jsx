import { useState, useEffect } from 'react';
import BoardMap from './BoardMap';
import ChatInterface from './ChatInterface';
import EthicsChart from './EthicsChart';
import { 
  rollDice, 
  getScenarioByPosition, 
  submitToGoogleForm,
  convertStatsToChartFormat,
  saveGameData
} from './GameLogic';
import { generateScenarioWithOpenAI, isOpenAIConfigured } from './OpenAIService';
import './App.css';

// 음향 효과 재생 함수
function playSound(soundFile) {
  const audio = new Audio(soundFile);
  audio.volume = 0.5;
  audio.play().catch(err => console.log('음향 재생 실패:', err));
}

function App() {
  const [gameMode, setGameMode] = useState(null); // 'classic' 또는 'openai'
  const [currentPosition, setCurrentPosition] = useState(-1); // -1은 start 위치
  const [messages, setMessages] = useState([
    { type: 'bot', text: '안녕하세요! 인공지능 윤리 세계에 오신 것을 환영합니다!\n\n게임 모드를 선택해주세요:\n1️⃣ 기본 시나리오 모드 - 미리 준비된 시나리오를 사용합니다\n2️⃣ OpenAI 동적 시나리오 모드 - AI가 실시간으로 새로운 시나리오를 생성합니다' }
  ]);
  const [showOptions, setShowOptions] = useState(false);
  const [currentOptions, setCurrentOptions] = useState([]);
  const [currentScenario, setCurrentScenario] = useState(null);
  const [playerName, setPlayerName] = useState('');
  const [isWaitingForName, setIsWaitingForName] = useState(false);
  const [isWaitingForMode, setIsWaitingForMode] = useState(true);
  const [isLoadingScenario, setIsLoadingScenario] = useState(false);
  const [stats, setStats] = useState({
    Fairness: 50,
    Safety: 50,
    Privacy: 50,
    Tech: 50,
  });
  const [selectedRecords, setSelectedRecords] = useState([]); // 선택한 formSummary들을 저장
  const [lastSelection, setLastSelection] = useState(null); // 마지막 선택 정보 저장 (취소용)
  const [highlightedCategories, setHighlightedCategories] = useState([]); // 강조할 윤리 성향 분야

  const addMessage = (text, type = 'bot') => {
    setMessages(prev => {
      const newMessages = [...prev, { type, text }];
      console.log('메시지 추가:', { type, text, totalMessages: newMessages.length });
      return newMessages;
    });
    if (type === 'bot') {
      playSound('/move.mp3');
    }
  };

  const handleSendMessage = async (text) => {
    console.log('메시지 수신:', text);
    
    // 사용자 메시지 추가
    addMessage(text, 'user');

    // 게임 모드 선택 단계
    if (isWaitingForMode) {
      const lowerText = text.trim().toLowerCase();
      if (lowerText.includes('1') || lowerText.includes('기본') || lowerText.includes('시나리오')) {
        setGameMode('classic');
        setIsWaitingForMode(false);
        setIsWaitingForName(true);
        setTimeout(() => {
          addMessage('기본 시나리오 모드를 선택하셨습니다. 먼저 이름을 알려주세요.');
        }, 500);
        return;
      } else if (lowerText.includes('2') || lowerText.includes('openai') || lowerText.includes('ai') || lowerText.includes('동적')) {
        if (isOpenAIConfigured()) {
          setGameMode('openai');
          setIsWaitingForMode(false);
          setIsWaitingForName(true);
          setTimeout(() => {
            addMessage('OpenAI 동적 시나리오 모드를 선택하셨습니다. 먼저 이름을 알려주세요.');
          }, 500);
        } else {
          setTimeout(() => {
            addMessage('OpenAI API 키가 설정되지 않았습니다. 기본 시나리오 모드를 사용하거나 .env 파일에 VITE_OPENAI_API_KEY를 설정해주세요.');
          }, 500);
        }
        return;
      } else {
        setTimeout(() => {
          addMessage('게임 모드를 선택해주세요:\n1. 기본 시나리오 모드\n2. OpenAI 동적 시나리오 모드');
        }, 500);
        return;
      }
    }

    // 이름 입력 대기 중인 경우
    if (isWaitingForName) {
      const name = text.trim();
      if (name) {
        setPlayerName(name);
        setIsWaitingForName(false);
        const modeText = gameMode === 'openai' ? 'OpenAI 동적 시나리오 모드' : '기본 시나리오 모드';
        setTimeout(() => {
          addMessage(`${name}님, ${modeText}로 게임을 시작하겠습니다! 주사위 굴리기 버튼을 눌러주세요.`);
        }, 500);
      } else {
        setTimeout(() => {
          addMessage('이름을 입력해주세요!');
        }, 500);
      }
      return;
    }

    // 주사위 명령어 처리 (대소문자 무시, 공백 제거)
    const normalizedText = text.toLowerCase().trim();
    const diceCommands = ['/굴리기', '주사위', '/주사위', '굴리기', 'dice', '/dice'];
    
    if (diceCommands.includes(normalizedText)) {
      console.log('주사위 명령어 감지');
      // 주사위 굴리기는 handleRollDice로 처리
      handleRollDice();
      return;
    }

    // 일반 메시지 응답
    if (!showOptions) {
      setTimeout(() => {
        addMessage('주사위 버튼을 눌러서 게임을 진행해보세요!');
      }, 500);
    }
  };

  // 주사위 굴리기 핸들러
  const handleRollDice = () => {
    if (isWaitingForName || isWaitingForMode || isLoadingScenario) {
      if (isWaitingForMode) {
        addMessage('먼저 게임 모드를 선택해주세요!');
      } else if (isWaitingForName) {
        addMessage('먼저 이름을 입력해주세요!');
      }
      return;
    }
    
    const diceValue = rollDice();
    playSound('/dice.mp3');
    
    setTimeout(() => {
      addMessage(`주사위를 굴렸습니다: ${diceValue}이 나왔습니다!`, 'bot');
      
      setTimeout(() => {
        const targetPosition = Math.min(currentPosition + diceValue, 19);
        
        // 순차적으로 이동하는 애니메이션
        movePlayerSequentially(currentPosition, targetPosition);
      }, 500);
    }, 300);
  };

  // 시나리오 로드 함수
  const loadScenario = async (position) => {
    let scenario = null;

    if (gameMode === 'openai') {
      // OpenAI 동적 시나리오 생성
      setIsLoadingScenario(true);
      addMessage('AI가 새로운 시나리오를 생성하고 있습니다...');
      
      scenario = await generateScenarioWithOpenAI(position);
      
      setIsLoadingScenario(false);
      
      if (!scenario) {
        addMessage('시나리오 생성에 실패했습니다. 기본 시나리오를 사용합니다.');
        scenario = getScenarioByPosition(position);
      }
    } else {
      // 기본 시나리오 사용
      scenario = getScenarioByPosition(position);
    }

    return scenario;
  };

  // 순차적으로 말 이동
  const movePlayerSequentially = async (startPos, endPos) => {
    if (startPos === endPos) return;
    
    let current = startPos + 1;
    const moveStep = async () => {
      if (current <= endPos) {
        setCurrentPosition(current);
        
        if (current === endPos) {
          // 목표 위치 도착
          setTimeout(async () => {
            addMessage(`${current + 1}번 칸에 도착했습니다!`);
            
            // 시나리오 확인
            setTimeout(async () => {
              const scenario = await loadScenario(current + 1);
              if (scenario) {
                setCurrentScenario(scenario);
                
                const scenarioText = scenario.title 
                  ? `${scenario.title}\n\n${scenario.description}`
                  : scenario.description;
                addMessage(scenarioText);
                
                setTimeout(() => {
                  const options = scenario.options.map(opt => `${opt.label}: ${opt.text}`);
                  setCurrentOptions(options);
                  setShowOptions(true);
                  playSound('/quiz_alert.mp3');
                }, 1000);
              } else {
                playSound('/coin.mp3');
                addMessage('이 칸에는 특별한 이벤트가 없습니다. 계속 진행하세요!');
              }
            }, 500);
          }, 300);
        } else {
          // 다음 칸으로 이동
          current++;
          setTimeout(moveStep, 400);
        }
      }
    };
    
    moveStep();
  };

  const handleOptionSelect = async (option) => {
    if (!currentScenario) return;

    setShowOptions(false);
    addMessage(option, 'user');

    // 새로운 구조: option 문자열에서 label 추출 (예: "A: ..." -> "A")
    const choice = option.startsWith('A') ? 'A' : 'B';
    const selectedOption = currentScenario.options.find(opt => opt.label === choice);
    
    if (!selectedOption) {
      console.error('선택한 옵션을 찾을 수 없습니다:', choice);
      return;
    }

    const feedback = selectedOption.feedback;
    const optionStats = selectedOption.stats;
    const formSummary = selectedOption.formSummary;

    // 통계를 차트 형식으로 변환
    const chartStats = convertStatsToChartFormat(optionStats);
    
    // 마지막 선택 정보 저장 (취소용)
    setLastSelection({
      scenario: currentScenario,
      choice: choice,
      optionStats: chartStats,
      formSummary: formSummary,
      previousStats: { ...stats },
      previousRecords: [...selectedRecords]
    });

    // 선택한 기록 저장
    setSelectedRecords(prev => [...prev, formSummary]);

    // 변화가 있는 윤리 성향 분야 찾기
    const changedCategories = [];
    if (chartStats.Fairness !== 0) changedCategories.push({ name: '공정성', value: chartStats.Fairness });
    if (chartStats.Safety !== 0) changedCategories.push({ name: '안전', value: chartStats.Safety });
    if (chartStats.Privacy !== 0) changedCategories.push({ name: '프라이버시', value: chartStats.Privacy });
    if (chartStats.Tech !== 0) changedCategories.push({ name: '기술수용성', value: chartStats.Tech });

    // 피드백 표시
    setTimeout(() => {
      addMessage(feedback);
      
      // 변화가 있는 분야 정보 추가
      if (changedCategories.length > 0) {
        const categoryText = changedCategories
          .map(cat => {
            const sign = cat.value > 0 ? '+' : '';
            return `${cat.name} ${sign}${cat.value}`;
          })
          .join(', ');
        setTimeout(() => {
          addMessage(`📊 윤리 성향 변화: ${categoryText}`);
        }, 500);
      }
      
      // 통계 업데이트
      setStats(prev => ({
        Fairness: Math.max(0, Math.min(100, prev.Fairness + (chartStats.Fairness || 0))),
        Safety: Math.max(0, Math.min(100, prev.Safety + (chartStats.Safety || 0))),
        Privacy: Math.max(0, Math.min(100, prev.Privacy + (chartStats.Privacy || 0))),
        Tech: Math.max(0, Math.min(100, prev.Tech + (chartStats.Tech || 0))),
      }));

      // 그래프 강조 효과를 위한 카테고리 설정
      const highlightCategories = changedCategories.map(cat => {
        if (cat.name === '공정성') return 'Fairness';
        if (cat.name === '안전') return 'Safety';
        if (cat.name === '프라이버시') return 'Privacy';
        if (cat.name === '기술수용성') return 'Tech';
        return null;
      }).filter(Boolean);
      
      setHighlightedCategories(highlightCategories);
      // 2초 후 강조 효과 제거
      setTimeout(() => {
        setHighlightedCategories([]);
      }, 2000);

      playSound('/coin.mp3');

      // Google Forms 전송
      setTimeout(async () => {
        const formData = {
          name: playerName,
          topic: currentScenario.title || currentScenario.description,
          choice: choice,
          feedback: feedback,
        };

        const success = await submitToGoogleForm(formData);
        if (success) {
          // 게임 종료 여부 확인 (20번 칸 도착 여부)
          const isGameFinishedLocal = currentPosition >= 19;
          if (isGameFinishedLocal) {
            addMessage("자네의 선택을 '시민 윤리 장부'에 기록했네.");
            setTimeout(() => {
              addMessage("🎉 축하합니다! 모든 칸을 완주했습니다!");
              addMessage("게임 데이터를 저장해주세요.");
            }, 500);
          } else {
            addMessage("자네의 선택을 '시민 윤리 장부'에 기록했네. 주사위를 또 굴려보게.");
          }
        } else {
          addMessage("기록을 시도했지만 연결에 문제가 있었습니다. 나중에 다시 시도해주세요.");
        }
      }, 500);
    }, 500);

    setCurrentScenario(null);
    setCurrentOptions([]);
  };

  // 게임 데이터 저장 핸들러
  const handleSaveGameData = async () => {
    // 가장 점수가 높은 카테고리 찾기
    const categories = [
      { name: '공정성', value: stats.Fairness },
      { name: '안전', value: stats.Safety },
      { name: '프라이버시', value: stats.Privacy },
      { name: '기술수용성', value: stats.Tech },
    ];
    const highestCategory = categories.reduce((prev, current) => 
      (prev.value > current.value) ? prev : current
    );

    // 총점 계산
    const totalScore = stats.Fairness + stats.Safety + stats.Privacy + stats.Tech;

    // 기록들을 줄바꿈으로 합치기
    const records = selectedRecords.join('\n');

    const gameData = {
      name: playerName || '플레이어',
      tendency: highestCategory.name,
      records: records || '기록이 없습니다.',
      totalScore: totalScore,
    };

    const success = await saveGameData(gameData);
    if (success) {
      addMessage("윤리 장부에 기록되었습니다!");
      setIsDataSaved(true); // 데이터 저장 완료 상태로 설정
      // 플레이어를 GOAL로 이동 (20번 칸 이후 = GOAL)
      setTimeout(() => {
        setCurrentPosition(20); // GOAL 위치로 이동
        playSound('/coin.mp3');
      }, 500);
    } else {
      addMessage("저장을 시도했지만 연결에 문제가 있었습니다. 나중에 다시 시도해주세요.");
    }
  };

  // 게임 종료 확인 (20번 칸에 도착하고 답변을 선택한 후, 저장 전)
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [isDataSaved, setIsDataSaved] = useState(false);
  
  useEffect(() => {
    // 20번 칸에 도착하고 답변을 선택한 후 게임 종료로 간주
    if (currentPosition >= 19 && !showOptions && lastSelection !== null) {
      setIsGameFinished(true);
    }
  }, [currentPosition, showOptions, lastSelection]);
  
  useEffect(() => {
    // 게임 종료 메시지는 handleOptionSelect에서 처리
  }, [currentPosition]);

  // 게임 모드 초기화 함수 (게임 모드만 변경)
  const handleResetMode = () => {
    setGameMode(null);
    setIsWaitingForMode(true);
    setIsWaitingForName(false);
    setPlayerName('');
    setShowOptions(false);
    setCurrentOptions([]);
    setCurrentScenario(null);
    setIsLoadingScenario(false);
    addMessage('게임 모드를 다시 선택해주세요:\n1️⃣ 기본 시나리오 모드\n2️⃣ OpenAI 동적 시나리오 모드');
  };

  // 현재 선택 취소 함수 (답변 재입력 - 선택 중일 때)
  const handleCancelSelection = () => {
    if (!currentScenario) return;
    
    const scenario = currentScenario; // 현재 시나리오 저장
    setShowOptions(false);
    setCurrentOptions([]);
    
    addMessage('선택을 취소했습니다. 다시 선택해주세요.');
    setTimeout(() => {
      const scenarioText = scenario.title 
        ? `${scenario.title}\n\n${scenario.description}`
        : scenario.description;
      addMessage(scenarioText);
      setTimeout(() => {
        const options = scenario.options.map(opt => `${opt.label}: ${opt.text}`);
        setCurrentOptions(options);
        setCurrentScenario(scenario); // 시나리오 다시 설정
        setShowOptions(true);
      }, 500);
    }, 500);
  };

  // 마지막 선택 취소 함수 (답변 선택 후)
  const handleUndoLastSelection = () => {
    if (!lastSelection) return;

    // 통계 복원
    setStats(lastSelection.previousStats);
    
    // 기록 복원
    setSelectedRecords(lastSelection.previousRecords);
    
    // 마지막 선택 정보 초기화
    setLastSelection(null);
    
    addMessage('마지막 선택을 취소했습니다.');
  };

  // 게임 다시 시작하기 함수
  const handleRestartGame = () => {
    // 모든 상태를 초기화
    setGameMode(null);
    setCurrentPosition(-1); // START 위치
    setMessages([
      { type: 'bot', text: '안녕하세요! 인공지능 윤리 세계에 오신 것을 환영합니다! 게임 모드를 선택해주세요.' }
    ]);
    setShowOptions(false);
    setCurrentOptions([]);
    setCurrentScenario(null);
    setPlayerName('');
    setIsWaitingForName(false);
    setIsWaitingForMode(true);
    setIsLoadingScenario(false);
    setStats({
      Fairness: 50,
      Safety: 50,
      Privacy: 50,
      Tech: 50,
    });
    setSelectedRecords([]);
    setIsGameFinished(false); // 게임 재시작 시 게임 종료 상태 초기화
    setIsDataSaved(false); // 게임 재시작 시 저장 상태 초기화
  };

  return (
    <div className="app-container">
      <div className="app-header">
        <div style={{ width: '100px' }}></div>
        <div className="app-header-content">
          <h1 className="main-title">인공지능 윤리 세계</h1>
          <p className="sub-title">Algorithm Ethics World</p>
        </div>
        <div style={{ width: '100px' }}></div>
      </div>
      <div className="app-content">
        <div className="left-panel">
          <div className="board-section">
            <div className="board-header">
              <h2 className="board-header-title">보드판 <span className="en-title">Board</span></h2>
            </div>
            <BoardMap currentPosition={currentPosition} />
          </div>
          <div className="chart-section">
            <EthicsChart stats={stats} isGameFinished={isGameFinished} highlightedCategories={highlightedCategories} />
          </div>
        </div>
        
        <div className="right-panel">
          <ChatInterface
            messages={messages}
            onSendMessage={handleSendMessage}
            onOptionSelect={handleOptionSelect}
            onRollDice={handleRollDice}
            onRestartGame={handleRestartGame}
            showOptions={showOptions}
            options={currentOptions}
            isWaitingForName={isWaitingForName}
            isWaitingForMode={isWaitingForMode}
            isGameFinished={isGameFinished}
            gameMode={gameMode}
            onCancelSelection={handleCancelSelection}
            onUndoLastSelection={handleUndoLastSelection}
            lastSelection={lastSelection}
            onResetMode={handleResetMode}
            onSaveGameData={handleSaveGameData}
            currentPosition={currentPosition}
            isDataSaved={isDataSaved}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

