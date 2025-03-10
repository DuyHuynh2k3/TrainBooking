import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BlogCard from "../../components/BlogCard";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Breadcrumb from "../../components/Breadcrumb";
import Paginition from "../../components/Paginition";

function HomeBlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [currentBlogs, setCurrentBlogs] = useState([]); // Danh sách bài viết theo trang
  const location = useLocation();

  const postsPerPage = 8; // Số bài viết trên mỗi trang

  // Lấy số trang từ URL
  const queryParams = new URLSearchParams(location.search);
  const currentPage = parseInt(queryParams.get("page")) || 1;

  useEffect(() => {
    fetch("http://localhost:5000/blogs")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);

        // Cắt danh sách bài viết theo trang
        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        setCurrentBlogs(data.slice(indexOfFirstPost, indexOfLastPost));
      })
      .catch((error) => console.error("Lỗi tải bài viết:", error));
  }, [currentPage]); // Theo dõi sự thay đổi của `currentPage`

  return (
    <div>
      <Header />
      <Breadcrumb />
      <main className="mt-2">
        <div className="container">
          <div className="row justify-content-center">
            {currentBlogs.map((blog) => (
              <div
                key={blog.id}
                className="col-12 col-md-6 d-flex justify-content-center"
              >
                <BlogCard blog={blog} />
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Truyền tổng số bài viết vào Paginition */}
      <Paginition postsPerPage={postsPerPage} totalPosts={blogs.length} />
      <Footer />
    </div>
  );
}

export default HomeBlogPage;
