import { useState, useEffect } from "react";
import { Button } from "antd";
import { fetchVerificationCode } from "../register/api/api";
export const CountdownButton = (params: { phone: string }) => {
  const [countdown, setCountdown] = useState(60);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (countdown > 0 && disabled) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (countdown === 0 && disabled) {
      setDisabled(false);
    }
  }, [countdown, disabled]);

  const handleClick = () => {
    setCountdown(60);
    setDisabled(true);
    fetchVerificationCode(params.phone);
  };

  return (
    <Button onClick={handleClick} disabled={disabled}>
      {disabled ? `${countdown} 秒后重新发送` : "发送验证码"}
    </Button>
  );
};
