import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import axiosClient from "../../axios/configAxios";
import { useDebounce } from "../../hooks/useDebounce";
import useClickOutSide from "../../hooks/useClickOutSide";
import styled from "styled-components";
import { IconSearch } from "../icon";
import ResultSearch from "../search/ResultSearch";

const SearchWrapper = styled.div`
  width: 100%;
  max-width: 100%;
  display: none;
  position: relative;
  @media screen and (max-width: 767.98px) {
    display: block;
    padding: 20px;
  }
`;

const SearchStyles = styled.div`
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 8px 20px;
  border: 1px solid #eee;
  border-radius: 20px;
  width: 100%;
  position: relative;
  .search-input {
    font-weight: 500;
    background-color: #fff;
  }
  .search-icon {
    position: absolute;
    background-color: #ff6651;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 40px;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 20px;
    right: 8px;
    cursor: pointer;
  }
  @media screen and (max-width: 767.98px) {
    .search-input {
      width: 100%;
    }
    .search-icon {
      height: 30px;
      width: 50px;
    }
  }
`;

const InputSearchMobile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [listProduct, setListProduct] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchTerm = useDebounce(searchValue, 500);
  const { show, setShow, nodeRef } = useClickOutSide(".search-header");
  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };
  useEffect(() => {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const handleFetchProduct = async () => {
      setIsLoading(true);
      setShow(true);
      let start = new Date();
      try {
        const data = await axiosClient.request({
          method: "get",
          url: `/getProductAll?search=${debouncedSearchTerm}`,
        });
        setListProduct(data.data);
      } catch (error) {
        toast.error("Sever error");
      }
      let end = new Date();
      if (end - start > 1000) {
        setIsLoading(false);
      } else {
        await delay(1000 - (end - start));
        setIsLoading(false);
      }
    };
    if (debouncedSearchTerm) {
      handleFetchProduct();
    } else {
      setListProduct([]);
    }
  }, [debouncedSearchTerm]);
  return (
    <SearchWrapper>
      <SearchStyles>
        <input
          ref={nodeRef}
          onClick={() => {
            setShow(!show);
          }}
          value={searchValue}
          onChange={handleInputChange}
          type="text"
          className="search-input"
          placeholder="Tìm kiếm sách..."
        />
        <IconSearch className="search-icon"></IconSearch>
      </SearchStyles>
      <ResultSearch data={listProduct} show={show}></ResultSearch>
    </SearchWrapper>
  );
};
InputSearchMobile.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  clearValue: PropTypes.func,
};
export default InputSearchMobile;
