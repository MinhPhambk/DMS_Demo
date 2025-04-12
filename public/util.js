

document.addEventListener('DOMContentLoaded', () => {
  const alertContainer = document.getElementById('alert-container');

  function showChill() {
    alertContainer.innerHTML = `
      <div class="chill"><i class="fas fa-sun"></i> Bạn Đang Tỉnh Táo!</div>
    `;
  }

  function showDanger() {
    alertContainer.innerHTML = `
      <div class="danger"><i class="fas fa-skull"></i> Bạn Đang Buồn Ngủ!</div>
    `;
  }

  function blinkDangerAndBackToChill(times = 30, interval = 500) {
    let count = 0;
    const blink = setInterval(() => {
      if (count % 2 === 0) {
        showDanger();
      } else {
        alertContainer.innerHTML = '<div class="chill"><i class="fas fa-sun"></i> Bạn Đang Tỉnh Táo!</div>'; // Ẩn đi để nháy
      }

      count++;
      if (count >= times * 2) {
        clearInterval(blink);
        showChill();
      }
    }, interval);
  }

  showChill(); // Hiển thị ban đầu

  // Cứ 30s sẽ nháy trạng thái "Buồn Ngủ" 3 lần, sau đó quay về "Tỉnh Táo"
  setInterval(() => {
    blinkDangerAndBackToChill(400); // 3 lần nháy, mỗi lần cách 400ms
  }, 15000);
});



const ctx = document.getElementById('status-chart').getContext('2d');

// Tạo gradient màu cho đường line
const gradient = ctx.createLinearGradient(0, 0, 0, 160);
gradient.addColorStop(0, 'rgba(0, 255, 135, 0.9)');
gradient.addColorStop(1, 'rgba(0, 255, 135, 0.1)');

const statusChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Tỷ Lệ Mất Tập Trung',
      data: [],
      fill: true,
      backgroundColor: gradient,
      borderColor: '#00ff87',
      borderWidth: 2,
      pointRadius: 0,
      tension: 0.35
    }]
  },
  options: {
    animation: {
      duration: 300
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,
        max: 1,
        grid: {
          color: 'rgba(255,255,255,0.1)'
        },
        ticks: {
          color: '#ccc'
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#ccc'
        },
      }
    },
    plugins: {
      title: {
        display: true,
        text: 'Tỷ Lệ Mất Tập Trung',
        color: '#fff',
        font: {
          size: 17,
          weight: 'bold'
        },
        padding: {
          top: 10,
          bottom: 20
        }
      },
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: '#222',
        titleColor: '#00ff87',
        bodyColor: '#fff'
      }
    }
  }
});

let time = 0;
let lastValue = 0.1;  // Giá trị ban đầu (tùy chỉnh giá trị ban đầu nếu cần)

setInterval(() => {
  // Thay đổi giá trị ngẫu nhiên một cách mượt mà, giá trị này sẽ thay đổi trong một phạm vi nhất định
  const randomChange = (Math.random() - 0.5) * 0.1; // Biến động trong khoảng ±0.05
  const newValue = Math.max(0, Math.min(1, lastValue + randomChange)); // Đảm bảo giá trị trong khoảng 0-1

  if (statusChart.data.labels.length > 40) {
    statusChart.data.labels.shift();
    statusChart.data.datasets[0].data.shift();
  }

  statusChart.data.labels.push(time++);
  statusChart.data.datasets[0].data.push(newValue);
  statusChart.update();

  lastValue = newValue;  // Cập nhật giá trị cuối cùng để tiếp tục biến thiên
}, 100);


const ctx1 = document.getElementById('status-chart1').getContext('2d');

// Tạo gradient màu cho đường line
const gradient1 = ctx1.createLinearGradient(0, 0, 0, 160);
gradient1.addColorStop(0, 'rgba(0, 123, 255, 0.9)');  // Màu xanh biển
gradient1.addColorStop(1, 'rgba(0, 123, 255, 0.1)');  // Màu xanh biển nhạt

const statusChart1 = new Chart(ctx1, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Tỷ Lệ Mất Tập Trung',
      data: [],
      fill: true,
      backgroundColor: gradient1,  // Áp dụng gradient xanh biển
      borderColor: '#007bff',  // Đổi màu đường viền thành xanh biển
      borderWidth: 2,
      pointRadius: 0,
      tension: 0.35
    }]
  },
  options: {
    animation: {
      duration: 300
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,
        max: 180,  // Đổi phạm vi trục Y từ 0 đến 180
        grid: {
          color: 'rgba(255,255,255,0.1)'
        },
        ticks: {
          color: '#fff'  // Màu chữ trục Y vẫn là trắng
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#fff'  // Màu chữ trục X vẫn là trắng
        },
      }
    },
    plugins: {
      title: {
        display: true,
        text: 'Độ Lệch Đầu So Với Màn Hình',
        color: '#fff',  // Màu chữ tiêu đề vẫn là trắng
        font: {
          size: 17,
          weight: 'bold'
        },
        padding: {
          top: 10,
          bottom: 20
        }
      },
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: '#222',
        titleColor: '#007bff',  // Màu tiêu đề tooltip là xanh biển
        bodyColor: '#fff'  // Màu chữ trong tooltip là trắng
      }
    }
  },
  height: 190
});

let time1 = 0;
setInterval(() => {
  const randomValue1 = Math.random() * (120 - 60) + 60;  // Thay đổi giá trị ngẫu nhiên để nằm trong phạm vi từ 0 đến 180
  if (statusChart1.data.labels.length > 40) {
    statusChart1.data.labels.shift();
    statusChart1.data.datasets[0].data.shift();
  }
  statusChart1.data.labels.push(time1++);
  statusChart1.data.datasets[0].data.push(randomValue1);
  statusChart1.update();
}, 100);
