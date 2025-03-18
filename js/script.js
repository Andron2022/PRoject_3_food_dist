// глобальный обработчик  DOM
window.addEventListener("DOMContentLoaded", () => {
  // Tabs

  const tabs = document.querySelectorAll(".tabheader__item"),
    tabsContent = document.querySelectorAll(".tabcontent"),
    tabsParent = document.querySelector(".tabheader__items");

  //Прячет содержание всех табов и деактивирует сами табы
  function hideTabContent() {
    tabsContent.forEach((item) => {
      //item.style.display = "none"; // вместо этого 2-е строчки в случае работы через классы
      item.classList.remove("show", "fade");
      item.classList.add("hide");
    });

    tabs.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  }

  //Показывает контент указанного таба и активаирует таб
  function showTabContent(i = 0) {
    // tabsContent[i].style.display = "block";
    tabsContent[i].classList.remove("hide");
    tabsContent[i].classList.add("show", "fade");

    tabs[i].classList.add("tabheader__item_active");
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener("click", (event) => {
    const target = event.target;
    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
  // end

  //Timer

  const deadline = "2025-03-19";

  function setZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function getTimeRemaining(endTime) {
    const t = Date.parse(endTime) - Date.parse(new Date());
    if (t <= 0) {
      return {
        total: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    } else {
      const days = Math.floor(t / (1000 * 60 * 60 * 24)),
        hours = Math.floor((t / (1000 * 60 * 60)) % 24),
        minutes = Math.floor((t / (1000 * 60)) % 60),
        seconds = Math.floor((t / 1000) % 60);
      return {
        total: t,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
      };
    }
  }

  function setClock(selector, endTime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endTime);

      days.innerHTML = setZero(t.days);
      hours.innerHTML = setZero(t.hours);
      minutes.innerHTML = setZero(t.minutes);
      seconds.innerHTML = setZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock(".timer", deadline);
});
