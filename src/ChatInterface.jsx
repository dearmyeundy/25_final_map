import { useState, useRef, useEffect } from 'react';
import './ChatInterface.css';

export default function ChatInterface({ 
  messages, 
  onSendMessage, 
  onOptionSelect,
  onRollDice,
  onRestartGame,
  showOptions,
  options,
  isWaitingForName,
  isWaitingForMode,
  isGameFinished,
  gameMode,
  onCancelSelection,
  onUndoLastSelection,
  lastSelection,
  onResetMode,
  onSaveGameData,
  currentPosition
}) {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, showOptions]);

  const handleSend = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue) {
      console.log('전송 버튼 클릭:', trimmedValue);
      onSendMessage(trimmedValue);
      setInputValue('');
    } else {
      console.log('빈 메시지, 전송하지 않음');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <h3>챗봇 <span className="en-title">Chatbot</span></h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {gameMode && (
              <>
                <span className="game-mode-badge">
                  {gameMode === 'openai' ? '🤖 AI 동적' : '📚 기본'}
                </span>
                {lastSelection && (
                  <button
                    className="mode-change-button-header"
                    onClick={onUndoLastSelection}
                    title="마지막 선택 취소"
                    disabled={isWaitingForMode || showOptions}
                  >
                    ↩️
                  </button>
                )}
                {gameMode && (
                  <button
                    className="mode-change-button-header"
                    onClick={onResetMode}
                    title="모드 변경"
                    disabled={isWaitingForMode || showOptions}
                  >
                    🔄
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      
      {!isWaitingForName && !isWaitingForMode && !showOptions && !isGameFinished && (
        <div className="dice-button-container">
          <button
            className="dice-button"
            onClick={onRollDice}
            disabled={false}
          >
            🎲 주사위 굴리기
          </button>
        </div>
      )}
      
      {isGameFinished && (
        <div className="dice-button-container">
          <button
            className="dice-button save-button"
            onClick={onSaveGameData}
          >
            💾 게임 데이터 저장하기
          </button>
        </div>
      )}
      
      {isGameFinished && currentPosition >= 20 && (
        <div className="dice-button-container">
          <button
            className="dice-button restart-button"
            onClick={onRestartGame}
          >
            🔄 게임 다시 시작하기
          </button>
        </div>
      )}
      
      <div className="chat-messages">
        {messages && messages.length > 0 ? (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.type === 'user' ? 'user-message' : 'bot-message'}`}
            >
              {msg.type === 'bot' && (
                <img 
                  src="/npc_mayor.png" 
                  alt="Mayor" 
                  className="bot-avatar"
                />
              )}
              <div className="message-content">
                {msg.text}
              </div>
            </div>
          ))
        ) : (
          <div className="message bot-message">
            <div className="message-content">
              메시지가 없습니다.
            </div>
          </div>
        )}
        
        {showOptions && options && (
          <div className="options-container">
            <div className="options-label">선택하세요:</div>
            {options.map((option, index) => (
              <button
                key={index}
                className="option-button"
                onClick={() => onOptionSelect(option)}
              >
                {option}
              </button>
            ))}
          </div>
        )}
        
        {isWaitingForMode && (
          <div className="options-container">
            <div className="options-label">게임 모드를 선택하세요:</div>
            <div className="mode-button-wrapper-inline">
              <button
                className={`option-button mode-option-button ${gameMode === 'classic' ? 'active' : ''}`}
                onClick={() => onSendMessage('1')}
              >
                1️⃣ 기본 시나리오 모드
              </button>
              <button
                className={`option-button mode-option-button ${gameMode === 'openai' ? 'active' : ''}`}
                onClick={() => onSendMessage('2')}
              >
                2️⃣ OpenAI 동적 시나리오 모드
              </button>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="chat-input-container">
        <input
          type="text"
          className="chat-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          onKeyDown={handleKeyDown}
          placeholder={isWaitingForName ? "이름을 입력하세요..." : "메시지를 입력하세요..."}
          disabled={showOptions}
        />
        <button
          className="send-button"
          onClick={handleSend}
          disabled={showOptions || !inputValue.trim()}
        >
          전송
        </button>
      </div>
    </div>
  );
}

