import React from 'react';
import CategoryBook from './CategoryBook';
import CategoryNews from './CategoryNews';
const books = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Classic",
    publisher: "Charles Scribner's Sons",
    year: 1925,
    coverUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPj1vUFsc1tTIjxqbX1bwUxOYFNL8_9KNmOSOfhRCtAu7Bqz68I9ASkfDowE93RWfbDJM&usqp=CAU"
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
    publisher: "J.B. Lippincott & Co.",
    year: 1960,
    coverUrl: "https://m.media-amazon.com/images/I/81aY1lxk+9L._AC_UF1000,1000_QL80_.jpg"
  },
  {
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    publisher: "Secker & Warburg",
    year: 1949,
    coverUrl: "https://m.media-amazon.com/images/I/61NAx5pd6XL._AC_UF1000,1000_QL80_.jpg"
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance",
    publisher: "T. Egerton",
    year: 1813,
    coverUrl: "https://m.media-amazon.com/images/M/MV5BYzNkMjRmZGMtODg1Ni00MjIxLWI4MTYtOGEwM2YyMmZiMjUzXkEyXkFqcGc@._V1_.jpg"
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    genre: "Fiction",
    publisher: "Little, Brown and Company",
    year: 1951,
    coverUrl: "https://cdn.britannica.com/94/181394-050-2F76F7EE/Reproduction-cover-edition-The-Catcher-in-the.jpg"
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    publisher: "George Allen & Unwin",
    year: 1937,
    coverUrl: "https://m.media-amazon.com/images/I/71S7Z+YhJFL._AC_UF1000,1000_QL80_.jpg"
  },
  {
    title: "Fahrenheit 451",
    author: "Ray Bradbury",
    genre: "Dystopian",
    publisher: "Ballantine Books",
    year: 1953,
    coverUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKVTgiTFN1cnWLWlpJqgSX3-9ELLSPSl11fQ&s"
  },
  {
    title: "Brave New World",
    author: "Aldous Huxley",
    genre: "Dystopian",
    publisher: "Chatto & Windus",
    year: 1932,
    coverUrl: "https://m.media-amazon.com/images/I/91D4YvdC0dL._AC_UF1000,1000_QL80_.jpg"
  },
  {
    title: "Moby-Dick",
    author: "Herman Melville",
    genre: "Adventure",
    publisher: "Harper & Brothers",
    year: 1851,
    coverUrl: "https://m.media-amazon.com/images/I/61PBBKyZ1rL._AC_UF1000,1000_QL80_.jpg"
  },
  {
    title: "War and Peace",
    author: "Leo Tolstoy",
    genre: "Historical Fiction",
    publisher: "The Russian Messenger",
    year: 1869,
    coverUrl: "https://m.media-amazon.com/images/I/91teiIZ5vwL._AC_UF1000,1000_QL80_.jpg"
  },
  {
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    publisher: "George Allen & Unwin",
    year: 1954,
    coverUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6D1xdceTr1qkGNw238JUqvZPVBXwayjCsoaZtT8Ech6CascCfg9h8JEtaJCNU7QUjZhM&usqp=CAU"
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Adventure",
    publisher: "HarperOne",
    year: 1988,
    coverUrl: "https://m.media-amazon.com/images/I/61HAE8zahLL._AC_UF1000,1000_QL80_.jpg"
  },
  {
    title: "The Picture of Dorian Gray",
    author: "Oscar Wilde",
    genre: "Philosophical Fiction",
    publisher: "Lippincott's Monthly Magazine",
    year: 1890,
    coverUrl: "https://m.media-amazon.com/images/M/MV5BMTY5ODc1NjU5N15BMl5BanBnXkFtZTcwMTUyNDg3Mg@@._V1_.jpg"
  }
];
const news = [
  {
    title: "Sách quá hạn, mẹ kiếp về nhà liền!",
    author: "Thủ thư Nguyễn Văn A",
    year: '20/10/2024',
    coverUrl: "https://res.cloudinary.com/dta7fdnph/image/upload/v1729434759/soft_shadow_ocndts.png",
    content: "Trong một thông báo gây sốc, thư viện trường đã đưa ra quy định mới rằng sinh viên mượn sách quá hạn sẽ gặp phải những hình phạt nghiêm khắc, bao gồm việc không được tham gia các hoạt động học tập và thậm chí có thể bị đuổi học. Điều này đã khiến nhiều sinh viên hoang mang và lo lắng. Nhiều người đã lên tiếng phản đối quy định này, cho rằng nó quá khắc nghiệt và không công bằng. Thư viện nhấn mạnh rằng mục đích của quy định là để nâng cao ý thức tự giác của sinh viên trong việc quản lý thời gian và tài nguyên học tập."
  },
  {
    title: "Tác giả 'cực phẩm' đến thăm thư viện!",
    author: "Nhà báo Trần Thị B",
    year: '15/09/2024',
    coverUrl: "https://res.cloudinary.com/dta7fdnph/image/upload/v1729434759/soft_shadow_ocndts.png",
    content: "Tác giả nổi tiếng với nhiều tác phẩm ăn khách đã có buổi gặp gỡ thân mật với sinh viên và giảng viên tại thư viện trường. Sự kiện thu hút đông đảo sự quan tâm của cộng đồng sinh viên. Trong buổi giao lưu, tác giả đã chia sẻ những câu chuyện thú vị về quá trình sáng tác và nguồn cảm hứng của mình. Sinh viên cũng có cơ hội đặt câu hỏi và nhận được những lời khuyên quý giá từ tác giả. Buổi gặp gỡ không chỉ giúp sinh viên hiểu thêm về nghề viết mà còn khuyến khích họ theo đuổi đam mê của mình."
  },
  {
    title: "Hội sách 'ăn' khủng, tiền ào ào vào túi!",
    author: "Phó Hiệu trưởng Lê Văn C",
    year: '01/08/2024',
    coverUrl: "https://res.cloudinary.com/dta7fdnph/image/upload/v1729434759/soft_shadow_ocndts.png",
    content: "Hội sách diễn ra tại trường đã trở thành một sự kiện lớn, thu hút hàng ngàn sinh viên và phụ huynh đến tham quan và mua sắm. Với hàng trăm đầu sách đa dạng, từ sách giáo khoa đến văn học và sách chuyên ngành, hội sách đã mang đến những trải nghiệm thú vị cho người tham dự. Nhiều gian hàng đã cháy hàng chỉ sau vài giờ mở cửa. Các nhà xuất bản tham gia cũng cho biết doanh thu của họ đã tăng vọt trong suốt thời gian diễn ra hội sách, chứng tỏ sức hút mạnh mẽ của sự kiện này."
  },
  {
    title: "Thủ thư 'cực phẩm' nhận giải 'khét tiếng'!",
    author: "Phóng viên Nguyễn Thị D",
    year: '25/06/2024',
    coverUrl: "https://res.cloudinary.com/dta7fdnph/image/upload/v1729434759/soft_shadow_ocndts.png",
    content: "Trong một buổi lễ trang trọng, thủ thư của trường đã được vinh danh với giải thưởng 'cực phẩm' cho những đóng góp không ngừng nghỉ trong việc phát triển thư viện. Với nhiều sáng kiến đổi mới, thủ thư đã tạo ra một môi trường học tập thân thiện và hiện đại cho sinh viên. Nhiều sinh viên đã bày tỏ sự cảm ơn và lòng ngưỡng mộ đối với những nỗ lực của thủ thư trong việc nâng cao chất lượng dịch vụ thư viện. Giải thưởng này không chỉ là sự công nhận cho cá nhân mà còn là động lực cho toàn bộ đội ngũ thư viện."
  },
  {
    title: "Thư viện tổ chức 'đại tiệc' sách miễn phí!",
    author: "Biên tập viên Trần Văn E",
    year: '10/05/2024',
    coverUrl: "https://res.cloudinary.com/dta7fdnph/image/upload/v1729434759/soft_shadow_ocndts.png",
    content: "Đại tiệc sách miễn phí đã diễn ra thành công tốt đẹp tại thư viện trường, thu hút rất nhiều sinh viên tham gia. Mục tiêu của sự kiện là khuyến khích việc đọc sách và tạo cơ hội cho sinh viên tiếp cận với nhiều loại sách khác nhau mà không phải trả phí. Các gian hàng sách đã được chuẩn bị chu đáo với nhiều thể loại từ văn học, khoa học đến sách thiếu nhi. Sự kiện không chỉ giúp sinh viên tiết kiệm chi phí mà còn tạo ra một không gian giao lưu, chia sẻ giữa những người yêu sách trong cộng đồng trường học."
  }
];

function Feed(props) {
  return (
    <div>
      <CategoryBook title={'Sách mới'} bookList={books} isHomePage={true} />
      <CategoryNews title={'Tin tức mới'} newsList={news} isHomePage={true} />
    </div>
  );
}

export default Feed;