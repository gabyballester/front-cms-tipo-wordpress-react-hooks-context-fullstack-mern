import "./Pagination.scss";
import { Pagination as PaginationAntd } from "antd";

export default function Pagination(props) {
  const { posts, location, history } = props;
  const currentPage = parseInt(posts.page);
  const {total, limit} = posts;

  const onChangePage = newPage => {
    history.push(`${location.pathname}?page=${newPage}`);
  };

  return (
    <PaginationAntd
      defaultCurrent={currentPage}
      total={total}
      pageSize={limit}
      onChange={newPage => onChangePage(newPage)}
      className="pagination"
    />
  );
}
