# PHÂN CHIA CÔNG VIỆC - WEB QUẢN LÝ THƯ VIỆN

## Các chức năng bên admin (nodejs, ejs, boostrap 5)

### Trương Văn Đạt

- Thống kê (lượt mượn sách, số tài khoản bth vs bị khóa, lượt mượn, thu phí
  phạt)
- Quản lý độc giả (thêm(check trùng MSSV, CCCD), sửa (check MSSV, CCCD vừa update
  có trùng vs tk vừa update k, trùng thì ok còn k phải k cho update), khóa, phân
  trang, sắp xếp, bộ lọc (tk bth, tk khóa), tìm kiếm(tìm kiếm tuyệt đối luôn tại
  mssv phải nhớ, k tìm giống))
### Nguyễn Lê Tấn Đạt
- Quản lý thể loại sách (thêm(check cùng tên khác thể loại thì dc), sửa (từ tài
  khoản ta có...), xóa (nhớ kiểm tra xem có sách thuộc thể loại không), phân
  trang, sắp xếp, tìm kiếm)
- Quản lý sách (thêm(tự cook), sửa (như trên), phân trang, sắp xếp, bộ lọc, tìm
  kiếm)
### Lê Nguyễn Minh Hòa
- Quản lý mượn/trả (thêm(tự cook), sửa (cũng vậy), phân trang, bộ lọc, sắp xếp,
  tìm kiếm)
- Quản lý tin tức (như trên)
- Thiết lập các validate, base cho api, xác thực
### Phạm Phúc Đạt
- Quản lý phản hồi (phân trang, sắp xếp, tìm kiếm)----thêm(tự cook),sửa(same) ?????????????? phản hồi từ người dùng thì làm gì có dụ mình thêm hay sửa xóa thì maybe
- Quản lý phí phạt (thêm(tự cook), sửa(sửa chỉ sửa giá vs lý do nộp phạt), phân
  trang, sắp xếp, tìm kiếm)

## Các chức năng bên admin (reactjs, MUI)

### Nguyễn Lê Tấn Đạt
- Trang đăng nhập
- Hồ sơ người dùng (đổi mk, tt, đăng xuất, truy cập admin, tt mượn trả(cái nào
  mượn quá hạn hiện đỏ), phản hồi của bạn (không phải của tôi), tt nộp phạt (set
  tự thêm vô bên đây có tính ra money = day\*2000))

### Trương Văn Đạt
- Giao diện trang chủ (header, ds sách, ds tin tức)
- Giao diện danh sách (có bộ lọc theo danh mục luôn)
- Trang chi tiết sách (cho mượn 1 cuốn thôi pls)

### Lê Nguyễn Minh Hòa
- Danh sách tin tức.
- Trang chi tiết tin tức (có like và quánh giá).

### Phạm Phúc Đạt
- Trang phản hồi (như số 4)
- Trang tìm kiếm sách
