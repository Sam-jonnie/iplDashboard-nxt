import {Link} from 'react-router-dom'

import './index.css'

const TeamCard = props => {
  const {eachItem} = props

  return (
    <Link className="teamcard-list-card" to={`/team-matches/${eachItem.id}`}>
      <li className="align-card">
        <img
          className="image-url"
          src={eachItem.teamImageUrl}
          alt={eachItem.name}
        />
        <p className="team-name">{eachItem.name}</p>
      </li>
    </Link>
  )
}

export default TeamCard
