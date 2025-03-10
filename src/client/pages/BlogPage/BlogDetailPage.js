import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function BlogDetailPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/blogs/${id}`)
      .then((res) => res.json())
      .then((data) => setBlog(data))
      .catch((error) => console.error("Lỗi tải bài viết:", error));
  }, [id]);

  if (!blog) {
    return <h2>Đang tải...</h2>;
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <img src={blog.img} alt={blog.title} style={{ width: "100%", height: "400px", objectFit: "cover" }} />
      <p>{blog.description}</p>
    </div>
  );
}

export default BlogDetailPage;
