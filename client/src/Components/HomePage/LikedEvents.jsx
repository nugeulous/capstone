import React from 'react'

const LikedEvents = ({ likedEvents }) => {
  return (
    <div>
    <h2>Liked Events</h2>
    <ul>
        {likedEvents.map(event => (
            <li key={event.id}>
                <h3>{event.title}</h3>
                <p>Date: {event.date}</p>
            </li>
        ))}
    </ul>
</div>
  )
}

export default LikedEvents
