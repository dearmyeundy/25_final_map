import { useState } from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function EthicsChart({ stats, onSave, isGameFinished, highlightedCategories = [] }) {
  const [showTooltip, setShowTooltip] = useState(false);
  
  // 윤리 성향 분석 함수
  const analyzeEthics = () => {
    const categories = [
      { name: '공정성', value: stats.Fairness },
      { name: '안전', value: stats.Safety },
      { name: '프라이버시', value: stats.Privacy },
      { name: '기술수용성', value: stats.Tech },
    ];
    
    const sorted = [...categories].sort((a, b) => b.value - a.value);
    const highest = sorted[0];
    const second = sorted[1];
    
    const total = stats.Fairness + stats.Safety + stats.Privacy + stats.Tech;
    const average = total / 4;
    
    if (average < 40) {
      return '신중한 선택을 하는 편이에요! 🤔';
    } else if (average > 60) {
      return '적극적인 태도를 보이는 편이에요! ✨';
    } else if (highest.value > 70) {
      return `${highest.name}을(를) 가장 중요하게 생각하시는군요! 💪`;
    } else if (Math.abs(highest.value - second.value) < 10) {
      return '균형잡힌 윤리관을 가지고 계시네요! ⚖️';
    } else {
      return `${highest.name}에 중점을 두는 성향이에요! 🎯`;
    }
  };

  // 강조할 포인트 설정
  const getPointRadius = (index) => {
    const labels = ['Fairness', 'Safety', 'Privacy', 'Tech'];
    return highlightedCategories.includes(labels[index]) ? 10 : 4;
  };

  const getPointBackgroundColor = (index) => {
    const labels = ['Fairness', 'Safety', 'Privacy', 'Tech'];
    return highlightedCategories.includes(labels[index]) ? '#fbbf24' : '#3b82f6';
  };

  const getBorderColor = (index) => {
    const labels = ['Fairness', 'Safety', 'Privacy', 'Tech'];
    return highlightedCategories.includes(labels[index]) ? '#f59e0b' : '#3b82f6';
  };

  const getBorderWidth = (index) => {
    const labels = ['Fairness', 'Safety', 'Privacy', 'Tech'];
    return highlightedCategories.includes(labels[index]) ? 5 : 3;
  };

  const getPointHoverBackgroundColor = (index) => {
    const labels = ['Fairness', 'Safety', 'Privacy', 'Tech'];
    return highlightedCategories.includes(labels[index]) ? '#fbbf24' : '#fff';
  };

  const data = {
    labels: ['공정성', '안전', '프라이버시', '기술수용성'],
    datasets: [
      {
        label: '나의 윤리 성향',
        data: [
          Math.max(0, Math.min(100, stats.Fairness)),
          Math.max(0, Math.min(100, stats.Safety)),
          Math.max(0, Math.min(100, stats.Privacy)),
          Math.max(0, Math.min(100, stats.Tech)),
        ],
        backgroundColor: 'rgba(59, 130, 246, 0.15)',
        borderColor: '#3b82f6',
        borderWidth: 3,
        pointBackgroundColor: [
          getPointBackgroundColor(0),
          getPointBackgroundColor(1),
          getPointBackgroundColor(2),
          getPointBackgroundColor(3),
        ],
        pointBorderColor: [
          getBorderColor(0),
          getBorderColor(1),
          getBorderColor(2),
          getBorderColor(3),
        ],
        pointHoverBackgroundColor: [
          getPointHoverBackgroundColor(0),
          getPointHoverBackgroundColor(1),
          getPointHoverBackgroundColor(2),
          getPointHoverBackgroundColor(3),
        ],
        pointHoverBorderColor: [
          getBorderColor(0),
          getBorderColor(1),
          getBorderColor(2),
          getBorderColor(3),
        ],
        pointRadius: [
          getPointRadius(0),
          getPointRadius(1),
          getPointRadius(2),
          getPointRadius(3),
        ],
        borderWidth: [
          getBorderWidth(0),
          getBorderWidth(1),
          getBorderWidth(2),
          getBorderWidth(3),
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        min: 0,
        ticks: {
          stepSize: 20,
        },
        pointLabels: {
          font: {
            size: 11,
            weight: 'bold',
          },
          padding: 8,
        },
      },
    },
    plugins: {
      legend: {
        display: false, // 범례 제거하여 공간 확보
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.parsed.r}점`;
          }
        }
      }
    },
    animation: {
      duration: highlightedCategories.length > 0 ? 500 : 1000,
      easing: 'easeOutQuart',
    },
  };

  return (
    <div style={{ 
      height: '100%',
      padding: '5px', 
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#ffffff',
      minHeight: 0,
      overflow: 'hidden',
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
        color: '#ffffff',
        padding: '8px 15px',
        textAlign: 'center',
        boxShadow: '0 2px 4px rgba(30, 58, 138, 0.2)',
        borderBottom: '2px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '20px 20px 0 0',
        marginBottom: '8px',
        flexShrink: 0,
      }}>
        <h4 style={{ 
          margin: 0,
          fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, 맑은 고딕, sans-serif',
          fontSize: '1em',
          fontWeight: '700',
          color: '#ffffff',
        }}>
          나의 윤리 성향
        </h4>
      </div>
      <div 
        style={{ 
          flex: 1, 
          minHeight: 0,
          position: 'relative',
          cursor: isGameFinished ? 'pointer' : 'default',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onMouseEnter={() => {
          if (isGameFinished) {
            setShowTooltip(true);
          }
        }}
        onMouseLeave={() => {
          if (isGameFinished) {
            setShowTooltip(false);
          }
        }}
      >
        <Radar data={data} options={options} />
        
        {/* 말풍선 형태의 종합 멘트 (게임 종료 후 hover 시 표시) */}
        {isGameFinished && showTooltip && (
          <div style={{
            position: 'absolute',
            top: '10%',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#ffffff',
            padding: '15px 20px',
            borderRadius: '25px',
            border: '3px solid #3b82f6',
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.25)',
            zIndex: 100,
            maxWidth: '280px',
            textAlign: 'center',
            fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, 맑은 고딕, sans-serif',
            fontSize: '15px',
            fontWeight: '600',
            color: '#1e3a8a',
            animation: 'fadeInBubble 0.3s ease-in',
          }}>
            <div style={{
              position: 'absolute',
              bottom: '-12px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '12px solid transparent',
              borderRight: '12px solid transparent',
              borderTop: '12px solid #3b82f6',
            }}></div>
            <div style={{
              position: 'absolute',
              bottom: '-9px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '12px solid transparent',
              borderRight: '12px solid transparent',
              borderTop: '12px solid #ffffff',
            }}></div>
            {analyzeEthics()}
          </div>
        )}
        
        {/* 게임 종료 시 힌트 메시지 */}
        {isGameFinished && !showTooltip && (
          <div style={{
            position: 'absolute',
            top: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(236, 72, 153, 0.15)',
            padding: '8px 15px',
            borderRadius: '20px',
            fontSize: '12px',
            color: '#be185d',
            fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, 맑은 고딕, sans-serif',
            fontWeight: '600',
            border: '2px dashed #ec4899',
            pointerEvents: 'none',
          }}>
            💡 그래프에 마우스를 올려보세요!
          </div>
        )}
      </div>
    </div>
  );
}

