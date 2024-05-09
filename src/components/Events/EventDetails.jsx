import { useQuery } from "@tanstack/react-query";
import { Link, Outlet, useParams } from "react-router-dom";

import { fetchEvent } from "../../utils/http.js";
import Header from "../Header.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";

export default function EventDetails() {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["event "],
    queryFn: ({ signal }) => fetchEvent({ id, signal }),
  });

  let content;

  if (isLoading) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock
        title="ERROR"
        message={error.info?.message || "Failed to load event data"}
      />
    );
  }

  if (data) {
    content = (
      <article id="event-details">
        <header>
          <h1>{data.title}</h1>
          <nav>
            <button>Delete</button>
            <Link to="edit">Edit</Link>
          </nav>
        </header>
        <div id="event-details-content">
          <img src={`http://localhost:3000/${data.image}`} alt="event image" />
          <div id="event-details-info">
            <div>
              <p id="event-details-location">{data.location}</p>
              <time dateTime={`${data.date}T${data.time}`}>
                {data.date} {data.time}
              </time>
            </div>
            <p id="event-details-description">{data.description}</p>
          </div>
        </div>
      </article>
    );
  }

  return (
    <>
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      {content}
    </>
  );
}
