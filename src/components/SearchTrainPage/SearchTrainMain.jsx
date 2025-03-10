import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ResultSearchTickets from './ResultSearchTickets';
import { filterChange } from "../Redux/filter";
import { fetchRoutes } from '../Redux/routes';
export default function SearchTrainMain() {
	const limit = useSelector((state) => state.filter.limit);
	const [limitValue, setlimitValue] = useState(limit);
	const dispatch = useDispatch();
	const trains = useSelector((state) => state.routes.routes);
	const amount = useSelector((state) => state.routes.total_count);

	const totalPages = Math.ceil(amount / limit);
	const [currentPage, setCurrentPage] = useState(1);
	const [visitedPages, setVisitedPages] = useState(new Set());

	const handleChangeSort = (value) => {
		dispatch(filterChange({ name: 'sort', value }));
		dispatch(fetchRoutes());
		setVisitedPages((prev) => new Set(prev).add(currentPage));
		resetVisitedPages();
	};

	const handleClickLimit = (value) => {
		dispatch(filterChange({ name: 'limit', value }));
		dispatch(fetchRoutes());
		setlimitValue(value);
		setCurrentPage(1);
		resetVisitedPages();
	};

	const handlePageChange = (page) => {
		setCurrentPage(page);
		onPageChange()
	};

	const handlePrev = () => {
		if (currentPage > 1) {
		  setCurrentPage(currentPage - 1);
		  onPageChange()
		}
	  };

	  const handleNext = () => {
		if (currentPage < totalPages) {
		  setCurrentPage(currentPage + 1);
		  onPageChange();
		}
	  };

	  
	  const onPageChange = () => {
		  const value = (currentPage-1) * limit;
		  dispatch(filterChange({ name: 'offset', value }));
		  dispatch(fetchRoutes());
		  setVisitedPages((prev) => new Set(prev).add(currentPage));
	  };

	  const resetVisitedPages = () => {
		setVisitedPages(new Set());
	  };

	return (
		<div className="main-searchTickets">
			<div className="main-searchTickets-sort">
				<div className="main-searchTickets-sort-sum">найдено {amount}</div>

				<div className="main-searchTickets-sort-order-right">
					<div className="main-searchTickets-sort-order">сортировать по:&nbsp;
						<select className="main-searchTickets-sort-select"
							name="sortTrains"
							onChange={(e) => handleChangeSort(e.target.value)}
						>
							<option value="date">времени</option>
							<option value="prices">стоимости</option>
							<option value="duration">длительности</option>
						</select>
					</div>
					<div className="main-searchTickets-sort-onPage">показывать по:
						<button className={"classFilterChoice" + (limitValue === 5 ? "Active" : "")} onClick={() => handleClickLimit(5)}>5</button>
						<button className={"classFilterChoice" + (limitValue === 10 ? "Active" : "")} onClick={() => handleClickLimit(10)}>10</button>
						<button className={"classFilterChoice" + (limitValue === 20 ? "Active" : "")} onClick={() => handleClickLimit(20)}>20</button>
					</div>
				</div>
			</div>


			<div className="main-searchTickets-block-list">
				{trains && (trains.map((train, index) => (
					<ResultSearchTickets train={train} key={index} />
				)))}
			</div>

			<div className="main-searchTickets-pageslist">
				<button className="main-searchTickets-pageslist-left main-searchTickets-pageslist-arrow-item"
				 onClick={handlePrev} disabled={currentPage === 1}>
				</button>
				<div className="main-searchTickets-pageslist-item-list">
					{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
						<button
							key={page}
							onClick={() => handlePageChange(page)}
							className={"main-searchTickets-pageslist-item" + (currentPage === page ? "Active" : "") + " " +
							(visitedPages.has(page) ? "main-searchTickets-pageslist-itemVisited" : "")}
						>
							{page}
						</button>
					))}
				</div>
				<button className="main-searchTickets-pageslist-right main-searchTickets-pageslist-arrow-item"
				onClick={handleNext} disabled={currentPage === totalPages}>
				</button>
			</div>
		</div>
	);
}