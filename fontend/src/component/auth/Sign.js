import { Button, Form, Input, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { getPrivate } from "../../services/auth";
import { signAndSendTransactionWithPrivateKeys } from "../../services/Nft";

const Sign = ({ transaction, time, setSign }) => {
  const navigate = useNavigate();

  const onSubmit = async (value) => {
    clearTimeout(time);
    const network = "devnet";
    try {
      const privateKey = await getPrivate(value);
      console.log(privateKey);
      if (!privateKey) {
        throw new Error("Xác nhận giao dịch thất bại");
      }

      console.log(privateKey);
      console.log(transaction);

      const sign = await signAndSendTransactionWithPrivateKeys(
        network,
        transaction,
        privateKey
      );

      if (!sign) {
        throw new Error("Xác nhận giao dịch thất bại");
      }

      notification.success({ message: "Thành công" });
      setSign(true);

      navigate("/");
    } catch (error) {
      console.log(error);
      notification.error({ message: "lỗi" });
    }
  };

  return (
    <>
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onSubmit}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Nhập vào mật khẩu của bạn",
            },
          ]}
        >
          <Input.Password
            placeholder="Mật khẩu"
            style={{
              marginBottom: "",
            }}
          />
        </Form.Item>
        <Form.Item>
          <Button
            style={{
              backgroundColor: "rgb(18 18 18/4%)",
              border: "rgba(255, 255, 255, 0.12)",
              fontWeight: "bold",
              marginRight: "20px",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
            }}
            htmlType="submit"
          >
            Đăng kí
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Sign;
