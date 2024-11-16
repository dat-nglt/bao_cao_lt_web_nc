PHÂN CHIA CÔNG VIỆC - WEB QUẢN LÝ THƯ VIỆN

-Các chức năng bên admin(nodejs, ejs, boostrap 5)
 + Thống kê(lượt mượn sách, số tài khoản bth vs bị khóa, lượt mượn, thu phí phạt)(1)
 + Quản lý độc giả(thêm(check trùng MSSV, CCCD), sửa(check MSSV, CCCD vừa update có trùng vs tk vừa update k, trùng thì ok còn k phải k cho update), khóa, phân trang, sắp xếp, bộ lọc(tk bth, tk khóa), tìm kiếm(tìm kiếm tuyệt đối luôn tại mssv phải nhớ, k tìm giống)(1)
 + Quản lý thể loại sách(thêm(check cùng tên khác thể loại thì dc), sửa(từ tài khoản ta có...), xóa(nhớ kiểm tra xem có sách thuộc thể loại không), phân trang, sắp xếp, tìm kiếm)(2)
 + Quản lý sách(thêm(tự cook), sửa(như trên), phân trang, sắp xếp, bộ lọc, tìm kiếm)(2)
 + Quản lý mượn/trả(thêm(tự cook), sửa(cũng vậy), phân trang, bộ lọc, sắp xếp, tìm kiếm)(4)
 + Quản lý phí phạt(thêm(tự cook), sửa(sửa chỉ sửa giá vs lý do nộp phạt), phân trang, sắp xếp, tìm kiếm)(3)
 + Quản lý phản hồi(thêm(tự cook), sửa(same), phân trang, sắp xếp, tìm kiếm)(3)
 + Quản lý tin tức(như trên)(4)


-Các chức năng bên admin(reactjs, ????)
 + Trang đăng nhập(2)
 + Giao diện trang chủ(header, ds sách, ds tin tức)(1)
 + Hồ sơ người dùng(đổi mk, tt, đăng xuất, truy cập admin, tt mượn trả(cái nào mượn quá hạn hiện đỏ), phản hồi của bạn(không phải của tôi), tt nộp phạt(set tự thêm vô bên đây có tính ra money = day*2000))(2)
 + Giao diện danh sách sách(có bộ lọc theo danh mục luôn)(1)
 + Trang chi tiết sách(cho mượn 1 cuốn thôi pls)(1)
 + Danh sách tin tức.(4)
 + Trang chi tiết tin tức(có like và quánh giá).(4)
 + Trang phản hồi(như số 4)(3)
 + Trang tìm kiếm sách(3)
 