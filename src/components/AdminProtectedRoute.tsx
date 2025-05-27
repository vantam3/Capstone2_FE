// src/components/AdminProtectedRoute.tsx
import { Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'; // Thêm useState và useEffect

interface UserData {
  id: number;
  username: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  is_superuser?: boolean;
}

const getAuthData = (): { isAuthenticated: boolean; isAdmin: boolean; user: UserData | null } => {
  const storedUserData = sessionStorage.getItem('user');
  if (storedUserData) {
    try {
      const user: UserData = JSON.parse(storedUserData);
      return { isAuthenticated: true, isAdmin: user?.is_superuser === true, user };
    } catch (error) {
      console.error("Lỗi khi parse dữ liệu người dùng từ sessionStorage:", error);
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('token');
      return { isAuthenticated: false, isAdmin: false, user: null };
    }
  }
  return { isAuthenticated: false, isAdmin: false, user: null };
};

interface AdminProtectedRouteProps {
  children: JSX.Element;
}

const AdminProtectedRoute = ({ children }: AdminProtectedRouteProps) => {
  const { isAuthenticated, isAdmin } = getAuthData();
  const [showAccessDenied, setShowAccessDenied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let timer: NodeJS.Timeout;

    // Chỉ thực hiện logic này nếu người dùng đã đăng nhập nhưng không phải admin
    if (isAuthenticated && !isAdmin) {
      setShowAccessDenied(true); // Kích hoạt hiển thị thông báo

      // Đặt thời gian chờ để chuyển hướng sau khi hiển thị thông báo
      timer = setTimeout(() => {
        navigate('/', { replace: true }); // Chuyển hướng về trang chủ
      }, 2000); 
    }

    // Cleanup function để xóa timer nếu component bị unmount
    // hoặc nếu user/admin status thay đổi trước khi timer chạy xong
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [isAuthenticated, isAdmin, navigate]); // Effect sẽ chạy lại nếu các giá trị này thay đổi

  if (!isAuthenticated) {
    // Nếu chưa đăng nhập, chuyển hướng ngay đến trang đăng nhập
    return <Navigate to="/sign-in" replace />;
  }

  if (showAccessDenied) {
    // Nếu cờ showAccessDenied là true (do useEffect đặt), hiển thị thông báo
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 100px)', // Giả sử header/footer có chiều cao nhất định
        textAlign: 'center',
        padding: '20px',
        backgroundColor: '#170a38', // Giống màu nền các trang khác của bạn
        color: 'white',
      }}>
        <h2 style={{ color: '#f87171', fontSize: '1.5rem', marginBottom: '1rem' }}>
          Access Denied
        </h2>
        <p style={{ fontSize: '1.125rem', marginBottom: '0.75rem' }}>
          You do not have the necessary permissions to access this page.
        </p>
        <p style={{ fontSize: '1rem', color: '#d1d5db' }}>
          You will be redirected to the homepage shortly...
        </p>
        {/* Bạn có thể thêm một spinner hoặc hình ảnh ở đây */}
      </div>
    );
  }

  // Nếu đã đăng nhập và là admin (và không hiển thị thông báo access denied)
  if (isAdmin) {
    return children;
  }

  // Trường hợp người dùng đã đăng nhập, không phải admin, và useEffect chưa kịp set showAccessDenied
  // (ví dụ trong lần render đầu tiên), trả về null hoặc một loader nhỏ để tránh render children.
  // Điều này đảm bảo người dùng không thấy nội dung admin dù chỉ trong thoáng chốc.
  return null;
  // Hoặc bạn có thể hiển thị một loader toàn trang:
  // return <div className="min-h-screen bg-[#170a38] text-white flex justify-center items-center">Checking permissions...</div>;
};

export default AdminProtectedRoute;