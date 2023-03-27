import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import useClickOutSide from "../../hooks/useClickOutSide";
import { logout } from "../../redux/apiRequest";

const menuLinks = [
  {
    url: "/",
    title: "Trang chủ",
  },
  {
    url: "/product",
    title: "Sản Phẩm",
  },
  {
    url: "/theloai",
    title: "Thể loại",
  },
  {
    url: "/news",
    title: "Tin Tức",
  },
  {
    url: "/contact",
    title: "Liên Hệ",
  },
];
const MenuStyles = styled.ul`
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  /* top: calc(100% + 30px); */
  top: 0;
  position: fixed;
  z-index: 9999;
  height: 100%;
  width: 80%;
  background-color: white;
  transition: all 0.25s linear;
  .menu-wrapper {
    display: flex;
    flex-direction: column;
    gap: 40px;
    padding: 20px;
    list-style: none;
  }
  .menu-link {
    color: #000;
    font-size: 16px;
    font-weight: 500;
  }
  .menu-link.active {
    color: #ff6651;
    font-weight: 600;
  }
  .menu-link:hover {
    color: #ff6651;
  }
`;
const MenuMobile = () => {
  const { show, setShow, nodeRef } = useClickOutSide(".action-user");
  // const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((state) => state.auth.login?.currentUser);
  const accessToken = user?.accessToken;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignOut = () => {
    logout(dispatch, navigate, accessToken);
    toast.success("Đăng xuất thành công!");
  };
  return (
    <MenuStyles className="show-menu">
      <div className="menu-wrapper">
        <div className="login-mobile">
          {!user ? (
            <NavLink to={"/sign-in"} className="nav-link">
              Đăng nhập <i className="fa-solid fa-user"></i>
            </NavLink>
          ) : (
            <div className="user" ref={nodeRef}>
              <div className="user-wrapper">
                <span
                  className="fullname"
                  onClick={() => {
                    setShow(!show);
                  }}
                >
                  <img src={user.image} className="user-avatar" alt="" />
                  {user.fullname}
                </span>
              </div>
              <div className={`action-user ${show ? "show" : ""}`}>
                <p onClick={handleSignOut}>Đăng xuất</p>
                <p onClick={() => navigate("/profile")}>Cập nhật tài khoản</p>
                {user?.admin === true ? (
                  <p onClick={() => navigate("/dashboard")}>Dashboard</p>
                ) : null}
              </div>
            </div>
          )}
        </div>
        {menuLinks.map((item) => (
          <li className="menu-item" key={item.title}>
            <NavLink
              to={item.url}
              className={`menu-link ${({ isActive }) =>
                isActive ? "active" : ""}`}
            >
              {item.title}
            </NavLink>
          </li>
        ))}
      </div>
    </MenuStyles>
  );
};

export default MenuMobile;
