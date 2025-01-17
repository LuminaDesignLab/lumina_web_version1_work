import g2g_projects from "./g2g_projects.js";
import "./App.css";
import { Routes, Route, useNavigate, Link, Outlet } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

function App() {
  /* 상담 게시판 */
  const [posts, setPosts] = useState([]);
  const [telNum, setTelNum] = useState("");
  const [content, setContent] = useState("");
  const [region, setRegion] = useState("");
  const [purpose, setPurpose] = useState([]);
  const [type, setType] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [submitText, setSubmitText] = useState("상담신청하기");
  const [contactList, setContactList] = useState([]);
  const [area, setArea]  = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/posts");
        setPosts(response.data);
        setContactList(response.data.slice(-5));
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const phoneRegex = /^[0-9]+$/;
    if (!phoneRegex.test(telNum)) {
      setErrorMessage("숫자만 입력해주세요");
      return;
    }

    try {
      const newPost = { telNum, content, region, purpose, type, area };
      const response = await axios.post("api/posts", newPost);
      setPosts([...posts, response.data]);
      setContactList([...contactList, response.data].slice(-5).reverse());
      setTelNum("");
      setContent("");
      setRegion("");
      setPurpose([]);
      setType("");
      setArea("");
      setErrorMessage("");
      setSubmitText("상담신청되셨습니다, 감사합니다");
      setTimeout(() => setSubmitText("상담신청하기"), 3000);
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };
  const handlePurposeChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setPurpose([...purpose, value]);
    } else {
      setPurpose(purpose.filter((item) => item !== value));
    }
  };

  /* ------------*/

  /* 로고 스크롤 반응 구현부분 */
  let [projects, setProjects] = useState(g2g_projects);
  let [logoColor, setLogoColor] = useState("rgb(255, 255, 255)");
  const handlscroll = () => {
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPosition = window.scrollY;
    const scrollPercentage = scrollPosition / maxScroll;

    let num = 255 - scrollPercentage * 300;
    let newColor = `rgb(${num}, ${num}, ${num})`;

    setLogoColor(newColor);
  };
  const scrollableDivRef = useRef(null);

  const scrollLeft = () => {
    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollBy({
        left: -200, // 스크롤 양
        behavior: "smooth", // 부드러운 스크롤
      });
    }
  };

  const scrollRight = () => {
    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollBy({
        left: 200, // 스크롤 양
        behavior: "smooth", // 부드러운 스크롤
      });
    }
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
              <section className="section_g2g_projects">
                <h1 className="g2g_projects_h1">Interior Projects</h1>
                <div className="scroll_button_container">
                  <div className="scroll_button_box">
                    <span className="scroll_button" onClick={scrollLeft}>
                      ˂
                    </span>
                    <span className="scroll_button" onClick={scrollRight}>
                      ˃
                    </span>
                  </div>
                </div>
                <div className="g2g_projects_container">
                  <div className="g2g_projects_box" ref={scrollableDivRef}>
                    {projects.map((a, i) => {
                      return <Card title={a.title} images={a.images} key={i} />;
                    })}
                  </div>
                </div>
              </section>
            </>
          }
        />
      </Routes>
    <h1 className="contact_main_title">Contact</h1>
      <div className="contact_container" id="contact">
        <div className="contact_window list">
          <h3 className="contact_list_title">상담 리스트</h3>
          <ul className="contact_list_items">
            {contactList.map((a, i) => {
              const maskedTelNum =
                a.telNum.slice(0, -4).replace(/[0-9]/g, "*") +
                a.telNum.slice(-4);
              return (
                <li key={i} className="contact_list_item">
                  <h4 className="contact_list_tel">
                    {a.region}, {maskedTelNum}님
                  </h4>
                  <p className="contact_list_content">{
                    (a.purpose.length >1 ? a.purpose[0] + '/' + a.purpose[1] : a.purpose)
                  } 상담신청 되셨습니다.</p>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="contact_window form">
          <h3 className="contact_form_title">상담 신청 </h3>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <form onSubmit={handleSubmit}>
            <div className="contact_form_item">
              <label>전화번호: </label>
              <input
                type="text"
                placeholder="상담받으실 전화번호"
                value={telNum}
                onChange={(e) => setTelNum(e.target.value)}
                required
              />
            </div>
            <div className="contact_form_item">
              <label>지역:</label>
              <input
                type="text"
                placeholder="서울/인천/그외"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                required
              />
            </div>
            <div className="contact_form_item">
            <label>목적(중복선택가능): </label>
            <label>
              <input
                type="checkbox"
                value="인테리어"
                onChange={handlePurposeChange}
              />
              인테리어
            </label>
            <label>
              <input
                type="checkbox"
                value="영상"
                onChange={handlePurposeChange}
              />
              영상
            </label>
    </div>
    <div className="contact_form_item">
    <label>유형:</label>
    <label>
      <input
        type = "text"
        value = {type} 
        placeholder = "상업/주거"
        onChange={(e)=>{
          setType(e.target.value)
        }}
        required
    />
    </label>
    </div>
    <div className="contact_form_item">

        <label>평수:</label>
        <label>
          <input
            type = "text"
            value = {area} 
            placeholder = "10평~"
            onChange={(e)=>{
              setArea(e.target.value)
            }}
            required
        />
        </label>
        </div>
      <div className="contact_form_item textarea_items">
  <label> 내용: </label>
    <textarea
    className = "contact_textarea"
    placeholder="ex) 학원시설 부분리모델링을 하고 싶어요~"
    value = {content}
    onChange={(e) => setContent(e.target.value)}
    required
    />
    </div>
           <button className = "contact_submit_btn"type="submit">{submitText}</button>
          </form>
        </div>
      </div>
      <Footer />
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
          <a href="#">
            <span className="navbar_logo_title" style={{ color: props.color }}>
              LUMINA{" "}
            </span>
          </a>
          <span className="navbar_logo_subtext">Design Lab</span>
        </div>
        <ul className="navbar_items">
          <li className="navbar_item contact">
            <a href="#contact" style={{ color: "var(--color-gray)" }}>
              무료상담신청
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
function Modal1(){
  return(
    <>
      <h1>Test Modal</h1>
        <div>asdklfjlaksdj</div>
      <div>alsdkjflak</div>
    </>
  )

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
      <div className="custom-shape-divider-bottom-1721098286 divider">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            className="shape-fill"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            className="shape-fill"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            className="shape-fill"
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
        <span className="bold_text">루미나</span>는 인테리어 시공 업체, 영상
        제작 업체와 긴밀히 협력하고 있습니다.
        <br />
        귀하께서는 사업의 <span className="bold_text">
          핵심적인 부분
        </span>에 <span className="bold_text">온전히 집중하세요</span>
        <br />
        철거부터 인테리어 디자인, 인테리어 시공,
        <br />
        홍보영상, SNS 쇼츠 영상, 사진촬영, 웹사이트 제작은 <br />
      </p>
      <h3 className="right_text">루미나에게 맡기세요.</h3>
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
                <li>금속 용접</li>
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

function Card(props) {
  return (
    <div
      className="card_container"
      style={{
        backgroundImage: `url(${props.images})`,
      }}
    >
      <h3 className="card_title">{props.title}</h3>
    </div>
  );
}

function ContactBox() {
  return (
    <>
      <div className="contact_container">
        <div className="contact_box"></div>
      </div>
    </>
  );
}
function Footer() {
  return (
    <>
      <footer className="footer_container">
        <div className="footer_box">
          <p className="footer_tel">담당자 전화번호: 010-5120-1725</p>
          <p className="last_text">
            Copyright © 2024 Lumina Design Lab. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
