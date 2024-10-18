import React from 'react';
import { useLocation } from 'react-router-dom';

function SearchPage(props) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const danhMuc = queryParams.get('danhmuc');
  const tuKhoa = queryParams.get('tukhoa');
  return (
    <div>
      {danhMuc}
      {tuKhoa}
    </div>
  );
}

export default SearchPage;