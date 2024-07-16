import g2g_projects from "./g2g_projects.js";
import "./App.css";
import { Routes, Route, useNavigate, Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  let [logoColor, setLogoColor] = useState("rgb(255, 255, 255)");
  const handlscroll = () => {
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPosition = window.scrollY;
    const scrollPercentage = scrollPosition / maxScroll;
    console.log(scrollPercentage);
    let num = 255 - scrollPercentage * 300;
    let newColor = `rgb(${num}, ${num}, ${num})`;
    console.log(newColor);
    setLogoColor(newColor);
  };
  useEffect(() => {
    window.addEventListener("scroll", handlscroll);

    return () => {
      window.removeEventListener("scroll", handlscroll);
    };
  }, []);

  return (
    <div className="App">
      {/* <EventTopBox /> */}
      <Header color={logoColor} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Section1 />
              <Section2 />
              <Section3 />
              <Section4 />
              <Section5 />
              <Footer />
            </>
          }
        />
      </Routes>
    </div>
  );
}
function EventTopBox() {
  return (
    <div className="event_container">
      <span className="event_text">인천 지역 고객 특별 할인(최대 5%)</span>
    </div>
  );
}
function Header(props) {
  return (
    <header className="navbar_container">
      <div className="navbar_box">
        <div className="navbar_logo_container">
          <Link to="/">
            <span className="navbar_logo_title" style={{ color: props.color }}>
              LUMINA{" "}
            </span>
          </Link>
          <span className="navbar_logo_subtext">Design Lab</span>
        </div>
        <ul className="navbar_items">
          {/* <li className="navbar_item">Home</li>
          <li className="navbar_item">About</li> */}
          <li className="navbar_item contact">무료상담신청</li>
        </ul>
      </div>
    </header>
  );
}
function Section1() {
  return (
    <section className="section first" id="home">
      {/* <h1 className="section_title">첫번째 섹션</h1> */}
      <div className="section_first_div">
        <div className="section_first_img_container">
          <img
            className="section_first_img"
            src="./lumina_logo.png"
            alt="logo"
          ></img>
        </div>
      </div>
      <div className="section_first_texts_container">
        <p className="section_first_text">
          루미나 디자인 랩에 방문해주셔서 감사드립니다
        </p>
      </div>
      {/* Shape Divider */}
      <div class="custom-shape-divider-bottom-1721098286 divider">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            class="shape-fill"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            class="shape-fill"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            class="shape-fill"
          ></path>
        </svg>
      </div>
    </section>
  );
}
function Section2() {
  return (
    <section className="section second">
      <p className="section_second_p">
        귀하께서는 사업의 <span className="bold_text">핵심적인 부분</span>에{" "}
        <span className="bold_text">온전히 집중하세요</span>
        <br />
        철거부터 인테리어 디자인, 인테리어 시공,
        <br />
        홍보영상, SNS 쇼츠 영상, 사진촬영, 웹사이트 제작은 <br />
        <h3 className="right_text">루미나 디자인 랩에 맡기세요.</h3>
      </p>
    </section>
  );
}
function Section3() {
  return (
    <section className="section third">
      <div className="section_third_img_container"></div>
    </section>
  );
}
function Section4() {
  return (
    <>
      <div className="section_4_container">
        <h1 className="section_4_title">Services</h1>
        <ul className="section_4_lists">
          <li className="section_4_list">
            <div className="section_4_list_item">
              <h4 className="section_4_h4">지투지메이커스</h4>
              {/* <p>인테리어</p> */}
              <ul>
                <li>인테리어 디자인</li>
                <li>인테리어 전체 시공</li>
                <li>인테리어 부분 시공</li>
                <li>목공 가벽</li>
                <li>유럽 미장</li>
                <li>금속 용점</li>
                <li>설비 배수</li>
              </ul>
            </div>
          </li>
          <li className="section_4_list">
            <div className="section_4_list_item">
              <h4 className="section_4_h4">마크바이제이</h4>
              {/* <p>영상홍보</p> */}
              <ul>
                <li>홍보 영상 제작</li>
                <li>기획 / 촬영 / 편집</li>
                <li>유튜브 콘텐츠</li>
                <li>SNS 쇼츠</li>
                <li>상품 사진 촬영</li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}
function Section5() {
  return (
    <>
      <div className="section_5_container"></div>
    </>
  );
}
function Card() {
  return (
    <>
      <div className="card_container"></div>
    </>
  );
}
function Footer() {
  return (
    <>
      <footer>
        <div className="footer_box">copyright</div>
      </footer>
    </>
  );
}

export default App;
