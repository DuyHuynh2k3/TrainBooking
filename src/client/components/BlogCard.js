import { Link } from "react-router-dom";

function BlogCard({ blog }) {
  return (
    <div className="card shadow-sm w-100 mb-4" style={{ borderRadius: "10px" }}>
      <img
        src={blog.img}
        alt={blog.title}
        className="card-img-top"
        style={{ height: "200px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h5 className="card-title text-primary">{blog.title}</h5>
        <p className="card-text text-muted" style={{ fontSize: "14px" }}>
          {blog.description}
        </p>
        <Link to={`/blog/${blog.id}`} className="btn btn-outline-primary btn-sm">
          Đọc tiếp...
        </Link>
      </div>
    </div>
  );
}

export default BlogCard;
