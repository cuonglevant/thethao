import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"login" | "register" | "forgot">(
    "login"
  );
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullname: "",
    birthday: "",
    cccd: "",
    cccd_date: "",
    cccd_address: "",
    phone: "",
    rePassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      console.log(data);
      onClose();
      router.refresh();
    } catch (err) {
      console.log(err);
      setError("Email hoặc mật khẩu không chính xác");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.rePassword) {
      setError("Mật khẩu xác nhận không khớp");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          fullname: formData.fullname,
          birthday: formData.birthday,
          cccd: formData.cccd,
          cccd_date: formData.cccd_date,
          cccd_address: formData.cccd_address,
          phone: formData.phone,
        }),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      setActiveTab("login");
      setFormData((prev) => ({
        ...prev,
        password: "",
        rePassword: "",
      }));
    } catch (err) {
      setError("Đăng ký thất bại. Vui lòng thử lại sau.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
        }),
      });

      if (!response.ok) {
        throw new Error("Password reset request failed");
      }

      setError("Vui lòng kiểm tra email của bạn để đặt lại mật khẩu");
    } catch (err) {
      console.log(err);
      setError("Không thể gửi yêu cầu đặt lại mật khẩu. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="fixed inset-0 bg-black opacity-40"></div>

        <div
          className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Close</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="mt-2">
            <div className="flex border-b">
              <button
                className={`flex-1 py-2 text-center ${
                  activeTab === "login"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("login")}
              >
                Đăng nhập
              </button>
              <button
                className={`flex-1 py-2 text-center ${
                  activeTab === "register"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("register")}
              >
                Đăng ký
              </button>
            </div>

            {error && (
              <div className="mt-4 p-3 bg-red-100 text-red-600 rounded-md text-sm">
                {error}
              </div>
            )}

            {activeTab === "login" && (
              <form onSubmit={handleLogin} className="mt-4 space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Mật khẩu
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    className="text-sm text-blue-600 hover:text-blue-500"
                    onClick={() => setActiveTab("forgot")}
                  >
                    Quên mật khẩu?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {loading ? "Đang xử lý..." : "Đăng nhập"}
                </button>
              </form>
            )}

            {activeTab === "register" && (
              <form onSubmit={handleRegister} className="mt-4 space-y-4">
                <div>
                  <label
                    htmlFor="register-email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="register-email"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label
                    htmlFor="fullname"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Họ tên
                  </label>
                  <input
                    type="text"
                    name="fullname"
                    id="fullname"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={formData.fullname}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="birthday"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Ngày sinh
                    </label>
                    <input
                      type="date"
                      name="birthday"
                      id="birthday"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      value={formData.birthday}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Điện thoại
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="cccd"
                    className="block text-sm font-medium text-gray-700"
                  >
                    CCCD/CMND
                  </label>
                  <input
                    type="text"
                    name="cccd"
                    id="cccd"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={formData.cccd}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="cccd_date"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Ngày cấp
                    </label>
                    <input
                      type="date"
                      name="cccd_date"
                      id="cccd_date"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      value={formData.cccd_date}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="cccd_address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Nơi cấp
                    </label>
                    <input
                      type="text"
                      name="cccd_address"
                      id="cccd_address"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      value={formData.cccd_address}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="register-password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Mật khẩu
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="register-password"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label
                    htmlFor="rePassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Xác nhận mật khẩu
                  </label>
                  <input
                    type="password"
                    name="rePassword"
                    id="rePassword"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={formData.rePassword}
                    onChange={handleInputChange}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {loading ? "Đang xử lý..." : "Đăng ký"}
                </button>
              </form>
            )}

            {activeTab === "forgot" && (
              <form onSubmit={handleForgotPassword} className="mt-4 space-y-4">
                <div>
                  <label
                    htmlFor="forgot-email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="forgot-email"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {loading ? "Đang xử lý..." : "Gửi yêu cầu"}
                </button>

                <button
                  type="button"
                  className="w-full text-sm text-blue-600 hover:text-blue-500"
                  onClick={() => setActiveTab("login")}
                >
                  Quay lại đăng nhập
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
