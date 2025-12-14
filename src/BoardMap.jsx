import { useEffect, useState } from 'react';
import './BoardMap.css';

// 20개 칸을 5개씩 4줄로 배치 (5열 4행)
// 각 줄마다 5개씩 배치
const rows = 4;
const cols = 5;
const cellSize = 10; // 각 칸의 크기 (%) - 보드판이 커짐에 따라 조정
const cellSpacing = 2.5; // 칸 사이 간격 (%) - 적절한 간격
const rowGroupSpacing = 5; // 행 그룹 사이 간격 (%) - 1~5, 6~10, 11~15, 16~20 각 그룹 사이

// 1-5, 6-10, 11-15, 16-20
const cellCoordinates = Array.from({ length: 20 }, (_, i) => {
  const row = Math.floor(i / cols);
  const col = i % cols;
  const startTop = 22; // 시작 top 위치 - 위로 8% 이동 (30 - 8)
  const startLeft = 24; // 시작 left 위치 - 왼쪽 위로 8% 이동 (32 - 8)
  
  // 각 행 그룹 사이에 30% 간격 추가
  const rowSpacing = row * (cellSize + cellSpacing) + row * rowGroupSpacing;
  
  return {
    top: `${startTop + rowSpacing}%`,
    left: `${startLeft + col * (cellSize + cellSpacing)}%`,
  };
});

// START는 1번 왼쪽 (1번과 같은 높이)
const startPosition = { 
  top: cellCoordinates[0].top, 
  left: `${parseFloat(cellCoordinates[0].left) - cellSize - cellSpacing}%` 
};

// GOAL은 20번 오른쪽 (20번과 같은 높이)
const goalPosition = { 
  top: cellCoordinates[19].top, 
  left: `${parseFloat(cellCoordinates[19].left) + cellSize + cellSpacing}%` 
};

export default function BoardMap({ currentPosition }) {
  const [playerStyle, setPlayerStyle] = useState({
    top: startPosition.top,
    left: startPosition.left,
  });

  useEffect(() => {
    // currentPosition이 -1이면 START, 0~19는 1~20번 칸, 20 이상이면 GOAL
    let position;
    if (currentPosition < 0) {
      position = startPosition;
    } else if (currentPosition >= cellCoordinates.length) {
      position = goalPosition;
    } else {
      position = cellCoordinates[currentPosition];
    }
    
    setPlayerStyle({
      top: position.top,
      left: position.left,
    });
  }, [currentPosition]);

  return (
    <div className="board-map-container">
      <div 
        className="board-background"
        style={{
          backgroundColor: '#ffffff', // 하얀색
          position: 'relative',
          width: '100%',
          height: '100%',
          maxWidth: '100%',
          maxHeight: '100%',
          aspectRatio: '1 / 1',
          borderRadius: '20px',
          border: '3px solid #3b82f6',
        }}
      >
        {/* 플레이어 아바타 */}
        <div
          className="player-avatar"
          style={{
            position: 'absolute',
            top: playerStyle.top,
            left: playerStyle.left,
            transform: 'translate(-50%, -50%)',
            transition: 'all 0.4s ease',
            width: '20.16%', // 보드판 크기에 비례하여 조정 (16.8%의 120%)
            height: '20.16%', // 보드판 크기에 비례하여 조정 (16.8%의 120%)
            minWidth: '100.8px', // 최소 크기 보장 (84px의 120%)
            minHeight: '100.8px', // 최소 크기 보장 (84px의 120%)
            zIndex: 10,
          }}
        >
          <img 
            src="/player_avatar.png" 
            alt="Player" 
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>
        
        {/* START 표시 (1번 왼쪽, 수평라인 가운데 정렬) */}
        <div
          className="board-start"
          style={{
            position: 'absolute',
            top: startPosition.top,
            left: startPosition.left,
            transform: 'translate(-50%, -50%)',
            padding: 'clamp(6px, 1.2%, 12px) clamp(10px, 2%, 18px)', // 보드판 크기에 비례
            background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
            borderRadius: '20px',
            fontSize: 'clamp(9px, 1vw, 13px)', // 보드판 크기에 따라 조정되는 폰트
            fontWeight: '700',
            color: 'white',
            border: '3px solid #fff',
            boxShadow: '0 3px 10px rgba(0,0,0,0.2)',
            zIndex: 5,
            fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, 맑은 고딕, sans-serif',
          }}
        >
          🚀 START
        </div>

        {/* 칸 번호 표시 (1~20번) */}
        {cellCoordinates.map((coord, index) => (
          <div
            key={index}
            className="board-cell-number"
            style={{
              position: 'absolute',
              top: coord.top,
              left: coord.left,
              transform: 'translate(-50%, -50%)',
              width: '4.5%', // 보드판 크기에 비례하여 조정
              height: '4.5%', // 보드판 크기에 비례하여 조정
              minWidth: '28px', // 최소 크기 보장
              minHeight: '28px', // 최소 크기 보장
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#9ca3af', // 회색 배경
              borderRadius: '50%',
              fontSize: 'clamp(10px, 1.2vw, 14px)', // 보드판 크기에 따라 조정되는 폰트
              fontWeight: '700',
              color: '#ffffff', // 회색 배경에 맞춰 흰색 텍스트
              border: '3px solid #fff',
              boxShadow: '0 3px 10px rgba(0,0,0,0.3)',
              zIndex: 5,
              fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, 맑은 고딕, sans-serif',
            }}
          >
            {index + 1}
          </div>
        ))}

        {/* GOAL 표시 (20번 왼쪽, 수평라인 가운데 정렬) */}
        <div
          className="board-goal"
          style={{
            position: 'absolute',
            top: goalPosition.top,
            left: goalPosition.left,
            transform: 'translate(-50%, -50%)',
            padding: 'clamp(6px, 1.2%, 12px) clamp(10px, 2%, 18px)', // 보드판 크기에 비례
            background: 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)',
            borderRadius: '20px',
            fontSize: 'clamp(9px, 1vw, 13px)', // 보드판 크기에 따라 조정되는 폰트
            fontWeight: '700',
            color: 'white',
            border: '3px solid #fff',
            boxShadow: '0 3px 10px rgba(0,0,0,0.2)',
            zIndex: 5,
            fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, 맑은 고딕, sans-serif',
          }}
        >
          🎯 GOAL
        </div>
      </div>
    </div>
  );
}

