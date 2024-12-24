import React, { useState } from "react";
import { Modal } from "antd";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { StarOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";

const RatingModal = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [modalVisible, setModalVisible] = useState(false);


  const navigate = useNavigate();
  const {slug} = useParams();
  
  const handleModal = () => {
    if (user && user.token) {
      setModalVisible(true);
    } else {
     
        navigate("/login", { 
            state: {
                 from: `/product/:${slug}` 
                
                } });
    }
  };
  




  return (
    <>
      <div onClick={handleModal}>
        <StarOutlined className="text-danger" />
        {user ? "Leave a rating" : "Log in to leave a rating"}
      </div>

      <Modal
        title="Leave a rating"
        centered
        open={modalVisible}
        onOk={() => {
          setModalVisible(false);
          toast.success("Thanks for your review");
        }}
        onCancel={() => setModalVisible(false)}
      >
        {children}
      </Modal>
    </>
  );
};

export default RatingModal;
