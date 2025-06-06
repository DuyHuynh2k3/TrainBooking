import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import BlogCard from "../../components/BlogCard";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Breadcrumb from "../../components/Breadcrumb";
import Paginition from "../../components/Paginition";

function HomeBlogPage() {
  const { category } = useParams(); // Lấy category từ URL
  const location = useLocation();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cấu hình phân trang
  const postsPerPage = 9;
  const queryParams = new URLSearchParams(location.search);
  const currentPage = Number(queryParams.get("page")) || 1;

  // Map URL-friendly category names to display names
  const categoryMap = {
    "khuyen-mai": "Khuyến Mãi",
    "trong-nganh": "Trong Ngành",
    "noi-bo": "Nội Bộ",
    "atgt-duong-sat": "ATGT Đường Sắt",
  };

  // Get display name or fallback to URL param
  const displayCategory = categoryMap[category] || category;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        let apiUrl = "https://api.goticket.click/api/blogs";

        // Thêm param category nếu có
        if (category) {
          apiUrl += `?category=${encodeURIComponent(category)}`; // <-- chỉ cần encode slug thẳng luôn!
        }

        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to fetch blogs");
        const data = await response.json();
        console.log("hhh", data);

        setBlogs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [category, displayCategory]); // Re-fetch khi category thay đổi

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstPost, indexOfLastPost);

  if (loading)
    return (
      <div className="text-center py-5">
        <h2>Đang tải...</h2>
      </div>
    );
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div>
      <Header />
      <Breadcrumb category={displayCategory} />

      <main className="mt-2">
        <div className="container">
          {currentBlogs.length > 0 ? (
            <div className="row justify-content-center p-0">
              {currentBlogs.map((blog) => (
                <div
                  key={blog.id}
                  className="col-12 col-md-6 col-lg-4 d-flex justify-content-center mb-4"
                >
                  <BlogCard blog={blog} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-5">
              <h4>
                {category
                  ? `Không có bài viết nào trong mục ${displayCategory}`
                  : "Không có bài viết nào"}
              </h4>
            </div>
          )}
        </div>
      </main>

      <Paginition
        postsPerPage={postsPerPage}
        totalPosts={blogs.length}
        currentPage={currentPage}
        basePath={`/blogs/${category || ""}`} // Giữ category khi chuyển trang
      />

      <Footer />
    </div>
  );
}

export default HomeBlogPage;
