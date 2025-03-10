

export default function LastTicket({ ticket }) {

	return (
		<div className="sidebar-searchtickets-last-ticket">
			<div className="sidebar-searchtickets-last-ticket-top">
			<div className="sidebar-searchtickets-last-ticket-left">
				<div className="sidebar-searchtickets-last-ticket-city">
					{ticket.departure.from.city.name}
				</div>
				<div className="sidebar-searchtickets-last-ticket-station">
					{ticket.departure.from.railway_station_name}
				</div>
				<div className="sidebar-searchtickets-last-ticket-station-add"> вокзал</div>
			</div>
			<div className="sidebar-searchtickets-last-ticket-right">
				<div className="sidebar-searchtickets-last-ticket-city">
					{ticket.departure.to.city.name}
				</div>
				<div className="sidebar-searchtickets-last-ticket-station">
					{ticket.departure.to.railway_station_name}
				</div>
				<div className="sidebar-searchtickets-last-ticket-station-add"> вокзал</div>
			</div>
			</div>

			<div className="sidebar-searchtickets-last-ticket-bot">
			<div className="result-search-tickets-route-images">
				<div className="result-search-tickets-route-image-wifi result-search-tickets-route-image" />
				<div className="result-search-tickets-route-image-rocket result-search-tickets-route-image" />
				<div className="result-search-tickets-route-image-cup result-search-tickets-route-image" />
			</div>
			<div className="sidebar-searchtickets-last-ticket-price">
				<div className="sidebar-searchtickets-last-ticket-price-ot">от</div>
				<div className="sidebar-searchtickets-last-ticket-price-amount">{ticket.departure.min_price.toLocaleString()}</div>
				<div className="result-search-tickets-route-minPrices-item-rubImage" />
			</div>
			</div>
		</div>
	);

}