import React from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";

const postData = [
  {
    tilte1:
      "1. Khách hàng sẽ được trả hàng trong vòng 3 ngày kể từ ngày mua.\n",
    tilte2:
      "2. Khách hàng thanh toán trước khi kiểm tra hàng, quay video quá trình bóc sản phẩm. \n",
    tilte3: "3. Điều kiện trả hàng: \n",
    tilte4:
      " \t     - Sản phẩm trả hàng phải giữ nguyên 100% hình dạng ban đầu: \n" +
      "Thân máy, màn hình không trầy xước, không có dấu hiệu va chạm mạnh, cấn móp bị vào nước , sản phẩm chưa qua sử dụng.  \n",
    title5: "        - Hoàn trả phải đầy đủ hộp và phụ kiện đi kèm.\n",
    title6:
      "        - Mất phụ kiện thu phí theo giá bán tối thiểu trên website TN_Store 		 (5% giá trị hoá đơn) cho tất cả các nhóm sản phẩm.",
    title7:
      "        - Hoàn trả toàn bộ hàng khuyến mại, nếu mất hàng sẽ thu theo mức \t\tphí của hàng khuyến mại đó. \n",
    title8: "4. Phương thức trả hàng \n",
    title9:
      "         - Khách hàng chỉ được gửi hàng qua bưu điện, trực tiếp của cửa hàng, các dịch vụ giao hàng. \n",
    title10: "5. Phí trả hàng \n",
    title11:
      "         - Nếu là mua online -> khách hàng sẽ chi trả toàn bộ phí ship gửi lại hàng. \n",
    title12: "           Mức phí: Tuỳ theo đơn vị giao hàng.\n",
    title13: "6. Trạng thái hoàn tiền\n",
    title14:
      "         - Khách hàng sẽ được lại 100% tiền của sản phẩm đó nếu khách hàng đáp ứng đủ các yêu cầu của chính sách trả hàng. ",
    title15: "         - Thời gian nhận lại tiền hoàn: trong vòng 3-5 ngày.\n",
    title16: "7. Trạng thái hoàn trả điểm\n",
    title17:
      "         - Khách hàng sẽ hoàn lại điểm nếu như khách hàng đó trả hàng. \n",
  },
];

function BlogPost({ post }) {
  return (
    <div className="border p-4 blog-post" style={{ marginBottom: "50px" }}>
      <p>{post.tilte1}</p>
      <p>{post.tilte2}</p>
      <p>{post.tilte3}</p>
      <p>{post.tilte4}</p>
      <p>{post.title5}</p>
      <p>{post.title6}</p>
      <p>{post.title7}</p>
      <p>{post.title8}</p>
      <p>{post.title9}</p>
      <p>{post.title10}</p>
      <p>{post.title11}</p>
      <p>{post.title12}</p>
      <p>{post.title13}</p>
      <p>{post.title14}</p>
      <p>{post.title15}</p>
      <p>{post.title16}</p>
      <p>{post.title17}</p>
    </div>
  );
}

function goToTop() {
  window.scrollTo({
    top: 0, // Cuộn lên vị trí đầu trang
    behavior: "smooth", // Hiệu ứng cuộn mượt
  });
}

export default function Blogs() {
  return (
    <>
      <Header />
      <div className="container mx-auto py-8">
        <h1
          className="text-2xl font-bold mb-4"
          style={{ textAlign: "center", color: "red", "margin-top": "40px" }}
        >
          Chính sách cửa hàng TN_Store
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {postData.map((post, index) => (
            <BlogPost key={index} post={post} />
          ))}
        </div>
      </div>
      <i
        className="fa fa-arrow-up"
        id="goto-top-page"
        onClick={() => goToTop()}
      />
      <Footer />
    </>
  );
}
