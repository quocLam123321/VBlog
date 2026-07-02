export const capitalizeFirstLetter = (val) => {
  if (!val) return ''
  return `${val.charAt(0).toUpperCase()}${val.slice(1)}`
}

// Chặn spam click khi gọi API
export const interceptorLoadingElements = (calling) => {
  const elements = document.querySelectorAll('.interceptor-loading')
  for (let i = 0; i < elements.length; i++) {
    if (calling) {
      elements[i].style.opacity = '0.5'
      elements[i].style.pointerEvents = 'none'
    } else {
      elements[i].style.opacity = 'initial'
      elements[i].style.pointerEvents = 'initial'
    }
  }
}

// Hàm phân trang custom sliding window (trượt theo current page)
export const generatePagination = (currentPage, totalPages) => {
  // Nếu tổng số trang ít (<= 7) thì in ra hết
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  // Trường hợp 1: Chạm ngưỡng gần cuối (ví dụ đang ở 13, 14, 15, 16)
  // Fix cứng 7 số cuối cùng để không bị lỗi đè số hay hiện ... vô lý
  if (currentPage >= totalPages - 3) {
    return [
      totalPages - 6,
      totalPages - 5,
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages
    ]
  }

  // Trường hợp 2: Khúc đầu và khúc giữa trượt theo currentPage
  // Đẩy startLeft lùi lại 2 bước so với currentPage (để curr nằm ở vị trí số 3)
  // Dùng Math.max(1, ...) để đảm bảo nó không bao giờ bị lùi xuống số 0 hay số âm.
  const startLeft = Math.max(1, currentPage - 2)

  return [
    startLeft, // Vị trí 1
    startLeft + 1, // Vị trí 2
    startLeft + 2, // Vị trí 3 (Thường sẽ là currentPage)
    startLeft + 3, // Vị trí 4 (Trang tiếp theo)
    '...',
    totalPages - 1, // Kế cuối (15)
    totalPages // Cuối cùng (16)
  ]
}
