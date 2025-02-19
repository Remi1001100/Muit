import styled from "styled-components";
import SearchIcon from "../../../assets/icons/Search2.svg";
import React, { useEffect, useState } from "react";
import useCustomFetch from "../../../hooks/fetchWithAxios";
import SearchResultDetail from "./SearchResultDetail";

const SearchBarDetail = () => {
  const [searchValue, setSearchValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [showResults, setShowResults] = useState(false);

  const onChange = (e) => {
    setSearchValue(e.target.value);
    setShowResults(true);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleSearch = () => {
    setDebouncedValue(searchValue.trim());
    setShowResults(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(searchValue.trim());
    }, 300);
    return () => clearTimeout(timer);
  }, [searchValue]);

  const { data, error, loading } = useCustomFetch(
    debouncedValue ? `/theatres?theatreName=${debouncedValue}` : null
  );

  const result = data?.isSuccess ? data.result.theatreResults || [] : [];

  return (
    <>
      {showResults && <Overlay onClick={() => setShowResults(false)} />}

      <SearchWrapper>
        <Search>
          <input
            className="search-txt"
            value={searchValue}
            onChange={onChange}
            onKeyDown={onKeyDown}
            placeholder="뮤지컬이나 공연장을 입력해주세요."
          />
          <img
            src={SearchIcon}
            className="search-btn"
            onClick={handleSearch}
          />
        </Search>

        {showResults && (
          <Result>
            {loading && <p>검색 중...</p>}
            {error && <p>오류 발생!</p>}

            {!loading && !error && result.length === 0 && debouncedValue && (
              <p>검색 결과가 없습니다.</p>
            )}
            <div className="result-length-area">
              {result.length > 0 && <p className="result-length">검색 결과 {result.length}건</p>}
            </div>
            {result.length > 0 && result.map((theatre) => (
              <SearchResultDetail
                key={theatre?.id}
                id={theatre?.id}
                theatreName={theatre?.theatreName}
                address={theatre?.address}
                theatrePic={theatre?.theatrePic}
                onClick={() => setShowResults(false)} // 검색 결과 클릭 시 닫기
              />
            ))}
          </Result>
        )}
      </SearchWrapper>
    </>
  );
};

const Overlay = styled.div`
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 997;
  `

const SearchWrapper = styled.div`
    //position: fixed;
    position: relative;
    margin-left: 100px;

    width: 508px;
    z-index: 998;
  `

const Search = styled.form`
    display: flex;
    align-items: center;
    justify-content: space-between;

    box-sizing: border-box;
    width: 508px;
    height: 40px;
    margin-bottom: 10px;

    border: 1px solid #C1C1C1;
    border-radius: 3px;
    background: #FFF;

    padding: 8px 20px;

    input {
      font-family: Pretendard;
    }

    input::placeholder {
      font-family: Pretendard;
      font-size: 16px;
      color: #919191;
    }
    .search-txt {
      border: none;
      width: 420px;
    }
    .search-btn {
      cursor: pointer;
      width: 28px;
    }
  `;

const Result = styled.div`
    width: 100%;
    background: white;
    border: 1px solid #C1C1C1;
    border-radius: 3px;
    box-sizing: border-box;
    padding: 12px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1001;

    display: flex;
    flex-direction: column;
    align-items: center;

    .result-length-area{
      height: 50px;
    }

    .result-length {
      margin: 0px 0px 12px 0px;
      color: var(--Gray-sub, #919191);
      font-size: 14px;
      font-weight: 500;
    }
  `;

export default SearchBarDetail;
