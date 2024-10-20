import React from 'react';
import NewsContent from "./components/NewsContent";
function News(props) {
  const datas = [
    {
      "title": "Chó Mèo và Nghệ Thuật Thư Giãn",
      "description": "Khám phá cách mà chó mèo tạo ra sự thư giãn cho chúng ta thông qua những hành động ngớ ngẩn.",
      "views": 250,
      "likes": 100,
      "date": "2023-10-21",
      "image": "https://dreampet.com.vn/wp-content/uploads/2021/03/cham-soc-cho-meo-3.jpg"
    },
    {
      "title": "Hướng Dẫn Làm Bánh Gato Bằng Mì Tôm",
      "description": "Một công thức độc đáo cho những tín đồ yêu thích mì tôm nhưng cũng muốn ăn bánh gato.",
      "views": 75,
      "likes": 20,
      "date": "2023-10-21",
      "image": "https://alo.flowers/wp-content/uploads/2021/12/IMG_2880.jpg"
    },
    {
      "title": "Những Cách Ngủ Ngon Nhất Trong Lớp Học",
      "description": "Khám phá những tư thế ngủ mà bạn có thể áp dụng khi ngồi trên ghế lớp học mà không bị thầy cô phát hiện.",
      "views": 180,
      "likes": 70,
      "date": "2023-10-21",
      "image": "./img/datsleep.jpg"
    },
    {
      "title": "Cách Tạo Dáng Chụp Ảnh Siêu Ngầu Khi Đi Siêu Thị",
      "description": "Hướng dẫn những dáng chụp ảnh độc lạ để bạn nổi bật giữa đám đông khi đi siêu thị.",
      "views": 300,
      "likes": 150,
      "date": "2023-10-21",
      "image": "./img/drinkvimp.jpg"
    },
    {
      "title": "Top 10 Loại Sữa Chua Béo Nhất Thế Giới",
      "description": "Danh sách những loại sữa chua béo ngậy mà bạn không thể bỏ lỡ, ngay cả khi bạn đang ăn kiêng.",
      "views": 50,
      "likes": 10,
      "date": "2023-10-21",
      "image": "https://benhvienphuongdong.vn/public/uploads/2023/thang-4/tinh-trung-dac/anh-1.jpg"
    },
    {
      "title": "Bí Quyết Để Bán Hàng Online Hiệu Quả",
      "description": "Những mẹo nhỏ giúp bạn tăng doanh số bán hàng online mà không cần quảng cáo.",
      "views": 120,
      "likes": 40,
      "date": "2023-10-21",
      "image": "https://channel.mediacdn.vn/428462621602512896/2022/12/12/photo-3-16708361287911156579514.png"
    },
    {
      "title": "Cách Lên Kế Hoạch Chạy Marathon Cho Người Mới",
      "description": "Hướng dẫn chi tiết giúp bạn lên kế hoạch tập luyện để tham gia chạy marathon lần đầu.",
      "views": 95,
      "likes": 30,
      "date": "2023-10-21",
      "image": "https://static.cand.com.vn/Files/Image/linhchi/2021/06/09/thumb_660_1d46f021-18d5-4e82-b27e-972861282a56.jpeg"
    },
    {
      "title": "Sự Thật Về Bánh Tráng Trộn Gây Nghiện",
      "description": "Khám phá nguồn gốc và bí quyết làm bánh tráng trộn ngon tuyệt.",
      "views": 200,
      "likes": 90,
      "date": "2023-10-21",
      "image": "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:quality(100)/2023_10_16_638330842659029064_cach-lam-banh-trang-tron.jpg"
    },
    {
      "title": "Cách Chơi Game Mà Không Cần Mất Thời Gian",
      "description": "Những mẹo chơi game giúp bạn vừa giải trí vừa không ảnh hưởng đến học tập.",
      "views": 80,
      "likes": 25,
      "date": "2023-10-21",
      "image": "./src/khonglohoc.jpg"
    },
    {
      "title": "Top 5 Thú Vị Về Các Loại Trà",
      "description": "Khám phá những loại trà nổi tiếng trên thế giới và lợi ích sức khỏe của chúng.",
      "views": 110,
      "likes": 35,
      "date": "2023-10-21",
      "image": "https://quantra.vn/wp-content/uploads/2023/06/tra-ngon-viet-nam-1.jpg"
    },
    {
      "title": "Làm Thế Nào Để Giữ Nếp Sống Lành Mạnh",
      "description": "Những thói quen đơn giản giúp bạn duy trì sức khỏe tốt mỗi ngày.",
      "views": 140,
      "likes": 60,
      "date": "2023-10-21",
      "image": "https://baocantho.com.vn/image/news/2016/20160605/fckimage/25651498202046_112.jpg"
    },
    {
      "title": "Những Cách Tăng Cường Sự Tập Trung Khi Học",
      "description": "Mẹo nhỏ giúp bạn cải thiện khả năng tập trung để học hiệu quả hơn.",
      "views": 160,
      "likes": 75,
      "date": "2023-10-21",
      "image": "https://shanhealth.vn/wp-content/uploads/2024/01/ren-luyen-su-tap-trung-2.jpg"
    }
  ];
  return (
    <>
      {datas.map((data,index) => (
          <NewsContent
            key={index}
            data={data}
        />
      ))}
    </>
  );
}

export default News;