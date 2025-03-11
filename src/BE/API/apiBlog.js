const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);

// API tùy chỉnh để lọc blog theo category trong URL
// API custom lọc theo category
// http://localhost:5000/blogs/category/noi-bo
//http://localhost:5000/blogs?category=Nội Bộ
//http://localhost:5000/blogs/category/trong-nganh
//http://localhost:5000/blogs/category/noi-bo
//http://localhost:5000/blogs/category/atgt-duong-sat

server.get("/blogs/category/:category", (req, res) => {
  const { category } = req.params;
  const formattedCategory = category.replace(/-/g, " "); // Chuyển "noi-bo" -> "Nội Bộ"

  // Lấy danh sách bài viết từ db.json
  const allBlogs = router.db.get("blogs").value();

  // Lọc bài viết theo category (không phân biệt hoa/thường)
  const filteredBlogs = allBlogs.filter(
    (blog) => blog.category.toLowerCase() === formattedCategory.toLowerCase()
  );

  if (filteredBlogs.length > 0) {
    res.json(filteredBlogs);
  } else {
    res.status(404).json({ message: "Không tìm thấy bài viết nào." });
  }
});

// Kết nối json-server với API tùy chỉnh
server.use(router);
server.listen(5000, () => {
  console.log(" SON Server đang chạy trên cổng 5000");
});
