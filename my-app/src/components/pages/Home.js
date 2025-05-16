import React from 'react';
import { FiMic, FiBarChart2, FiHeadphones, FiAward, FiArrowRight, FiMenu, FiX } from 'react-icons/fi';

function Home() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-500 text-white">\
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-white font-bold text-xl flex items-center">
              <svg className="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22Z" fill="white"/>
                <path d="M8 13C8.55228 13 9 12.5523 9 12C9 11.4477 8.55228 11 8 11C7.44772 11 7 11.4477 7 12C7 12.5523 7.44772 13 8 13Z" fill="#3B82F6"/>
                <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" fill="#3B82F6"/>
                <path d="M16 13C16.5523 13 17 12.5523 17 12C17 11.4477 16.5523 11 16 11C15.4477 11 15 11.4477 15 12C15 12.5523 15.4477 13 16 13Z" fill="#3B82F6"/>
              </svg>
              SpeakPro
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="hover:text-blue-200 transition-colors">Tính năng</a>
            <a href="#how-it-works" className="hover:text-blue-200 transition-colors">Cách hoạt động</a>
            <a href="#pricing" className="hover:text-blue-200 transition-colors">Bảng giá</a>
            <a href="/signin" className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-100 transition-colors">Đăng nhập</a>
            <a href="/signup" className="bg-blue-500 px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors">Đăng ký</a>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-indigo-700 rounded-lg p-4">
            <div className="flex flex-col space-y-3">
              <a href="#features" className="hover:text-blue-200 transition-colors py-2">Tính năng</a>
              <a href="#how-it-works" className="hover:text-blue-200 transition-colors py-2">Cách hoạt động</a>
              <a href="#pricing" className="hover:text-blue-200 transition-colors py-2">Bảng giá</a>
              <a href="/signin" className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-100 transition-colors text-center mt-2">Đăng nhập</a>
              <a href="/signup" className="bg-blue-500 px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors text-center">Đăng ký</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16 md:py-24 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-12 md:mb-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in">
            Nâng cao kỹ năng 
            <span className="text-blue-300"> tiếng Anh </span> 
            của bạn với AI
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-lg">
            SpeakPro giúp bạn luyện nói tiếng Anh với phản hồi AI theo thời gian thực, điểm số và phân tích phát âm chính xác.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <a href="/signup" className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-100 transition-colors text-center text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Bắt đầu miễn phí
            </a>
            <a href="#how-it-works" className="bg-transparent border-2 border-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:bg-opacity-10 transition-colors text-center text-lg">
              Tìm hiểu thêm
            </a>
          </div>
          <div className="mt-8 text-blue-200 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <span>Được đánh giá 4.9/5 từ hơn 1,000+ học viên</span>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg blur opacity-75 animate-pulse"></div>
            <div className="relative bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-6 shadow-xl border border-white border-opacity-20">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-xs">SpeakPro AI Assistant</div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-sm font-bold">AI</span>
                  </div>
                  <div className="bg-blue-900 bg-opacity-50 rounded-lg rounded-tl-none p-3">
                    <p className="text-sm">Hãy đọc câu sau: "The quick brown fox jumps over the lazy dog."</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-purple-600 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-sm font-bold">U</span>
                  </div>
                  <div className="bg-purple-900 bg-opacity-50 rounded-lg rounded-tl-none p-3">
                    <div className="flex items-center">
                      <span className="animate-pulse mr-2">●</span>
                      <p className="text-sm">Đang ghi âm...</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-sm font-bold">AI</span>
                  </div>
                  <div className="bg-blue-900 bg-opacity-50 rounded-lg rounded-tl-none p-3">
                    <p className="text-sm font-medium mb-2">Phân tích phát âm:</p>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs">Độ chính xác</span>
                        <div className="w-32 h-2 bg-gray-300 bg-opacity-30 rounded-full overflow-hidden">
                          <div className="h-full bg-green-400 rounded-full" style={{width: '85%'}}></div>
                        </div>
                        <span className="text-xs font-medium">85%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs">Ngữ điệu</span>
                        <div className="w-32 h-2 bg-gray-300 bg-opacity-30 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-400 rounded-full" style={{width: '78%'}}></div>
                        </div>
                        <span className="text-xs font-medium">78%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs">Nhịp độ</span>
                        <div className="w-32 h-2 bg-gray-300 bg-opacity-30 rounded-full overflow-hidden">
                          <div className="h-full bg-purple-400 rounded-full" style={{width: '92%'}}></div>
                        </div>
                        <span className="text-xs font-medium">92%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="bg-indigo-900 bg-opacity-50 py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Tính năng nổi bật</h2>
            <p className="text-blue-200 max-w-2xl mx-auto">SpeakPro cung cấp các công cụ tiên tiến giúp bạn nâng cao kỹ năng nói tiếng Anh một cách hiệu quả.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm rounded-xl p-6 transform transition-all hover:scale-105 hover:bg-opacity-20 border border-white border-opacity-10">
              <div className="bg-blue-500 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <FiMic className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Phản hồi theo thời gian thực</h3>
              <p className="text-blue-200">Nhận phản hồi ngay lập tức về phát âm, ngữ điệu và nhịp độ của bạn khi nói.</p>
            </div>
            
            <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm rounded-xl p-6 transform transition-all hover:scale-105 hover:bg-opacity-20 border border-white border-opacity-10">
              <div className="bg-purple-500 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <FiBarChart2 className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Phân tích chi tiết</h3>
              <p className="text-blue-200">Xem báo cáo chi tiết về từng âm tiết, từ và câu để biết chính xác những gì cần cải thiện.</p>
            </div>
            
            <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm rounded-xl p-6 transform transition-all hover:scale-105 hover:bg-opacity-20 border border-white border-opacity-10">
              <div className="bg-pink-500 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <FiHeadphones className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Bài học tương tác</h3>
              <p className="text-blue-200">Trải nghiệm các bài học tương tác với AI, từ hội thoại cơ bản đến thuyết trình nâng cao.</p>
            </div>
            
            <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm rounded-xl p-6 transform transition-all hover:scale-105 hover:bg-opacity-20 border border-white border-opacity-10">
              <div className="bg-green-500 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <FiAward className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Theo dõi tiến độ</h3>
              <p className="text-blue-200">Theo dõi sự tiến bộ của bạn theo thời gian với biểu đồ trực quan và chứng chỉ thành tích.</p>
            </div>
          </div>
        </div>
      </div>

      {/* How it Works Section */}
      <div id="how-it-works" className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Cách hoạt động</h2>
            <p className="text-blue-200 max-w-2xl mx-auto">Chỉ với vài bước đơn giản, bạn có thể bắt đầu cải thiện kỹ năng nói tiếng Anh của mình.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 relative">
                <span className="text-2xl font-bold">1</span>
                <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 hidden md:block">
                  <FiArrowRight className="text-blue-400 text-xl" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Đăng ký tài khoản</h3>
              <p className="text-blue-200">Tạo tài khoản miễn phí và thiết lập hồ sơ học tập của bạn.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 relative">
                <span className="text-2xl font-bold">2</span>
                <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 hidden md:block">
                  <FiArrowRight className="text-blue-400 text-xl" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Chọn bài học</h3>
              <p className="text-blue-200">Lựa chọn từ thư viện bài học phong phú hoặc tạo bài học tùy chỉnh.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Luyện tập & Cải thiện</h3>
              <p className="text-blue-200">Bắt đầu nói và nhận phản hồi chi tiết để cải thiện kỹ năng của bạn.</p>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <a href="/signup" className="inline-flex items-center bg-white text-indigo-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-100 transition-colors shadow-lg">
              Bắt đầu ngay
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-indigo-900 bg-opacity-50 py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Người dùng nói gì về SpeakPro</h2>
            <p className="text-blue-200 max-w-2xl mx-auto">Hàng ngàn người đã cải thiện kỹ năng nói tiếng Anh của họ với SpeakPro.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-10">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-xl font-bold">T</span>
                </div>
                <div>
                  <h4 className="font-semibold">Trần Minh</h4>
                  <div className="flex text-yellow-400">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                  </div>
                </div>
              </div>
              <p className="text-blue-100">"SpeakPro đã giúp tôi tự tin hơn rất nhiều khi nói tiếng Anh. Phản hồi chi tiết về phát âm giúp tôi nhận ra và sửa những lỗi mà trước đây tôi không biết."</p>
            </div>
            
            <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-10">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-xl font-bold">N</span>
                </div>
                <div>
                  <h4 className="font-semibold">Nguyễn Thảo</h4>
                  <div className="flex text-yellow-400">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                  </div>
                </div>
              </div>
              <p className="text-blue-100">"Tôi đã thử nhiều ứng dụng học tiếng Anh khác nhau, nhưng SpeakPro là ứng dụng duy nhất thực sự giúp tôi cải thiện kỹ năng nói. Các bài học tương tác rất thú vị và hiệu quả."</p>
            </div>
            
            <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-10">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-xl font-bold">L</span>
                </div>
                <div>
                  <h4 className="font-semibold">Lê Hoàng</h4>
                  <div className="flex text-yellow-400">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                  </div>
                </div>
              </div>
              <p className="text-blue-100">"Sau 3 tháng sử dụng SpeakPro, tôi đã vượt qua kỳ thi IELTS Speaking với điểm số 7.5. Công cụ phân tích phát âm đã giúp tôi cải thiện rất nhiều về ngữ điệu và nhịp độ."</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 md:p-12 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white bg-opacity-20 rounded-full"></div>
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-white bg-opacity-20 rounded-full"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-2/3 mb-8 md:mb-0">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Sẵn sàng nâng cao kỹ năng tiếng Anh của bạn?</h2>
                <p className="text-blue-100 text-lg mb-0">Đăng ký ngay hôm nay và nhận 7 ngày dùng thử miễn phí tất cả các tính năng cao cấp.</p>
              </div>
              <div>
                <a href="/signup" className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-100 transition-colors shadow-lg text-lg inline-block">
                  Bắt đầu miễn phí
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-indigo-900 py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-white font-bold text-xl flex items-center mb-4">
                <svg className="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22Z" fill="white"/>
                  <path d="M8 13C8.55228 13 9 12.5523 9 12C9 11.4477 8.55228 11 8 11C7.44772 11 7 11.4477 7 12C7 12.5523 7.44772 13 8 13Z" fill="#3B82F6"/>
                  <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" fill="#3B82F6"/>
                  <path d="M16 13C16.5523 13 17 12.5523 17 12C17 11.4477 16.5523 11 16 11C15.4477 11 15 11.4477 15 12C15 12.5523 15.4477 13 16 13Z" fill="#3B82F6"/>
                </svg>
                SpeakPro
              </div>
              <p className="text-blue-200 mb-4">Nâng cao kỹ năng nói tiếng Anh của bạn với công nghệ AI tiên tiến.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-blue-200 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="text-blue-200 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href="#" className="text-blue-200 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Sản phẩm</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-blue-200 hover:text-white transition-colors">Tính năng</a></li>
                <li><a href="#pricing" className="text-blue-200 hover:text-white transition-colors">Bảng giá</a></li>
                <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Đánh giá</a></li>
                <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Hướng dẫn</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Công ty</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Về chúng tôi</a></li>
                <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Tuyển dụng</a></li>
                <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Liên hệ</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Hỗ trợ</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Trung tâm hỗ trợ</a></li>
                <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Câu hỏi thường gặp</a></li>
                <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Chính sách bảo mật</a></li>
                <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Điều khoản sử dụng</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-blue-800 mt-12 pt-8 text-center text-blue-200">
            <p>&copy; {new Date().getFullYear()} SpeakPro. Tất cả các quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;