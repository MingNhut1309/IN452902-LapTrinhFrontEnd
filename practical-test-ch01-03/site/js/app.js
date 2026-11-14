// Câu 2: Lấy dữ liệu từ API bằng JavaScript

const API_URL = "http://localhost:4000";

// Đổi giờ UTC sang giờ Việt Nam (vd: 08:00 12/09/2026)
const formatDateTime = (iso) =>
  new Date(iso).toLocaleString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

// Danh sách 24 ảnh tương ứng 24 sự kiện theo thứ tự trong CSDL
const EVENT_IMAGES = [
  "img/2-git-and-github.jpg",
  "img/8-code-war.jpg",
  "img/13-AI-trong-hoc-tap.jpg",
  "img/19-hackathon-eduhub.jpg",
  "img/4-chu-nhat-xanh.jpg",
  "img/10-hien-mau.jpg",
  "img/17-tiep-suc-mua-thi.jpg",
  "img/24-xuan-yeu-thuong.jpg",
  "img/5-english-club.jpg",
  "img/11-halloween.jpg",
  "img/16-luyen-thi-ielts.jpg",
  "img/22-mang-xa-hoi.jpg",
  "img/1-dem-nhac-chao-tan-sinh-vien.jpg",
  "img/14-van-nghe-20-11.jpg",
  "img/20-dem-nhac-giang-sinh.jpg",
  "img/23-tuyen-thanh-vien-ban-nhac.jpg",
  "img/3-giao-huu-bong-da.jpg",
  "img/7-khai-mac-bong-da.jpg",
  "img/12-tuan-huan-trong-tai.jpg",
  "img/18-chung-ket-dthu-2026.jpg",
  "img/6-quan-li-time.jpg",
  "img/9-viet-cv.jpg",
  "img/15-thuyet-trinh-tu-tin.jpg",
  "img/21-lam-viec-nhom.jpg",
];

const FALLBACK_IMAGE = "img/event.svg";

// Chọn ảnh theo đuôi ID sự kiện
const pickImage = (id) => {
  const num = parseInt(id.slice(-4), 10);
  if (!Number.isNaN(num) && num >= 1 && num <= EVENT_IMAGES.length) {
    return EVENT_IMAGES[num - 1];
  }
  return FALLBACK_IMAGE;
};

const form = document.querySelector("#search-form");
const keywordInput = document.querySelector("#keyword");
const statusEl = document.querySelector("#status");
const listEl = document.querySelector("#event-list");
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector("#main-nav");

// Câu 2a: Tính số chỗ còn lại
const formatSeats = (event) => {
  const left = event.capacity - event.registeredCount;
  return left > 0 ? `Còn ${left}/${event.capacity} chỗ` : "Hết chỗ";
};

// Câu 2b: Kết xuất danh sách sự kiện ra giao diện
const renderEvents = (events) => {
  const cards = events.map((event) => {
    const card = document.createElement("article");
    card.className = "card";

    // Hình ảnh minh hoạ
    const img = document.createElement("img");
    img.setAttribute("src", pickImage(event.id));
    img.setAttribute("alt", `Hình minh hoạ ${event.name}`);
    img.addEventListener(
      "error",
      () => img.setAttribute("src", FALLBACK_IMAGE),
      { once: true },
    );

    // Tiêu đề sự kiện
    const title = document.createElement("h2");
    const link = document.createElement("a");
    link.setAttribute(
      "href",
      `event-detail.html?id=${encodeURIComponent(event.id)}`,
    );
    link.textContent = event.name;
    title.append(link);

    // Thời gian tổ chức
    const timeP = document.createElement("p");
    const time = document.createElement("time");
    time.setAttribute("datetime", event.startTime);
    time.textContent = formatDateTime(event.startTime);
    timeP.append(time);

    // Địa điểm
    const locationP = document.createElement("p");
    locationP.textContent = event.location;

    // Số chỗ ngồi
    const seatsP = document.createElement("p");
    const seatsText = formatSeats(event);
    if (seatsText === "Hết chỗ") {
      const badge = document.createElement("span");
      badge.className = "badge-full";
      badge.textContent = seatsText;
      seatsP.append(badge);
    } else {
      seatsP.textContent = seatsText;
    }

    card.append(img, title, timeP, locationP, seatsP);
    return card;
  });

  listEl.replaceChildren(...cards);
};

// Câu 2c: Nạp dữ liệu từ API
const loadEvents = async (keyword = "") => {
  const params = new URLSearchParams({ pageSize: "50" });
  if (keyword !== "") params.set("q", keyword);

  statusEl.textContent = "Đang tải…";

  try {
    const response = await fetch(`${API_URL}/api/events?${params}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    renderEvents(data.items);

    statusEl.textContent =
      data.items.length === 0
        ? "Không có sự kiện nào khớp từ khoá."
        : `Tìm thấy ${data.totalCount} sự kiện`;
  } catch (error) {
    listEl.replaceChildren();
    statusEl.textContent = "Không tải được dữ liệu, vui lòng thử lại.";
  }
};

// Tìm kiếm sự kiện
form.addEventListener("submit", (event) => {
  event.preventDefault();
  loadEvents(keywordInput.value.trim());
});

// Menu mobile
if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

// Nạp dữ liệu ban đầu
loadEvents();
