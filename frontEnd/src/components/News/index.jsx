import React, { useState } from 'react';
import NewsContent from "./components/NewsContent";
import NewsDetail from "./components/NewsDetail";


import { Box } from '@mui/material';

function News(props) {
  const datas = [
    {
      id: 1,
      title: "Chó Mèo và Nghệ Thuật Thư Giãn",
      description: "Khám phá cách mà chó mèo tạo ra sự thư giãn cho chúng ta thông qua những hành động ngớ ngẩn.",
      views: 250,
      likes: 100,
      date: "2023-10-21",
      images: [
        {
          img: "https://dreampet.com.vn/wp-content/uploads/2021/03/cham-soc-cho-meo-3.jpg",
          title: "Hình 1",
        },
        {
          img: "https://alo.flowers/wp-content/uploads/2021/12/IMG_2880.jpg",
          title: "Hình 2",
        },
        {
          img: "https://benhvienphuongdong.vn/public/uploads/2023/thang-4/tinh-trung-dac/anh-1.jpg",
          title: "Hình 3",
        },
        {
          img: "https://channel.mediacdn.vn/428462621602512896/2022/12/12/photo-3-16708361287911156579514.png",
          title: "Hình 4",
        },
        {
          img: "https://static.cand.com.vn/Files/Image/linhchi/2021/06/09/thumb_660_1d46f021-18d5-4e82-b27e-972861282a56.jpeg",
          title: "Hình 5",
        },
        {
          img: "https://quantra.vn/wp-content/uploads/2023/06/tra-ngon-viet-nam-1.jpg",
          title: "Hình 6",
        },
        {
          img: "https://shanhealth.vn/wp-content/uploads/2024/01/ren-luyen-su-tap-trung-2.jpg",
          title: "Hình 7",
        }
      ]
    },
    {
      id: 2,
      title: "Hướng Dẫn Làm Bánh Gato Bằng Mì Tôm",
      description: "Một công thức độc đáo cho những tín đồ yêu thích mì tôm nhưng cũng muốn ăn bánh gato.ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok okok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok okok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok okok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ",
      views: 75,
      likes: 20,
      date: "2023-10-21",
      images: [
        {
          img: "https://dreampet.com.vn/wp-content/uploads/2021/03/cham-soc-cho-meo-3.jpg",
          title: "Hình 1",
        },
        {
          img: "https://alo.flowers/wp-content/uploads/2021/12/IMG_2880.jpg",
          title: "Hình 2",
        },
        {
          img: "https://benhvienphuongdong.vn/public/uploads/2023/thang-4/tinh-trung-dac/anh-1.jpg",
          title: "Hình 3",
        },
        {
          img: "https://channel.mediacdn.vn/428462621602512896/2022/12/12/photo-3-16708361287911156579514.png",
          title: "Hình 4",
        },
        {
          img: "https://static.cand.com.vn/Files/Image/linhchi/2021/06/09/thumb_660_1d46f021-18d5-4e82-b27e-972861282a56.jpeg",
          title: "Hình 5",
        },
        {
          img: "https://quantra.vn/wp-content/uploads/2023/06/tra-ngon-viet-nam-1.jpg",
          title: "Hình 6",
        },
        {
          img: "https://shanhealth.vn/wp-content/uploads/2024/01/ren-luyen-su-tap-trung-2.jpg",
          title: "Hình 7",
        }
      ]
    },
    {
      id: 3,
      title: "Những Cách Ngủ Ngon Nhất Trong Lớp Học",
      description: "Khám phá những tư thế ngủ mà bạn có thể áp dụng khi ngồi trên ghế lớp học mà không bị thầy cô phát hiện.",
      views: 180,
      likes: 70,
      date: "2023-10-21",
      images: [
        {
          img: "./img/datsleep.jpg",
          title: "2 bạn này ngủ nè cô"
        }
      ]
    },
    {
      id: 4,
      title: "Cách Tạo Dáng Chụp Ảnh Siêu Ngầu Khi Đi Siêu Thị",
      description: "Hướng dẫn những dáng chụp ảnh độc lạ để bạn nổi bật giữa đám đông khi đi siêu thị.",
      views: 300,
      likes: 150,
      date: "2023-10-21",
      images: [
        {
          img: "./img/drinkvimp.jpg",
          title: "bạn này cần súc miệng"
        },
        {
          img: "https://alo.flowers/wp-content/uploads/2021/12/IMG_2880.jpg",
          title: "Hình 2",
        }
      ]
    },
    {
      id: 5,
      title: "Top 10 Loại Sữa Chua Béo Nhất Thế Giới",
      description: "Danh sách những loại sữa chua béo ngậy mà bạn không thể bỏ lỡ, ngay cả khi bạn đang ăn kiêng.",
      views: 50,
      likes: 10,
      date: "2023-10-21",
      images: [
        {
          img: "https://dreampet.com.vn/wp-content/uploads/2021/03/cham-soc-cho-meo-3.jpg",
          title: "Hình 1",
        },
        {
          img: "https://alo.flowers/wp-content/uploads/2021/12/IMG_2880.jpg",
          title: "Hình 2",
        },
        {
          img: "https://benhvienphuongdong.vn/public/uploads/2023/thang-4/tinh-trung-dac/anh-1.jpg",
          title: "Hình 3",
        }
      ]
    },
    {
      id: 6,
      title: "Bí Quyết Để Bán Hàng Online Hiệu Quả",
      description: "Những mẹo nhỏ giúp bạn tăng doanh số bán hàng online mà không cần quảng cáo.",
      views: 120,
      likes: 40,
      date: "2023-10-21",
      images: [
        {
          img: "https://dreampet.com.vn/wp-content/uploads/2021/03/cham-soc-cho-meo-3.jpg",
          title: "Hình 1",
        },
        {
          img: "https://alo.flowers/wp-content/uploads/2021/12/IMG_2880.jpg",
          title: "Hình 2",
        },
        {
          img: "https://benhvienphuongdong.vn/public/uploads/2023/thang-4/tinh-trung-dac/anh-1.jpg",
          title: "Hình 3",
        },
        {
          img: "https://channel.mediacdn.vn/428462621602512896/2022/12/12/photo-3-16708361287911156579514.png",
          title: "Hình 4",
        },
        {
          img: "https://static.cand.com.vn/Files/Image/linhchi/2021/06/09/thumb_660_1d46f021-18d5-4e82-b27e-972861282a56.jpeg",
          title: "Hình 5",
        },
        {
          img: "https://quantra.vn/wp-content/uploads/2023/06/tra-ngon-viet-nam-1.jpg",
          title: "Hình 6",
        },
        {
          img: "https://shanhealth.vn/wp-content/uploads/2024/01/ren-luyen-su-tap-trung-2.jpg",
          title: "Hình 7",
        }
      ]
    },
    {
      id: 7,
      title: "Cách Lên Kế Hoạch Chạy Marathon Cho Người Mới",
      description: "Hướng dẫn chi tiết giúp bạn lên kế hoạch tập luyện để tham gia chạy marathon lần đầu.",
      views: 95,
      likes: 30,
      date: "2023-10-21",
      images: [
        {
          img: "https://dreampet.com.vn/wp-content/uploads/2021/03/cham-soc-cho-meo-3.jpg",
          title: "Hình 1",
        },
        {
          img: "https://alo.flowers/wp-content/uploads/2021/12/IMG_2880.jpg",
          title: "Hình 2",
        },
        {
          img: "https://benhvienphuongdong.vn/public/uploads/2023/thang-4/tinh-trung-dac/anh-1.jpg",
          title: "Hình 3",
        },
        {
          img: "https://channel.mediacdn.vn/428462621602512896/2022/12/12/photo-3-16708361287911156579514.png",
          title: "Hình 4",
        },
        {
          img: "https://static.cand.com.vn/Files/Image/linhchi/2021/06/09/thumb_660_1d46f021-18d5-4e82-b27e-972861282a56.jpeg",
          title: "Hình 5",
        }
      ]
    },
    {
      id: 8,
      title: "Sống Xanh Cùng Những Thói Quen Tốt",
      description: "Khám phá những thói quen đơn giản mà bạn có thể thực hiện hàng ngày để sống xanh hơn.",
      views: 60,
      likes: 15,
      date: "2023-10-21",
      images: [
        {
          img: "https://dreampet.com.vn/wp-content/uploads/2021/03/cham-soc-cho-meo-3.jpg",
          title: "Hình 1",
        },
        {
          img: "https://alo.flowers/wp-content/uploads/2021/12/IMG_2880.jpg",
          title: "Hình 2",
        },
        {
          img: "https://benhvienphuongdong.vn/public/uploads/2023/thang-4/tinh-trung-dac/anh-1.jpg",
          title: "Hình 3",
        },
        {
          img: "https://channel.mediacdn.vn/428462621602512896/2022/12/12/photo-3-16708361287911156579514.png",
          title: "Hình 4",
        },
        {
          img: "https://static.cand.com.vn/Files/Image/linhchi/2021/06/09/thumb_660_1d46f021-18d5-4e82-b27e-972861282a56.jpeg",
          title: "Hình 5",
        },
        {
          img: "https://quantra.vn/wp-content/uploads/2023/06/tra-ngon-viet-nam-1.jpg",
          title: "Hình 6",
        }
      ]
    },
    {
      id: 9,
      title: "Chia Sẻ Kinh Nghiệm Du Lịch Đà Lạt",
      description: "Những địa điểm không thể bỏ qua khi đến Đà Lạt mà bạn nên biết.",
      views: 200,
      likes: 80,
      date: "2023-10-21",
      images: [
        {
          img: "https://dreampet.com.vn/wp-content/uploads/2021/03/cham-soc-cho-meo-3.jpg",
          title: "Hình 1",
        },
        {
          img: "https://alo.flowers/wp-content/uploads/2021/12/IMG_2880.jpg",
          title: "Hình 2",
        },
        {
          img: "https://benhvienphuongdong.vn/public/uploads/2023/thang-4/tinh-trung-dac/anh-1.jpg",
          title: "Hình 3",
        }
      ]
    },
    {
      id: 10,
      title: "Những Món Ăn Ngon Nhất Thế Giới",
      description: "Khám phá những món ăn ngon mà bạn nên thử ít nhất một lần trong đời.",
      views: 140,
      likes: 50,
      date: "2023-10-21",
      images: [
        {
          img: "https://dreampet.com.vn/wp-content/uploads/2021/03/cham-soc-cho-meo-3.jpg",
          title: "Hình 1",
        },
        {
          img: "https://alo.flowers/wp-content/uploads/2021/12/IMG_2880.jpg",
          title: "Hình 2",
        },
        {
          img: "https://benhvienphuongdong.vn/public/uploads/2023/thang-4/tinh-trung-dac/anh-1.jpg",
          title: "Hình 3",
        },
        {
          img: "https://channel.mediacdn.vn/428462621602512896/2022/12/12/photo-3-16708361287911156579514.png",
          title: "Hình 4",
        }
      ]
    }
];

  const [selectedId, setSelectedId] = useState(null);

  const handleNewsClick = (id) => {
    setSelectedId(selectedId ? null : id);
  };
  return (
    <>
      {selectedId ? (
          datas.filter(data => data.id === selectedId).map(data => (
                <NewsDetail
                  data={data}
                  onClick={() => handleNewsClick(data.id)}
                />
            ))
      ):(
        datas.map((data, index) => (
          <NewsContent
            data={data}
            key={index}
            onClick={() => handleNewsClick(data.id)}
          />
        ))
      )}
    </>
  );
}

export default News;