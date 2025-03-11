import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BlogCard from "../../components/BlogCard";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Breadcrumb from "../../components/Breadcrumb";
import Paginition from "../../components/Paginition";

function HomeBlogPage({ category }) {
  const [blogs, setBlogs] = useState([]);
  const [currentBlogs, setCurrentBlogs] = useState([]);
  const location = useLocation();
  const postsPerPage = 9;
  const queryParams = new URLSearchParams(location.search);
  const currentPage = Number(queryParams.get("page")) || 1;

  // Ánh xạ category từ URL sang định dạng db.json
  const categoryMap = {
    "khuyen-mai": "Khuyến Mãi",
    "trong-nganh": "Trong Ngành",
    "noi-bo": "Nội Bộ",
    "atgt-duong-sat": "ATGT Đường Sắt",
  };

  const formattedCategory = categoryMap[category] || category;

  useEffect(() => {
    let url = `http://localhost:5000/blogs?category=${encodeURIComponent(formattedCategory)}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log("Dữ liệu từ API:", data); // Debug API
        setBlogs(data);

        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        setCurrentBlogs(data.slice(indexOfFirstPost, indexOfLastPost));
      })
      .catch((error) => console.error("Lỗi tải bài viết:", error));
  }, [currentPage, formattedCategory]);

  return (
    <div>
      <Header />
      <Breadcrumb category={formattedCategory} />
      <main className="mt-2">
        <div className="container">
          <div className="row justify-content-center p-0">
            {currentBlogs.map((blog) => (
              <div key={blog.id} className="col-12 col-md-6 col-lg-4 d-flex justify-content-center">
                <BlogCard blog={blog} />
              </div>
            ))}
          </div>
        </div>
      </main>

      <Paginition postsPerPage={postsPerPage} totalPosts={blogs.length} currentPage={currentPage} />
      <Footer />
    </div>
  );
}

export default HomeBlogPage;
