
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '~/components/ui/pagination'
import { generatePagination } from '~/utils/formatters'

export default function CustomPagination({
  currentPage = 1,
  totalPages = 0,
  onPageChange
}) {
  if (totalPages <= 0) return null

  return (
    <div className="shrink-0 flex items-center justify-center">
      <Pagination>
        <PaginationContent>
          {/* NÚT PREVIOUS */}
          {currentPage > 1 ? (
            <PaginationPrevious
              className="hover:bg-slate-800 hover:text-white cursor-pointer"
              onClick={() => onPageChange && onPageChange(Math.max(1, currentPage - 1))}
            />
          ) : (
            <PaginationPrevious className="pointer-events-none opacity-50" />
          )}

          {/* CÁC NÚT SỐ TRANG */}
          {generatePagination(currentPage, totalPages).map((item, index) => {
            if (item === '...') {
              return (
                <PaginationItem key={index}>
                  <PaginationEllipsis />
                </PaginationItem>
              )
            }

            return (
              <PaginationItem key={index}>
                <PaginationLink
                  isActive={item === currentPage}
                  className="hover:bg-slate-800 hover:text-white bg-inherit cursor-pointer"
                  onClick={() => onPageChange && onPageChange(item)}
                >
                  {item}
                </PaginationLink>
              </PaginationItem>
            )
          })}

          {/* NÚT NEXT */}
          {currentPage < totalPages ? (
            <PaginationNext
              className="hover:bg-slate-800 hover:text-white cursor-pointer"
              onClick={() => onPageChange && onPageChange(Math.min(totalPages, currentPage + 1))}
            />
          ) : (
            <PaginationNext className="pointer-events-none opacity-50" />
          )}
        </PaginationContent>
      </Pagination>
    </div>
  )
}
