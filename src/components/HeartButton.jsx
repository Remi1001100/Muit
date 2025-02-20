import { BsThreeDotsVertical } from "react-icons/bs";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import HeartFull from "../assets/icons/heart-full.svg";
import HeartLine from "../assets/icons/heart-line.svg";
import { useState } from "react";

const muit_server = import.meta.env.VITE_APP_SERVER_URL;
const token = localStorage.getItem("accessToken");
console.log(token);
const HeartButton = ({liked, setLiked, musicalId, width}) => {

  const [isClicked, setIsClicked] = useState(false);
  
  const handleClick = () => {
    setIsClicked(true);
    // 0.3초 후에 다시 원래 크기로 돌아가게 설정
    setTimeout(() => {
      setIsClicked(false);
    }, 200);  // 0.3초 후
  };

  const handleLike = async () => {

    try {
      const response = await axios.post(
        `${muit_server}/musicals/${musicalId}/likes`,
        {}, 
        {
          headers: {
            "Authorization": token ? `Bearer ${token}` : "",
            "Content-Type": "application/json", // JSON으로 전송
          },
        }
      );
      // alert("좋아요를 눌렀습니다");
      console.log(response.data);
    } catch (error) {
     // alert("좋아요 오류");
      console.error(error);
    }
  };

  const handleUnlike  = async () => {

    try {
      const response = await axios.delete(
        `${muit_server}/musicals/${musicalId}/likesCancel`,
        {
          headers: {
            "Authorization": token ? `Bearer ${token}` : "",
            "Content-Type": "application/json", // JSON으로 전송
          },
        }
      );
      // alert("좋아요를 취소했습니다.");
      console.log(response.data);
    } catch (error) {
     // alert("좋아요 취소 오류.");
      console.error(error);
    }
  };


  return (
    <Img
      src={liked ? HeartFull : HeartLine}
      alt="하트 아이콘"
      isClicked={isClicked}
      onClick={() => {
        setLiked(!liked); 
        handleClick();
        if (liked) {
          handleUnlike(); // 함수 실행
        } else {
          handleLike(); // 함수 실행
        }
      }}
      style={{ cursor: "pointer" }}
      width={width}
    />
  );
};

export default HeartButton;

const Img = styled.img`
  transition: transform 0.2s ease;  // 부드러운 전환
  transform: ${(props) => (props.isClicked ? 'scale(1.1)' : 'scale(1)')};
  width: ${(props) => props.width ? props.width: null};
  `;