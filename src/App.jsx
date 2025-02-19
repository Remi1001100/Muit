
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar"; 

import Home from "./pages/Home";
import Upcoming from "./pages/Upcoming";
import Ranking from "./pages/Ranking";
import Detail from "./pages/detail/Detail";
import Vision from "./pages/Vision";
import EventCheck from "./pages/EventCheck";
import EventDetail from "./pages/EventDetail";
import SmallTheater from "./pages/small-theater/SmallTheater";
import RegisterMusical from "./pages/small-theater/RegisterMusical";
import RegisterCheck from "./pages/small-theater/RegisterCheck";
import SmallDetail from "./pages/small-theater/SmallDetail";
import BuyTicket from "./pages/small-theater/BuyTicket";
import Board from "./pages/board/Board";
import VisionDetailMain from "./pages/VisionDetail";
import ItemPost from "./pages/board/post/ItemPost";
import FoundPost from "./pages/board/post/FoundPost";
import AnonymousPost from "./pages/board/post/AnonymousPost";
import ReviewPost from "./pages/board/post/ReviewPost";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import GoogleRedirect from "./pages/signup/redirect/googleRedirect";
import Terms from "./pages/signup/Terms"
import Info from "./pages/signup/Info";
import Complete from "./pages/signup/Complete";
import MyPage from "./pages/mypage/MyPage";
import ContactPost from "./pages/mypage/support/ContactPost";
import Search from "./pages/Search";

import WriteAnonymousPost from "./pages/board/write/WriteAnonymousPost";
import WriteItemPost from "./pages/board/write/WriteItemPost";
import WriteReviewPost from "./pages/board/write/WriteReviewPost";

import './styles/font.css';
import styled from "styled-components";
import TicketDetailPage from "./pages/mypage/my/ticket/TicketDetailPage";
import CancelTicket from "./pages/mypage/my/ticket/CancelTicket";
import CancelComplete from "./pages/mypage/my/ticket/CancelComplete";
import MusicalRanking from "./pages/test/MusicalRanking";
import WriteContact from "./pages/mypage/support/WriteContact";
import ConctactComplete from "./pages/mypage/support/ContactComplete";
import AccountDeletion from "./pages/mypage/account-deletion/AccountDeletion";
import AccountDeletionComplete from "./pages/mypage/account-deletion/AccountDeletionComplete";

import AdminLayout from './pages/adminpage/AdminLayout';
import AdminDashboard from './pages/adminpage/dashboard/AdminDashboard';
import AdminUser from "./pages/adminpage/user/AdminUser";
import AdminUserDetail from "./pages/adminpage/user/AdminUserDetail";
import AdminMusical from "./pages/adminpage/musical/AdminMusical";
import AdminMusicalDetail from "./pages/adminpage/musical/AdminMusicalDetail";
import AdminEvent from "./pages/adminpage/event/AdminEvent";
import AdminEventDetail from "./pages/adminpage/event/AdminEventDetail";
import AdminVision from "./pages/adminpage/vision/AdminVision";
import AdminVisionDetail from "./pages/adminpage/vision/AdminVisionDetail";
import AdminQuery from "./pages/adminpage/query/AdminQuery";
import AdminQueryDetail from "./pages/adminpage/query/AdminQueryDetail";
import AdminMypage from "./pages/adminpage/mypage/AdminMypage";
import AdminSmallTheater from "./pages/adminpage/small-theater/AdminSmallTheater";
import AdminSmallTheaterDetail from "./pages/adminpage/small-theater/AdminSmallTheaterDetail";
import AdminSTDRegist from "./pages/adminpage/small-theater/AdminSTDRegist";
import AdminSmallTicket from "./pages/adminpage/small-theater/ticket/AdminSmallTicket";
import AdminSmallTicketDetail from "./pages/adminpage/small-theater/ticket/AdminSmallTicketDetail";
import AdminSmallReserve from "./pages/adminpage/small-theater/reservation/AdminSmallReserve";
import AdminSmallReserveDetail from "./pages/adminpage/small-theater/reservation/AdminSmallReserveDetail";
import AdminSmallRefund from "./pages/adminpage/small-theater/refund/AdminSmallRefund";
import AdminSmallRefundDetail from "./pages/adminpage/small-theater/refund/AdminSmallRefundDetail";
import ItemPostEdit from "./pages/board/edit/ItemPostEdit";
import AnonymousPostEdit from './pages/board/edit/AnonymousPostEdit';
import ReviewPostEdit from "./pages/board/edit/ReviewPostEdit";

function App() {
  return (
    
      <div style={{display: 'flex', justifyContent: 'center'}}>
      
      <Container>
      <Router>
      {/* 공통 상단바 */}
      <Navbar />
      <Routes>
        {/* 1) 뮤지컬 전체보기 → "/" → 홈 */}
        <Route path="/" element={<Home />} />
        {/* 2) 오픈 예정 */}
        <Route path="/upcoming" element={<Upcoming />} />
        {/* 3) 시야 확인 */}
        <Route path="/vision" element={<Vision />} />
        {/* 3-1) 시야확인 상세 */}
        <Route path="/vision/:theatreId" element={<VisionDetailMain />} />

        {/* 4) 소극장 공연 */}
        <Route path="/small-theater" element={<SmallTheater />} />
        {/* 4-1) 뮤지컬 등록 페이지 */}
        <Route path="/register-musical" element={<RegisterMusical />} />
        {/* 4-2) 뮤지컬 등록확인인 페이지 */}
        <Route path="/register-musical/check" element={<RegisterCheck />} />       
        {/* 4-3) 소극장 상세 페이지 */}
        <Route path="/small-detail/:amateurId" element={< SmallDetail/>} />
        {/* 4-4) 소극장 구매매 페이지 */}
        <Route path="/small-detail/buy/:amateurId/*" element={< BuyTicket/>} />
        {/* 5) 이벤트 확인 */}
        <Route path="/event-check" element={<EventCheck />} />

        {/* 6) 게시판/게시글 */}
        <Route path="/board/:category/:type" element={<Board />} />
        <Route path="/board/item/lost/:postId" element={<ItemPost />} />
        <Route path="/board/item/found/:postId" element={<FoundPost />} />
        <Route path="/board/anonymous/all/:postId" element={<AnonymousPost />} />
        <Route path="/board/anonymous/hot/:postId" element={<AnonymousPost />} />
        <Route path="/board/review/musical/:postId" element={<ReviewPost />} />
        <Route path="/board/review/seats/:postId" element={<ReviewPost />} />

        <Route path="/board/item/write" element={<WriteItemPost />} />
        <Route path="/board/anonymous/write" element={<WriteAnonymousPost />} />
        <Route path="/board/review/write" element={<WriteReviewPost />} />
        
        <Route path="/board/item/lost/:postId/edit" element={<ItemPostEdit />} />
        <Route path="/board/anonymous/all/:postId/edit" element={<AnonymousPostEdit />} />
        <Route path="/board/review/musical/:postId/edit" element={<ReviewPostEdit />} />

        <Route path="/event-check/:musicalId" element={<EventDetail/>}/>

      
        {/* 7) 상세 페이지 */}
        <Route path="/detail/:musicalId" element={<Detail />} />
        
        {/* 9) 로그인/회원가입 */}
        <Route path="/login" element={<Login />} />
        <Route path="/google-redirect" element={<GoogleRedirect />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signup/terms" element={<Terms/>}/>
        <Route path="/signup/info" element={<Info/>}/>
        <Route path="/signup/complete" element={<Complete/>}/>

        {/* 마이페이지 */}
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/:category/:type" element={<MyPage />} />
        <Route path="/mypage/:category/:type/:field" element={<MyPage />} />
        <Route path="/mypage/support/contact/write" element={<WriteContact />} />
        <Route path="/mypage/support/contact/:postId" element={<ContactPost />} />
        <Route path="/mypage/support/contact/write/complete" element={<ConctactComplete />} />
        <Route path="/mypage/account-deletion" element={<AccountDeletion />} />
        <Route path="/mypage/account-deletion/complete" element={<AccountDeletionComplete />} />

       {/* 티켓 상세페이지 */}
        <Route path="ticket/:memberTicketId" element={<TicketDetailPage />} />
        <Route path="ticket/:memberTicketId/cancel" element={<CancelTicket />} />
        <Route path="ticket/:memberTicketId/cancel/complete" element={<CancelComplete />}  />
        {/* 검색 */}
        <Route path="/search" element={<Search />} />
        {/* 랭킹 */}
        <Route path="/ranking" element={<Ranking />} />

        <Route path="/test/rank" element={<MusicalRanking/>} />

         {/* 관리자 페이지 */}
         <Route path="/adminpage">
          <Route element={<AdminLayout />}>
            {/* 기본 경로 => dashboard로 이동 */}
            <Route index element={<Navigate to="/adminpage/dashboard" />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="user" element={<AdminUser />} />
            <Route path="user/detail/:userId" element={<AdminUserDetail />} />
            <Route path="musical" element={<AdminMusical />} />
            <Route path="musical/detail/:musicalId" element={<AdminMusicalDetail />} />
            <Route path="event" element={<AdminEvent />} />
            <Route path="event/detail/:musicalId" element={<AdminEventDetail />} />
            <Route path="vision" element={<AdminVision />} />
            <Route path="vision/detail/:placeId" element={<AdminVisionDetail />} />
            <Route path="query" element={<AdminQuery />} />
            <Route path="query/detail/:queryId" element={<AdminQueryDetail />} />
            <Route path="mypage" element={<AdminMypage />} />
            <Route path="small-theater">
              <Route index element={<AdminSmallTheater />} />
              <Route path="detail/:smallMusicalId" element={<AdminSmallTheaterDetail />} />
              <Route path="detail/:smallMusicalId/regist" element={<AdminSTDRegist />} />
              <Route path="ticket" element={<AdminSmallTicket />} />
              <Route path="ticket/detail/:smallMusicalId" element={<AdminSmallTicketDetail />} />
              <Route path="reserve" element={<AdminSmallReserve />} />
              <Route path="reserve/detail/:ticketId" element={<AdminSmallReserveDetail />} />
              <Route path="refund" element={<AdminSmallRefund />} />
              <Route path="refund/detail/:refundId" element={<AdminSmallRefundDetail />} />
            </Route>
          </Route>
        </Route>

      </Routes>
      </Router>
      </Container>
      </div>
     
 
  );
}

export default App;

// Styled Components
const Container = styled.div`
  font-family: Arial, sans-serif;
  padding: 0px;
  margin: 0px;
  min-width: 1440px;
  max-width: 1440px;
`;