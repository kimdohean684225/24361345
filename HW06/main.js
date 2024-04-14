// HeartObject 클래스 정의
class HeartObject {
    constructor(parentElement) {
      this.parentElement = parentElement;
      this.heart = document.createElement('div');
      this.heart.className = 'heart';
      this.parentElement.appendChild(this.heart);
  
      // 랜덤하게 초기 설정
      this.size = Math.floor(Math.random() * 30) + 10; // 크기
      this.color = getRandomColor(); // 색상
      this.speed = Math.random() * 2 + 1; // 이동 속도
      this.rotationSpeed = Math.random() * 5 + 1; // 회전 속도
      this.direction = Math.random() * 360; // 이동 방향
      this.x = 0;
      this.y = 0;
      this.heart.style.width = this.size + 'px';
      this.heart.style.height = this.size + 'px';
      this.heart.style.backgroundColor = this.color;
      this.heart.style.position = 'absolute';
    }
  
    updatePosition(mouseX, mouseY) {
      // 마우스 위치를 중심으로 이동
      this.x += (mouseX - this.x) / 20;
      this.y += (mouseY - this.y) / 20;
  
      // 하트 이동
      this.heart.style.left = this.x + 'px';
      this.heart.style.top = this.y + 'px';
  
      // 이동 방향 조절
      const radian = (this.direction * Math.PI) / 180;
      this.x += Math.cos(radian) * this.speed;
      this.y += Math.sin(radian) * this.speed;
    }
  }
  
  // 랜덤한 색상 생성
  function getRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }
  
  // 마우스 이벤트 리스너
  document.addEventListener('DOMContentLoaded', function () {
    const container = document.body; // 하트를 추가할 부모 요소
    const hearts = []; // HeartObject들을 담을 배열
    const maxHearts = 100; // 최대 하트 개수
    let mouseX = 0; // 마우스 X 좌표
    let mouseY = 0; // 마우스 Y 좌표
  
    // 마우스 이벤트 리스너
    document.addEventListener('mousemove', function (event) {
      mouseX = event.clientX;
      mouseY = event.clientY;
    });
  
    // 주기적으로 하트 추가
    setInterval(function () {
      if (hearts.length < maxHearts) {
        const heart = new HeartObject(container);
        hearts.push(heart);
      }
    }, 200);
  
    // 애니메이션 프레임마다 하트 위치 업데이트
    function update() {
      for (let i = 0; i < hearts.length; i++) {
        hearts[i].updatePosition(mouseX, mouseY);
      }
      requestAnimationFrame(update);
    }
  
    // 애니메이션 시작
    update();
  });
  