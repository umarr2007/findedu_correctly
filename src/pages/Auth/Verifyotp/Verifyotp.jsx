import React from "react";
import { Form, Input, Button, message, Typography } from "antd";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // 🔥 toast import qilindi
import "react-toastify/dist/ReactToastify.css";

const { Title } = Typography;

const Verifyotp = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");

  const onFinish = async (values) => {
    if (!email) {
      message.error("Email topilmadi. Qayta ro‘yxatdan o‘ting.");
      toast.error("Email topilmadi. Qayta ro‘yxatdan o‘ting."); // 🔥 toast
      return;
    }

    try {
      const response = await axios
        .post("https://findcourse.net.uz/api/users/verify-otp", {
          email: email,
          otp: values.otp,
        })
        .then(() => navigate("/login"));

      if (response.data && response.data.success && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        toast.success("Kod tasdiqlandi!"); // 🔥 toast
        localStorage.removeItem("email");
        localStorage.removeItem("password");
      } else {
        message.error("OTP noto‘g‘ri yoki token yo‘q");
        toast.error("OTP noto‘g‘ri yoki token yo‘q"); // 🔥 toast
      }
    } catch (error) {
      console.error("Xato:", error);
      message.error("Tasdiqlashda xatolik yuz berdi");
      toast.error("Tasdiqlashda xatolik yuz berdi"); // 🔥 toast
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div
        style={{
          maxWidth: 400,
          width: "100%",
          padding: 20,
          background: "#fff",
          borderRadius: 8,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Title level={3} style={{ textAlign: "center" }}>
          OTP ni tasdiqlang
        </Title>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Tasdiqlash kodi (OTP)"
            name="otp"
            rules={[{ required: true, message: "Iltimos, OTP kiriting!" }]}
          >
            <Input placeholder="123456" maxLength={6} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Tasdiqlash
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Verifyotp;
