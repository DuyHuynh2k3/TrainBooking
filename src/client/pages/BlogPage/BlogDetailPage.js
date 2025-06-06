import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Breadcrumb from "../../components/Breadcrumb";

function BlogDetailPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(
          `https://api.goticket.click/api/blogs/${id}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        if (!data || !data.title) {
          throw new Error("Bài viết không tồn tại");
        }

        setBlog(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <h2>Đang tải...</h2>;
  if (error) return <h2>Lỗi: {error}</h2>;
  if (!blog) return <h2>Không tìm thấy bài viết</h2>;

  // Map categoryId -> slug
  const categoryIdMap = {
    1: "khuyen-mai",
    2: "trong-nganh",
    3: "noi-bo",
    4: "atgt-duong-sat",
  };

  const categorySlug = blog.categoryId ? categoryIdMap[blog.categoryId] : null;

  return (
    <div className="container-fluid p-0">
      <Header />
      <Breadcrumb category={categorySlug} title={blog.title} />
      <div className="row d-flex justify-content-center">
        <div className="col-7">
          <h1 className="mb-4">{blog.title}</h1>
          {blog.sections && blog.sections.length > 0 ? (
            blog.sections.map((section, index) => (
              <div key={index} className="mb-5">
                <img
                  src={section.imageUrl || "/default.jpg"}
                  alt={`Ảnh ${index + 1}`}
                  className="img-fluid rounded mb-3"
                  style={{
                    maxHeight: "400px",
                    objectFit: "cover",
                    width: "100%",
                  }}
                />
                <div
                  className="blog-content"
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />
              </div>
            ))
          ) : (
            <p>Không có nội dung để hiển thị.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default BlogDetailPage;
